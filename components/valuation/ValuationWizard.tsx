'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronLeft, 
  Building, 
  TrendingUp, 
  PieChart,
  Calendar,
  Users,
  UserCheck,
  RefreshCw,
  Package,
  LogOut,
  Loader2,
  HelpCircle
} from 'lucide-react'
import { useValuationStore } from '@/stores/valuationStore'
import { ValuationProgress } from './ValuationProgress'
import { ValuationStep } from './ValuationStep'
import { ValuationResults } from './ValuationResults'
import { 
  WIZARD_STEPS, 
  valuationStepSchemas,
  EXIT_REASONS,
  ASSET_TYPES,
  type ValuationFormData 
} from '@/types/valuation'
import { InfoTooltip } from './InfoTooltip'
import toast from 'react-hot-toast'

const iconMap: Record<string, any> = {
  Building,
  TrendingUp,
  PieChart,
  Calendar,
  Users,
  UserCheck,
  RefreshCw,
  Package,
  LogOut
}

export function ValuationWizard() {
  const {
    currentStep,
    formData,
    valuationResult,
    isCalculating,
    updateFormData,
    nextStep,
    previousStep,
    setCurrentStep,
    setValuationResult,
    setIsCalculating
  } = useValuationStore()
  
  const [sectors, setSectors] = useState<any[]>([])
  const [loadingSectors, setLoadingSectors] = useState(true)
  
  // Get the current step's validation schema
  const currentStepConfig = WIZARD_STEPS[currentStep - 1]
  const CurrentIcon = iconMap[currentStepConfig.icon] || Building
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger
  } = useForm({
    resolver: zodResolver(currentStepConfig.validation),
    defaultValues: formData
  })
  
  // Watch for form changes and update store
  const watchedFields = watch()
  useEffect(() => {
    updateFormData(watchedFields)
  }, [watchedFields, updateFormData])
  
  // Load sectors on mount
  useEffect(() => {
    fetchSectors()
  }, [])
  
  async function fetchSectors() {
    try {
      const response = await fetch('/api/valuations/sectors')
      const data = await response.json()
      setSectors(data.sectors)
    } catch (error) {
      console.error('Failed to load sectors:', error)
      toast.error('Failed to load business sectors')
    } finally {
      setLoadingSectors(false)
    }
  }
  
  async function onSubmit(data: any) {
    if (currentStep === 10) {
      // Final step - calculate valuation
      await calculateValuation()
    } else {
      // Move to next step
      nextStep()
    }
  }
  
  async function calculateValuation() {
    setIsCalculating(true)
    
    try {
      const response = await fetch('/api/valuations/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error('Calculation failed')
      }
      
      const result = await response.json()
      setValuationResult(result)
      toast.success('Valuation calculated successfully!')
    } catch (error) {
      console.error('Valuation calculation error:', error)
      toast.error('Failed to calculate valuation. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }
  
  // If we have results, show them
  if (valuationResult) {
    return <ValuationResults />
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <ValuationProgress />
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <ValuationStep
          stepNumber={currentStep}
          title={currentStepConfig.title}
          description={currentStepConfig.description}
        >
          <div className="flex items-center gap-3 mb-6">
            <CurrentIcon className="h-8 w-8 text-blue-500" />
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
          </div>
          
          {/* Step 1: Business Sector */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Business Sector
                  <InfoTooltip content="Select the sector that best describes your business">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                {loadingSectors ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <select
                    {...register('sector')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a sector...</option>
                    {sectors.map((sector) => (
                      <option key={sector.value} value={sector.value}>
                        {sector.label} (SIC: {sector.sicCode})
                      </option>
                    ))}
                  </select>
                )}
                {errors.sector && (
                  <p className="mt-1 text-sm text-red-600">{errors.sector.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 2: Annual Revenue */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue (Last 12 Months)
                  <InfoTooltip content="Enter your total revenue from the past 12 months">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                  <input
                    type="number"
                    {...register('annualRevenue', { valueAsNumber: true })}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1,000,000"
                  />
                </div>
                {errors.annualRevenue && (
                  <p className="mt-1 text-sm text-red-600">{errors.annualRevenue.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Growth Trend
                </label>
                <select
                  {...register('revenueGrowthTrend')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select trend...</option>
                  <option value="declining">Declining</option>
                  <option value="stable">Stable</option>
                  <option value="growing">Growing</option>
                  <option value="rapid_growth">Rapid Growth</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Step 3: Profitability */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profit Type
                  <InfoTooltip content="Select which profit metric you'll provide">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <select
                  {...register('profitType')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select type...</option>
                  <option value="ebitda">EBITDA</option>
                  <option value="net_profit">Net Profit</option>
                  <option value="gross_profit">Gross Profit</option>
                </select>
                {errors.profitType && (
                  <p className="mt-1 text-sm text-red-600">{errors.profitType.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profit Margin (%)
                  <InfoTooltip content="Your profit as a percentage of revenue">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <input
                  type="number"
                  {...register('profitMargin', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="15"
                  min="0"
                  max="100"
                />
                {errors.profitMargin && (
                  <p className="mt-1 text-sm text-red-600">{errors.profitMargin.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 4: Years in Operation */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Established
                  <InfoTooltip content="The year your business was founded">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <input
                  type="number"
                  {...register('yearEstablished', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2010"
                  min="1800"
                  max={new Date().getFullYear()}
                />
                {errors.yearEstablished && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearEstablished.message}</p>
                )}
              </div>
              
              {watch('yearEstablished') && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Your business has been operating for{' '}
                    <span className="font-semibold">
                      {new Date().getFullYear() - (watch('yearEstablished') || 0)} years
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Step 5: Number of Employees */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees
                  <InfoTooltip content="Total number of full-time equivalent employees">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <input
                  type="number"
                  {...register('employeeCount', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="25"
                  min="0"
                />
                {errors.employeeCount && (
                  <p className="mt-1 text-sm text-red-600">{errors.employeeCount.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Range
                </label>
                <select
                  {...register('employeeRange')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select range...</option>
                  <option value="1-5">1-5 employees</option>
                  <option value="6-10">6-10 employees</option>
                  <option value="11-25">11-25 employees</option>
                  <option value="26-50">26-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="101-250">101-250 employees</option>
                  <option value="250+">250+ employees</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Step 6: Customer Concentration */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Customer Revenue Percentage
                  <InfoTooltip content="What percentage of revenue comes from your largest customer?">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    {...register('topCustomerPercentage', { valueAsNumber: true })}
                    className="w-full pr-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="15"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                {errors.topCustomerPercentage && (
                  <p className="mt-1 text-sm text-red-600">{errors.topCustomerPercentage.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Number of Customers
                </label>
                <input
                  type="number"
                  {...register('customerCount', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Retention Rate (%)
                </label>
                <input
                  type="number"
                  {...register('customerRetention', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="85"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}
          
          {/* Step 7: Revenue Growth Rate */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year-over-Year Growth Rate (%)
                  <InfoTooltip content="Your revenue growth rate compared to last year">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <input
                  type="number"
                  {...register('growthRate', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="15"
                  min="-100"
                  max="1000"
                />
                {errors.growthRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.growthRate.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Growth Trend
                </label>
                <select
                  {...register('growthTrend')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select trend...</option>
                  <option value="declining">Declining</option>
                  <option value="stable">Stable</option>
                  <option value="moderate">Moderate Growth</option>
                  <option value="high">High Growth</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Step 8: Recurring Revenue */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recurring Revenue Percentage
                  <InfoTooltip content="What percentage of your revenue is recurring/subscription-based?">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    {...register('recurringRevenuePercentage', { valueAsNumber: true })}
                    className="w-full pr-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="40"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                {errors.recurringRevenuePercentage && (
                  <p className="mt-1 text-sm text-red-600">{errors.recurringRevenuePercentage.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Contract Length
                </label>
                <select
                  {...register('contractLength')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select length...</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                  <option value="multi_year">Multi-Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Churn Rate (%)
                </label>
                <input
                  type="number"
                  {...register('churnRate', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}
          
          {/* Step 9: Key Assets */}
          {currentStep === 9 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Key Business Assets
                  <InfoTooltip content="Choose all valuable assets that would be included in the sale">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ASSET_TYPES.map((asset) => {
                    const Icon = iconMap[asset.icon] || Package
                    return (
                      <label
                        key={asset.value}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={asset.value}
                          {...register('keyAssets')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <Icon className="h-5 w-5 text-gray-400 ml-3 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          {asset.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
                {errors.keyAssets && (
                  <p className="mt-1 text-sm text-red-600">{errors.keyAssets.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 10: Reason for Exit */}
          {currentStep === 10 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Reason for Selling
                  <InfoTooltip content="Why are you considering selling your business?">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400" />
                  </InfoTooltip>
                </label>
                <select
                  {...register('exitReason')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select reason...</option>
                  {EXIT_REASONS.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
                {errors.exitReason && (
                  <p className="mt-1 text-sm text-red-600">{errors.exitReason.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exit Timeline
                </label>
                <select
                  {...register('exitTimeline')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select timeline...</option>
                  <option value="immediate">Immediate (ASAP)</option>
                  <option value="3_months">Within 3 months</option>
                  <option value="6_months">Within 6 months</option>
                  <option value="1_year">Within 1 year</option>
                  <option value="2_years">1-2 years</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Owner Involvement
                </label>
                <select
                  {...register('ownerInvolvement')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select involvement...</option>
                  <option value="full_time">Full-time (40+ hours/week)</option>
                  <option value="part_time">Part-time (Less than 40 hours/week)</option>
                  <option value="passive">Passive (Minimal involvement)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post-Sale Involvement
                </label>
                <select
                  {...register('postSaleInvolvement')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select preference...</option>
                  <option value="none">None - Complete exit</option>
                  <option value="consulting">Consulting/Advisory role</option>
                  <option value="employment">Continue as employee</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 1}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all
                ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>
            
            <button
              type="submit"
              disabled={isCalculating}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Calculating...
                </>
              ) : currentStep === 10 ? (
                <>
                  Calculate Valuation
                  <TrendingUp className="h-5 w-5" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </ValuationStep>
      </form>
    </div>
  )
}