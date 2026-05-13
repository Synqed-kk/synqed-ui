import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Customer signal — the four-state customer-health indicator used
// across the customer list, profile header, and re-engagement
// surfaces in karute. Tones map to the existing token palette so
// theming Just Works.
// ------------------------------------------------------------

export type CustomerSignalTone = 'new' | 'on_track' | 'needs_followup' | 'dormant_risk'

const tones: Record<CustomerSignalTone, string> = {
  new: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20',
  on_track:
    'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
  needs_followup:
    'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30',
  dormant_risk:
    'bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/20',
}

interface CustomerSignalChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone: CustomerSignalTone
  label: string
}

export const CustomerSignalChip = forwardRef<HTMLSpanElement, CustomerSignalChipProps>(
  ({ tone, label, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-5 items-center rounded-full border px-2 text-[11px] font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {label}
    </span>
  ),
)
CustomerSignalChip.displayName = 'CustomerSignalChip'
