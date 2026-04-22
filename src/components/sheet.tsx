'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetPortal = DialogPrimitive.Portal

type Side = 'top' | 'bottom' | 'left' | 'right'

const sideStyles: Record<Side, string> = {
  bottom:
    'inset-x-0 bottom-0 max-h-[92vh] rounded-t-[var(--radius-xl)] border-t pb-[max(env(safe-area-inset-bottom),1rem)]',
  top: 'inset-x-0 top-0 rounded-b-[var(--radius-xl)] border-b pt-[env(safe-area-inset-top)]',
  left: 'inset-y-0 left-0 h-full w-[85%] max-w-xs border-r',
  right: 'inset-y-0 right-0 h-full w-[85%] max-w-xs border-l',
}

export const SheetOverlay = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[var(--color-bg-overlay)]',
      'supports-[backdrop-filter]:backdrop-blur-sm',
      className,
    )}
    {...props}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

interface SheetContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: Side
  showCloseButton?: boolean
  closeLabel?: string
}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = 'bottom', showCloseButton = true, closeLabel = 'Close', ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 flex flex-col gap-2 p-5 outline-none',
          'bg-[var(--color-bg-card)] border-[var(--color-border)]',
          'text-[var(--color-text)] shadow-xl',
          sideStyles[side],
          className,
        )}
        {...props}
      >
        {side === 'bottom' && (
          <div aria-hidden className="mx-auto mt-1.5 mb-3 h-[5px] w-9 rounded-full bg-[var(--color-border-strong)]" />
        )}
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full',
              'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-card-hover)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]',
            )}
          >
            <X className="size-4" />
            <span className="sr-only">{closeLabel}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  ),
)
SheetContent.displayName = 'SheetContent'

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 text-left', className)} {...props} />
}

export function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-auto flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

export const SheetTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-base font-semibold leading-tight text-[var(--color-text)]', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

export const SheetDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--color-text-muted)]', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'
