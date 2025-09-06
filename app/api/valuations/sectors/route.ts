import { NextResponse } from 'next/server'
import { SECTOR_DATA } from '@/types/valuation'

// UK SIC Code sectors for dropdown
const UK_SECTORS = [
  { value: 'technology', label: 'Technology & Software', sicCode: '62' },
  { value: 'saas', label: 'Software as a Service (SaaS)', sicCode: '62.01' },
  { value: 'ecommerce', label: 'E-commerce & Online Retail', sicCode: '47.91' },
  { value: 'manufacturing', label: 'Manufacturing', sicCode: '10-33' },
  { value: 'professional_services', label: 'Professional Services', sicCode: '69-75' },
  { value: 'healthcare', label: 'Healthcare & Medical', sicCode: '86' },
  { value: 'hospitality', label: 'Hospitality & Food Service', sicCode: '55-56' },
  { value: 'construction', label: 'Construction', sicCode: '41-43' },
  { value: 'retail', label: 'Retail (Physical)', sicCode: '47' },
  { value: 'wholesale', label: 'Wholesale Trade', sicCode: '46' },
  { value: 'transportation', label: 'Transportation & Logistics', sicCode: '49-53' },
  { value: 'real_estate', label: 'Real Estate', sicCode: '68' },
  { value: 'finance', label: 'Financial Services', sicCode: '64-66' },
  { value: 'education', label: 'Education & Training', sicCode: '85' },
  { value: 'entertainment', label: 'Entertainment & Recreation', sicCode: '90-93' },
  { value: 'agriculture', label: 'Agriculture & Farming', sicCode: '01-03' },
  { value: 'energy', label: 'Energy & Utilities', sicCode: '35' },
  { value: 'telecommunications', label: 'Telecommunications', sicCode: '61' },
  { value: 'consulting', label: 'Management Consulting', sicCode: '70' },
  { value: 'marketing', label: 'Marketing & Advertising', sicCode: '73' }
]

export async function GET() {
  try {
    // Return sectors with their valuation data
    const sectorsWithData = UK_SECTORS.map(sector => ({
      ...sector,
      data: SECTOR_DATA[sector.value] || {
        code: sector.sicCode,
        name: sector.label,
        category: 'General',
        baseMultiple: {
          revenue: 1.0,
          ebitda: 7.0
        },
        adjustmentFactors: {
          size: { small: 0.8, medium: 1.0, large: 1.2 },
          growth: { low: 0.8, moderate: 1.0, high: 1.3 },
          profitability: { low: 0.8, average: 1.0, high: 1.2 }
        },
        benchmarks: {
          avgProfitMargin: 10,
          avgGrowthRate: 10,
          avgCustomerRetention: 75
        }
      }
    }))
    
    return NextResponse.json({
      sectors: sectorsWithData,
      total: UK_SECTORS.length
    })
  } catch (error) {
    console.error('Error fetching sectors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sectors' },
      { status: 500 }
    )
  }
}