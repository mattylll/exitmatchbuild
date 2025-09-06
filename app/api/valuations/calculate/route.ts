import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ValuationService } from '@/lib/services/valuation-service'
import { fullValuationSchema } from '@/types/valuation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/app/auth'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate input
    const validationResult = fullValuationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      )
    }
    
    const data = validationResult.data
    
    // Calculate valuation
    const valuationService = new ValuationService(data)
    const result = await valuationService.calculate()
    
    // Get session (optional - for saving to database)
    const session = await auth()
    
    // Save to database if user is logged in
    if (session?.user?.email) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        })
        
        if (user) {
          // Create valuation request record
          await prisma.valuationRequest.create({
            data: {
              userId: user.id,
              businessType: data.sector || 'Unknown',
              revenue: data.annualRevenue || 0,
              profit: data.profitValue || 0,
              industry: data.sector || 'Unknown',
              location: 'UK', // Default for now
              yearEstablished: data.yearEstablished,
              employees: data.employeeCount,
              status: 'COMPLETED',
              estimatedValue: result.valuationRange.typical,
              valuationRange: {
                min: result.valuationRange.minimum,
                typical: result.valuationRange.typical,
                max: result.valuationRange.maximum,
                confidence: result.valuationRange.confidence
              },
              completedAt: new Date()
            }
          })
        }
      } catch (dbError) {
        // Log error but don't fail the request
        console.error('Failed to save valuation to database:', dbError)
      }
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Valuation calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate valuation' },
      { status: 500 }
    )
  }
}