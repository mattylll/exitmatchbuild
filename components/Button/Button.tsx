import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-white',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
    'relative',
    'overflow-hidden',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gold',
          'text-white',
          'hover:bg-gold-600',
          'active:bg-gold-700',
          'focus:ring-yellow-200',
          'shadow-sm',
          'hover:shadow-md',
        ],
        secondary: [
          'bg-navy',
          'text-white',
          'hover:bg-navy-700',
          'active:bg-navy-900',
          'focus:ring-blue-200',
          'shadow-sm',
          'hover:shadow-md',
        ],
        outline: [
          'border',
          'border-navy',
          'bg-transparent',
          'text-navy',
          'hover:bg-navy-50',
          'active:bg-navy-100',
          'focus:ring-blue-200',
        ],
        ghost: [
          'bg-transparent',
          'text-navy',
          'hover:bg-navy-50',
          'active:bg-navy-100',
          'focus:ring-blue-200',
        ],
        danger: [
          'bg-danger',
          'text-white',
          'hover:bg-red-600',
          'active:bg-red-700',
          'focus:ring-red-200',
          'shadow-sm',
          'hover:shadow-md',
        ],
        success: [
          'bg-success',
          'text-white',
          'hover:bg-green-600',
          'active:bg-green-700',
          'focus:ring-green-200',
          'shadow-sm',
          'hover:shadow-md',
        ],
        link: [
          'bg-transparent',
          'text-gold',
          'hover:text-gold-600',
          'underline-offset-4',
          'hover:underline',
          'focus:ring-yellow-200',
          'p-0',
          'h-auto',
        ],
      },
      size: {
        xs: ['text-xs', 'h-7', 'px-2.5', 'gap-1'],
        sm: ['text-sm', 'h-9', 'px-3', 'gap-1.5'],
        md: ['text-base', 'h-11', 'px-4', 'gap-2'],
        lg: ['text-lg', 'h-12', 'px-6', 'gap-2'],
        xl: ['text-xl', 'h-14', 'px-8', 'gap-2.5'],
        icon: ['h-10', 'w-10', 'p-0'],
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  target?: string
  rel?: string
  disabled?: boolean
  'aria-label'?: string
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled = false,
      href,
      target,
      rel,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading
    const combinedClassName = twMerge(buttonVariants({ variant, size, fullWidth, className }))

    // Loading spinner component
    const LoadingSpinner = () => (
      <Loader2 className="animate-spin" size={size === 'xs' ? 14 : size === 'sm' ? 16 : 18} />
    )

    const content = (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    )

    // Render as link if href is provided
    if (href && !isDisabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={combinedClassName}
          aria-label={ariaLabel}
          {...(props as any)}
        >
          {content}
        </a>
      )
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClassName}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
