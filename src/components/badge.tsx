import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

const variants = {
  default: 'bg-[var(--color-accent)] text-[var(--color-accent-text)] border-transparent',
  secondary: 'bg-[var(--color-bg-muted)] text-[var(--color-text)] border-transparent',
  outline: 'bg-transparent text-[var(--color-text)] border-[var(--color-border)]',
  ghost: 'bg-transparent text-[var(--color-text-muted)] border-transparent',
  destructive: 'bg-[var(--color-destructive)] text-[var(--color-destructive-text)] border-transparent',
  success: 'bg-[var(--color-success)] text-[var(--color-text-inverse)] border-transparent',
  warning: 'bg-[var(--color-warning)] text-[var(--color-text-inverse)] border-transparent',
} as const

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1',
        'rounded-[var(--radius-full)] border px-2 py-0.5',
        'text-xs font-medium whitespace-nowrap transition-colors',
        '[&>svg]:pointer-events-none [&>svg]:size-3',
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
)
Badge.displayName = 'Badge'
