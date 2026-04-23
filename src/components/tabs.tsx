'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '../utils/cn.js'

export const Tabs = TabsPrimitive.Root

const listVariants = {
  default: 'bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] p-[3px] h-8',
  line: 'bg-transparent gap-1 border-b border-[var(--color-border)]',
} as const

interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: keyof typeof listVariants
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      data-variant={variant}
      className={cn('inline-flex w-fit items-center justify-center text-[var(--color-text-muted)]', listVariants[variant], className)}
      {...props}
    />
  ),
)
TabsList.displayName = 'TabsList'

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap',
      'rounded-[var(--radius-sm)] px-3 py-1 text-sm font-medium',
      'text-[var(--color-text-muted)] transition-colors',
      'hover:text-[var(--color-text)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-[var(--color-bg-card)] data-[state=active]:text-[var(--color-text)] data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-2 flex-1 text-sm outline-none text-[var(--color-text)]', className)}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'
