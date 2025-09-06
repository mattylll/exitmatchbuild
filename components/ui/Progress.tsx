import React, { forwardRef } from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

// Linear Progress Bar
const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-gray-200',
  {
    variants: {
      variant: {
        default: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
      },
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-gold',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
        info: 'bg-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  animated?: boolean
}

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant,
      size,
      label,
      showValue,
      animated,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-1">
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
            {showValue && (
              <span className="text-sm font-mono text-gray-600">{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={twMerge(progressVariants({ variant, size, className }))}
          value={value}
          max={max}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={twMerge(
              progressIndicatorVariants({ variant }),
              animated && 'relative after:absolute after:inset-0 after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent'
            )}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    )
  }
)

Progress.displayName = ProgressPrimitive.Root.displayName

// Circular Progress Component
export interface CircularProgressProps extends VariantProps<typeof progressIndicatorVariants> {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  showValue?: boolean
  className?: string
}

export const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = 120,
      strokeWidth = 8,
      variant = 'default',
      label,
      showValue = true,
      className,
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const variantColors = {
      default: 'stroke-gold',
      success: 'stroke-success',
      warning: 'stroke-warning',
      danger: 'stroke-danger',
      info: 'stroke-info',
    }

    return (
      <div className={twMerge('inline-flex flex-col items-center', className)}>
        <div className="relative">
          <svg
            ref={ref}
            width={size}
            height={size}
            className="transform -rotate-90"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            role="progressbar"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              className={twMerge('transition-all duration-300 ease-in-out', variantColors[variant])}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
              }}
            />
          </svg>
          {showValue && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-mono font-semibold text-gray-900">
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>
        {label && <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>}
      </div>
    )
  }
)

CircularProgress.displayName = 'CircularProgress'

// Step Progress Component
export interface StepProgressProps {
  steps: Array<{
    label: string
    description?: string
    status: 'completed' | 'current' | 'upcoming'
  }>
  className?: string
}

export const StepProgress: React.FC<StepProgressProps> = ({ steps, className }) => {
  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.label}
            className={twMerge(
              stepIdx !== steps.length - 1 ? 'flex-1' : '',
              'relative'
            )}
          >
            {step.status === 'completed' ? (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">{step.label}</span>
                </span>
              </div>
            ) : step.status === 'current' ? (
              <div className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold">
                  <span className="text-gold">{stepIdx + 1}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-gold">{step.label}</span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                    <span className="text-gray-500">{stepIdx + 1}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500">{step.label}</span>
                </span>
              </div>
            )}

            {stepIdx !== steps.length - 1 && (
              <div
                className="absolute right-0 top-0 hidden h-full w-5 md:block"
                aria-hidden="true"
              >
                <svg
                  className="h-full w-full text-gray-300"
                  viewBox="0 0 22 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 -2L20 40L0 82"
                    vectorEffect="non-scaling-stroke"
                    stroke="currentcolor"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Indeterminate Progress Bar
export const IndeterminateProgress: React.FC<{
  variant?: VariantProps<typeof progressIndicatorVariants>['variant']
  size?: VariantProps<typeof progressVariants>['size']
  className?: string
}> = ({ variant = 'default', size = 'md', className }) => {
  return (
    <div className={twMerge(progressVariants({ variant, size, className }))}>
      <div
        className={twMerge(
          progressIndicatorVariants({ variant }),
          'h-full w-1/3 animate-pulse rounded-full',
          'relative overflow-hidden',
          'before:absolute before:inset-0 before:animate-shimmer',
          'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent'
        )}
      />
    </div>
  )
}