'use client'

import { useState } from 'react'
import { UK_INDUSTRIES, getCategories, calculateAdjustedMultiple, type IndustryData } from '@/lib/data/industry-multiples'
import { Button } from '@/components/Button/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  BarChart3,
  Building2,
  DollarSign,
  Users,
  Calendar,
  Percent,
  ArrowRight,
  Download,
  Mail
} from 'lucide-react'

interface FormData {
  companyName: string
  email: string
  phone: string
  industry: string
  annualRevenue: number
  ebitda: number
  revenueGrowth: number
  recurringRevenue: number
  customerConcentration: number
  yearsInBusiness: number
  employees: number
}

interface ValuationResult {
  industry: IndustryData
  ebitdaMultiple: {
    base: number
    adjusted: number
  }
  valuationRange: {
    minimum: number
    typical: number
    maximum: number
  }
  revenueValuation: {
    minimum: number
    typical: number
    maximum: number
  }
  ebitdaMargin: number
  insights: {
    strengths: string[]
    improvements: string[]
  }
}

export default function InstantValuationPage() {
  const [step, setStep] = useState<'form' | 'calculating' | 'results'>('form')
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [result, setResult] = useState<ValuationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = getCategories()
  const industriesInCategory = selectedCategory 
    ? Object.entries(UK_INDUSTRIES).filter(([_, ind]) => ind.category === selectedCategory)
    : []

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.companyName) newErrors.companyName = 'Company name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.industry) newErrors.industry = 'Please select your industry'
    if (!formData.annualRevenue || formData.annualRevenue <= 0) {
      newErrors.annualRevenue = 'Annual revenue is required'
    }
    if (!formData.ebitda) newErrors.ebitda = 'EBITDA is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateValuation = async () => {
    if (!validateForm()) return

    setStep('calculating')
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const industry = UK_INDUSTRIES[formData.industry!]
    if (!industry) {
      setErrors({ industry: 'Invalid industry selected' })
      setStep('form')
      return
    }

    // Calculate EBITDA margin
    const ebitdaMargin = (formData.ebitda! / formData.annualRevenue!) * 100

    // Get base multiple
    const baseMultiple = industry.ebitdaMultiple.typical

    // Calculate adjusted multiple
    const adjustedMultiple = calculateAdjustedMultiple(baseMultiple, {
      revenueGrowth: formData.revenueGrowth,
      recurringRevenue: formData.recurringRevenue,
      customerConcentration: formData.customerConcentration,
      yearsInBusiness: formData.yearsInBusiness,
      ebitdaMargin
    })

    // Calculate valuation ranges
    const minMultiple = Math.max(industry.ebitdaMultiple.min, adjustedMultiple * 0.75)
    const maxMultiple = Math.min(industry.ebitdaMultiple.max, adjustedMultiple * 1.25)

    const valuationRange = {
      minimum: Math.round(formData.ebitda! * minMultiple),
      typical: Math.round(formData.ebitda! * adjustedMultiple),
      maximum: Math.round(formData.ebitda! * maxMultiple)
    }

    // Revenue-based valuation for comparison
    const revenueValuation = {
      minimum: Math.round(formData.annualRevenue! * industry.revenueMultiple.min),
      typical: Math.round(formData.annualRevenue! * industry.revenueMultiple.typical),
      maximum: Math.round(formData.annualRevenue! * industry.revenueMultiple.max)
    }

    // Generate insights
    const strengths: string[] = []
    const improvements: string[] = []

    if (formData.revenueGrowth! > 20) {
      strengths.push(`Strong revenue growth of ${formData.revenueGrowth}% demonstrates market traction`)
    } else if (formData.revenueGrowth! < 5) {
      improvements.push('Accelerate revenue growth to increase valuation multiple')
    }

    if (formData.recurringRevenue! > 60) {
      strengths.push(`${formData.recurringRevenue}% recurring revenue provides predictable cash flow`)
    } else if (formData.recurringRevenue! < 30) {
      improvements.push('Increase recurring revenue to improve business predictability')
    }

    if (formData.customerConcentration! < 20) {
      strengths.push('Well-diversified customer base reduces risk')
    } else if (formData.customerConcentration! > 40) {
      improvements.push('Reduce customer concentration to minimize risk')
    }

    if (ebitdaMargin > industry.typicalGrossMargin * 0.4) {
      strengths.push(`Strong EBITDA margin of ${ebitdaMargin.toFixed(1)}% shows operational efficiency`)
    } else if (ebitdaMargin < industry.typicalGrossMargin * 0.2) {
      improvements.push('Improve operational efficiency to increase margins')
    }

    if (formData.yearsInBusiness! > 10) {
      strengths.push(`${formData.yearsInBusiness} years in business demonstrates stability`)
    }

    setResult({
      industry,
      ebitdaMultiple: {
        base: baseMultiple,
        adjusted: adjustedMultiple
      },
      valuationRange,
      revenueValuation,
      ebitdaMargin,
      insights: {
        strengths,
        improvements
      }
    })

    setStep('results')
  }

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`
    }
    return `£${(value / 1000).toFixed(0)}K`
  }

  if (step === 'results' && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Business Valuation Report
              </h1>
              <p className="text-gray-300">
                {formData.companyName} • {result.industry.name}
              </p>
            </div>

            {/* Main Valuation */}
            <div className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Estimated Business Value</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Conservative</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(result.valuationRange.minimum)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gold-400 text-sm mb-1">Most Likely</p>
                  <p className="text-4xl font-bold text-gold-400">
                    {formatCurrency(result.valuationRange.typical)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Optimistic</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(result.valuationRange.maximum)}
                  </p>
                </div>
              </div>
            </div>

            {/* EBITDA Multiple Analysis */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-gold-400" />
                  EBITDA Multiple Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Industry Average:</span>
                    <span className="text-white font-medium">{result.ebitdaMultiple.base}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Adjusted Multiple:</span>
                    <span className="text-gold-400 font-bold">{result.ebitdaMultiple.adjusted}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">EBITDA Margin:</span>
                    <span className="text-white font-medium">{result.ebitdaMargin.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Market Conditions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Trend:</span>
                    <span className={`font-medium capitalize ${
                      result.industry.trends === 'growing' ? 'text-green-400' :
                      result.industry.trends === 'stable' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {result.industry.trends}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Buyer Demand:</span>
                    <span className={`font-medium capitalize ${
                      result.industry.demandLevel === 'high' ? 'text-green-400' :
                      result.industry.demandLevel === 'medium' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {result.industry.demandLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Typical Gross Margin:</span>
                    <span className="text-white font-medium">{result.industry.typicalGrossMargin}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {result.insights.strengths.length > 0 && (
                <div className="bg-green-500/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-4">Value Drivers</h3>
                  <ul className="space-y-2">
                    {result.insights.strengths.map((strength, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.insights.improvements.length > 0 && (
                <div className="bg-yellow-500/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">Areas to Improve</h3>
                  <ul className="space-y-2">
                    {result.insights.improvements.map((improvement, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Alternative Valuation */}
            <div className="bg-white/5 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Revenue Multiple Comparison</h3>
              <p className="text-gray-400 mb-3">Alternative valuation using revenue multiples:</p>
              <div className="flex gap-4">
                <span className="text-gray-300">
                  {formatCurrency(result.revenueValuation.minimum)} - {formatCurrency(result.revenueValuation.maximum)}
                </span>
                <span className="text-gray-400">(Typical: {formatCurrency(result.revenueValuation.typical)})</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <Download className="w-5 h-5 mr-2" />
                Download Full Report
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Mail className="w-5 h-5 mr-2" />
                Email Report
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Schedule Consultation
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-gray-500 text-xs text-center mt-8">
              This valuation is an estimate based on industry averages and should not be considered as formal business advice. 
              Actual valuations depend on detailed due diligence and market conditions.
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (step === 'calculating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Calculating Your Valuation...</h2>
          <p className="text-gray-400">Analyzing industry data and market conditions</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Get Your Instant Business Valuation
            </h1>
            <p className="text-xl text-gray-300">
              AI-powered valuation using real UK market multiples
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName || ''}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className={`w-full bg-white/10 border ${errors.companyName ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white`}
                      placeholder="Your Company Ltd"
                    />
                    {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="07XXX XXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Industry Selection */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Industry Sector</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Category *</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setFormData({...formData, industry: ''})
                      }}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Specific Industry *</label>
                    <select
                      value={formData.industry || ''}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      className={`w-full bg-white/10 border ${errors.industry ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white`}
                      disabled={!selectedCategory}
                    >
                      <option value="">Select Industry</option>
                      {industriesInCategory.map(([key, ind]) => (
                        <option key={key} value={key}>{ind.name}</option>
                      ))}
                    </select>
                    {errors.industry && <p className="text-red-400 text-sm mt-1">{errors.industry}</p>}
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Financial Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Annual Revenue (£) *</label>
                    <input
                      type="number"
                      value={formData.annualRevenue || ''}
                      onChange={(e) => setFormData({...formData, annualRevenue: Number(e.target.value)})}
                      className={`w-full bg-white/10 border ${errors.annualRevenue ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white`}
                      placeholder="1500000"
                    />
                    {errors.annualRevenue && <p className="text-red-400 text-sm mt-1">{errors.annualRevenue}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">EBITDA (£) *</label>
                    <input
                      type="number"
                      value={formData.ebitda || ''}
                      onChange={(e) => setFormData({...formData, ebitda: Number(e.target.value)})}
                      className={`w-full bg-white/10 border ${errors.ebitda ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white`}
                      placeholder="300000"
                    />
                    {errors.ebitda && <p className="text-red-400 text-sm mt-1">{errors.ebitda}</p>}
                    <p className="text-gray-400 text-xs mt-1">Earnings Before Interest, Tax, Depreciation & Amortization</p>
                  </div>
                </div>
              </div>

              {/* Business Metrics */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Business Metrics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Revenue Growth (%)</label>
                    <input
                      type="number"
                      value={formData.revenueGrowth || ''}
                      onChange={(e) => setFormData({...formData, revenueGrowth: Number(e.target.value)})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="15"
                    />
                    <p className="text-gray-400 text-xs mt-1">Year-over-year</p>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Recurring Revenue (%)</label>
                    <input
                      type="number"
                      value={formData.recurringRevenue || ''}
                      onChange={(e) => setFormData({...formData, recurringRevenue: Number(e.target.value)})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="60"
                    />
                    <p className="text-gray-400 text-xs mt-1">% of revenue recurring</p>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Top Customer (%)</label>
                    <input
                      type="number"
                      value={formData.customerConcentration || ''}
                      onChange={(e) => setFormData({...formData, customerConcentration: Number(e.target.value)})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="15"
                    />
                    <p className="text-gray-400 text-xs mt-1">% from largest customer</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Years in Business</label>
                    <input
                      type="number"
                      value={formData.yearsInBusiness || ''}
                      onChange={(e) => setFormData({...formData, yearsInBusiness: Number(e.target.value)})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Number of Employees</label>
                    <input
                      type="number"
                      value={formData.employees || ''}
                      onChange={(e) => setFormData({...formData, employees: Number(e.target.value)})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <Button
                  onClick={calculateValuation}
                  size="xl"
                  className="group"
                >
                  Calculate My Business Value
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-gray-400 text-sm mt-4">
                  100% Free • Instant Results • No Obligations
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}