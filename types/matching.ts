import { Decimal } from '@prisma/client/runtime/library'

/**
 * Buyer preference criteria for matching
 */
export interface BuyerPreferences {
  // Industry preferences
  industries: string[]
  industryWeight?: number // 0-1 weight for matching
  
  // Budget constraints
  minBudget?: number
  maxBudget?: number
  budgetFlexibility?: number // percentage flexibility (e.g., 10 = ±10%)
  
  // Location preferences
  preferredLocations: string[]
  locationFlexibility?: 'exact' | 'region' | 'country' | 'any'
  remoteAcceptable?: boolean
  
  // Financial requirements
  minRevenue?: number
  maxRevenue?: number
  minEbitda?: number
  maxEbitda?: number
  minProfitMargin?: number
  
  // Business characteristics
  minEmployees?: number
  maxEmployees?: number
  minYearsInBusiness?: number
  preferredLegalStructures?: string[]
  
  // Deal preferences
  managementStayRequired?: boolean
  propertyIncluded?: boolean | 'preferred' | 'required'
  relocatable?: boolean | 'preferred' | 'required'
  
  // Growth & potential
  minGrowthRate?: number // percentage
  industryGrowthImportance?: 'low' | 'medium' | 'high'
}

/**
 * Match scoring factors with their weights
 */
export interface MatchFactors {
  industryAlignment: number      // 0-100
  budgetFit: number             // 0-100
  locationMatch: number         // 0-100
  revenueMatch: number          // 0-100
  profitabilityMatch: number    // 0-100
  sizeMatch: number             // 0-100
  growthPotential: number       // 0-100
  strategicFit: number          // 0-100
}

/**
 * Detailed match score breakdown
 */
export interface MatchScoreDetails {
  totalScore: number           // 0-100
  confidence: number           // 0-100
  factors: MatchFactors
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  reasoning: string
}

/**
 * Match calculation parameters
 */
export interface MatchCalculationParams {
  buyerId: string
  businessId: string
  preferences?: BuyerPreferences
  includeAIAnalysis?: boolean
  weights?: MatchWeights
}

/**
 * Customizable weights for match factors
 */
export interface MatchWeights {
  industryAlignment?: number    // Default: 30
  budgetFit?: number           // Default: 25
  locationPreference?: number  // Default: 15
  revenueMatch?: number        // Default: 15
  companySize?: number         // Default: 10
  growthPotential?: number     // Default: 5
}

/**
 * Match recommendation with business details
 */
export interface MatchRecommendation {
  matchId?: string
  businessId: string
  buyerId: string
  score: MatchScoreDetails
  business: {
    id: string
    title: string
    description: string
    askingPrice?: Decimal | number
    annualRevenue?: Decimal | number
    location: string
    industry: string
    employees?: number
  }
  createdAt: Date
  expiresAt?: Date
}

/**
 * Batch matching request
 */
export interface BatchMatchRequest {
  buyerId: string
  businessIds?: string[]
  limit?: number
  minScore?: number
  includeExpired?: boolean
}

/**
 * Match update request for buyer preferences
 */
export interface PreferenceUpdateRequest {
  buyerId: string
  preferences: Partial<BuyerPreferences>
  triggerRematching?: boolean
}

/**
 * Cache configuration for match results
 */
export interface MatchCacheConfig {
  ttl: number // Time to live in seconds
  key: string
  invalidateOn?: string[] // Events that trigger cache invalidation
}

/**
 * AI analysis for enhanced matching
 */
export interface AIMatchAnalysis {
  synergyScore: number
  marketTrends: string[]
  riskFactors: string[]
  opportunities: string[]
  culturalFit: number
  integrationComplexity: 'low' | 'medium' | 'high'
  estimatedTimeToClose: string // e.g., "3-6 months"
}