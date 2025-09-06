import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const skeletonVariants = cva(
  [
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'before:absolute',
    'before:inset-0',
    'before:-translate-x-full',
    'before:animate-shimmer',
    'before:bg-gradient-to-r',
    'before:from-gray-200',
    'before:via-white',
    'before:to-gray-200',
  ],
  {
    variants: {
      variant: {
        default: '',
        text: 'h-4 w-full',
        title: 'h-8 w-3/4',
        avatar: 'h-12 w-12',
        thumbnail: 'h-24 w-24',
        card: 'h-32 w-full',
        button: 'h-10 w-24',
        input: 'h-10 w-full',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'md',
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
  count?: number
  className?: string
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, rounded, width, height, count = 1, style, ...props }, ref) => {
    const customStyle = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      ...style,
    }

    if (count > 1) {
      return (
        <div className="space-y-2">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              ref={index === 0 ? ref : undefined}
              className={twMerge(skeletonVariants({ variant, rounded, className }))}
              style={customStyle}
              {...props}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={twMerge(skeletonVariants({ variant, rounded, className }))}
        style={customStyle}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Skeleton Container for grouping multiple skeletons
export interface SkeletonContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  isLoading?: boolean
}

export const SkeletonContainer = forwardRef<HTMLDivElement, SkeletonContainerProps>(
  ({ children, isLoading = true, className, ...props }, ref) => {
    if (!isLoading) return <>{children}</>

    return (
      <div ref={ref} className={twMerge('animate-pulse', className)} {...props}>
        {children}
      </div>
    )
  }
)

SkeletonContainer.displayName = 'SkeletonContainer'

// Pre-built skeleton patterns
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={twMerge('bg-white rounded-xl border border-gray-200 p-6', className)}>
    <SkeletonContainer>
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton variant="avatar" rounded="full" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="text" count={3} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="button" />
        <Skeleton variant="button" />
      </div>
    </SkeletonContainer>
  </div>
)

export const SkeletonTable: React.FC<{ rows?: number; className?: string }> = ({ 
  rows = 5, 
  className 
}) => (
  <div className={twMerge('bg-white rounded-xl border border-gray-200 overflow-hidden', className)}>
    <SkeletonContainer>
      {/* Table Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
        <div className="grid grid-cols-4 gap-4">
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
      
      {/* Table Body */}
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="border-b border-gray-200 px-6 py-4 last:border-0">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      ))}
    </SkeletonContainer>
  </div>
)

export const SkeletonForm: React.FC<{ fields?: number; className?: string }> = ({ 
  fields = 4, 
  className 
}) => (
  <div className={twMerge('space-y-4', className)}>
    <SkeletonContainer>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="input" />
        </div>
      ))}
      <div className="flex gap-2 mt-6">
        <Skeleton variant="button" width={100} />
        <Skeleton variant="button" width={100} />
      </div>
    </SkeletonContainer>
  </div>
)

export const SkeletonMetricCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={twMerge('bg-white rounded-xl border border-gray-200 p-6', className)}>
    <SkeletonContainer>
      <Skeleton variant="text" width="40%" height={16} className="mb-2" />
      <Skeleton variant="title" width="60%" height={32} className="mb-1" />
      <Skeleton variant="text" width="50%" height={14} />
    </SkeletonContainer>
  </div>
)