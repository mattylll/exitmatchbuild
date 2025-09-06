import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Loader2,
  PauseCircle,
  PlayCircle,
  Archive,
  Target,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react'

// Status configurations for business/deal states
const statusConfig = {
  // Business Status
  active: {
    label: 'Active',
    icon: CheckCircle,
    color: 'success',
  },
  'for-sale': {
    label: 'For Sale',
    icon: Target,
    color: 'primary',
  },
  'under-offer': {
    label: 'Under Offer',
    icon: Clock,
    color: 'warning',
  },
  sold: {
    label: 'Sold',
    icon: CheckCircle,
    color: 'info',
  },
  withdrawn: {
    label: 'Withdrawn',
    icon: XCircle,
    color: 'danger',
  },
  
  // Deal Status
  'new-lead': {
    label: 'New Lead',
    icon: Star,
    color: 'primary',
  },
  qualifying: {
    label: 'Qualifying',
    icon: Target,
    color: 'info',
  },
  'in-discussion': {
    label: 'In Discussion',
    icon: Clock,
    color: 'warning',
  },
  'due-diligence': {
    label: 'Due Diligence',
    icon: Shield,
    color: 'warning',
  },
  negotiating: {
    label: 'Negotiating',
    icon: TrendingUp,
    color: 'info',
  },
  'legal-review': {
    label: 'Legal Review',
    icon: Shield,
    color: 'warning',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    color: 'success',
  },
  terminated: {
    label: 'Terminated',
    icon: XCircle,
    color: 'danger',
  },
  'on-hold': {
    label: 'On Hold',
    icon: PauseCircle,
    color: 'neutral',
  },
  
  // Verification Status
  verified: {
    label: 'Verified',
    icon: CheckCircle,
    color: 'success',
  },
  unverified: {
    label: 'Unverified',
    icon: AlertCircle,
    color: 'neutral',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'warning',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    color: 'danger',
  },
  
  // Activity Status
  online: {
    label: 'Online',
    icon: PlayCircle,
    color: 'success',
  },
  offline: {
    label: 'Offline',
    icon: PauseCircle,
    color: 'neutral',
  },
  busy: {
    label: 'Busy',
    icon: AlertCircle,
    color: 'danger',
  },
  away: {
    label: 'Away',
    icon: Clock,
    color: 'warning',
  },
  
  // Generic
  draft: {
    label: 'Draft',
    icon: Archive,
    color: 'neutral',
  },
  published: {
    label: 'Published',
    icon: CheckCircle,
    color: 'success',
  },
  archived: {
    label: 'Archived',
    icon: Archive,
    color: 'neutral',
  },
  processing: {
    label: 'Processing',
    icon: Loader2,
    color: 'info',
    animated: true,
  },
} as const

export type StatusType = keyof typeof statusConfig

const statusBadgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-full',
    'transition-all',
    'duration-200',
  ],
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outline: 'bg-transparent border-2',
        ghost: 'bg-transparent',
      },
      color: {
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        neutral: '',
      },
      size: {
        xs: 'text-xs px-2 py-0.5 gap-1',
        sm: 'text-sm px-2.5 py-1 gap-1',
        md: 'text-sm px-3 py-1.5 gap-1.5',
        lg: 'text-base px-4 py-2 gap-2',
      },
      pulse: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-gold text-white border border-gold',
      },
      {
        variant: 'solid',
        color: 'success',
        className: 'bg-success text-white border border-success',
      },
      {
        variant: 'solid',
        color: 'warning',
        className: 'bg-warning text-white border border-warning',
      },
      {
        variant: 'solid',
        color: 'danger',
        className: 'bg-danger text-white border border-danger',
      },
      {
        variant: 'solid',
        color: 'info',
        className: 'bg-info text-white border border-info',
      },
      {
        variant: 'solid',
        color: 'neutral',
        className: 'bg-gray-500 text-white border border-gray-500',
      },
      
      // Soft variants
      {
        variant: 'soft',
        color: 'primary',
        className: 'bg-gold-100 text-gold-800 border border-gold-200',
      },
      {
        variant: 'soft',
        color: 'success',
        className: 'bg-success-light text-success-dark border border-green-200',
      },
      {
        variant: 'soft',
        color: 'warning',
        className: 'bg-warning-light text-warning-dark border border-yellow-200',
      },
      {
        variant: 'soft',
        color: 'danger',
        className: 'bg-danger-light text-danger-dark border border-red-200',
      },
      {
        variant: 'soft',
        color: 'info',
        className: 'bg-info-light text-info-dark border border-blue-200',
      },
      {
        variant: 'soft',
        color: 'neutral',
        className: 'bg-gray-100 text-gray-700 border border-gray-200',
      },
      
      // Outline variants
      {
        variant: 'outline',
        color: 'primary',
        className: 'text-gold border-gold',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'text-success border-success',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'text-warning border-warning',
      },
      {
        variant: 'outline',
        color: 'danger',
        className: 'text-danger border-danger',
      },
      {
        variant: 'outline',
        color: 'info',
        className: 'text-info border-info',
      },
      {
        variant: 'outline',
        color: 'neutral',
        className: 'text-gray-600 border-gray-400',
      },
      
      // Ghost variants
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-gold hover:bg-gold-50',
      },
      {
        variant: 'ghost',
        color: 'success',
        className: 'text-success hover:bg-success-light',
      },
      {
        variant: 'ghost',
        color: 'warning',
        className: 'text-warning hover:bg-warning-light',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className: 'text-danger hover:bg-danger-light',
      },
      {
        variant: 'ghost',
        color: 'info',
        className: 'text-info hover:bg-info-light',
      },
      {
        variant: 'ghost',
        color: 'neutral',
        className: 'text-gray-600 hover:bg-gray-100',
      },
      
      // Pulse animation
      {
        pulse: true,
        color: 'success',
        className: 'animate-pulse',
      },
      {
        pulse: true,
        color: 'warning',
        className: 'animate-pulse',
      },
      {
        pulse: true,
        color: 'danger',
        className: 'animate-pulse',
      },
    ],
    defaultVariants: {
      variant: 'soft',
      size: 'sm',
      pulse: false,
    },
  }
)

export interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  status?: StatusType
  label?: string
  icon?: React.ReactNode
  showIcon?: boolean
  className?: string
  customColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  icon,
  showIcon = true,
  variant = 'soft',
  size = 'sm',
  pulse = false,
  color,
  customColor,
  className,
}) => {
  // Get config from status or use custom values
  const config = status ? statusConfig[status] : null
  const displayLabel = label || config?.label || 'Unknown'
  const displayColor = customColor || color || config?.color || 'neutral'
  const IconComponent = config?.icon
  const isAnimated = config?.animated || pulse
  
  // Icon sizing based on badge size
  const iconSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
  }[size || 'sm']

  return (
    <span
      className={twMerge(
        statusBadgeVariants({
          variant,
          color: displayColor as any,
          size,
          pulse: isAnimated,
        }),
        className
      )}
    >
      {showIcon && (icon || IconComponent) && (
        <span className={twMerge('inline-flex', isAnimated && 'animate-spin')}>
          {icon || (IconComponent && <IconComponent size={iconSize} />)}
        </span>
      )}
      <span>{displayLabel}</span>
    </span>
  )
}

// Status Timeline Component
export interface StatusTimelineItem {
  status: StatusType
  label?: string
  description?: string
  date?: string
  active?: boolean
  completed?: boolean
}

export interface StatusTimelineProps {
  items: StatusTimelineItem[]
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  items,
  orientation = 'vertical',
  className,
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={twMerge('flex items-center', className)}>
        {items.map((item, index) => {
          const config = statusConfig[item.status]
          const isLast = index === items.length - 1
          
          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={twMerge(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  item.completed ? 'bg-success text-white' :
                  item.active ? 'bg-gold text-white' :
                  'bg-gray-200 text-gray-500'
                )}>
                  {config?.icon && <config.icon size={20} />}
                </div>
                <span className="text-xs mt-2 text-center max-w-[80px]">
                  {item.label || config?.label}
                </span>
              </div>
              {!isLast && (
                <div className={twMerge(
                  'w-20 h-0.5 mx-2',
                  item.completed ? 'bg-success' : 'bg-gray-300'
                )} />
              )}
            </div>
          )
        })}
      </div>
    )
  }
  
  return (
    <div className={twMerge('space-y-4', className)}>
      {items.map((item, index) => {
        const config = statusConfig[item.status]
        const isLast = index === items.length - 1
        
        return (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className={twMerge(
                'w-10 h-10 rounded-full flex items-center justify-center',
                item.completed ? 'bg-success text-white' :
                item.active ? 'bg-gold text-white animate-pulse' :
                'bg-gray-200 text-gray-500'
              )}>
                {config?.icon && <config.icon size={20} />}
              </div>
              {!isLast && (
                <div className={twMerge(
                  'w-0.5 flex-1 mt-2',
                  item.completed ? 'bg-success' : 'bg-gray-300'
                )} />
              )}
            </div>
            <div className="flex-1 pb-8">
              <h4 className="font-medium text-gray-900">
                {item.label || config?.label}
              </h4>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
              {item.date && (
                <p className="text-xs text-gray-500 mt-2">{item.date}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Status Group Component for displaying multiple statuses
export interface StatusGroupProps {
  statuses: Array<StatusType | { status: StatusType; label?: string }>
  variant?: VariantProps<typeof statusBadgeVariants>['variant']
  size?: VariantProps<typeof statusBadgeVariants>['size']
  className?: string
}

export const StatusGroup: React.FC<StatusGroupProps> = ({
  statuses,
  variant = 'soft',
  size = 'sm',
  className,
}) => {
  return (
    <div className={twMerge('inline-flex flex-wrap gap-2', className)}>
      {statuses.map((item, index) => {
        const status = typeof item === 'string' ? item : item.status
        const label = typeof item === 'object' ? item.label : undefined
        
        return (
          <StatusBadge
            key={index}
            status={status}
            label={label}
            variant={variant}
            size={size}
          />
        )
      })}
    </div>
  )
}