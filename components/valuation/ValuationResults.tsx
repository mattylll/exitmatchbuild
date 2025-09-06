'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Award,
  AlertCircle,
  Download,
  Mail,
  RefreshCw,
  ChevronRight,
  Building,
  Target,
  Lightbulb,
  BarChart3,
  PieChart,
  DollarSign
} from 'lucide-react'
import { useValuationStore } from '@/stores/valuationStore'
import type { ValuationFactor } from '@/types/valuation'
import toast from 'react-hot-toast'

export function ValuationResults() {
  const { valuationResult, formData, resetForm } = useValuationStore()
  
  if (!valuationResult) return null
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50'
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }
  
  const getFactorIcon = (factor: ValuationFactor) => {
    return factor.impact === 'positive' ? (
      <TrendingUp className="h-5 w-5 text-green-500" />
    ) : (
      <TrendingDown className="h-5 w-5 text-red-500" />
    )
  }
  
  async function handleDownloadReport() {
    toast.success('Report generation coming soon!')
  }
  
  async function handleEmailReport() {
    toast.success('Email functionality coming soon!')
  }
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Business Valuation Results
        </h1>
        <p className="text-lg text-gray-600">
          Based on the information provided, here's your estimated business value
        </p>
      </motion.div>
      
      {/* Main Valuation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="text-center">
          <p className="text-blue-100 mb-2">Estimated Business Value</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-blue-200">
              <p className="text-sm">Minimum</p>
              <p className="text-2xl font-semibold">
                {formatCurrency(valuationResult.valuationRange.minimum)}
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold">
                {formatCurrency(valuationResult.valuationRange.typical)}
              </p>
              <p className="text-blue-100 mt-1">Most Likely Value</p>
            </div>
            <div className="text-blue-200">
              <p className="text-sm">Maximum</p>
              <p className="text-2xl font-semibold">
                {formatCurrency(valuationResult.valuationRange.maximum)}
              </p>
            </div>
          </div>
          
          {/* Confidence Score */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-blue-100">Confidence Score:</span>
            <div className={`px-3 py-1 rounded-full ${getConfidenceColor(valuationResult.valuationRange.confidence)}`}>
              <span className="font-semibold">
                {Math.round(valuationResult.valuationRange.confidence)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Valuation Methods Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Multiple</h3>
              <p className="text-sm text-gray-500">
                {valuationResult.methodBreakdown.revenueMultiple.multiple}x Revenue
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(valuationResult.methodBreakdown.revenueMultiple.value)}
          </p>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Weight:</span>
              <span>{Math.round(valuationResult.methodBreakdown.revenueMultiple.weight * 100)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <PieChart className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-gray-900">EBITDA Multiple</h3>
              <p className="text-sm text-gray-500">
                {valuationResult.methodBreakdown.ebitdaMultiple.multiple}x EBITDA
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(valuationResult.methodBreakdown.ebitdaMultiple.value)}
          </p>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Weight:</span>
              <span>{Math.round(valuationResult.methodBreakdown.ebitdaMultiple.weight * 100)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-gray-900">Asset-Based</h3>
              <p className="text-sm text-gray-500">Tangible & Intangible</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(valuationResult.methodBreakdown.assetBased.value)}
          </p>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Weight:</span>
              <span>{Math.round(valuationResult.methodBreakdown.assetBased.weight * 100)}%</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Strengths and Weaknesses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Strengths */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Value Drivers</h3>
          </div>
          <div className="space-y-3">
            {valuationResult.strengthFactors.map((factor, index) => (
              <div key={index} className="flex gap-3">
                {getFactorIcon(factor)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{factor.factor}</p>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                  {factor.improvementTip && (
                    <p className="text-sm text-blue-600 mt-1">
                      Tip: {factor.improvementTip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Weaknesses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Areas for Improvement</h3>
          </div>
          <div className="space-y-3">
            {valuationResult.weaknessFactors.map((factor, index) => (
              <div key={index} className="flex gap-3">
                {getFactorIcon(factor)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{factor.factor}</p>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                  {factor.improvementTip && (
                    <p className="text-sm text-green-600 mt-1">
                      Solution: {factor.improvementTip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Opportunities and Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Opportunities */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Growth Opportunities</h3>
          </div>
          <ul className="space-y-2">
            {valuationResult.opportunities.map((opportunity, index) => (
              <li key={index} className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Recommendations */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Expert Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {valuationResult.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      
      {/* Market Conditions */}
      {valuationResult.marketConditions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-6 w-6 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900">Market Conditions</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Market Trend</p>
              <p className="font-semibold text-gray-900 capitalize">
                {valuationResult.marketConditions.trend.replace('_', ' ')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Demand Level</p>
              <p className="font-semibold text-gray-900 capitalize">
                {valuationResult.marketConditions.demandLevel.replace('_', ' ')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Time to Sale</p>
              <p className="font-semibold text-gray-900">
                {valuationResult.marketConditions.averageTimeToSale} months
              </p>
            </div>
          </div>
          {valuationResult.marketConditions.premiumFactors.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Premium Factors:</p>
              <div className="flex flex-wrap gap-2">
                {valuationResult.marketConditions.premiumFactors.map((factor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Comparable Businesses */}
      {valuationResult.comparableBusinesses && valuationResult.comparableBusinesses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Comparable Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Sector</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Revenue</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Sale Price</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Multiple</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {valuationResult.comparableBusinesses.map((comp, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 text-sm text-gray-900">{comp.sector}</td>
                    <td className="py-2 text-sm text-gray-900 text-right">
                      {formatCurrency(comp.revenue)}
                    </td>
                    <td className="py-2 text-sm text-gray-900 text-right">
                      {formatCurrency(comp.soldPrice)}
                    </td>
                    <td className="py-2 text-sm text-gray-900 text-right">{comp.multiple}x</td>
                    <td className="py-2 text-sm text-gray-600 text-right">{comp.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
      
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={handleDownloadReport}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Download className="h-5 w-5" />
          Download Full Report
        </button>
        
        <button
          onClick={handleEmailReport}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <Mail className="h-5 w-5" />
          Email Report
        </button>
        
        <button
          onClick={resetForm}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          Start New Valuation
        </button>
      </motion.div>
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white"
      >
        <h2 className="text-2xl font-bold mb-4">
          Ready to Sell Your Business?
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Get connected with qualified buyers and professional advisors who can help you achieve the best possible outcome for your business sale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            List Your Business
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all">
            Talk to an Advisor
          </button>
        </div>
      </motion.div>
    </div>
  )
}