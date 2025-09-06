import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const cardVariants = cva(
  [
    'bg-white',
    'rounded-xl',
    'border',
    'border-gray-200',
    'transition-all',
    'duration-300',
  ],
  {
    variants: {
      variant: {
        default: 'shadow-md',
        elevated: 'shadow-lg hover:shadow-xl',
        interactive: 'shadow-md hover:shadow-lg hover:border-gray-300 cursor-pointer',
        flat: 'shadow-none',
        outlined: 'shadow-none border-2',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={twMerge(cardVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('mb-4 pb-4 border-b border-gray-200', className)}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={twMerge('text-xl font-semibold text-navy font-[Outfit]', className)}
        {...props}
      />
    )
  }
)

CardTitle.displayName = 'CardTitle'

// Card Description Component
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={twMerge('text-sm text-gray-600 mt-1', className)}
        {...props}
      />
    )
  }
)

CardDescription.displayName = 'CardDescription'

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={twMerge('', className)} {...props} />
  }
)

CardContent.displayName = 'CardContent'

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('mt-4 pt-4 border-t border-gray-200 flex items-center', className)}
        {...props}
      />
    )
  }
)

CardFooter.displayName = 'CardFooter'