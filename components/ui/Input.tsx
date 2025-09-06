import React, { forwardRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

const inputVariants = cva(
  [
    'w-full',
    'rounded-lg',
    'border',
    'bg-white',
    'px-4',
    'py-2',
    'text-gray-900',
    'placeholder-gray-500',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-white',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'disabled:bg-gray-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-gray-300',
          'focus:border-gray-400',
          'focus:ring-gray-200',
        ],
        error: [
          'border-red-500',
          'focus:border-red-600',
          'focus:ring-red-200',
          'pr-10',
        ],
        success: [
          'border-green-500',
          'focus:border-green-600',
          'focus:ring-green-200',
          'pr-10',
        ],
      },
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onRightIconClick?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      type = 'text',
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconClick,
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    // Determine the variant based on error/success states
    const inputVariant = error ? 'error' : success ? 'success' : variant
    
    // Handle password visibility toggle
    const isPasswordType = type === 'password'
    const inputType = isPasswordType && showPassword ? 'text' : type

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            required={required}
            className={twMerge(
              inputVariants({ variant: inputVariant, size, className }),
              leftIcon && 'pl-10',
              (rightIcon || isPasswordType || error || success) && 'pr-10'
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {error && (
              <AlertCircle className="h-5 w-5 text-danger" aria-hidden="true" />
            )}
            {success && !error && (
              <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
            )}
            {isPasswordType && !error && !success && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
            {rightIcon && !isPasswordType && !error && !success && (
              <button
                type="button"
                onClick={onRightIconClick}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                disabled={disabled}
              >
                {rightIcon}
              </button>
            )}
          </div>
        </div>
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Textarea Component (extends Input styling)
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      success,
      helperText,
      disabled,
      required,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const textareaVariant = error ? 'error' : success ? 'success' : variant

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          className={twMerge(
            inputVariants({ variant: textareaVariant, size, className }),
            'resize-y min-h-[100px]'
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        
        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1 text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'