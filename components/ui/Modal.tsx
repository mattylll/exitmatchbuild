import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'

// Modal Root
export const Modal = DialogPrimitive.Root

// Modal Trigger
export const ModalTrigger = DialogPrimitive.Trigger

// Modal Close
export const ModalClose = DialogPrimitive.Close

// Modal Portal
export const ModalPortal = DialogPrimitive.Portal

// Modal Overlay
export const ModalOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={twMerge(
      'fixed inset-0 z-modal-backdrop bg-black/60 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))

ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

// Modal Content with size variants
const modalContentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-modal',
    'translate-x-[-50%] translate-y-[-50%]',
    'bg-white rounded-xl shadow-xl',
    'duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'max-h-[90vh] overflow-y-auto',
  ],
  {
    variants: {
      size: {
        sm: 'w-full max-w-md p-6',
        md: 'w-full max-w-lg p-6',
        lg: 'w-full max-w-2xl p-8',
        xl: 'w-full max-w-4xl p-8',
        full: 'w-[95vw] max-w-7xl p-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean
}

export const ModalContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, size, children, showCloseButton = true, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={twMerge(modalContentVariants({ size, className }))}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
))

ModalContent.displayName = DialogPrimitive.Content.displayName

// Modal Header
export const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
))

ModalHeader.displayName = 'ModalHeader'

// Modal Footer
export const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 pt-6 border-t border-gray-200',
      className
    )}
    {...props}
  />
))

ModalFooter.displayName = 'ModalFooter'

// Modal Title
export const ModalTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={twMerge('text-2xl font-semibold leading-none tracking-tight text-navy font-[Outfit]', className)}
    {...props}
  />
))

ModalTitle.displayName = DialogPrimitive.Title.displayName

// Modal Description
export const ModalDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={twMerge('text-sm text-gray-600 mt-2', className)}
    {...props}
  />
))

ModalDescription.displayName = DialogPrimitive.Description.displayName

// Alert Dialog Variant
export interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  variant?: 'default' | 'danger'
  children?: React.ReactNode
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  children,
}) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {children && <ModalTrigger asChild>{children}</ModalTrigger>}
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <ModalFooter className="gap-2 sm:gap-0">
          <ModalClose asChild>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              {cancelLabel}
            </button>
          </ModalClose>
          <button
            type="button"
            onClick={() => {
              onConfirm?.()
              onOpenChange?.(false)
            }}
            className={twMerge(
              'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
              variant === 'danger'
                ? 'bg-danger hover:bg-red-600 focus:ring-danger'
                : 'bg-gold hover:bg-gold-600 focus:ring-gold'
            )}
          >
            {confirmLabel}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}