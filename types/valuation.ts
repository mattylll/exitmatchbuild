import { z } from 'zod'

// ============================================================================
// VALUATION WIZARD TYPES
// ============================================================================

export interface ValuationStepData {
  // Step 1: Business Sector
  sector?: string
  sicCode?: string
  subSector?: string
  
  // Step 2: Annual Revenue
  annualRevenue?: number
  revenueGrowthTrend?: 'declining' | 'stable' | 'growing' | 'rapid_growth'
  
  // Step 3: EBITDA/Profit Margin
  profitType?: 'ebitda' | 'net_profit' | 'gross_profit'
  profitValue?: number
  profitMargin?: number
  
  // Step 4: Years in Operation
  yearEstablished?: number
  yearsInOperation?: number
  
  // Step 5: Number of Employees
  employeeCount?: number
  employeeRange?: string
  
  // Step 6: Customer Concentration
  topCustomerPercentage?: number
  customerCount?: number
  customerRetention?: number
  
  // Step 7: Revenue Growth Rate
  currentYearRevenue?: number
  lastYearRevenue?: number
  growthRate?: number
  growthTrend?: 'declining' | 'stable' | 'moderate' | 'high'
  
  // Step 8: Recurring Revenue
  recurringRevenuePercentage?: number
  contractLength?: 'monthly' | 'quarterly' | 'annual' | 'multi_year'
  churnRate?: number
  
  // Step 9: Key Assets
  keyAssets?: string[]
  intellectualProperty?: boolean
  realEstate?: boolean
  equipment?: boolean
  inventory?: boolean
  brand?: boolean
  patents?: boolean
  
  // Step 10: Reason for Exit
  exitReason?: string
  exitTimeline?: string
  ownerInvolvement?: 'full_time' | 'part_time' | 'passive'
  postSaleInvolvement?: 'none' | 'consulting' | 'employment'
}

export interface ValuationResult {
  id?: string
  
  // Core valuation figures
  valuationRange: {
    minimum: number
    typical: number
    maximum: number
    confidence: number // 0-100
  }
  
  // Method breakdown
  methodBreakdown: {
    revenueMultiple: {
      value: number
      multiple: number
      weight: number
    }
    ebitdaMultiple: {
      value: number
      multiple: number
      weight: number
    }
    assetBased: {
      value: number
      weight: number
    }
    dcf?: {
      value: number
      weight: number
    }
  }
  
  // Analysis
  primaryMethod: 'revenue' | 'ebitda' | 'asset' | 'dcf'
  industryMultiple: number
  adjustedMultiple: number
  
  // Insights
  strengthFactors: ValuationFactor[]
  weaknessFactors: ValuationFactor[]
  opportunities: string[]
  recommendations: string[]
  
  // Comparables
  comparableBusinesses?: ComparableBusiness[]
  marketConditions?: MarketCondition
  
  // Meta
  calculatedAt: Date
  validUntil: Date
  reportUrl?: string
}

export interface ValuationFactor {
  factor: string
  impact: 'positive' | 'negative'
  weight: 'low' | 'medium' | 'high'
  description: string
  improvementTip?: string
}

export interface ComparableBusiness {
  sector: string
  revenue: number
  soldPrice: number
  multiple: number
  date: string
}

export interface MarketCondition {
  trend: 'buyers_market' | 'neutral' | 'sellers_market'
  demandLevel: 'low' | 'moderate' | 'high' | 'very_high'
  averageTimeToSale: number // months
  premiumFactors: string[]
}

// ============================================================================
// SECTOR DATA
// ============================================================================

export interface SectorData {
  code: string
  name: string
  category: string
  baseMultiple: {
    revenue: number
    ebitda: number
  }
  adjustmentFactors: {
    size: Record<string, number>
    growth: Record<string, number>
    profitability: Record<string, number>
  }
  benchmarks: {
    avgProfitMargin: number
    avgGrowthRate: number
    avgCustomerRetention: number
  }
}

// UK SIC Codes with valuation multiples
export const SECTOR_DATA: Record<string, SectorData> = {
  'technology': {
    code: '62',
    name: 'Computer Programming & Consultancy',
    category: 'Technology',
    baseMultiple: {
      revenue: 2.5,
      ebitda: 12
    },
    adjustmentFactors: {
      size: { small: 0.8, medium: 1.0, large: 1.3 },
      growth: { low: 0.7, moderate: 1.0, high: 1.5 },
      profitability: { low: 0.8, average: 1.0, high: 1.3 }
    },
    benchmarks: {
      avgProfitMargin: 15,
      avgGrowthRate: 20,
      avgCustomerRetention: 85
    }
  },
  'saas': {
    code: '62.01',
    name: 'Software as a Service',
    category: 'Technology',
    baseMultiple: {
      revenue: 4.0,
      ebitda: 15
    },
    adjustmentFactors: {
      size: { small: 0.9, medium: 1.0, large: 1.4 },
      growth: { low: 0.6, moderate: 1.0, high: 1.8 },
      profitability: { low: 0.7, average: 1.0, high: 1.4 }
    },
    benchmarks: {
      avgProfitMargin: 20,
      avgGrowthRate: 30,
      avgCustomerRetention: 90
    }
  },
  'ecommerce': {
    code: '47.91',
    name: 'Retail via Internet',
    category: 'Retail',
    baseMultiple: {
      revenue: 1.2,
      ebitda: 8
    },
    adjustmentFactors: {
      size: { small: 0.7, medium: 1.0, large: 1.2 },
      growth: { low: 0.8, moderate: 1.0, high: 1.4 },
      profitability: { low: 0.8, average: 1.0, high: 1.2 }
    },
    benchmarks: {
      avgProfitMargin: 8,
      avgGrowthRate: 15,
      avgCustomerRetention: 70
    }
  },
  'manufacturing': {
    code: '10-33',
    name: 'Manufacturing',
    category: 'Industrial',
    baseMultiple: {
      revenue: 0.8,
      ebitda: 6
    },
    adjustmentFactors: {
      size: { small: 0.7, medium: 1.0, large: 1.2 },
      growth: { low: 0.9, moderate: 1.0, high: 1.2 },
      profitability: { low: 0.8, average: 1.0, high: 1.2 }
    },
    benchmarks: {
      avgProfitMargin: 10,
      avgGrowthRate: 5,
      avgCustomerRetention: 80
    }
  },
  'professional_services': {
    code: '69-75',
    name: 'Professional Services',
    category: 'Services',
    baseMultiple: {
      revenue: 1.0,
      ebitda: 7
    },
    adjustmentFactors: {
      size: { small: 0.8, medium: 1.0, large: 1.2 },
      growth: { low: 0.9, moderate: 1.0, high: 1.3 },
      profitability: { low: 0.8, average: 1.0, high: 1.3 }
    },
    benchmarks: {
      avgProfitMargin: 12,
      avgGrowthRate: 10,
      avgCustomerRetention: 85
    }
  },
  'healthcare': {
    code: '86',
    name: 'Healthcare',
    category: 'Healthcare',
    baseMultiple: {
      revenue: 1.5,
      ebitda: 9
    },
    adjustmentFactors: {
      size: { small: 0.8, medium: 1.0, large: 1.3 },
      growth: { low: 0.9, moderate: 1.0, high: 1.3 },
      profitability: { low: 0.9, average: 1.0, high: 1.2 }
    },
    benchmarks: {
      avgProfitMargin: 14,
      avgGrowthRate: 8,
      avgCustomerRetention: 90
    }
  },
  'hospitality': {
    code: '55-56',
    name: 'Hospitality & Food Service',
    category: 'Hospitality',
    baseMultiple: {
      revenue: 0.5,
      ebitda: 4
    },
    adjustmentFactors: {
      size: { small: 0.7, medium: 1.0, large: 1.2 },
      growth: { low: 0.8, moderate: 1.0, high: 1.3 },
      profitability: { low: 0.7, average: 1.0, high: 1.3 }
    },
    benchmarks: {
      avgProfitMargin: 6,
      avgGrowthRate: 5,
      avgCustomerRetention: 60
    }
  },
  'construction': {
    code: '41-43',
    name: 'Construction',
    category: 'Construction',
    baseMultiple: {
      revenue: 0.6,
      ebitda: 5
    },
    adjustmentFactors: {
      size: { small: 0.7, medium: 1.0, large: 1.2 },
      growth: { low: 0.9, moderate: 1.0, high: 1.2 },
      profitability: { low: 0.8, average: 1.0, high: 1.2 }
    },
    benchmarks: {
      avgProfitMargin: 8,
      avgGrowthRate: 6,
      avgCustomerRetention: 75
    }
  }
}

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export const valuationStepSchemas = {
  step1: z.object({
    sector: z.string().min(1, 'Please select a business sector'),
    sicCode: z.string().optional(),
    subSector: z.string().optional()
  }),
  
  step2: z.object({
    annualRevenue: z.number()
      .min(0, 'Revenue must be positive')
      .max(1000000000, 'Revenue seems too high'),
    revenueGrowthTrend: z.enum(['declining', 'stable', 'growing', 'rapid_growth']).optional()
  }),
  
  step3: z.object({
    profitType: z.enum(['ebitda', 'net_profit', 'gross_profit']),
    profitValue: z.number().min(0, 'Profit must be positive').optional(),
    profitMargin: z.number().min(0).max(100, 'Margin must be between 0-100%').optional()
  }),
  
  step4: z.object({
    yearEstablished: z.number()
      .min(1800, 'Year seems too early')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    yearsInOperation: z.number().min(0).optional()
  }),
  
  step5: z.object({
    employeeCount: z.number().min(0, 'Employee count must be positive').optional(),
    employeeRange: z.string().optional()
  }),
  
  step6: z.object({
    topCustomerPercentage: z.number()
      .min(0, 'Percentage must be positive')
      .max(100, 'Percentage cannot exceed 100%'),
    customerCount: z.number().min(1).optional(),
    customerRetention: z.number().min(0).max(100).optional()
  }),
  
  step7: z.object({
    growthRate: z.number().min(-100).max(1000),
    growthTrend: z.enum(['declining', 'stable', 'moderate', 'high']).optional()
  }),
  
  step8: z.object({
    recurringRevenuePercentage: z.number().min(0).max(100),
    contractLength: z.enum(['monthly', 'quarterly', 'annual', 'multi_year']).optional(),
    churnRate: z.number().min(0).max(100).optional()
  }),
  
  step9: z.object({
    keyAssets: z.array(z.string()).min(1, 'Please select at least one asset type'),
    intellectualProperty: z.boolean().optional(),
    realEstate: z.boolean().optional(),
    equipment: z.boolean().optional()
  }),
  
  step10: z.object({
    exitReason: z.string().min(1, 'Please select a reason for exit'),
    exitTimeline: z.string().optional(),
    ownerInvolvement: z.enum(['full_time', 'part_time', 'passive']).optional(),
    postSaleInvolvement: z.enum(['none', 'consulting', 'employment']).optional()
  })
}

export const fullValuationSchema = z.object({
  ...valuationStepSchemas.step1.shape,
  ...valuationStepSchemas.step2.shape,
  ...valuationStepSchemas.step3.shape,
  ...valuationStepSchemas.step4.shape,
  ...valuationStepSchemas.step5.shape,
  ...valuationStepSchemas.step6.shape,
  ...valuationStepSchemas.step7.shape,
  ...valuationStepSchemas.step8.shape,
  ...valuationStepSchemas.step9.shape,
  ...valuationStepSchemas.step10.shape
})

export type ValuationFormData = z.infer<typeof fullValuationSchema>

// ============================================================================
// WIZARD CONFIGURATION
// ============================================================================

export interface WizardStep {
  id: number
  title: string
  description: string
  icon: string
  fields: string[]
  validation: z.ZodSchema
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    title: 'Business Sector',
    description: 'Select your primary business sector',
    icon: 'Building',
    fields: ['sector', 'sicCode', 'subSector'],
    validation: valuationStepSchemas.step1
  },
  {
    id: 2,
    title: 'Annual Revenue',
    description: 'Enter your last 12 months revenue',
    icon: 'TrendingUp',
    fields: ['annualRevenue', 'revenueGrowthTrend'],
    validation: valuationStepSchemas.step2
  },
  {
    id: 3,
    title: 'Profitability',
    description: 'Provide your EBITDA or profit margin',
    icon: 'PieChart',
    fields: ['profitType', 'profitValue', 'profitMargin'],
    validation: valuationStepSchemas.step3
  },
  {
    id: 4,
    title: 'Years in Operation',
    description: 'How long has your business been operating?',
    icon: 'Calendar',
    fields: ['yearEstablished', 'yearsInOperation'],
    validation: valuationStepSchemas.step4
  },
  {
    id: 5,
    title: 'Team Size',
    description: 'Number of employees in your business',
    icon: 'Users',
    fields: ['employeeCount', 'employeeRange'],
    validation: valuationStepSchemas.step5
  },
  {
    id: 6,
    title: 'Customer Base',
    description: 'Customer concentration and retention',
    icon: 'UserCheck',
    fields: ['topCustomerPercentage', 'customerCount', 'customerRetention'],
    validation: valuationStepSchemas.step6
  },
  {
    id: 7,
    title: 'Growth Rate',
    description: 'Year-over-year revenue growth',
    icon: 'TrendingUp',
    fields: ['growthRate', 'growthTrend'],
    validation: valuationStepSchemas.step7
  },
  {
    id: 8,
    title: 'Recurring Revenue',
    description: 'Percentage of recurring vs one-time revenue',
    icon: 'RefreshCw',
    fields: ['recurringRevenuePercentage', 'contractLength', 'churnRate'],
    validation: valuationStepSchemas.step8
  },
  {
    id: 9,
    title: 'Key Assets',
    description: 'Select your valuable business assets',
    icon: 'Package',
    fields: ['keyAssets', 'intellectualProperty', 'realEstate', 'equipment'],
    validation: valuationStepSchemas.step9
  },
  {
    id: 10,
    title: 'Exit Reason',
    description: 'Why are you considering selling?',
    icon: 'LogOut',
    fields: ['exitReason', 'exitTimeline', 'ownerInvolvement', 'postSaleInvolvement'],
    validation: valuationStepSchemas.step10
  }
]

// Exit reasons
export const EXIT_REASONS = [
  { value: 'retirement', label: 'Retirement' },
  { value: 'new_venture', label: 'Pursuing New Venture' },
  { value: 'health', label: 'Health Reasons' },
  { value: 'relocation', label: 'Relocation' },
  { value: 'strategic', label: 'Strategic Exit' },
  { value: 'market_conditions', label: 'Market Conditions' },
  { value: 'partnership_dissolution', label: 'Partnership Dissolution' },
  { value: 'burnout', label: 'Owner Burnout' },
  { value: 'family', label: 'Family Reasons' },
  { value: 'other', label: 'Other' }
]

// Asset types
export const ASSET_TYPES = [
  { value: 'intellectual_property', label: 'Intellectual Property', icon: 'Brain' },
  { value: 'real_estate', label: 'Real Estate', icon: 'Home' },
  { value: 'equipment', label: 'Equipment & Machinery', icon: 'Tool' },
  { value: 'inventory', label: 'Inventory', icon: 'Package' },
  { value: 'brand', label: 'Brand & Trademarks', icon: 'Award' },
  { value: 'patents', label: 'Patents', icon: 'Shield' },
  { value: 'customer_database', label: 'Customer Database', icon: 'Database' },
  { value: 'contracts', label: 'Long-term Contracts', icon: 'FileText' },
  { value: 'licenses', label: 'Licenses & Permits', icon: 'Key' },
  { value: 'software', label: 'Proprietary Software', icon: 'Code' }
]