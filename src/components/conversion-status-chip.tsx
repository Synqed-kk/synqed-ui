import { Clock3, X, Check } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Conversion status pill — for karute list + karute detail.
// `active` renders nothing by default; pass `showActive` to
// make it explicit.
// ------------------------------------------------------------

export type ConversionStatus = 'provisional' | 'declined' | 'active'

export interface ConversionStatusCopy {
  provisional: string
  declined: string
  active: string
}

const DEFAULT_COPY: ConversionStatusCopy = {
  provisional: 'Provisional',
  declined: 'Declined',
  active: 'Converted',
}

interface ConversionStatusChipProps extends HTMLAttributes<HTMLSpanElement> {
  status?: ConversionStatus
  /** When true, renders an explicit chip even for the "active" state. */
  showActive?: boolean
  copy?: Partial<ConversionStatusCopy>
}

export const ConversionStatusChip = forwardRef<HTMLSpanElement, ConversionStatusChipProps>(
  ({ status, showActive = false, copy, className, ...props }, ref) => {
    const L: ConversionStatusCopy = { ...DEFAULT_COPY, ...copy }
    const effective = status ?? 'active'

    if (effective === 'provisional') {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[10px] font-medium',
            'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30',
            className,
          )}
          {...props}
        >
          <Clock3 className="size-2.5" strokeWidth={2.5} />
          {L.provisional}
        </span>
      )
    }
    if (effective === 'declined') {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[10px] font-medium',
            'bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/20',
            className,
          )}
          {...props}
        >
          <X className="size-2.5" strokeWidth={2.5} />
          {L.declined}
        </span>
      )
    }
    if (showActive) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[10px] font-medium',
            'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
            className,
          )}
          {...props}
        >
          <Check className="size-2.5" strokeWidth={2.5} />
          {L.active}
        </span>
      )
    }
    return null
  },
)
ConversionStatusChip.displayName = 'ConversionStatusChip'
