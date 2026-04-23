import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

const sizes = {
  sm: 'text-[10px]',
  md: 'text-[12px]',
} as const

interface KaruteNumberBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  value: string
  size?: keyof typeof sizes
  prefix?: string
  ariaLabelPrefix?: string
}

export const KaruteNumberBadge = forwardRef<HTMLSpanElement, KaruteNumberBadgeProps>(
  ({ value, size = 'sm', prefix = '#', ariaLabelPrefix = 'Karute number', className, ...props }, ref) => {
    if (!value) return null
    const formatted = value.startsWith(prefix) ? value : `${prefix}${value}`
    return (
      <span
        ref={ref}
        className={cn(
          'tabular-nums font-medium text-[var(--color-text-muted)]',
          sizes[size],
          className,
        )}
        aria-label={`${ariaLabelPrefix} ${value}`}
        {...props}
      >
        {formatted}
      </span>
    )
  },
)
KaruteNumberBadge.displayName = 'KaruteNumberBadge'
