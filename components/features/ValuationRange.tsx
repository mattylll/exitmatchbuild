import React from 'react'
import { twMerge } from 'tailwind-merge'
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react'

export interface ValuationRangeProps {
  min: number
  max: number
  current?: number
  currency?: string
  format?: 'compact' | 'full' | 'abbreviated'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'card' | 'inline' | 'detailed'
  showConfidence?: boolean
  confidence?: number // 0-100
  trend?: {
    value: number
    period: string
  }
  className?: string
}

// Format currency values
const formatCurrency = (
  value: number,
  currency: string = 'GBP',
  format: 'compact' | 'full' | 'abbreviated' = 'compact'
): string => {
  const locale = currency === 'GBP' ? 'en-GB' : 'en-US'
  
  if (format === 'compact') {
    if (value >= 1000000000) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value / 1000000000).replace(/\.0([A-Z])/, '') + 'B'
    }
    if (value >= 1000000) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value / 1000000).replace(/\.0([A-Z])/, '') + 'M'
    }
    if (value >= 1000) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value / 1000) + 'K'
    }
  }
  
  if (format === 'abbreviated') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value)
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Default Valuation Range Display
const DefaultValuationRange: React.FC<ValuationRangeProps> = ({
  min,
  max,
  current,
  currency = 'GBP',
  format = 'compact',
  size = 'md',
  className,
}) => {
  const sizeConfig = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  const percentage = current ? ((current - min) / (max - min)) * 100 : 50

  return (
    <div className={twMerge('flex items-center gap-2', sizeConfig[size], className)}>
      <span className="font-mono font-medium text-gray-600">
        {formatCurrency(min, currency, format)}
      </span>
      <div className="flex-1 max-w-[120px]">
        <div className="h-1 bg-gray-200 rounded-full relative">
          <div
            className="absolute h-full bg-gold rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
          {current && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-navy border-2 border-white rounded-full shadow-sm"
              style={{ left: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
          )}
        </div>
      </div>
      <span className="font-mono font-medium text-gray-900">
        {formatCurrency(max, currency, format)}
      </span>
    </div>
  )
}

// Card Valuation Range Display
const CardValuationRange: React.FC<ValuationRangeProps> = ({
  min,
  max,
  current,
  currency = 'GBP',
  format = 'compact',
  showConfidence = false,
  confidence = 0,
  trend,
  className,
}) => {
  const midpoint = (min + max) / 2
  const spread = ((max - min) / midpoint) * 100

  return (
    <div className={twMerge('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Valuation Range</h3>
          <p className="text-2xl font-bold text-navy font-[Outfit]">
            {formatCurrency(min, currency, format)} - {formatCurrency(max, currency, format)}
          </p>
        </div>
        {trend && (
          <div className={twMerge(
            'flex items-center text-sm font-medium px-2 py-1 rounded-full',
            trend.value > 0 ? 'bg-success-light text-success-dark' : 
            trend.value < 0 ? 'bg-danger-light text-danger-dark' : 
            'bg-gray-100 text-gray-600'
          )}>
            {trend.value > 0 ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : trend.value < 0 ? (
              <TrendingDown className="w-3 h-3 mr-1" />
            ) : (
              <Minus className="w-3 h-3 mr-1" />
            )}
            {Math.abs(trend.value)}% {trend.period}
          </div>
        )}
      </div>

      {current && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500">Current Estimate</span>
            <span className="font-mono font-semibold text-gold">
              {formatCurrency(current, currency, format)}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full relative">
            <div
              className="absolute h-full bg-gold rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100))}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Minimum</p>
          <p className="text-sm font-mono font-semibold text-gray-900">
            {formatCurrency(min, currency, 'abbreviated')}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Midpoint</p>
          <p className="text-sm font-mono font-semibold text-gray-900">
            {formatCurrency(midpoint, currency, 'abbreviated')}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Maximum</p>
          <p className="text-sm font-mono font-semibold text-gray-900">
            {formatCurrency(max, currency, 'abbreviated')}
          </p>
        </div>
      </div>

      {showConfidence && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500">Confidence Level</span>
            <span className={twMerge(
              'font-medium',
              confidence >= 80 ? 'text-success' :
              confidence >= 60 ? 'text-gold' :
              confidence >= 40 ? 'text-warning' :
              'text-danger'
            )}>
              {confidence}%
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className={twMerge(
                'h-full rounded-full transition-all duration-300',
                confidence >= 80 ? 'bg-success' :
                confidence >= 60 ? 'bg-gold' :
                confidence >= 40 ? 'bg-warning' :
                'bg-danger'
              )}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center text-xs text-gray-500">
        <Info className="w-3 h-3 mr-1" />
        <span>Spread: {spread.toFixed(1)}% from midpoint</span>
      </div>
    </div>
  )
}

// Inline Valuation Range Display
const InlineValuationRange: React.FC<ValuationRangeProps> = ({
  min,
  max,
  currency = 'GBP',
  format = 'compact',
  size = 'md',
  className,
}) => {
  const sizeConfig = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  return (
    <span className={twMerge('font-mono font-semibold text-navy', sizeConfig[size], className)}>
      {formatCurrency(min, currency, format)} - {formatCurrency(max, currency, format)}
    </span>
  )
}

// Detailed Valuation Range Display
const DetailedValuationRange: React.FC<ValuationRangeProps> = ({
  min,
  max,
  current,
  currency = 'GBP',
  format = 'full',
  showConfidence = true,
  confidence = 75,
  trend,
  className,
}) => {
  const midpoint = (min + max) / 2
  const spread = max - min
  const spreadPercentage = (spread / midpoint) * 100

  return (
    <div className={twMerge('space-y-4', className)}>
      {/* Main Range Display */}
      <div className="bg-gradient-to-r from-navy-50 to-gold-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-navy mb-4 font-[Outfit]">
          Estimated Valuation
        </h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Range</p>
            <p className="text-2xl font-mono font-bold text-navy">
              {formatCurrency(min, currency, 'abbreviated')} - {formatCurrency(max, currency, 'abbreviated')}
            </p>
          </div>
          
          {current && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Best Estimate</p>
              <p className="text-2xl font-mono font-bold text-gold">
                {formatCurrency(current, currency, 'abbreviated')}
              </p>
            </div>
          )}
        </div>

        {/* Visual Range */}
        <div className="mt-6">
          <div className="relative h-12 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-navy-100 to-gold-100"
                 style={{ width: '100%' }}>
              <div className="h-full flex items-center justify-between px-4">
                <span className="text-xs font-medium text-gray-600">
                  {formatCurrency(min, currency, 'compact')}
                </span>
                <span className="text-xs font-medium text-gray-600">
                  {formatCurrency(midpoint, currency, 'compact')}
                </span>
                <span className="text-xs font-medium text-gray-600">
                  {formatCurrency(max, currency, 'compact')}
                </span>
              </div>
            </div>
            {current && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-gold shadow-lg"
                style={{ left: `${Math.min(95, Math.max(5, ((current - min) / (max - min)) * 100))}%` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {formatCurrency(current, currency, 'compact')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Spread</p>
          <p className="text-lg font-mono font-semibold text-gray-900">
            {formatCurrency(spread, currency, 'compact')}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {spreadPercentage.toFixed(1)}% of midpoint
          </p>
        </div>

        {showConfidence && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Confidence</p>
            <p className={twMerge(
              'text-lg font-mono font-semibold',
              confidence >= 80 ? 'text-success' :
              confidence >= 60 ? 'text-gold' :
              confidence >= 40 ? 'text-warning' :
              'text-danger'
            )}>
              {confidence}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {confidence >= 80 ? 'High' :
               confidence >= 60 ? 'Good' :
               confidence >= 40 ? 'Moderate' :
               'Low'}
            </p>
          </div>
        )}

        {trend && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Trend ({trend.period})</p>
            <p className={twMerge(
              'text-lg font-mono font-semibold flex items-center',
              trend.value > 0 ? 'text-success' :
              trend.value < 0 ? 'text-danger' :
              'text-gray-600'
            )}>
              {trend.value > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : trend.value < 0 ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : (
                <Minus className="w-4 h-4 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {trend.value > 0 ? 'Increasing' :
               trend.value < 0 ? 'Decreasing' :
               'Stable'}
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Midpoint</p>
          <p className="text-lg font-mono font-semibold text-gray-900">
            {formatCurrency(midpoint, currency, 'compact')}
          </p>
          <p className="text-xs text-gray-500 mt-1">Average estimate</p>
        </div>
      </div>
    </div>
  )
}

// Main ValuationRange Component
export const ValuationRange: React.FC<ValuationRangeProps> = ({
  variant = 'default',
  ...props
}) => {
  switch (variant) {
    case 'card':
      return <CardValuationRange {...props} variant={variant} />
    case 'inline':
      return <InlineValuationRange {...props} variant={variant} />
    case 'detailed':
      return <DetailedValuationRange {...props} variant={variant} />
    case 'default':
    default:
      return <DefaultValuationRange {...props} variant={variant} />
  }
}