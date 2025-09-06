import { Business, BuyerProfile } from '@prisma/client'
import { 
  MatchFactors, 
  MatchScoreDetails, 
  MatchWeights, 
  BuyerPreferences,
  AIMatchAnalysis 
} from '@/types/matching'

/**
 * Default weights for match scoring factors
 */
const DEFAULT_WEIGHTS: Required<MatchWeights> = {
  industryAlignment: 30,
  budgetFit: 25,
  locationPreference: 15,
  revenueMatch: 15,
  companySize: 10,
  growthPotential: 5,
}

/**
 * Calculate comprehensive match score between a buyer and a business
 */
export async function calculateMatchScore(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences,
  customWeights?: MatchWeights
): Promise<MatchScoreDetails> {
  const weights = { ...DEFAULT_WEIGHTS, ...customWeights }
  
  // Calculate individual factor scores
  const factors = calculateFactors(business, buyerProfile, preferences)
  
  // Calculate weighted total score
  const totalScore = calculateWeightedScore(factors, weights)
  
  // Calculate confidence based on data completeness
  const confidence = calculateConfidence(business, buyerProfile, preferences)
  
  // Generate insights
  const { strengths, weaknesses, recommendations } = generateInsights(
    factors,
    business,
    buyerProfile
  )
  
  // Generate reasoning for the match
  const reasoning = generateReasoning(factors, totalScore, business, buyerProfile)
  
  return {
    totalScore: Math.round(totalScore),
    confidence: Math.round(confidence),
    factors,
    strengths,
    weaknesses,
    recommendations,
    reasoning,
  }
}

/**
 * Calculate individual matching factors
 */
function calculateFactors(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): MatchFactors {
  return {
    industryAlignment: calculateIndustryAlignment(business, buyerProfile, preferences),
    budgetFit: calculateBudgetFit(business, buyerProfile, preferences),
    locationMatch: calculateLocationMatch(business, buyerProfile, preferences),
    revenueMatch: calculateRevenueMatch(business, buyerProfile, preferences),
    profitabilityMatch: calculateProfitabilityMatch(business, buyerProfile),
    sizeMatch: calculateSizeMatch(business, buyerProfile, preferences),
    growthPotential: calculateGrowthPotential(business, buyerProfile),
    strategicFit: calculateStrategicFit(business, buyerProfile, preferences),
  }
}

/**
 * Calculate industry alignment score
 */
function calculateIndustryAlignment(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): number {
  const buyerIndustries = preferences?.industries || buyerProfile.industries
  
  if (!buyerIndustries || buyerIndustries.length === 0) {
    return 50 // Neutral score if no preference
  }
  
  // Direct match
  if (buyerIndustries.includes(business.industry)) {
    return 100
  }
  
  // Check sub-industry match
  if (business.subIndustry && buyerIndustries.includes(business.subIndustry)) {
    return 85
  }
  
  // Check for related industries (simplified - in production, use industry taxonomy)
  const relatedScore = calculateRelatedIndustryScore(business.industry, buyerIndustries)
  if (relatedScore > 0) {
    return relatedScore
  }
  
  return 0
}

/**
 * Calculate budget fit score
 */
function calculateBudgetFit(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): number {
  const askingPrice = business.askingPrice?.toNumber() || business.minimumPrice?.toNumber()
  if (!askingPrice) return 50 // Neutral if no price set
  
  const minBudget = (preferences?.minBudget || buyerProfile.minBudget?.toNumber()) ?? 0
  const maxBudget = (preferences?.maxBudget || buyerProfile.maxBudget?.toNumber()) ?? Infinity
  const flexibility = preferences?.budgetFlexibility || 10 // 10% default flexibility
  
  // Perfect fit
  if (askingPrice >= minBudget && askingPrice <= maxBudget) {
    // Score based on how centered the price is in the range
    const range = maxBudget - minBudget
    const center = minBudget + range / 2
    const deviation = Math.abs(askingPrice - center) / (range / 2)
    return Math.max(70, 100 - deviation * 30)
  }
  
  // Within flexibility range
  const flexMin = minBudget * (1 - flexibility / 100)
  const flexMax = maxBudget * (1 + flexibility / 100)
  
  if (askingPrice >= flexMin && askingPrice <= flexMax) {
    // Lower score for being outside ideal range
    if (askingPrice < minBudget) {
      const ratio = (minBudget - askingPrice) / (minBudget - flexMin)
      return 70 - ratio * 20
    } else {
      const ratio = (askingPrice - maxBudget) / (flexMax - maxBudget)
      return 70 - ratio * 20
    }
  }
  
  // Outside flexibility range
  if (askingPrice < flexMin) {
    const ratio = Math.min(1, (flexMin - askingPrice) / flexMin)
    return Math.max(0, 50 - ratio * 50)
  } else {
    const ratio = Math.min(1, (askingPrice - flexMax) / flexMax)
    return Math.max(0, 50 - ratio * 50)
  }
}

/**
 * Calculate location match score
 */
function calculateLocationMatch(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): number {
  const preferredLocations = preferences?.preferredLocations || buyerProfile.preferredLocations
  const flexibility = preferences?.locationFlexibility || 'region'
  
  if (!preferredLocations || preferredLocations.length === 0) {
    return 75 // Good score if no specific preference
  }
  
  // Exact match
  if (preferredLocations.includes(business.location)) {
    return 100
  }
  
  // Check multiple business locations
  if (business.locations && business.locations.length > 0) {
    const matchedLocations = business.locations.filter(loc => 
      preferredLocations.includes(loc)
    )
    if (matchedLocations.length > 0) {
      return 95
    }
  }
  
  // Flexibility-based scoring
  switch (flexibility) {
    case 'exact':
      return 0
    case 'region':
      // Check if in same region (simplified)
      const sameRegion = checkSameRegion(business.location, preferredLocations)
      return sameRegion ? 75 : 25
    case 'country':
      // UK-based check (simplified)
      return 50
    case 'any':
      return 75
    default:
      return 25
  }
}

/**
 * Calculate revenue match score
 */
function calculateRevenueMatch(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): number {
  const revenue = business.annualRevenue?.toNumber()
  if (!revenue) return 50 // Neutral if no revenue data
  
  const minRevenue = preferences?.minRevenue || buyerProfile.minRevenue?.toNumber()
  const maxRevenue = preferences?.maxRevenue || buyerProfile.maxRevenue?.toNumber()
  
  if (!minRevenue && !maxRevenue) {
    return 75 // Good score if no specific requirement
  }
  
  let score = 100
  
  if (minRevenue && revenue < minRevenue) {
    const ratio = revenue / minRevenue
    score = Math.max(0, ratio * 100)
  }
  
  if (maxRevenue && revenue > maxRevenue) {
    const ratio = maxRevenue / revenue
    score = Math.min(score, Math.max(0, ratio * 100))
  }
  
  return score
}

/**
 * Calculate profitability match score
 */
function calculateProfitabilityMatch(
  business: Business,
  buyerProfile: BuyerProfile
): number {
  const ebitda = business.ebitda?.toNumber()
  const profit = business.annualProfit?.toNumber()
  const revenue = business.annualRevenue?.toNumber()
  
  if (!ebitda && !profit) return 50 // Neutral if no profitability data
  
  const minEbitda = buyerProfile.minEbitda?.toNumber()
  const maxEbitda = buyerProfile.maxEbitda?.toNumber()
  
  let score = 75 // Base score for profitable business
  
  // EBITDA requirements
  if (minEbitda || maxEbitda) {
    const value = ebitda || profit || 0
    
    if (minEbitda && value < minEbitda) {
      const ratio = value / minEbitda
      score = Math.max(0, ratio * 100)
    }
    
    if (maxEbitda && value > maxEbitda) {
      // Over max EBITDA is not necessarily bad
      score = Math.min(score, 90)
    }
  }
  
  // Profit margin consideration
  if (revenue && profit) {
    const margin = (profit / revenue) * 100
    if (margin > 20) score = Math.min(100, score + 10)
    else if (margin > 10) score = Math.min(100, score + 5)
    else if (margin < 5) score = Math.max(0, score - 10)
  }
  
  return score
}

/**
 * Calculate company size match score
 */
function calculateSizeMatch(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): number {
  const employees = business.employees
  if (!employees) return 70 // Neutral-good if no data
  
  const minEmployees = preferences?.minEmployees
  const maxEmployees = preferences?.maxEmployees
  
  if (!minEmployees && !maxEmployees) {
    return 80 // Good score if no specific requirement
  }
  
  let score = 100
  
  if (minEmployees && employees < minEmployees) {
    const ratio = employees / minEmployees
    score = Math.max(50, ratio * 100)
  }
  
  if (maxEmployees && employees > maxEmployees) {
    const ratio = maxEmployees / employees
    score = Math.min(score, Math.max(50, ratio * 100))
  }
  
  return score
}

/**
 * Calculate growth potential score
 */
function calculateGrowthPotential(
  business: Business,
  buyerProfile: BuyerProfile
): number {
  let score = 50 // Base score
  
  // Factors that indicate growth potential
  if (business.franchiseOpportunity) score += 15
  if (business.relocatable) score += 10
  if (business.growthOpportunities) score += 15
  
  // Age of business (younger might have more growth potential)
  if (business.yearEstablished) {
    const age = new Date().getFullYear() - business.yearEstablished
    if (age < 5) score += 10
    else if (age < 10) score += 5
    else if (age > 30) score -= 5
  }
  
  // Industry growth (simplified - in production, use real industry data)
  score += getIndustryGrowthScore(business.industry)
  
  return Math.min(100, Math.max(0, score))
}

/**
 * Calculate strategic fit score
 */
function calculateStrategicFit(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): number {
  let score = 50 // Base score
  
  // Management staying preference
  if (preferences?.managementStayRequired !== undefined) {
    if (preferences.managementStayRequired === business.managementStaying) {
      score += 20
    } else {
      score -= 10
    }
  }
  
  // Property inclusion
  if (preferences?.propertyIncluded) {
    if (preferences.propertyIncluded === 'required' && !business.propertyIncluded) {
      score -= 30
    } else if (preferences.propertyIncluded === 'preferred' && business.propertyIncluded) {
      score += 15
    } else if (business.propertyIncluded) {
      score += 10
    }
  }
  
  // Relocatable preference
  if (preferences?.relocatable) {
    if (preferences.relocatable === 'required' && !business.relocatable) {
      score -= 25
    } else if (preferences.relocatable === 'preferred' && business.relocatable) {
      score += 15
    } else if (business.relocatable) {
      score += 5
    }
  }
  
  // Training provided
  if (business.trainingProvided) score += 10
  
  // Synergies consideration
  if (buyerProfile.synergies) score += 10
  
  return Math.min(100, Math.max(0, score))
}

/**
 * Calculate weighted total score
 */
function calculateWeightedScore(
  factors: MatchFactors,
  weights: Required<MatchWeights>
): number {
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0)
  
  const weightedSum = 
    factors.industryAlignment * weights.industryAlignment +
    factors.budgetFit * weights.budgetFit +
    factors.locationMatch * weights.locationPreference +
    factors.revenueMatch * weights.revenueMatch +
    factors.sizeMatch * weights.companySize +
    factors.growthPotential * weights.growthPotential
  
  return (weightedSum / totalWeight)
}

/**
 * Calculate confidence score based on data completeness
 */
function calculateConfidence(
  business: Business,
  buyerProfile: BuyerProfile,
  preferences?: BuyerPreferences
): number {
  let dataPoints = 0
  let totalPoints = 0
  
  // Business data completeness
  const businessFields = [
    business.askingPrice,
    business.annualRevenue,
    business.annualProfit,
    business.ebitda,
    business.employees,
    business.yearEstablished,
    business.industry,
    business.location,
  ]
  
  businessFields.forEach(field => {
    totalPoints++
    if (field !== null && field !== undefined) dataPoints++
  })
  
  // Buyer profile completeness
  const buyerFields = [
    buyerProfile.industries?.length > 0,
    buyerProfile.minBudget || buyerProfile.maxBudget,
    buyerProfile.preferredLocations?.length > 0,
    buyerProfile.minRevenue || buyerProfile.maxRevenue,
  ]
  
  buyerFields.forEach(hasField => {
    totalPoints++
    if (hasField) dataPoints++
  })
  
  // Preferences completeness
  if (preferences) {
    totalPoints += 2
    if (preferences.industries?.length > 0) dataPoints++
    if (preferences.budgetFlexibility !== undefined) dataPoints++
  }
  
  return (dataPoints / totalPoints) * 100
}

/**
 * Generate insights based on match factors
 */
function generateInsights(
  factors: MatchFactors,
  business: Business,
  buyerProfile: BuyerProfile
): {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
} {
  const strengths: string[] = []
  const weaknesses: string[] = []
  const recommendations: string[] = []
  
  // Analyze strengths
  if (factors.industryAlignment >= 85) {
    strengths.push('Excellent industry alignment with buyer expertise')
  }
  if (factors.budgetFit >= 90) {
    strengths.push('Asking price well within buyer budget range')
  }
  if (factors.locationMatch >= 90) {
    strengths.push('Perfect location match with buyer preferences')
  }
  if (factors.profitabilityMatch >= 80) {
    strengths.push('Strong profitability metrics meet buyer requirements')
  }
  if (factors.growthPotential >= 75) {
    strengths.push('High growth potential identified')
  }
  
  // Analyze weaknesses
  if (factors.industryAlignment < 50) {
    weaknesses.push('Limited industry alignment may require learning curve')
  }
  if (factors.budgetFit < 50) {
    weaknesses.push('Asking price outside buyer\'s ideal budget range')
  }
  if (factors.locationMatch < 50) {
    weaknesses.push('Location mismatch with buyer preferences')
  }
  if (factors.revenueMatch < 50) {
    weaknesses.push('Revenue outside buyer\'s target range')
  }
  
  // Generate recommendations
  if (factors.budgetFit < 70 && factors.budgetFit > 40) {
    recommendations.push('Consider negotiating on price or exploring seller financing options')
  }
  if (factors.industryAlignment < 70 && factors.industryAlignment > 40) {
    recommendations.push('Evaluate transferable skills and consider industry advisor support')
  }
  if (factors.growthPotential > 75) {
    recommendations.push('Focus on growth opportunities during due diligence')
  }
  if (business.managementStaying) {
    recommendations.push('Leverage existing management for smooth transition')
  }
  if (factors.profitabilityMatch > 80 && factors.budgetFit < 60) {
    recommendations.push('Strong profitability may justify premium pricing')
  }
  
  return { strengths, weaknesses, recommendations }
}

/**
 * Generate human-readable reasoning for the match
 */
function generateReasoning(
  factors: MatchFactors,
  totalScore: number,
  business: Business,
  buyerProfile: BuyerProfile
): string {
  const parts: string[] = []
  
  // Overall assessment
  if (totalScore >= 80) {
    parts.push('This is an excellent match with strong alignment across multiple factors.')
  } else if (totalScore >= 65) {
    parts.push('This is a good match with several positive alignment factors.')
  } else if (totalScore >= 50) {
    parts.push('This is a moderate match with both opportunities and challenges.')
  } else {
    parts.push('This match has significant gaps that would need to be addressed.')
  }
  
  // Key factor analysis
  const topFactors = Object.entries(factors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
  
  if (topFactors.length > 0) {
    const factorDescriptions = topFactors.map(([factor, score]) => {
      const name = factor.replace(/([A-Z])/g, ' $1').toLowerCase()
      return `${name} (${Math.round(score)}%)`
    }).join(' and ')
    
    parts.push(`The strongest alignment is in ${factorDescriptions}.`)
  }
  
  // Specific insights
  if (factors.budgetFit >= 90 && factors.industryAlignment >= 80) {
    parts.push('The combination of budget fit and industry expertise makes this particularly attractive.')
  }
  
  if (business.ndaRequired && buyerProfile.verified) {
    parts.push('Verified buyer status enables immediate access to confidential information.')
  }
  
  return parts.join(' ')
}

/**
 * Helper function to check if locations are in the same region
 */
function checkSameRegion(businessLocation: string, preferredLocations: string[]): boolean {
  // Simplified region checking - in production, use proper geographic data
  const regions: Record<string, string[]> = {
    'London': ['London', 'Greater London', 'Central London', 'East London', 'West London'],
    'South East': ['Kent', 'Surrey', 'Sussex', 'Hampshire', 'Berkshire', 'Oxfordshire'],
    'North West': ['Manchester', 'Liverpool', 'Lancashire', 'Cumbria', 'Cheshire'],
    'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Highlands'],
    // Add more regions...
  }
  
  for (const [region, locations] of Object.entries(regions)) {
    if (locations.some(loc => businessLocation.toLowerCase().includes(loc.toLowerCase()))) {
      return preferredLocations.some(pref => 
        locations.some(loc => pref.toLowerCase().includes(loc.toLowerCase()))
      )
    }
  }
  
  return false
}

/**
 * Helper function to calculate related industry score
 */
function calculateRelatedIndustryScore(businessIndustry: string, buyerIndustries: string[]): number {
  // Simplified industry relationship - in production, use industry taxonomy
  const relatedIndustries: Record<string, string[]> = {
    'Technology': ['Software', 'IT Services', 'E-commerce', 'Digital Marketing'],
    'Manufacturing': ['Industrial', 'Engineering', 'Production', 'Assembly'],
    'Retail': ['E-commerce', 'Wholesale', 'Distribution', 'Consumer Goods'],
    'Healthcare': ['Medical', 'Pharmaceutical', 'Wellness', 'Senior Care'],
    // Add more relationships...
  }
  
  for (const [category, related] of Object.entries(relatedIndustries)) {
    if (businessIndustry.toLowerCase().includes(category.toLowerCase()) ||
        related.some(r => businessIndustry.toLowerCase().includes(r.toLowerCase()))) {
      for (const buyerIndustry of buyerIndustries) {
        if (buyerIndustry.toLowerCase().includes(category.toLowerCase()) ||
            related.some(r => buyerIndustry.toLowerCase().includes(r.toLowerCase()))) {
          return 70 // Related industry score
        }
      }
    }
  }
  
  return 0
}

/**
 * Helper function to get industry growth score
 */
function getIndustryGrowthScore(industry: string): number {
  // Simplified growth scores - in production, use real market data
  const growthScores: Record<string, number> = {
    'Technology': 15,
    'Healthcare': 12,
    'E-commerce': 15,
    'Renewable Energy': 18,
    'Digital Marketing': 10,
    'Manufacturing': 5,
    'Retail': 3,
    'Hospitality': 5,
  }
  
  for (const [key, score] of Object.entries(growthScores)) {
    if (industry.toLowerCase().includes(key.toLowerCase())) {
      return score
    }
  }
  
  return 5 // Default growth score
}

/**
 * Enhanced AI analysis for strategic matching
 */
export async function performAIAnalysis(
  business: Business,
  buyerProfile: BuyerProfile
): Promise<AIMatchAnalysis> {
  // This would integrate with an AI service in production
  // For now, returning mock analysis based on business logic
  
  const synergyScore = calculateSynergyScore(business, buyerProfile)
  const marketTrends = identifyMarketTrends(business.industry)
  const riskFactors = identifyRiskFactors(business, buyerProfile)
  const opportunities = identifyOpportunities(business, buyerProfile)
  const culturalFit = estimateCulturalFit(business, buyerProfile)
  const integrationComplexity = assessIntegrationComplexity(business, buyerProfile)
  const estimatedTimeToClose = estimateTimeToClose(business, buyerProfile)
  
  return {
    synergyScore,
    marketTrends,
    riskFactors,
    opportunities,
    culturalFit,
    integrationComplexity,
    estimatedTimeToClose,
  }
}

// AI Analysis helper functions
function calculateSynergyScore(business: Business, buyerProfile: BuyerProfile): number {
  let score = 50
  if (buyerProfile.synergies) score += 20
  if (buyerProfile.industries.includes(business.industry)) score += 15
  if (business.relocatable) score += 10
  return Math.min(100, score)
}

function identifyMarketTrends(industry: string): string[] {
  // Simplified - would use real market data
  const trends: Record<string, string[]> = {
    'Technology': ['Digital transformation accelerating', 'AI adoption increasing'],
    'Healthcare': ['Aging population driving demand', 'Telemedicine growth'],
    'E-commerce': ['Mobile commerce expansion', 'Social commerce emerging'],
  }
  
  for (const [key, value] of Object.entries(trends)) {
    if (industry.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
  }
  return ['Steady market conditions']
}

function identifyRiskFactors(business: Business, buyerProfile: BuyerProfile): string[] {
  const risks: string[] = []
  
  if (!buyerProfile.industries.includes(business.industry)) {
    risks.push('Industry experience gap')
  }
  if (business.debt && business.debt.toNumber() > 0) {
    risks.push('Existing debt obligations')
  }
  if (!business.managementStaying) {
    risks.push('Key personnel transition risk')
  }
  
  return risks.length > 0 ? risks : ['Low risk profile']
}

function identifyOpportunities(business: Business, buyerProfile: BuyerProfile): string[] {
  const opportunities: string[] = []
  
  if (business.franchiseOpportunity) {
    opportunities.push('Franchise expansion potential')
  }
  if (business.relocatable) {
    opportunities.push('Geographic expansion flexibility')
  }
  if (business.growthOpportunities) {
    opportunities.push('Identified growth opportunities')
  }
  
  return opportunities.length > 0 ? opportunities : ['Stable business operations']
}

function estimateCulturalFit(business: Business, buyerProfile: BuyerProfile): number {
  // Simplified estimation
  let fit = 70
  if (buyerProfile.industries.includes(business.industry)) fit += 15
  if (business.managementStaying) fit += 10
  return Math.min(100, fit)
}

function assessIntegrationComplexity(business: Business, buyerProfile: BuyerProfile): 'low' | 'medium' | 'high' {
  let complexity = 0
  
  if (!buyerProfile.industries.includes(business.industry)) complexity++
  if (business.employees && business.employees > 50) complexity++
  if (business.locations && business.locations.length > 3) complexity++
  if (!business.managementStaying) complexity++
  
  if (complexity <= 1) return 'low'
  if (complexity <= 2) return 'medium'
  return 'high'
}

function estimateTimeToClose(business: Business, buyerProfile: BuyerProfile): string {
  // Simplified estimation based on complexity
  const askingPrice = business.askingPrice?.toNumber() || 0
  
  if (askingPrice < 500000) return '2-3 months'
  if (askingPrice < 2000000) return '3-6 months'
  if (askingPrice < 5000000) return '4-8 months'
  return '6-12 months'
}