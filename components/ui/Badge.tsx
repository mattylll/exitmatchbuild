import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const badgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-colors',
    'duration-200',
    'rounded-full',
  ],
  {
    variants: {
      variant: {
        default: 'bg-navy-100 text-navy-800 border border-navy-200',
        primary: 'bg-gold-100 text-gold-800 border border-gold-200',
        secondary: 'bg-gray-100 text-gray-800 border border-gray-200',
        success: 'bg-success-light text-success-dark border border-green-200',
        warning: 'bg-warning-light text-warning-dark border border-yellow-200',
        danger: 'bg-danger-light text-danger-dark border border-red-200',
        info: 'bg-info-light text-info-dark border border-blue-200',
        outline: 'bg-transparent border-2 border-current',
        solid: 'bg-navy text-white border border-navy',
      },
      size: {
        xs: 'text-xs px-2 py-0.5 gap-1',
        sm: 'text-sm px-2.5 py-0.5 gap-1',
        md: 'text-sm px-3 py-1 gap-1.5',
        lg: 'text-base px-4 py-1.5 gap-2',
      },
      removable: {
        true: 'pr-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      removable: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  onRemove?: () => void
  'aria-label'?: string
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      onRemove,
      removable = !!onRemove,
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={twMerge(badgeVariants({ variant, size, removable, className }))}
        aria-label={ariaLabel}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 -mr-0.5 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1"
            aria-label={`Remove ${children}`}
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Badge Group Component for managing multiple badges
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  wrap?: boolean
}

export const BadgeGroup = forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ className, wrap = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'inline-flex gap-2',
          wrap ? 'flex-wrap' : '',
          className
        )}
        {...props}
      />
    )
  }
)

BadgeGroup.displayName = 'BadgeGroup'