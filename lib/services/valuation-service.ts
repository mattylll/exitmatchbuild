import type {
  ValuationStepData,
  ValuationResult,
  ValuationFactor,
  ComparableBusiness,
  MarketCondition,
  SectorData
} from '@/types/valuation'
import { SECTOR_DATA } from '@/types/valuation'

export class ValuationService {
  private data: ValuationStepData
  private sectorData: SectorData | null
  
  constructor(data: ValuationStepData) {
    this.data = data
    this.sectorData = data.sector ? SECTOR_DATA[data.sector] || null : null
  }
  
  /**
   * Main calculation method
   */
  async calculate(): Promise<ValuationResult> {
    // Get base calculations
    const revenueMultipleValue = this.calculateRevenueMultiple()
    const ebitdaMultipleValue = this.calculateEBITDAMultiple()
    const assetBasedValue = this.calculateAssetValue()
    
    // Determine weights based on business characteristics
    const weights = this.determineMethodWeights()
    
    // Calculate weighted average
    const weightedValue = this.calculateWeightedValue({
      revenue: revenueMultipleValue,
      ebitda: ebitdaMultipleValue,
      asset: assetBasedValue
    }, weights)
    
    // Calculate confidence score
    const confidence = this.calculateConfidence()
    
    // Generate valuation range
    const valuationRange = this.generateValuationRange(weightedValue, confidence)
    
    // Identify factors
    const strengthFactors = this.identifyStrengths()
    const weaknessFactors = this.identifyWeaknesses()
    
    // Generate insights
    const opportunities = this.generateOpportunities()
    const recommendations = this.generateRecommendations()
    
    // Get comparables
    const comparableBusinesses = await this.findComparables()
    const marketConditions = this.assessMarketConditions()
    
    // Determine primary method
    const primaryMethod = this.determinePrimaryMethod(weights)
    
    const result: ValuationResult = {
      valuationRange,
      methodBreakdown: {
        revenueMultiple: {
          value: revenueMultipleValue,
          multiple: this.getAdjustedRevenueMultiple(),
          weight: weights.revenue
        },
        ebitdaMultiple: {
          value: ebitdaMultipleValue,
          multiple: this.getAdjustedEBITDAMultiple(),
          weight: weights.ebitda
        },
        assetBased: {
          value: assetBasedValue,
          weight: weights.asset
        }
      },
      primaryMethod,
      industryMultiple: this.sectorData?.baseMultiple.ebitda || 7,
      adjustedMultiple: this.getAdjustedEBITDAMultiple(),
      strengthFactors,
      weaknessFactors,
      opportunities,
      recommendations,
      comparableBusinesses,
      marketConditions,
      calculatedAt: new Date(),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
    }
    
    return result
  }
  
  /**
   * Calculate revenue multiple valuation
   */
  private calculateRevenueMultiple(): number {
    const revenue = this.data.annualRevenue || 0
    const baseMultiple = this.sectorData?.baseMultiple.revenue || 1.0
    
    // Apply adjustments
    let adjustedMultiple = baseMultiple
    
    // Growth adjustment
    if (this.data.growthRate) {
      if (this.data.growthRate > 30) adjustedMultiple *= 1.5
      else if (this.data.growthRate > 20) adjustedMultiple *= 1.3
      else if (this.data.growthRate > 10) adjustedMultiple *= 1.1
      else if (this.data.growthRate < 0) adjustedMultiple *= 0.7
    }
    
    // Recurring revenue adjustment
    if (this.data.recurringRevenuePercentage) {
      const recurringFactor = 1 + (this.data.recurringRevenuePercentage / 100) * 0.5
      adjustedMultiple *= recurringFactor
    }
    
    // Customer concentration adjustment
    if (this.data.topCustomerPercentage) {
      if (this.data.topCustomerPercentage > 50) adjustedMultiple *= 0.7
      else if (this.data.topCustomerPercentage > 30) adjustedMultiple *= 0.85
      else if (this.data.topCustomerPercentage < 10) adjustedMultiple *= 1.1
    }
    
    // Years in operation adjustment
    if (this.data.yearsInOperation) {
      if (this.data.yearsInOperation > 20) adjustedMultiple *= 1.2
      else if (this.data.yearsInOperation > 10) adjustedMultiple *= 1.1
      else if (this.data.yearsInOperation < 3) adjustedMultiple *= 0.8
    }
    
    return revenue * adjustedMultiple
  }
  
  /**
   * Calculate EBITDA multiple valuation
   */
  private calculateEBITDAMultiple(): number {
    const revenue = this.data.annualRevenue || 0
    let ebitda = 0
    
    // Calculate EBITDA based on provided data
    if (this.data.profitType === 'ebitda' && this.data.profitValue) {
      ebitda = this.data.profitValue
    } else if (this.data.profitMargin && revenue) {
      // Estimate EBITDA from profit margin
      ebitda = revenue * (this.data.profitMargin / 100)
      
      // Adjust if it's net profit (add back estimated tax and interest)
      if (this.data.profitType === 'net_profit') {
        ebitda *= 1.3 // Rough adjustment
      } else if (this.data.profitType === 'gross_profit') {
        ebitda *= 0.5 // Rough adjustment
      }
    }
    
    if (ebitda <= 0) return 0
    
    const baseMultiple = this.sectorData?.baseMultiple.ebitda || 7
    let adjustedMultiple = baseMultiple
    
    // Size adjustment
    if (revenue > 10000000) adjustedMultiple *= 1.3
    else if (revenue > 5000000) adjustedMultiple *= 1.15
    else if (revenue < 1000000) adjustedMultiple *= 0.8
    
    // Growth adjustment
    if (this.data.growthRate) {
      if (this.data.growthRate > 25) adjustedMultiple *= 1.4
      else if (this.data.growthRate > 15) adjustedMultiple *= 1.2
      else if (this.data.growthRate > 5) adjustedMultiple *= 1.1
      else if (this.data.growthRate < 0) adjustedMultiple *= 0.8
    }
    
    // Recurring revenue adjustment
    if (this.data.recurringRevenuePercentage) {
      if (this.data.recurringRevenuePercentage > 80) adjustedMultiple *= 1.3
      else if (this.data.recurringRevenuePercentage > 60) adjustedMultiple *= 1.2
      else if (this.data.recurringRevenuePercentage > 40) adjustedMultiple *= 1.1
    }
    
    // Management dependency adjustment
    if (this.data.ownerInvolvement === 'full_time') {
      adjustedMultiple *= 0.9
    } else if (this.data.ownerInvolvement === 'passive') {
      adjustedMultiple *= 1.1
    }
    
    return ebitda * adjustedMultiple
  }
  
  /**
   * Calculate asset-based valuation
   */
  private calculateAssetValue(): number {
    const revenue = this.data.annualRevenue || 0
    let assetValue = revenue * 0.3 // Base asset value estimate
    
    // Add premium for valuable assets
    if (this.data.keyAssets && this.data.keyAssets.length > 0) {
      const assetPremiums: Record<string, number> = {
        'intellectual_property': 0.3,
        'real_estate': 0.4,
        'patents': 0.35,
        'brand': 0.25,
        'customer_database': 0.2,
        'software': 0.25,
        'contracts': 0.15,
        'equipment': 0.1,
        'inventory': 0.05,
        'licenses': 0.1
      }
      
      let totalPremium = 0
      for (const asset of this.data.keyAssets) {
        totalPremium += assetPremiums[asset] || 0
      }
      
      assetValue *= (1 + totalPremium)
    }
    
    // Adjust for business age (established businesses have more accumulated assets)
    if (this.data.yearsInOperation) {
      if (this.data.yearsInOperation > 20) assetValue *= 1.3
      else if (this.data.yearsInOperation > 10) assetValue *= 1.15
      else if (this.data.yearsInOperation < 3) assetValue *= 0.7
    }
    
    return assetValue
  }
  
  /**
   * Determine weights for different valuation methods
   */
  private determineMethodWeights(): { revenue: number; ebitda: number; asset: number } {
    let revenueWeight = 0.25
    let ebitdaWeight = 0.5
    let assetWeight = 0.25
    
    // Adjust based on profitability
    const revenue = this.data.annualRevenue || 0
    const profitMargin = this.data.profitMargin || 0
    
    if (profitMargin > 20) {
      // High profit margin - EBITDA method more relevant
      ebitdaWeight = 0.6
      revenueWeight = 0.2
      assetWeight = 0.2
    } else if (profitMargin < 5) {
      // Low profit margin - Revenue and asset methods more relevant
      ebitdaWeight = 0.2
      revenueWeight = 0.4
      assetWeight = 0.4
    }
    
    // Adjust for SaaS/recurring revenue businesses
    if (this.data.sector === 'saas' || (this.data.recurringRevenuePercentage || 0) > 70) {
      revenueWeight = 0.4
      ebitdaWeight = 0.5
      assetWeight = 0.1
    }
    
    // Adjust for asset-heavy businesses
    if (this.data.sector === 'manufacturing' || this.data.sector === 'construction') {
      assetWeight = 0.4
      ebitdaWeight = 0.4
      revenueWeight = 0.2
    }
    
    // Normalize weights
    const total = revenueWeight + ebitdaWeight + assetWeight
    return {
      revenue: revenueWeight / total,
      ebitda: ebitdaWeight / total,
      asset: assetWeight / total
    }
  }
  
  /**
   * Calculate weighted valuation
   */
  private calculateWeightedValue(
    values: { revenue: number; ebitda: number; asset: number },
    weights: { revenue: number; ebitda: number; asset: number }
  ): number {
    return (
      values.revenue * weights.revenue +
      values.ebitda * weights.ebitda +
      values.asset * weights.asset
    )
  }
  
  /**
   * Calculate confidence score
   */
  private calculateConfidence(): number {
    let confidence = 50 // Base confidence
    
    // Data completeness
    const fields = [
      this.data.sector,
      this.data.annualRevenue,
      this.data.profitValue || this.data.profitMargin,
      this.data.yearEstablished,
      this.data.employeeCount,
      this.data.topCustomerPercentage,
      this.data.growthRate,
      this.data.recurringRevenuePercentage,
      this.data.keyAssets,
      this.data.exitReason
    ]
    
    const filledFields = fields.filter(f => f !== undefined && f !== null).length
    confidence += (filledFields / fields.length) * 30
    
    // Business stability factors
    if ((this.data.yearsInOperation || 0) > 10) confidence += 5
    if ((this.data.recurringRevenuePercentage || 0) > 60) confidence += 5
    if ((this.data.topCustomerPercentage || 0) < 20) confidence += 5
    if ((this.data.growthRate || 0) > 10) confidence += 5
    
    return Math.min(Math.max(confidence, 0), 100)
  }
  
  /**
   * Generate valuation range
   */
  private generateValuationRange(
    typical: number,
    confidence: number
  ): ValuationResult['valuationRange'] {
    const varianceFactor = 1 - (confidence / 100) * 0.5 // Higher confidence = tighter range
    const minVariance = 0.2 + (1 - confidence / 100) * 0.2 // 20-40% below
    const maxVariance = 0.2 + (1 - confidence / 100) * 0.3 // 20-50% above
    
    return {
      minimum: Math.round(typical * (1 - minVariance)),
      typical: Math.round(typical),
      maximum: Math.round(typical * (1 + maxVariance)),
      confidence
    }
  }
  
  /**
   * Identify strength factors
   */
  private identifyStrengths(): ValuationFactor[] {
    const strengths: ValuationFactor[] = []
    
    if ((this.data.recurringRevenuePercentage || 0) > 60) {
      strengths.push({
        factor: 'High Recurring Revenue',
        impact: 'positive',
        weight: 'high',
        description: `${this.data.recurringRevenuePercentage}% recurring revenue provides predictable cash flow`,
        improvementTip: 'Consider increasing contract lengths for even better multiples'
      })
    }
    
    if ((this.data.growthRate || 0) > 20) {
      strengths.push({
        factor: 'Strong Growth Rate',
        impact: 'positive',
        weight: 'high',
        description: `${this.data.growthRate}% year-over-year growth demonstrates market demand`,
        improvementTip: 'Document growth drivers to justify premium valuation'
      })
    }
    
    if ((this.data.topCustomerPercentage || 0) < 15) {
      strengths.push({
        factor: 'Diversified Customer Base',
        impact: 'positive',
        weight: 'medium',
        description: 'Low customer concentration reduces business risk',
        improvementTip: 'Highlight customer diversity in marketing materials'
      })
    }
    
    if ((this.data.yearsInOperation || 0) > 15) {
      strengths.push({
        factor: 'Established Business',
        impact: 'positive',
        weight: 'medium',
        description: `${this.data.yearsInOperation} years of operation shows proven stability`,
        improvementTip: 'Emphasize long-term customer relationships and brand recognition'
      })
    }
    
    if ((this.data.profitMargin || 0) > 20) {
      strengths.push({
        factor: 'High Profit Margins',
        impact: 'positive',
        weight: 'high',
        description: `${this.data.profitMargin}% profit margin indicates strong operational efficiency`,
        improvementTip: 'Document cost management strategies for buyers'
      })
    }
    
    return strengths
  }
  
  /**
   * Identify weakness factors
   */
  private identifyWeaknesses(): ValuationFactor[] {
    const weaknesses: ValuationFactor[] = []
    
    if ((this.data.topCustomerPercentage || 0) > 40) {
      weaknesses.push({
        factor: 'Customer Concentration Risk',
        impact: 'negative',
        weight: 'high',
        description: `${this.data.topCustomerPercentage}% revenue from top customer creates dependency risk`,
        improvementTip: 'Develop strategy to diversify customer base before sale'
      })
    }
    
    if ((this.data.growthRate || 0) < 0) {
      weaknesses.push({
        factor: 'Declining Revenue',
        impact: 'negative',
        weight: 'high',
        description: 'Negative growth trend reduces buyer interest',
        improvementTip: 'Address decline causes and show turnaround plan'
      })
    }
    
    if ((this.data.recurringRevenuePercentage || 0) < 30) {
      weaknesses.push({
        factor: 'Low Recurring Revenue',
        impact: 'negative',
        weight: 'medium',
        description: 'Limited recurring revenue increases cash flow uncertainty',
        improvementTip: 'Introduce subscription models or service contracts'
      })
    }
    
    if (this.data.ownerInvolvement === 'full_time') {
      weaknesses.push({
        factor: 'Owner Dependency',
        impact: 'negative',
        weight: 'medium',
        description: 'Business heavily dependent on owner involvement',
        improvementTip: 'Document processes and train key employees'
      })
    }
    
    if ((this.data.yearsInOperation || 0) < 3) {
      weaknesses.push({
        factor: 'Limited Operating History',
        impact: 'negative',
        weight: 'medium',
        description: 'Short track record increases buyer perceived risk',
        improvementTip: 'Provide detailed financial projections and market analysis'
      })
    }
    
    return weaknesses
  }
  
  /**
   * Generate opportunities
   */
  private generateOpportunities(): string[] {
    const opportunities: string[] = []
    
    if ((this.data.recurringRevenuePercentage || 0) < 50) {
      opportunities.push('Increase recurring revenue through subscription models or service contracts')
    }
    
    if ((this.data.topCustomerPercentage || 0) > 30) {
      opportunities.push('Diversify customer base to reduce concentration risk')
    }
    
    if (this.data.sector === 'technology' || this.data.sector === 'saas') {
      opportunities.push('Explore international expansion opportunities')
      opportunities.push('Develop additional product lines or features')
    }
    
    if ((this.data.profitMargin || 0) < 15) {
      opportunities.push('Improve operational efficiency to increase profit margins')
    }
    
    if (!this.data.intellectualProperty) {
      opportunities.push('Develop and protect intellectual property to increase value')
    }
    
    return opportunities
  }
  
  /**
   * Generate recommendations
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    
    // Timing recommendations
    if ((this.data.growthRate || 0) > 20) {
      recommendations.push('Consider waiting 6-12 months to maximize growth trajectory value')
    } else if ((this.data.growthRate || 0) < 0) {
      recommendations.push('Address declining revenue before going to market')
    }
    
    // Preparation recommendations
    recommendations.push('Prepare 3 years of audited financial statements')
    recommendations.push('Document all standard operating procedures')
    
    if (this.data.ownerInvolvement === 'full_time') {
      recommendations.push('Develop management team to reduce owner dependency')
    }
    
    // Valuation improvement
    if ((this.data.recurringRevenuePercentage || 0) < 40) {
      recommendations.push('Focus on increasing recurring revenue to improve multiples')
    }
    
    if ((this.data.topCustomerPercentage || 0) > 30) {
      recommendations.push('Implement customer diversification strategy over next 6 months')
    }
    
    // Exit strategy
    if (this.data.exitReason === 'retirement') {
      recommendations.push('Consider seller financing to achieve higher sale price')
    }
    
    return recommendations
  }
  
  /**
   * Find comparable businesses
   */
  private async findComparables(): Promise<ComparableBusiness[]> {
    // In a real implementation, this would query a database of recent transactions
    // For now, we'll generate sample data based on the sector
    
    const baseRevenue = this.data.annualRevenue || 1000000
    const sectorMultiple = this.sectorData?.baseMultiple.revenue || 1.0
    
    const comparables: ComparableBusiness[] = []
    
    // Generate 3-5 sample comparables
    for (let i = 0; i < 4; i++) {
      const variance = 0.7 + Math.random() * 0.6 // 70% to 130% of base
      const compRevenue = baseRevenue * variance
      const compMultiple = sectorMultiple * (0.8 + Math.random() * 0.4)
      
      comparables.push({
        sector: this.data.sector || 'General Business',
        revenue: Math.round(compRevenue),
        soldPrice: Math.round(compRevenue * compMultiple),
        multiple: Math.round(compMultiple * 10) / 10,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0]
      })
    }
    
    return comparables.sort((a, b) => b.multiple - a.multiple)
  }
  
  /**
   * Assess market conditions
   */
  private assessMarketConditions(): MarketCondition {
    // This would ideally use real market data
    // For now, we'll use sector and timing heuristics
    
    let trend: MarketCondition['trend'] = 'neutral'
    let demandLevel: MarketCondition['demandLevel'] = 'moderate'
    let averageTimeToSale = 6
    const premiumFactors: string[] = []
    
    // Tech sectors typically have higher demand
    if (this.data.sector === 'technology' || this.data.sector === 'saas') {
      trend = 'sellers_market'
      demandLevel = 'high'
      averageTimeToSale = 4
      premiumFactors.push('High demand for tech businesses')
    }
    
    // Recurring revenue businesses are in demand
    if ((this.data.recurringRevenuePercentage || 0) > 70) {
      demandLevel = 'high'
      premiumFactors.push('Strong recurring revenue model')
    }
    
    // Growing businesses attract more buyers
    if ((this.data.growthRate || 0) > 20) {
      if (demandLevel === 'moderate') demandLevel = 'high'
      if (demandLevel === 'high') demandLevel = 'very_high'
      premiumFactors.push('Above-market growth rate')
    }
    
    // Profitable businesses are always in demand
    if ((this.data.profitMargin || 0) > 20) {
      premiumFactors.push('High profit margins')
    }
    
    return {
      trend,
      demandLevel,
      averageTimeToSale,
      premiumFactors
    }
  }
  
  /**
   * Get adjusted revenue multiple
   */
  private getAdjustedRevenueMultiple(): number {
    const baseMultiple = this.sectorData?.baseMultiple.revenue || 1.0
    let adjusted = baseMultiple
    
    // Apply all adjustments
    if ((this.data.growthRate || 0) > 20) adjusted *= 1.3
    if ((this.data.recurringRevenuePercentage || 0) > 60) adjusted *= 1.2
    if ((this.data.topCustomerPercentage || 100) < 20) adjusted *= 1.1
    if ((this.data.yearsInOperation || 0) > 10) adjusted *= 1.1
    
    return Math.round(adjusted * 10) / 10
  }
  
  /**
   * Get adjusted EBITDA multiple
   */
  private getAdjustedEBITDAMultiple(): number {
    const baseMultiple = this.sectorData?.baseMultiple.ebitda || 7
    let adjusted = baseMultiple
    
    // Apply all adjustments
    const revenue = this.data.annualRevenue || 0
    if (revenue > 5000000) adjusted *= 1.2
    if ((this.data.growthRate || 0) > 15) adjusted *= 1.2
    if ((this.data.recurringRevenuePercentage || 0) > 60) adjusted *= 1.15
    if (this.data.ownerInvolvement === 'passive') adjusted *= 1.1
    
    return Math.round(adjusted * 10) / 10
  }
  
  /**
   * Determine primary valuation method
   */
  private determinePrimaryMethod(
    weights: { revenue: number; ebitda: number; asset: number }
  ): ValuationResult['primaryMethod'] {
    const max = Math.max(weights.revenue, weights.ebitda, weights.asset)
    
    if (max === weights.ebitda) return 'ebitda'
    if (max === weights.revenue) return 'revenue'
    return 'asset'
  }
}