import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/auth'
import { prisma } from '@/lib/prisma'
import { calculateMatchScore, performAIAnalysis } from '@/lib/matching/calculateMatchScore'
import { matchCache, cacheKeys } from '@/lib/matching/cache'
import { 
  MatchCalculationParams, 
  MatchScoreDetails,
  BuyerPreferences,
  MatchWeights 
} from '@/types/matching'
import { z } from 'zod'

/**
 * Request validation schema
 */
const matchEngineSchema = z.object({
  buyerId: z.string().min(1),
  businessId: z.string().min(1),
  preferences: z.object({
    industries: z.array(z.string()).optional(),
    minBudget: z.number().optional(),
    maxBudget: z.number().optional(),
    budgetFlexibility: z.number().optional(),
    preferredLocations: z.array(z.string()).optional(),
    locationFlexibility: z.enum(['exact', 'region', 'country', 'any']).optional(),
    minRevenue: z.number().optional(),
    maxRevenue: z.number().optional(),
    minEbitda: z.number().optional(),
    maxEbitda: z.number().optional(),
    minProfitMargin: z.number().optional(),
    minEmployees: z.number().optional(),
    maxEmployees: z.number().optional(),
    minYearsInBusiness: z.number().optional(),
    managementStayRequired: z.boolean().optional(),
    propertyIncluded: z.union([
      z.boolean(),
      z.enum(['preferred', 'required'])
    ]).optional(),
    relocatable: z.union([
      z.boolean(),
      z.enum(['preferred', 'required'])
    ]).optional(),
    minGrowthRate: z.number().optional(),
  }).optional(),
  includeAIAnalysis: z.boolean().optional(),
  weights: z.object({
    industryAlignment: z.number().min(0).max(100).optional(),
    budgetFit: z.number().min(0).max(100).optional(),
    locationPreference: z.number().min(0).max(100).optional(),
    revenueMatch: z.number().min(0).max(100).optional(),
    companySize: z.number().min(0).max(100).optional(),
    growthPotential: z.number().min(0).max(100).optional(),
  }).optional(),
})

/**
 * POST /api/matching/engine
 * Calculate match score between a buyer and a business
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

    // Parse and validate request body
    const body = await req.json()
    const validatedData = matchEngineSchema.parse(body)
    
    const { 
      buyerId, 
      businessId, 
      preferences, 
      includeAIAnalysis = false,
      weights 
    } = validatedData

    // Check cache first
    const cacheKey = cacheKeys.match(buyerId, businessId)
    const cached = matchCache.get<MatchScoreDetails>(cacheKey)
    if (cached && !includeAIAnalysis) {
      return NextResponse.json({
        success: true,
        data: cached,
        cached: true,
      })
    }

    // Fetch buyer profile
    const buyerProfile = await prisma.buyerProfile.findUnique({
      where: { userId: buyerId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          }
        }
      }
    })

    if (!buyerProfile) {
      return NextResponse.json(
        { success: false, error: 'Buyer profile not found' },
        { status: 404 }
      )
    }

    // Verify user has access to this buyer profile
    const isOwner = session.user.id === buyerId
    const isAdmin = session.user.role === 'ADMIN'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Fetch business
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        financials: {
          orderBy: { year: 'desc' },
          take: 3,
        },
        businessMetrics: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      }
    })

    if (!business) {
      return NextResponse.json(
        { success: false, error: 'Business not found' },
        { status: 404 }
      )
    }

    // Check if business is active
    if (business.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, error: 'Business is not available for matching' },
        { status: 400 }
      )
    }

    // Calculate match score
    const matchScore = await calculateMatchScore(
      business,
      buyerProfile,
      preferences as BuyerPreferences,
      weights as MatchWeights
    )

    // Perform AI analysis if requested
    let aiAnalysis = null
    if (includeAIAnalysis) {
      aiAnalysis = await performAIAnalysis(business, buyerProfile)
    }

    // Save or update match in database
    const existingMatch = await prisma.match.findUnique({
      where: {
        businessId_buyerId: {
          businessId,
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
      status: 'PENDING' as const,
    }

    if (existingMatch) {
      // Update existing match
      await prisma.match.update({
        where: { id: existingMatch.id },
        data: {
          ...matchData,
          updatedAt: new Date(),
        }
      })
    } else {
      // Create new match
      await prisma.match.create({
        data: {
          businessId,
          buyerId,
          sellerId: business.sellerId,
          ...matchData,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        }
      })
    }

    // Cache the result
    matchCache.set(cacheKey, matchScore, 900) // Cache for 15 minutes

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        activityType: 'match_calculated',
        description: `Match calculated for business ${business.title}`,
        entityType: 'Match',
        entityId: businessId,
        metadata: {
          buyerId,
          businessId,
          score: matchScore.totalScore,
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...matchScore,
        aiAnalysis,
        business: {
          id: business.id,
          title: business.title,
          description: business.description,
          askingPrice: business.askingPrice,
          location: business.location,
          industry: business.industry,
        },
        buyer: {
          id: buyerProfile.userId,
          type: buyerProfile.buyerType,
          verified: buyerProfile.verified,
        }
      }
    })

  } catch (error) {
    console.error('Match engine error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request data',
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to calculate match' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/matching/engine
 * Get match details for a specific buyer-business pair
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

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const buyerId = searchParams.get('buyerId')
    const businessId = searchParams.get('businessId')

    if (!buyerId || !businessId) {
      return NextResponse.json(
        { success: false, error: 'buyerId and businessId are required' },
        { status: 400 }
      )
    }

    // Verify user has access
    const isOwner = session.user.id === buyerId
    const isAdmin = session.user.role === 'ADMIN'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Fetch existing match
    const match = await prisma.match.findUnique({
      where: {
        businessId_buyerId: {
          businessId,
          buyerId,
        }
      },
      include: {
        business: {
          select: {
            id: true,
            title: true,
            description: true,
            askingPrice: true,
            annualRevenue: true,
            location: true,
            industry: true,
            status: true,
          }
        },
        buyer: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      }
    })

    if (!match) {
      return NextResponse.json(
        { success: false, error: 'Match not found' },
        { status: 404 }
      )
    }

    // Update viewed status if buyer is viewing
    if (isOwner && !match.buyerViewedAt) {
      await prisma.match.update({
        where: { id: match.id },
        data: {
          buyerViewedAt: new Date(),
          status: match.status === 'PENDING' ? 'VIEWED' : match.status,
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: match,
    })

  } catch (error) {
    console.error('Get match error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch match' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/matching/engine
 * Update match interest level
 */
export async function PUT(req: NextRequest) {
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
    const { matchId, interestLevel, status } = body

    if (!matchId) {
      return NextResponse.json(
        { success: false, error: 'matchId is required' },
        { status: 400 }
      )
    }

    // Fetch match
    const match = await prisma.match.findUnique({
      where: { id: matchId },
    })

    if (!match) {
      return NextResponse.json(
        { success: false, error: 'Match not found' },
        { status: 404 }
      )
    }

    // Verify user has access
    const isBuyer = session.user.id === match.buyerId
    const isSeller = session.user.id === match.sellerId
    const isAdmin = session.user.role === 'ADMIN'
    
    if (!isBuyer && !isSeller && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Update match
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (isBuyer && interestLevel) {
      updateData.buyerInterest = interestLevel
      if (!match.buyerViewedAt) {
        updateData.buyerViewedAt = new Date()
      }
    }

    if (isSeller && interestLevel) {
      updateData.sellerInterest = interestLevel
      if (!match.sellerViewedAt) {
        updateData.sellerViewedAt = new Date()
      }
    }

    if (status && (isAdmin || status === 'NOT_INTERESTED')) {
      updateData.status = status
      if (status === 'NOT_INTERESTED') {
        updateData.rejectedAt = new Date()
      }
    }

    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: updateData,
    })

    // Invalidate cache
    matchCache.delete(cacheKeys.match(match.buyerId, match.businessId))

    // Create notification if high interest
    if (interestLevel === 'HIGH' || interestLevel === 'VERY_HIGH') {
      const notifyUserId = isBuyer ? match.sellerId : match.buyerId
      await prisma.notification.create({
        data: {
          userId: notifyUserId,
          type: 'NEW_MATCH',
          title: 'High Interest Match',
          message: `A ${isBuyer ? 'buyer' : 'seller'} has shown high interest in your ${isBuyer ? 'listing' : 'inquiry'}`,
          entityType: 'Match',
          entityId: matchId,
          priority: 'HIGH',
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: updatedMatch,
    })

  } catch (error) {
    console.error('Update match error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update match' },
      { status: 500 }
    )
  }
}