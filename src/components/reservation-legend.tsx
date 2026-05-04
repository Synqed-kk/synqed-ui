import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Reservation status legend — color swatches with labels.
// Pure presenter; caller provides the items.
// ------------------------------------------------------------

export type ReservationLegendTone =
  | 'booked'
  | 'in_progress'
  | 'completed'
  | 'new_customer'
  | 'pending'
  | 'block'

const TONE_CLASS: Record<ReservationLegendTone, string> = {
  booked: 'bg-[var(--color-success)]/15 border-[var(--color-success)]/30',
  in_progress: 'bg-[var(--color-warning)]/15 border-[var(--color-warning)]/40',
  completed: 'bg-[var(--color-bg-muted)] border-[var(--color-border-strong)]',
  new_customer:
    'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/40 [border-style:dashed]',
  pending:
    'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 [border-style:dashed]',
  block:
    'bg-[repeating-linear-gradient(45deg,var(--color-bg-muted)_0,var(--color-bg-muted)_4px,var(--color-bg-card)_4px,var(--color-bg-card)_8px)] border-[var(--color-border-strong)]',
}

export interface ReservationLegendItem {
  tone: ReservationLegendTone
  label: string
}

interface ReservationLegendProps extends HTMLAttributes<HTMLDivElement> {
  items: ReservationLegendItem[]
  /** Header label e.g. "Legend". Hidden when empty. */
  title?: string
}

export const ReservationLegend = forwardRef<HTMLDivElement, ReservationLegendProps>(
  ({ items, title = 'Legend', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mb-3 flex flex-wrap items-center gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        className,
      )}
      {...props}
    >
      {title && (
        <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          {title}
        </span>
      )}
      {items.map((it) => (
        <div key={it.tone} className="flex items-center gap-1.5">
          <span
            className={cn(
              'inline-block size-3 rounded-[var(--radius-sm)] border',
              TONE_CLASS[it.tone],
            )}
            aria-hidden
          />
          <span className="text-xs text-[var(--color-text)]/80">{it.label}</span>
        </div>
      ))}
    </div>
  ),
)
ReservationLegend.displayName = 'ReservationLegend'
