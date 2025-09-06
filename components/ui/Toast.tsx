import React from 'react'
import { Toaster as HotToaster, toast as hotToast, ToastBar } from 'react-hot-toast'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

// Custom Toast Provider Component
export const ToastProvider: React.FC = () => {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#fff',
          color: '#1F2937',
          padding: '0',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          borderRadius: '0.5rem',
          border: '1px solid #E5E7EB',
          maxWidth: '420px',
        },
        success: {
          duration: 4000,
        },
        error: {
          duration: 6000,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => {
            const toastType = t.type
            
            // Custom icon based on toast type
            const customIcon = () => {
              switch (toastType) {
                case 'success':
                  return <CheckCircle className="h-5 w-5 text-success" />
                case 'error':
                  return <AlertCircle className="h-5 w-5 text-danger" />
                case 'loading':
                  return (
                    <div className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  )
                default:
                  if ((t as any).icon === 'warning') {
                    return <AlertTriangle className="h-5 w-5 text-warning" />
                  }
                  if ((t as any).icon === 'info') {
                    return <Info className="h-5 w-5 text-info" />
                  }
                  return icon
              }
            }
            
            return (
              <div className={twMerge(
                'flex items-start gap-3 p-4 w-full',
                t.visible ? 'animate-slide-right' : 'animate-slide-left'
              )}>
                <div className="flex-shrink-0 mt-0.5">{customIcon()}</div>
                <div className="flex-1 text-sm">{message}</div>
                {t.type !== 'loading' && (
                  <button
                    onClick={() => hotToast.dismiss(t.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )
          }}
        </ToastBar>
      )}
    </HotToaster>
  )
}

// Toast utility functions
export const toast = {
  success: (message: string, options?: any) => {
    return hotToast.success(message, {
      ...options,
      style: {
        ...options?.style,
      },
    })
  },
  
  error: (message: string, options?: any) => {
    return hotToast.error(message, {
      ...options,
      style: {
        ...options?.style,
      },
    })
  },
  
  info: (message: string, options?: any) => {
    return hotToast(message, {
      ...options,
      icon: 'info',
      style: {
        ...options?.style,
      },
    })
  },
  
  warning: (message: string, options?: any) => {
    return hotToast(message, {
      ...options,
      icon: 'warning',
      style: {
        ...options?.style,
      },
    })
  },
  
  loading: (message: string, options?: any) => {
    return hotToast.loading(message, {
      ...options,
      style: {
        ...options?.style,
      },
    })
  },
  
  promise: async <T,>(
    promise: Promise<T>,
    msgs: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((err: any) => string)
    },
    options?: any
  ) => {
    return hotToast.promise(promise, msgs, options)
  },
  
  dismiss: (toastId?: string) => {
    hotToast.dismiss(toastId)
  },
  
  remove: (toastId?: string) => {
    hotToast.remove(toastId)
  },
}

// Custom toast component for complex content
export interface CustomToastProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

export const showCustomToast = ({
  title,
  description,
  action,
  variant = 'default',
}: CustomToastProps) => {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    success: 'bg-success-light border-success',
    error: 'bg-danger-light border-danger',
    warning: 'bg-warning-light border-warning',
    info: 'bg-info-light border-info',
  }

  const variantIcons = {
    default: null,
    success: <CheckCircle className="h-5 w-5 text-success" />,
    error: <AlertCircle className="h-5 w-5 text-danger" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-info" />,
  }

  return hotToast.custom(
    (t) => (
      <div
        className={twMerge(
          'max-w-md w-full p-4 rounded-lg border shadow-lg',
          variantStyles[variant],
          t.visible ? 'animate-slide-up' : 'animate-slide-down'
        )}
      >
        <div className="flex items-start">
          {variantIcons[variant] && (
            <div className="flex-shrink-0 mr-3">{variantIcons[variant]}</div>
          )}
          <div className="flex-1">
            {title && (
              <p className="text-sm font-medium text-gray-900">{title}</p>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
            {action && (
              <button
                onClick={() => {
                  action.onClick()
                  hotToast.dismiss(t.id)
                }}
                className="mt-3 text-sm font-medium text-gold hover:text-gold-600 focus:outline-none focus:underline"
              >
                {action.label}
              </button>
            )}
          </div>
          <button
            onClick={() => hotToast.dismiss(t.id)}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    ),
    {
      duration: 6000,
    }
  )
}