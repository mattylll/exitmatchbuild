import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/auth'
import { prisma } from '@/lib/prisma'
import { matchCache } from '@/lib/matching/cache'
import { BuyerPreferences, PreferenceUpdateRequest } from '@/types/matching'
import { z } from 'zod'

/**
 * Preference validation schema
 */
const preferencesSchema = z.object({
  industries: z.array(z.string()).optional(),
  minBudget: z.number().positive().optional(),
  maxBudget: z.number().positive().optional(),
  budgetFlexibility: z.number().min(0).max(100).optional(),
  preferredLocations: z.array(z.string()).optional(),
  locationFlexibility: z.enum(['exact', 'region', 'country', 'any']).optional(),
  remoteAcceptable: z.boolean().optional(),
  minRevenue: z.number().positive().optional(),
  maxRevenue: z.number().positive().optional(),
  minEbitda: z.number().positive().optional(),
  maxEbitda: z.number().positive().optional(),
  minProfitMargin: z.number().min(0).max(100).optional(),
  minEmployees: z.number().min(0).optional(),
  maxEmployees: z.number().min(0).optional(),
  minYearsInBusiness: z.number().min(0).optional(),
  preferredLegalStructures: z.array(z.string()).optional(),
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
  industryGrowthImportance: z.enum(['low', 'medium', 'high']).optional(),
  businessPlan: z.string().optional(),
  synergies: z.string().optional(),
  timeframe: z.string().optional(),
  financingType: z.enum([
    'CASH',
    'BANK_LOAN',
    'SBA_LOAN',
    'SELLER_FINANCING',
    'INVESTOR_BACKED',
    'COMBINATION'
  ]).optional(),
})

/**
 * GET /api/buyers/preferences
 * Get buyer preferences
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

    // Get buyer ID from query or use current user
    const { searchParams } = new URL(req.url)
    const buyerId = searchParams.get('buyerId') || session.user.id

    // Verify user has access
    const isOwner = session.user.id === buyerId
    const isAdmin = session.user.role === 'ADMIN'
    const isAdvisor = session.user.role === 'ADVISOR'
    
    if (!isOwner && !isAdmin && !isAdvisor) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
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

    // Convert database fields to preferences format
    const preferences: BuyerPreferences = {
      industries: buyerProfile.industries || [],
      minBudget: buyerProfile.minBudget?.toNumber(),
      maxBudget: buyerProfile.maxBudget?.toNumber(),
      preferredLocations: buyerProfile.preferredLocations || [],
      minRevenue: buyerProfile.minRevenue?.toNumber(),
      maxRevenue: buyerProfile.maxRevenue?.toNumber(),
      minEbitda: buyerProfile.minEbitda?.toNumber(),
      maxEbitda: buyerProfile.maxEbitda?.toNumber(),
    }

    // Add additional metadata
    const metadata = {
      verified: buyerProfile.verified,
      buyerType: buyerProfile.buyerType,
      financingApproved: buyerProfile.financingApproved,
      kycCompleted: buyerProfile.kycCompleted,
      amlChecked: buyerProfile.amlChecked,
      rating: buyerProfile.rating?.toNumber(),
      totalInquiries: buyerProfile.totalInquiries,
      successfulDeals: buyerProfile.successfulDeals,
    }

    return NextResponse.json({
      success: true,
      data: {
        preferences,
        metadata,
        user: buyerProfile.user,
      }
    })

  } catch (error) {
    console.error('Get preferences error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preferences' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/buyers/preferences
 * Update buyer preferences
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
    const { buyerId, preferences, triggerRematching = true } = body as PreferenceUpdateRequest

    // Use current user if buyerId not provided
    const targetBuyerId = buyerId || session.user.id

    // Verify user has access
    const isOwner = session.user.id === targetBuyerId
    const isAdmin = session.user.role === 'ADMIN'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Validate preferences
    const validatedPreferences = preferencesSchema.parse(preferences)

    // Check if buyer profile exists
    const existingProfile = await prisma.buyerProfile.findUnique({
      where: { userId: targetBuyerId },
    })

    if (!existingProfile) {
      return NextResponse.json(
        { success: false, error: 'Buyer profile not found' },
        { status: 404 }
      )
    }

    // Build update data
    const updateData: any = {
      updatedAt: new Date(),
    }

    // Map preferences to database fields
    if (validatedPreferences.industries !== undefined) {
      updateData.industries = validatedPreferences.industries
    }
    if (validatedPreferences.minBudget !== undefined) {
      updateData.minBudget = validatedPreferences.minBudget
    }
    if (validatedPreferences.maxBudget !== undefined) {
      updateData.maxBudget = validatedPreferences.maxBudget
    }
    if (validatedPreferences.preferredLocations !== undefined) {
      updateData.preferredLocations = validatedPreferences.preferredLocations
    }
    if (validatedPreferences.minRevenue !== undefined) {
      updateData.minRevenue = validatedPreferences.minRevenue
    }
    if (validatedPreferences.maxRevenue !== undefined) {
      updateData.maxRevenue = validatedPreferences.maxRevenue
    }
    if (validatedPreferences.minEbitda !== undefined) {
      updateData.minEbitda = validatedPreferences.minEbitda
    }
    if (validatedPreferences.maxEbitda !== undefined) {
      updateData.maxEbitda = validatedPreferences.maxEbitda
    }
    if (validatedPreferences.businessPlan !== undefined) {
      updateData.businessPlan = validatedPreferences.businessPlan
    }
    if (validatedPreferences.synergies !== undefined) {
      updateData.synergies = validatedPreferences.synergies
    }
    if (validatedPreferences.timeframe !== undefined) {
      updateData.timeframe = validatedPreferences.timeframe
    }
    if (validatedPreferences.financingType !== undefined) {
      updateData.financingType = validatedPreferences.financingType
    }

    // Update buyer profile
    const updatedProfile = await prisma.buyerProfile.update({
      where: { userId: targetBuyerId },
      data: updateData,
    })

    // Invalidate cache
    matchCache.invalidateByEvent('buyer_preference_update')

    // Trigger rematching if requested
    if (triggerRematching) {
      // Mark existing matches for recalculation
      await prisma.match.updateMany({
        where: {
          buyerId: targetBuyerId,
          status: { in: ['PENDING', 'VIEWED'] },
        },
        data: {
          updatedAt: new Date(),
          // Note: In production, you might want to queue a background job
          // to recalculate all matches asynchronously
        }
      })

      // Create notification
      await prisma.notification.create({
        data: {
          userId: targetBuyerId,
          type: 'PROFILE_UPDATE',
          title: 'Preferences Updated',
          message: 'Your preferences have been updated. We will recalculate your matches.',
          priority: 'NORMAL',
        }
      })
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        activityType: 'update_preferences',
        description: 'Updated buyer preferences',
        entityType: 'BuyerProfile',
        entityId: existingProfile.id,
        metadata: {
          changes: Object.keys(validatedPreferences),
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedProfile,
      message: triggerRematching 
        ? 'Preferences updated and rematching triggered' 
        : 'Preferences updated successfully',
    })

  } catch (error) {
    console.error('Update preferences error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid preference data',
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/buyers/preferences
 * Create initial buyer preferences
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
    const preferences = body.preferences as BuyerPreferences
    const buyerType = body.buyerType || 'INDIVIDUAL'

    // Validate preferences
    const validatedPreferences = preferencesSchema.parse(preferences)

    // Check if profile already exists
    const existingProfile = await prisma.buyerProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (existingProfile) {
      return NextResponse.json(
        { success: false, error: 'Buyer profile already exists' },
        { status: 400 }
      )
    }

    // Create buyer profile
    const profile = await prisma.buyerProfile.create({
      data: {
        userId: session.user.id,
        buyerType,
        industries: validatedPreferences.industries || [],
        minBudget: validatedPreferences.minBudget,
        maxBudget: validatedPreferences.maxBudget,
        preferredLocations: validatedPreferences.preferredLocations || [],
        minRevenue: validatedPreferences.minRevenue,
        maxRevenue: validatedPreferences.maxRevenue,
        minEbitda: validatedPreferences.minEbitda,
        maxEbitda: validatedPreferences.maxEbitda,
        businessPlan: validatedPreferences.businessPlan,
        synergies: validatedPreferences.synergies,
        timeframe: validatedPreferences.timeframe,
        financingType: validatedPreferences.financingType,
      }
    })

    // Update user role if needed
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: 'BUYER' },
    })

    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'PROFILE_UPDATE',
        title: 'Welcome to ExitMatch',
        message: 'Your buyer profile has been created. Start exploring businesses that match your criteria.',
        priority: 'NORMAL',
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        activityType: 'create_profile',
        description: 'Created buyer profile',
        entityType: 'BuyerProfile',
        entityId: profile.id,
      }
    })

    return NextResponse.json({
      success: true,
      data: profile,
      message: 'Buyer profile created successfully',
    })

  } catch (error) {
    console.error('Create preferences error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid preference data',
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create preferences' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/buyers/preferences
 * Reset buyer preferences to defaults
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

    // Get buyer ID from query or use current user
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

    // Reset preferences to defaults
    const defaultPreferences = {
      industries: [],
      preferredLocations: [],
      minBudget: null,
      maxBudget: null,
      minRevenue: null,
      maxRevenue: null,
      minEbitda: null,
      maxEbitda: null,
      businessPlan: null,
      synergies: null,
    }

    const updatedProfile = await prisma.buyerProfile.update({
      where: { userId: buyerId },
      data: {
        ...defaultPreferences,
        updatedAt: new Date(),
      }
    })

    // Invalidate cache
    matchCache.invalidateByEvent('buyer_preference_update')

    // Mark existing matches for recalculation
    await prisma.match.updateMany({
      where: {
        buyerId,
        status: { in: ['PENDING', 'VIEWED'] },
      },
      data: {
        status: 'EXPIRED',
        updatedAt: new Date(),
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        activityType: 'reset_preferences',
        description: 'Reset buyer preferences to defaults',
        entityType: 'BuyerProfile',
        entityId: updatedProfile.id,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Preferences reset to defaults',
      data: updatedProfile,
    })

  } catch (error) {
    console.error('Reset preferences error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reset preferences' },
      { status: 500 }
    )
  }
}