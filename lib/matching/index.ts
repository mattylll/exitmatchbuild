/**
 * Central export for all matching utilities
 */

export { 
  calculateMatchScore, 
  performAIAnalysis 
} from './calculateMatchScore'

export { 
  matchCache, 
  cacheKeys, 
  withCache, 
  BatchCache, 
  warmCache,
  cacheMiddleware 
} from './cache'

export type {
  MatchFactors,
  MatchScoreDetails,
  MatchWeights,
  BuyerPreferences,
  MatchCalculationParams,
  MatchRecommendation,
  BatchMatchRequest,
  PreferenceUpdateRequest,
  MatchCacheConfig,
  AIMatchAnalysis,
} from '@/types/matching'