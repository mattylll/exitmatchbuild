/**
 * UK Industry Sectors with Real Market EBITDA Multiples
 * Based on 2024 UK M&A market data
 * Source: BDO PCPI, Deloitte UK M&A reports, PWC UK deals insights
 */

export interface IndustryData {
  code: string
  name: string
  category: string
  ebitdaMultiple: {
    min: number
    typical: number
    max: number
  }
  revenueMultiple: {
    min: number
    typical: number  
    max: number
  }
  trends: 'growing' | 'stable' | 'declining'
  demandLevel: 'high' | 'medium' | 'low'
  typicalGrossMargin: number // percentage
  notes?: string
}

export const UK_INDUSTRIES: Record<string, IndustryData> = {
  // TECHNOLOGY & SOFTWARE
  'saas_b2b': {
    code: 'SAAS_B2B',
    name: 'SaaS - Business Software',
    category: 'Technology',
    ebitdaMultiple: { min: 8, typical: 15, max: 25 },
    revenueMultiple: { min: 2, typical: 4, max: 8 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 75,
    notes: 'High multiples for recurring revenue models'
  },
  'software_development': {
    code: 'SOFTWARE_DEV',
    name: 'Software Development & IT Services',
    category: 'Technology',
    ebitdaMultiple: { min: 6, typical: 10, max: 16 },
    revenueMultiple: { min: 1, typical: 2, max: 4 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 65
  },
  'fintech': {
    code: 'FINTECH',
    name: 'Financial Technology',
    category: 'Technology',
    ebitdaMultiple: { min: 10, typical: 18, max: 30 },
    revenueMultiple: { min: 3, typical: 6, max: 10 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 70
  },
  'cyber_security': {
    code: 'CYBERSEC',
    name: 'Cyber Security',
    category: 'Technology',
    ebitdaMultiple: { min: 12, typical: 20, max: 35 },
    revenueMultiple: { min: 3, typical: 5, max: 9 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 80
  },
  'ecommerce_tech': {
    code: 'ECOM_TECH',
    name: 'E-commerce Technology',
    category: 'Technology',
    ebitdaMultiple: { min: 7, typical: 12, max: 20 },
    revenueMultiple: { min: 1.5, typical: 3, max: 5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 60
  },

  // HEALTHCARE & MEDICAL
  'private_healthcare': {
    code: 'PRIVATE_HEALTH',
    name: 'Private Healthcare Providers',
    category: 'Healthcare',
    ebitdaMultiple: { min: 8, typical: 12, max: 18 },
    revenueMultiple: { min: 1.5, typical: 2.5, max: 4 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 45
  },
  'dental_practice': {
    code: 'DENTAL',
    name: 'Dental Practices',
    category: 'Healthcare',
    ebitdaMultiple: { min: 6, typical: 9, max: 14 },
    revenueMultiple: { min: 1.2, typical: 2, max: 3 },
    trends: 'stable',
    demandLevel: 'high',
    typicalGrossMargin: 40,
    notes: 'NHS vs private mix affects valuation'
  },
  'veterinary': {
    code: 'VET',
    name: 'Veterinary Practices',
    category: 'Healthcare',
    ebitdaMultiple: { min: 10, typical: 14, max: 20 },
    revenueMultiple: { min: 2, typical: 3, max: 4.5 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 50,
    notes: 'Corporate consolidation driving high multiples'
  },
  'care_homes': {
    code: 'CARE_HOMES',
    name: 'Care Homes & Assisted Living',
    category: 'Healthcare',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 0.8, typical: 1.5, max: 2.5 },
    trends: 'growing',
    demandLevel: 'medium',
    typicalGrossMargin: 35
  },
  'pharma_biotech': {
    code: 'PHARMA_BIO',
    name: 'Pharmaceuticals & Biotech',
    category: 'Healthcare',
    ebitdaMultiple: { min: 12, typical: 18, max: 30 },
    revenueMultiple: { min: 3, typical: 5, max: 10 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 65
  },

  // PROFESSIONAL SERVICES
  'accounting': {
    code: 'ACCOUNTING',
    name: 'Accounting & Bookkeeping',
    category: 'Professional Services',
    ebitdaMultiple: { min: 4, typical: 6, max: 10 },
    revenueMultiple: { min: 0.8, typical: 1.2, max: 2 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 55
  },
  'legal_services': {
    code: 'LEGAL',
    name: 'Legal Services',
    category: 'Professional Services',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 1, typical: 1.5, max: 2.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 60
  },
  'recruitment': {
    code: 'RECRUITMENT',
    name: 'Recruitment & Staffing',
    category: 'Professional Services',
    ebitdaMultiple: { min: 4, typical: 7, max: 11 },
    revenueMultiple: { min: 0.5, typical: 0.8, max: 1.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 30
  },
  'consulting': {
    code: 'CONSULTING',
    name: 'Management Consulting',
    category: 'Professional Services',
    ebitdaMultiple: { min: 6, typical: 10, max: 15 },
    revenueMultiple: { min: 1, typical: 2, max: 3 },
    trends: 'growing',
    demandLevel: 'medium',
    typicalGrossMargin: 50
  },
  'marketing_agency': {
    code: 'MARKETING',
    name: 'Marketing & Advertising Agencies',
    category: 'Professional Services',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 0.8, typical: 1.5, max: 2.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 45
  },

  // MANUFACTURING
  'food_manufacturing': {
    code: 'FOOD_MFG',
    name: 'Food & Beverage Manufacturing',
    category: 'Manufacturing',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 0.6, typical: 1, max: 1.8 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 30
  },
  'engineering': {
    code: 'ENGINEERING',
    name: 'Engineering & Precision Manufacturing',
    category: 'Manufacturing',
    ebitdaMultiple: { min: 5, typical: 7, max: 10 },
    revenueMultiple: { min: 0.7, typical: 1.2, max: 2 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 35
  },
  'chemicals': {
    code: 'CHEMICALS',
    name: 'Chemicals & Materials',
    category: 'Manufacturing',
    ebitdaMultiple: { min: 6, typical: 9, max: 14 },
    revenueMultiple: { min: 1, typical: 1.5, max: 2.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 40
  },
  'packaging': {
    code: 'PACKAGING',
    name: 'Packaging & Containers',
    category: 'Manufacturing',
    ebitdaMultiple: { min: 5, typical: 7, max: 10 },
    revenueMultiple: { min: 0.6, typical: 1, max: 1.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 28
  },
  'textiles': {
    code: 'TEXTILES',
    name: 'Textiles & Apparel Manufacturing',
    category: 'Manufacturing',
    ebitdaMultiple: { min: 4, typical: 6, max: 9 },
    revenueMultiple: { min: 0.4, typical: 0.7, max: 1.2 },
    trends: 'declining',
    demandLevel: 'low',
    typicalGrossMargin: 25
  },

  // RETAIL & CONSUMER
  'ecommerce_retail': {
    code: 'ECOM_RETAIL',
    name: 'E-commerce & Online Retail',
    category: 'Retail',
    ebitdaMultiple: { min: 6, typical: 10, max: 16 },
    revenueMultiple: { min: 0.8, typical: 1.5, max: 3 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 40
  },
  'specialty_retail': {
    code: 'SPECIALTY_RETAIL',
    name: 'Specialty Retail Stores',
    category: 'Retail',
    ebitdaMultiple: { min: 4, typical: 6, max: 9 },
    revenueMultiple: { min: 0.4, typical: 0.8, max: 1.2 },
    trends: 'declining',
    demandLevel: 'low',
    typicalGrossMargin: 35
  },
  'wholesale_distribution': {
    code: 'WHOLESALE',
    name: 'Wholesale & Distribution',
    category: 'Retail',
    ebitdaMultiple: { min: 4, typical: 6, max: 8 },
    revenueMultiple: { min: 0.3, typical: 0.5, max: 0.8 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 20
  },
  'hospitality': {
    code: 'HOSPITALITY',
    name: 'Hotels & Hospitality',
    category: 'Retail',
    ebitdaMultiple: { min: 6, typical: 9, max: 14 },
    revenueMultiple: { min: 1, typical: 2, max: 3 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 55
  },
  'restaurants': {
    code: 'RESTAURANTS',
    name: 'Restaurants & Food Service',
    category: 'Retail',
    ebitdaMultiple: { min: 4, typical: 6, max: 9 },
    revenueMultiple: { min: 0.4, typical: 0.7, max: 1.2 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 60
  },

  // CONSTRUCTION & REAL ESTATE
  'construction': {
    code: 'CONSTRUCTION',
    name: 'Construction & Building',
    category: 'Construction',
    ebitdaMultiple: { min: 3, typical: 5, max: 8 },
    revenueMultiple: { min: 0.3, typical: 0.6, max: 1 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 20
  },
  'property_management': {
    code: 'PROPERTY_MGMT',
    name: 'Property Management',
    category: 'Real Estate',
    ebitdaMultiple: { min: 6, typical: 9, max: 12 },
    revenueMultiple: { min: 1.5, typical: 2.5, max: 3.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 45
  },
  'facilities_management': {
    code: 'FACILITIES',
    name: 'Facilities Management',
    category: 'Real Estate',
    ebitdaMultiple: { min: 5, typical: 7, max: 10 },
    revenueMultiple: { min: 0.5, typical: 0.8, max: 1.3 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 25
  },

  // EDUCATION & TRAINING
  'education_training': {
    code: 'EDUCATION',
    name: 'Education & Training Providers',
    category: 'Education',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 1, typical: 1.5, max: 2.5 },
    trends: 'growing',
    demandLevel: 'medium',
    typicalGrossMargin: 50
  },
  'nurseries': {
    code: 'NURSERIES',
    name: 'Nurseries & Childcare',
    category: 'Education',
    ebitdaMultiple: { min: 6, typical: 9, max: 13 },
    revenueMultiple: { min: 1.2, typical: 2, max: 3 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 40,
    notes: 'Government funding support drives valuations'
  },

  // LOGISTICS & TRANSPORT
  'logistics': {
    code: 'LOGISTICS',
    name: 'Logistics & Freight',
    category: 'Transport',
    ebitdaMultiple: { min: 4, typical: 6, max: 9 },
    revenueMultiple: { min: 0.4, typical: 0.7, max: 1.2 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 25
  },
  'courier_delivery': {
    code: 'COURIER',
    name: 'Courier & Last-Mile Delivery',
    category: 'Transport',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 0.5, typical: 1, max: 1.8 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 30
  },

  // ENERGY & UTILITIES
  'renewable_energy': {
    code: 'RENEWABLE',
    name: 'Renewable Energy',
    category: 'Energy',
    ebitdaMultiple: { min: 8, typical: 12, max: 18 },
    revenueMultiple: { min: 2, typical: 3.5, max: 5 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 45,
    notes: 'ESG focus driving premium valuations'
  },
  'energy_services': {
    code: 'ENERGY_SERVICES',
    name: 'Energy Services & Utilities',
    category: 'Energy',
    ebitdaMultiple: { min: 6, typical: 9, max: 13 },
    revenueMultiple: { min: 1, typical: 1.8, max: 2.8 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 35
  },
  'waste_management': {
    code: 'WASTE',
    name: 'Waste Management & Recycling',
    category: 'Energy',
    ebitdaMultiple: { min: 6, typical: 9, max: 12 },
    revenueMultiple: { min: 1, typical: 1.5, max: 2.2 },
    trends: 'growing',
    demandLevel: 'medium',
    typicalGrossMargin: 35
  },

  // FINANCIAL SERVICES
  'insurance_broking': {
    code: 'INSURANCE',
    name: 'Insurance Broking',
    category: 'Financial Services',
    ebitdaMultiple: { min: 7, typical: 11, max: 16 },
    revenueMultiple: { min: 1.5, typical: 2.5, max: 4 },
    trends: 'stable',
    demandLevel: 'high',
    typicalGrossMargin: 50,
    notes: 'Recurring commissions drive value'
  },
  'wealth_management': {
    code: 'WEALTH_MGMT',
    name: 'Wealth Management & IFAs',
    category: 'Financial Services',
    ebitdaMultiple: { min: 8, typical: 12, max: 18 },
    revenueMultiple: { min: 2, typical: 3, max: 5 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 55,
    notes: 'AUM-based valuations common'
  },
  'mortgage_broking': {
    code: 'MORTGAGE',
    name: 'Mortgage Broking',
    category: 'Financial Services',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 1, typical: 1.5, max: 2.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 45
  },

  // AGRICULTURE & FOOD
  'agriculture': {
    code: 'AGRICULTURE',
    name: 'Agriculture & Farming',
    category: 'Agriculture',
    ebitdaMultiple: { min: 4, typical: 6, max: 9 },
    revenueMultiple: { min: 0.5, typical: 1, max: 1.5 },
    trends: 'stable',
    demandLevel: 'low',
    typicalGrossMargin: 25
  },
  'food_wholesale': {
    code: 'FOOD_WHOLESALE',
    name: 'Food Wholesale & Distribution',
    category: 'Agriculture',
    ebitdaMultiple: { min: 4, typical: 6, max: 8 },
    revenueMultiple: { min: 0.3, typical: 0.5, max: 0.8 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 18
  },

  // MEDIA & ENTERTAINMENT
  'digital_media': {
    code: 'DIGITAL_MEDIA',
    name: 'Digital Media & Content',
    category: 'Media',
    ebitdaMultiple: { min: 6, typical: 10, max: 16 },
    revenueMultiple: { min: 1.5, typical: 2.5, max: 4 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 60
  },
  'gaming': {
    code: 'GAMING',
    name: 'Gaming & Entertainment',
    category: 'Media',
    ebitdaMultiple: { min: 8, typical: 14, max: 22 },
    revenueMultiple: { min: 2, typical: 4, max: 7 },
    trends: 'growing',
    demandLevel: 'high',
    typicalGrossMargin: 70
  },
  'publishing': {
    code: 'PUBLISHING',
    name: 'Publishing & Print Media',
    category: 'Media',
    ebitdaMultiple: { min: 3, typical: 5, max: 8 },
    revenueMultiple: { min: 0.4, typical: 0.7, max: 1.2 },
    trends: 'declining',
    demandLevel: 'low',
    typicalGrossMargin: 40
  },

  // OTHER
  'security_services': {
    code: 'SECURITY',
    name: 'Security Services',
    category: 'Services',
    ebitdaMultiple: { min: 5, typical: 7, max: 10 },
    revenueMultiple: { min: 0.6, typical: 1, max: 1.5 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 30
  },
  'cleaning_services': {
    code: 'CLEANING',
    name: 'Cleaning & Janitorial Services',
    category: 'Services',
    ebitdaMultiple: { min: 3, typical: 5, max: 7 },
    revenueMultiple: { min: 0.3, typical: 0.5, max: 0.8 },
    trends: 'stable',
    demandLevel: 'medium',
    typicalGrossMargin: 25
  },
  'fitness_wellness': {
    code: 'FITNESS',
    name: 'Fitness & Wellness',
    category: 'Services',
    ebitdaMultiple: { min: 5, typical: 8, max: 12 },
    revenueMultiple: { min: 0.8, typical: 1.3, max: 2 },
    trends: 'growing',
    demandLevel: 'medium',
    typicalGrossMargin: 45
  }
}

/**
 * Get industry by code
 */
export function getIndustry(code: string): IndustryData | null {
  return UK_INDUSTRIES[code] || null
}

/**
 * Get all industries for a category
 */
export function getIndustriesByCategory(category: string): IndustryData[] {
  return Object.values(UK_INDUSTRIES).filter(ind => ind.category === category)
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return [...new Set(Object.values(UK_INDUSTRIES).map(ind => ind.category))]
}

/**
 * Calculate adjusted EBITDA multiple based on business factors
 */
export function calculateAdjustedMultiple(
  baseMultiple: number,
  factors: {
    revenueGrowth?: number // percentage
    recurringRevenue?: number // percentage
    customerConcentration?: number // percentage of revenue from top customer
    yearsInBusiness?: number
    ebitdaMargin?: number // percentage
  }
): number {
  let adjusted = baseMultiple

  // Growth rate adjustment
  if (factors.revenueGrowth) {
    if (factors.revenueGrowth > 30) adjusted *= 1.3
    else if (factors.revenueGrowth > 20) adjusted *= 1.2
    else if (factors.revenueGrowth > 10) adjusted *= 1.1
    else if (factors.revenueGrowth < 0) adjusted *= 0.8
  }

  // Recurring revenue adjustment
  if (factors.recurringRevenue) {
    if (factors.recurringRevenue > 80) adjusted *= 1.25
    else if (factors.recurringRevenue > 60) adjusted *= 1.15
    else if (factors.recurringRevenue > 40) adjusted *= 1.08
    else if (factors.recurringRevenue < 20) adjusted *= 0.9
  }

  // Customer concentration risk
  if (factors.customerConcentration) {
    if (factors.customerConcentration > 50) adjusted *= 0.75
    else if (factors.customerConcentration > 30) adjusted *= 0.85
    else if (factors.customerConcentration > 20) adjusted *= 0.95
  }

  // Business maturity
  if (factors.yearsInBusiness) {
    if (factors.yearsInBusiness > 20) adjusted *= 1.1
    else if (factors.yearsInBusiness > 10) adjusted *= 1.05
    else if (factors.yearsInBusiness < 3) adjusted *= 0.85
  }

  // EBITDA margin quality
  if (factors.ebitdaMargin) {
    if (factors.ebitdaMargin > 25) adjusted *= 1.15
    else if (factors.ebitdaMargin > 15) adjusted *= 1.05
    else if (factors.ebitdaMargin < 5) adjusted *= 0.8
  }

  return Math.round(adjusted * 10) / 10 // Round to 1 decimal
}