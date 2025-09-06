import React from 'react'
import { twMerge } from 'tailwind-merge'
import { TrendingUp, TrendingDown, Minus, ArrowRight, Info } from 'lucide-react'
import { Card } from '../ui/Card'

export interface MetricCardProps {
  label: string
  value: string | number
  prefix?: string
  suffix?: string
  trend?: {
    value: number
    label?: string
  }
  comparison?: {
    value: string | number
    label: string
  }
  icon?: React.ReactNode
  variant?: 'default' | 'compact' | 'detailed' | 'emphasized'
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  href?: string
  tooltip?: string
  className?: string
}

// Color configurations
const colorConfig = {
  default: {
    bg: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-900',
    icon: 'text-gray-400',
    hover: 'hover:border-gray-300',
  },
  primary: {
    bg: 'bg-gradient-to-br from-gold-50 to-gold-100',
    border: 'border-gold-200',
    text: 'text-gold-900',
    icon: 'text-gold-600',
    hover: 'hover:border-gold-300',
  },
  success: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    border: 'border-green-200',
    text: 'text-green-900',
    icon: 'text-green-600',
    hover: 'hover:border-green-300',
  },
  warning: {
    bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    border: 'border-yellow-200',
    text: 'text-yellow-900',
    icon: 'text-yellow-600',
    hover: 'hover:border-yellow-300',
  },
  danger: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100',
    border: 'border-red-200',
    text: 'text-red-900',
    icon: 'text-red-600',
    hover: 'hover:border-red-300',
  },
  info: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    text: 'text-blue-900',
    icon: 'text-blue-600',
    hover: 'hover:border-blue-300',
  },
}

// Default Metric Card
const DefaultMetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  prefix,
  suffix,
  trend,
  comparison,
  icon,
  color = 'default',
  href,
  tooltip,
  className,
}) => {
  const colors = colorConfig[color]
  const isClickable = !!href

  const content = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-600">{label}</p>
            {tooltip && (
              <div className="group relative">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 max-w-xs whitespace-normal">
                    {tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                      <div className="border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className={twMerge('text-2xl font-bold mt-1 font-[Outfit]', colors.text)}>
            {prefix && <span className="text-xl opacity-70">{prefix}</span>}
            {typeof value === 'number' ? value.toLocaleString() : value}
            {suffix && <span className="text-xl opacity-70 ml-1">{suffix}</span>}
          </p>
        </div>
        {icon && (
          <div className={twMerge('p-2 rounded-lg', colors.bg)}>
            <div className={colors.icon}>{icon}</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {trend && (
            <div className={twMerge(
              'flex items-center text-sm font-medium',
              trend.value > 0 ? 'text-success' : 
              trend.value < 0 ? 'text-danger' : 
              'text-gray-500'
            )}>
              {trend.value > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : trend.value < 0 ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : (
                <Minus className="w-4 h-4 mr-1" />
              )}
              {Math.abs(trend.value)}%
              {trend.label && <span className="ml-1 text-gray-500">{trend.label}</span>}
            </div>
          )}
          
          {comparison && (
            <div className="text-sm text-gray-600">
              vs <span className="font-medium">{comparison.value}</span> {comparison.label}
            </div>
          )}
        </div>
        
        {isClickable && (
          <ArrowRight className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </>
  )

  const cardClass = twMerge(
    'rounded-xl border p-6 transition-all duration-200',
    colors.bg,
    colors.border,
    isClickable && `${colors.hover} hover:shadow-md cursor-pointer`,
    className
  )

  if (href) {
    return (
      <a href={href} className="block">
        <div className={cardClass}>{content}</div>
      </a>
    )
  }

  return <div className={cardClass}>{content}</div>
}

// Compact Metric Card
const CompactMetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  prefix,
  suffix,
  trend,
  icon,
  color = 'default',
  href,
  className,
}) => {
  const colors = colorConfig[color]
  const isClickable = !!href

  const content = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon && (
          <div className={twMerge('p-1.5 rounded-md', colors.bg)}>
            <div className={twMerge('w-4 h-4', colors.icon)}>{icon}</div>
          </div>
        )}
        <div>
          <p className="text-xs text-gray-600">{label}</p>
          <p className={twMerge('text-lg font-mono font-semibold', colors.text)}>
            {prefix}
            {typeof value === 'number' ? value.toLocaleString() : value}
            {suffix && <span className="ml-0.5">{suffix}</span>}
          </p>
        </div>
      </div>
      
      {trend && (
        <div className={twMerge(
          'flex items-center text-xs font-medium',
          trend.value > 0 ? 'text-success' : 
          trend.value < 0 ? 'text-danger' : 
          'text-gray-500'
        )}>
          {trend.value > 0 ? '↑' : trend.value < 0 ? '↓' : '→'}
          {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  )

  const cardClass = twMerge(
    'rounded-lg border p-4 transition-all duration-200',
    'bg-white',
    colors.border,
    isClickable && `${colors.hover} hover:shadow-sm cursor-pointer`,
    className
  )

  if (href) {
    return (
      <a href={href} className="block">
        <div className={cardClass}>{content}</div>
      </a>
    )
  }

  return <div className={cardClass}>{content}</div>
}

// Detailed Metric Card
const DetailedMetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  prefix,
  suffix,
  trend,
  comparison,
  icon,
  color = 'default',
  tooltip,
  className,
}) => {
  const colors = colorConfig[color]

  return (
    <Card variant="elevated" padding="none" className={className}>
      <div className={twMerge('p-6 rounded-t-xl', colors.bg, colors.border, 'border-b')}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon && <div className={twMerge('w-5 h-5', colors.icon)}>{icon}</div>}
            <h3 className="font-medium text-gray-900">{label}</h3>
            {tooltip && (
              <div className="group relative">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 max-w-xs whitespace-normal">
                    {tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                      <div className="border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <p className={twMerge('text-3xl font-bold font-[Outfit]', colors.text)}>
            {prefix && <span className="text-2xl opacity-70">{prefix}</span>}
            {typeof value === 'number' ? value.toLocaleString() : value}
            {suffix && <span className="text-2xl opacity-70 ml-1">{suffix}</span>}
          </p>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-b-xl">
        {trend && (
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Trend</span>
            <div className={twMerge(
              'flex items-center text-sm font-medium',
              trend.value > 0 ? 'text-success' : 
              trend.value < 0 ? 'text-danger' : 
              'text-gray-500'
            )}>
              {trend.value > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : trend.value < 0 ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : (
                <Minus className="w-4 h-4 mr-1" />
              )}
              {Math.abs(trend.value)}%
              {trend.label && <span className="ml-1 text-gray-500">{trend.label}</span>}
            </div>
          </div>
        )}
        
        {comparison && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{comparison.label}</span>
            <span className="text-sm font-medium text-gray-900">{comparison.value}</span>
          </div>
        )}
      </div>
    </Card>
  )
}

// Emphasized Metric Card
const EmphasizedMetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  prefix,
  suffix,
  trend,
  icon,
  color = 'primary',
  className,
}) => {
  const colors = colorConfig[color]

  return (
    <div className={twMerge(
      'relative overflow-hidden rounded-xl p-6',
      'bg-gradient-to-br',
      color === 'primary' ? 'from-gold to-gold-600' :
      color === 'success' ? 'from-success to-green-600' :
      color === 'danger' ? 'from-danger to-red-600' :
      color === 'info' ? 'from-info to-blue-600' :
      'from-navy to-navy-700',
      'text-white shadow-lg',
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">{label}</p>
            <p className="text-3xl font-bold mt-2 font-[Outfit]">
              {prefix}
              {typeof value === 'number' ? value.toLocaleString() : value}
              {suffix && <span className="text-2xl opacity-90 ml-1">{suffix}</span>}
            </p>
            
            {trend && (
              <div className="flex items-center mt-3 text-sm font-medium">
                {trend.value > 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : trend.value < 0 ? (
                  <TrendingDown className="w-4 h-4 mr-1" />
                ) : (
                  <Minus className="w-4 h-4 mr-1" />
                )}
                {Math.abs(trend.value)}%
                {trend.label && <span className="ml-1 opacity-75">{trend.label}</span>}
              </div>
            )}
          </div>
          
          {icon && (
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="w-6 h-6 text-white">{icon}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main MetricCard Component
export const MetricCard: React.FC<MetricCardProps> = ({
  variant = 'default',
  ...props
}) => {
  switch (variant) {
    case 'compact':
      return <CompactMetricCard {...props} variant={variant} />
    case 'detailed':
      return <DetailedMetricCard {...props} variant={variant} />
    case 'emphasized':
      return <EmphasizedMetricCard {...props} variant={variant} />
    case 'default':
    default:
      return <DefaultMetricCard {...props} variant={variant} />
  }
}