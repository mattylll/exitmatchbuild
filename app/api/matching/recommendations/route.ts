import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/auth'
import { prisma } from '@/lib/prisma'
import { calculateMatchScore } from '@/lib/matching/calculateMatchScore'
import { matchCache, cacheKeys, withCache } from '@/lib/matching/cache'
import { 
  MatchRecommendation, 
  BatchMatchRequest,
  BuyerPreferences 
} from '@/types/matching'
import { z } from 'zod'

/**
 * Request validation schema
 */
const recommendationsSchema = z.object({
  buyerId: z.string().min(1),
  limit: z.number().min(1).max(100).optional().default(20),
  offset: z.number().min(0).optional().default(0),
  minScore: z.number().min(0).max(100).optional().default(50),
  includeExpired: z.boolean().optional().default(false),
  sortBy: z.enum(['score', 'createdAt', 'price', 'revenue']).optional().default('score'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  filters: z.object({
    industries: z.array(z.string()).optional(),
    locations: z.array(z.string()).optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    minRevenue: z.number().optional(),
    maxRevenue: z.number().optional(),
  }).optional(),
})

/**
 * GET /api/matching/recommendations
 * Get personalized recommendations for a buyer
 */
export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url)
    const params = {
      buyerId: searchParams.get('buyerId') || session.user.id,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      minScore: parseInt(searchParams.get('minScore') || '50'),
      includeExpired: searchParams.get('includeExpired') === 'true',
      sortBy: searchParams.get('sortBy') || 'score',
      sortOrder: searchParams.get('sortOrder') || 'desc',
    }

    // Validate parameters
    const validatedParams = recommendationsSchema.parse(params)
    const { buyerId, limit, offset, minScore, includeExpired, sortBy, sortOrder } = validatedParams

    // Verify user has access
    const isOwner = session.user.id === buyerId
    const isAdmin = session.user.role === 'ADMIN'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Check cache
    const cacheKey = cacheKeys.recommendations(buyerId, Math.floor(offset / limit) + 1, limit)
    const cached = matchCache.get<MatchRecommendation[]>(cacheKey)
    if (cached) {
      return NextResponse.json({
        success: true,
        data: cached,
        cached: true,
        pagination: {
          offset,
          limit,
          total: cached.length,
        }
      })
    }

    // Fetch buyer profile with preferences
    const buyerProfile = await prisma.buyerProfile.findUnique({
      where: { userId: buyerId },
    })

    if (!buyerProfile) {
      return NextResponse.json(
        { success: false, error: 'Buyer profile not found' },
        { status: 404 }
      )
    }

    // Build business query
    const businessWhere: any = {
      status: 'ACTIVE',
      deletedAt: null,
    }

    // Apply filters based on buyer preferences
    if (buyerProfile.industries && buyerProfile.industries.length > 0) {
      businessWhere.industry = { in: buyerProfile.industries }
    }

    if (buyerProfile.preferredLocations && buyerProfile.preferredLocations.length > 0) {
      businessWhere.OR = [
        { location: { in: buyerProfile.preferredLocations } },
        { locations: { hasSome: buyerProfile.preferredLocations } }
      ]
    }

    if (buyerProfile.minBudget || buyerProfile.maxBudget) {
      businessWhere.askingPrice = {}
      if (buyerProfile.minBudget) {
        businessWhere.askingPrice.gte = buyerProfile.minBudget
      }
      if (buyerProfile.maxBudget) {
        businessWhere.askingPrice.lte = buyerProfile.maxBudget
      }
    }

    if (buyerProfile.minRevenue || buyerProfile.maxRevenue) {
      businessWhere.annualRevenue = {}
      if (buyerProfile.minRevenue) {
        businessWhere.annualRevenue.gte = buyerProfile.minRevenue
      }
      if (buyerProfile.maxRevenue) {
        businessWhere.annualRevenue.lte = buyerProfile.maxRevenue
      }
    }

    // Fetch potential businesses
    const businesses = await prisma.business.findMany({
      where: businessWhere,
      take: limit * 3, // Fetch more to filter by score
      include: {
        businessMetrics: {
          orderBy: { date: 'desc' },
          take: 5,
        },
      },
    })

    // Calculate match scores for all businesses
    const recommendations: MatchRecommendation[] = []
    
    for (const business of businesses) {
      // Check if match already exists
      const existingMatch = await prisma.match.findUnique({
        where: {
          businessId_buyerId: {
            businessId: business.id,
            buyerId,
          }
        }
      })

      // Skip if already rejected
      if (existingMatch?.status === 'NOT_INTERESTED') {
        continue
      }

      // Skip expired if not included
      if (!includeExpired && existingMatch?.expiresAt && existingMatch.expiresAt < new Date()) {
        continue
      }

      // Calculate match score
      const matchScore = await calculateMatchScore(
        business,
        buyerProfile,
        undefined, // Use default preferences
        undefined  // Use default weights
      )

      // Filter by minimum score
      if (matchScore.totalScore < minScore) {
        continue
      }

      recommendations.push({
        matchId: existingMatch?.id,
        businessId: business.id,
        buyerId,
        score: matchScore,
        business: {
          id: business.id,
          title: business.title,
          description: business.description,
          askingPrice: business.askingPrice,
          annualRevenue: business.annualRevenue,
          location: business.location,
          industry: business.industry,
          employees: business.employees,
        },
        createdAt: existingMatch?.createdAt || new Date(),
        expiresAt: existingMatch?.expiresAt,
      })
    }

    // Sort recommendations
    recommendations.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return sortOrder === 'desc' 
            ? b.score.totalScore - a.score.totalScore
            : a.score.totalScore - b.score.totalScore
        case 'price':
          const priceA = Number(a.business.askingPrice) || 0
          const priceB = Number(b.business.askingPrice) || 0
          return sortOrder === 'desc' ? priceB - priceA : priceA - priceB
        case 'revenue':
          const revA = Number(a.business.annualRevenue) || 0
          const revB = Number(b.business.annualRevenue) || 0
          return sortOrder === 'desc' ? revB - revA : revA - revB
        case 'createdAt':
          return sortOrder === 'desc'
            ? b.createdAt.getTime() - a.createdAt.getTime()
            : a.createdAt.getTime() - b.createdAt.getTime()
        default:
          return 0
      }
    })

    // Apply pagination
    const paginatedRecommendations = recommendations.slice(offset, offset + limit)

    // Cache the results
    matchCache.set(cacheKey, paginatedRecommendations, 600) // Cache for 10 minutes

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        activityType: 'view_recommendations',
        description: `Viewed ${paginatedRecommendations.length} recommendations`,
        metadata: {
          buyerId,
          count: paginatedRecommendations.length,
          minScore,
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: paginatedRecommendations,
      pagination: {
        offset,
        limit,
        total: recommendations.length,
        hasMore: offset + limit < recommendations.length,
      }
    })

  } catch (error) {
    console.error('Get recommendations error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request parameters',
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recommendations' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/matching/recommendations
 * Generate batch recommendations for a buyer
 */
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { buyerId, businessIds, limit = 50, minScore = 60 } = body as BatchMatchRequest

    // Verify user has access
    const isOwner = session.user.id === buyerId
    const isAdmin = session.user.role === 'ADMIN'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Fetch buyer profile
    const buyerProfile = await prisma.buyerProfile.findUnique({
      where: { userId: buyerId },
    })

    if (!buyerProfile) {
      return NextResponse.json(
        { success: false, error: 'Buyer profile not found' },
        { status: 404 }
      )
    }

    // Build business query
    const businessWhere: any = {
      status: 'ACTIVE',
      deletedAt: null,
    }

    if (businessIds && businessIds.length > 0) {
      businessWhere.id = { in: businessIds }
    }

    // Fetch businesses
    const businesses = await prisma.business.findMany({
      where: businessWhere,
      take: limit,
    })

    // Calculate match scores and create/update matches
    const matches = []
    
    for (const business of businesses) {
      // Calculate match score
      const matchScore = await calculateMatchScore(
        business,
        buyerProfile,
        undefined,
        undefined
      )

      // Skip if below minimum score
      if (matchScore.totalScore < minScore) {
        continue
      }

      // Check if match exists
      const existingMatch = await prisma.match.findUnique({
        where: {
          businessId_buyerId: {
            businessId: business.id,
            buyerId,
          }
        }
      })

      const matchData = {
        matchScore: matchScore.totalScore,
        matchFactors: matchScore.factors,
        aiRecommended: matchScore.totalScore >= 70,
        aiConfidence: matchScore.confidence,
        budgetMatch: matchScore.factors.budgetFit >= 70,
        industryMatch: matchScore.factors.industryAlignment >= 70,
        locationMatch: matchScore.factors.locationMatch >= 70,
        sizeMatch: matchScore.factors.sizeMatch >= 70,
      }

      if (existingMatch) {
        // Update existing match
        const updated = await prisma.match.update({
          where: { id: existingMatch.id },
          data: {
            ...matchData,
            updatedAt: new Date(),
          }
        })
        matches.push(updated)
      } else {
        // Create new match
        const created = await prisma.match.create({
          data: {
            businessId: business.id,
            buyerId,
            sellerId: business.sellerId,
            ...matchData,
            status: 'PENDING',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          }
        })
        matches.push(created)
      }
    }

    // Invalidate cache
    matchCache.clear(`recommendations:${buyerId}`)

    // Create notification if new matches found
    if (matches.length > 0) {
      await prisma.notification.create({
        data: {
          userId: buyerId,
          type: 'NEW_MATCH',
          title: 'New Matches Available',
          message: `We found ${matches.length} new businesses that match your criteria`,
          priority: 'NORMAL',
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        matches,
        count: matches.length,
      }
    })

  } catch (error) {
    console.error('Generate recommendations error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/matching/recommendations
 * Clear recommendation cache for a buyer
 */
export async function DELETE(req: NextRequest) {
  try {
    // Authenticate user
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const buyerId = searchParams.get('buyerId') || session.user.id

    // Verify user has access
    const isOwner = session.user.id === buyerId
    const isAdmin = session.user.role === 'ADMIN'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Clear cache for this buyer
    matchCache.clear(`recommendations:${buyerId}`)
    matchCache.clear(`buyer:${buyerId}`)

    return NextResponse.json({
      success: true,
      message: 'Recommendation cache cleared successfully',
    })

  } catch (error) {
    console.error('Clear cache error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}