import React from 'react'
import { twMerge } from 'tailwind-merge'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface MatchScoreProps {
  score: number // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'circular' | 'linear' | 'badge'
  showLabel?: boolean
  showTrend?: boolean
  trend?: number // Percentage change
  label?: string
  className?: string
}

// Circular Match Score Display
const CircularMatchScore: React.FC<MatchScoreProps> = ({
  score,
  size = 'md',
  showLabel = true,
  label = 'Match Score',
  className,
}) => {
  const sizeConfig = {
    sm: { container: 80, strokeWidth: 6, fontSize: 'text-lg' },
    md: { container: 120, strokeWidth: 8, fontSize: 'text-2xl' },
    lg: { container: 160, strokeWidth: 10, fontSize: 'text-3xl' },
    xl: { container: 200, strokeWidth: 12, fontSize: 'text-4xl' },
  }

  const config = sizeConfig[size]
  const radius = (config.container - config.strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'stroke-success'
    if (score >= 60) return 'stroke-gold'
    if (score >= 40) return 'stroke-warning'
    return 'stroke-danger'
  }

  const getTextColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-gold'
    if (score >= 40) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className={twMerge('inline-flex flex-col items-center', className)}>
      <div className="relative">
        <svg
          width={config.container}
          height={config.container}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.container / 2}
            cy={config.container / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          {/* Score circle */}
          <circle
            cx={config.container / 2}
            cy={config.container / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={twMerge(
              'transition-all duration-500 ease-out',
              getScoreColor(score)
            )}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={twMerge(config.fontSize, 'font-mono font-bold', getTextColor(score))}>
            {score}%
          </span>
          {showLabel && size !== 'sm' && (
            <span className="text-xs text-gray-500 mt-1">Match</span>
          )}
        </div>
      </div>
      {showLabel && label && (
        <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
      )}
    </div>
  )
}

// Linear Match Score Display
const LinearMatchScore: React.FC<MatchScoreProps> = ({
  score,
  size = 'md',
  showLabel = true,
  showTrend = false,
  trend = 0,
  label = 'Match Score',
  className,
}) => {
  const sizeConfig = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-5',
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-success'
    if (score >= 60) return 'bg-gold'
    if (score >= 40) return 'bg-warning'
    return 'bg-danger'
  }

  return (
    <div className={twMerge('w-full', className)}>
      {(showLabel || showTrend) && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {showLabel && (
              <span className="text-sm font-medium text-gray-700">{label}</span>
            )}
            {showTrend && trend !== 0 && (
              <span className={twMerge(
                'flex items-center text-xs font-medium',
                trend > 0 ? 'text-success' : 'text-danger'
              )}>
                {trend > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                )}
                {Math.abs(trend)}%
              </span>
            )}
          </div>
          <span className="text-sm font-mono font-semibold text-gray-900">{score}%</span>
        </div>
      )}
      <div className={twMerge('w-full bg-gray-200 rounded-full overflow-hidden', sizeConfig[size])}>
        <div
          className={twMerge(
            'h-full transition-all duration-500 ease-out rounded-full',
            getScoreColor(score),
            'relative overflow-hidden'
          )}
          style={{ width: `${score}%` }}
        >
          {/* Shimmer effect for high scores */}
          {score >= 80 && (
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </div>
      </div>
    </div>
  )
}

// Badge Match Score Display
const BadgeMatchScore: React.FC<MatchScoreProps> = ({
  score,
  size = 'md',
  showTrend = false,
  trend = 0,
  className,
}) => {
  const sizeConfig = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-5 py-2.5 text-lg',
  }

  const getScoreStyle = (score: number) => {
    if (score >= 80) return 'bg-success-light text-success-dark border-success'
    if (score >= 60) return 'bg-gold-100 text-gold-800 border-gold'
    if (score >= 40) return 'bg-warning-light text-warning-dark border-warning'
    return 'bg-danger-light text-danger-dark border-danger'
  }

  return (
    <div
      className={twMerge(
        'inline-flex items-center gap-2 rounded-full border font-medium',
        sizeConfig[size],
        getScoreStyle(score),
        className
      )}
    >
      <span className="font-mono font-bold">{score}%</span>
      <span>Match</span>
      {showTrend && trend !== 0 && (
        <>
          <span className="opacity-50">|</span>
          <span className="flex items-center">
            {trend > 0 ? (
              <TrendingUp className="w-3 h-3 mr-0.5" />
            ) : trend < 0 ? (
              <TrendingDown className="w-3 h-3 mr-0.5" />
            ) : (
              <Minus className="w-3 h-3 mr-0.5" />
            )}
            {Math.abs(trend)}%
          </span>
        </>
      )}
    </div>
  )
}

// Main MatchScore Component
export const MatchScore: React.FC<MatchScoreProps> = ({
  variant = 'circular',
  ...props
}) => {
  switch (variant) {
    case 'linear':
      return <LinearMatchScore {...props} variant={variant} />
    case 'badge':
      return <BadgeMatchScore {...props} variant={variant} />
    case 'circular':
    default:
      return <CircularMatchScore {...props} variant={variant} />
  }
}

// Match Score Comparison Component
export interface MatchScoreComparisonProps {
  scores: Array<{
    id: string
    name: string
    score: number
    trend?: number
  }>
  variant?: 'list' | 'grid'
  className?: string
}

export const MatchScoreComparison: React.FC<MatchScoreComparisonProps> = ({
  scores,
  variant = 'list',
  className,
}) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score)

  if (variant === 'grid') {
    return (
      <div className={twMerge('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
        {sortedScores.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <h4 className="text-sm font-medium text-gray-900 mb-3 truncate">{item.name}</h4>
            <MatchScore score={item.score} variant="circular" size="sm" showLabel={false} />
            {item.trend !== undefined && (
              <div className="mt-2 text-xs text-center">
                <span className={item.trend > 0 ? 'text-success' : 'text-danger'}>
                  {item.trend > 0 ? '↑' : '↓'} {Math.abs(item.trend)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={twMerge('space-y-3', className)}>
      {sortedScores.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg font-mono font-bold text-gray-400">#{index + 1}</span>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {item.trend !== undefined && (
              <span
                className={twMerge(
                  'flex items-center text-xs font-medium',
                  item.trend > 0 ? 'text-success' : item.trend < 0 ? 'text-danger' : 'text-gray-500'
                )}
              >
                {item.trend > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                ) : item.trend < 0 ? (
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                ) : (
                  <Minus className="w-3 h-3 mr-0.5" />
                )}
                {Math.abs(item.trend)}%
              </span>
            )}
            <MatchScore score={item.score} variant="badge" size="sm" />
          </div>
        </div>
      ))}
    </div>
  )
}