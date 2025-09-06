import React, { forwardRef } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-14 w-14',
        '2xl': 'h-16 w-16',
        '3xl': 'h-20 w-20',
      },
      status: {
        online: '',
        offline: '',
        busy: '',
        away: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const statusIndicatorVariants = cva(
  'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
  {
    variants: {
      size: {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-3.5 w-3.5',
        '2xl': 'h-4 w-4',
        '3xl': 'h-5 w-5',
      },
      status: {
        online: 'bg-success',
        offline: 'bg-gray-400',
        busy: 'bg-danger',
        away: 'bg-warning',
      },
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, status, src, alt, fallback, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={twMerge(avatarVariants({ size, className }))}
    {...props}
  >
    <AvatarPrimitive.Image
      src={src}
      alt={alt}
      className="aspect-square h-full w-full object-cover"
    />
    <AvatarPrimitive.Fallback
      className="flex h-full w-full items-center justify-center bg-navy-100 text-navy-600 font-medium"
    >
      {fallback}
    </AvatarPrimitive.Fallback>
    {status && (
      <span
        className={statusIndicatorVariants({ size, status })}
        aria-label={`Status: ${status}`}
      />
    )}
  </AvatarPrimitive.Root>
))

Avatar.displayName = AvatarPrimitive.Root.displayName

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  max?: number
  size?: VariantProps<typeof avatarVariants>['size']
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 4, size = 'md', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const displayedChildren = max ? childrenArray.slice(0, max) : childrenArray
    const remainingCount = childrenArray.length - displayedChildren.length

    return (
      <div ref={ref} className={twMerge('flex -space-x-2', className)} {...props}>
        {displayedChildren.map((child, index) => (
          <div key={index} className="relative ring-2 ring-white rounded-full">
            {React.isValidElement(child) && React.cloneElement(child as any, { size })}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={twMerge(
              avatarVariants({ size }),
              'relative ring-2 ring-white bg-gray-200 flex items-center justify-center'
            )}
          >
            <span className="text-xs font-medium text-gray-600">+{remainingCount}</span>
          </div>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'

// Utility function to generate initials from a name
export const getInitials = (name: string): string => {
  const names = name.trim().split(' ')
  if (names.length === 0) return ''
  if (names.length === 1) return names[0][0]?.toUpperCase() || ''
  return (names[0][0] + names[names.length - 1][0]).toUpperCase()
}

// Avatar with dropdown menu (for user profiles)
export interface UserAvatarProps extends AvatarProps {
  name?: string
  email?: string
  menuItems?: Array<{
    label: string
    onClick: () => void
    icon?: React.ReactNode
    variant?: 'default' | 'danger'
  }>
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = '',
  email,
  src,
  alt = name,
  size = 'md',
  status,
  menuItems,
  ...props
}) => {
  const initials = getInitials(name)

  if (!menuItems) {
    return (
      <Avatar
        src={src}
        alt={alt}
        size={size}
        status={status}
        fallback={initials}
        {...props}
      />
    )
  }

  // If menuItems are provided, wrap in a dropdown (simplified version)
  // You would typically use a proper dropdown component here
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
      >
        <Avatar
          src={src}
          alt={alt}
          size={size}
          status={status}
          fallback={initials}
          {...props}
        />
        {name && (
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            {email && <p className="text-xs text-gray-500">{email}</p>}
          </div>
        )}
      </button>
    </div>
  )
}

// Generate color from string (for consistent avatar colors)
export const stringToColor = (str: string): string => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
  ]
  
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}