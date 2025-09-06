import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/app/auth'

const saveValuationSchema = z.object({
  valuationResult: z.object({
    valuationRange: z.object({
      minimum: z.number(),
      typical: z.number(),
      maximum: z.number(),
      confidence: z.number()
    }),
    methodBreakdown: z.any(),
    strengthFactors: z.array(z.any()),
    weaknessFactors: z.array(z.any()),
    opportunities: z.array(z.string()),
    recommendations: z.array(z.string())
  }),
  formData: z.object({
    sector: z.string().optional(),
    annualRevenue: z.number().optional(),
    profitValue: z.number().optional(),
    yearEstablished: z.number().optional(),
    employeeCount: z.number().optional()
  })
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const validationResult = saveValuationSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      )
    }
    
    const { valuationResult, formData } = validationResult.data
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Create valuation request
    const valuationRequest = await prisma.valuationRequest.create({
      data: {
        userId: user.id,
        businessType: formData.sector || 'Unknown',
        revenue: formData.annualRevenue || 0,
        profit: formData.profitValue || 0,
        industry: formData.sector || 'Unknown',
        location: 'UK',
        yearEstablished: formData.yearEstablished,
        employees: formData.employeeCount,
        status: 'COMPLETED',
        estimatedValue: valuationResult.valuationRange.typical,
        valuationRange: {
          min: valuationResult.valuationRange.minimum,
          typical: valuationResult.valuationRange.typical,
          max: valuationResult.valuationRange.maximum,
          confidence: valuationResult.valuationRange.confidence
        },
        report: JSON.stringify({
          methodBreakdown: valuationResult.methodBreakdown,
          strengthFactors: valuationResult.strengthFactors,
          weaknessFactors: valuationResult.weaknessFactors,
          opportunities: valuationResult.opportunities,
          recommendations: valuationResult.recommendations
        }),
        completedAt: new Date()
      }
    })
    
    return NextResponse.json({
      success: true,
      valuationId: valuationRequest.id
    })
  } catch (error) {
    console.error('Failed to save valuation:', error)
    return NextResponse.json(
      { error: 'Failed to save valuation' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Get user's valuation history
    const valuations = await prisma.valuationRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    })
    
    return NextResponse.json({
      valuations,
      total: valuations.length
    })
  } catch (error) {
    console.error('Failed to fetch valuations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch valuations' },
      { status: 500 }
    )
  }
}