import { CalendarPlus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'

// ------------------------------------------------------------
// Reservation page header — title + date pager + new-booking CTA.
// Pure presenter; caller owns the new-booking dialog state.
// ------------------------------------------------------------

export interface ReservationPageHeaderCopy {
  title: string
  todayLabel: string
  newReservationLabel: string
  prevLabel: string
  nextLabel: string
}

const DEFAULT_COPY: ReservationPageHeaderCopy = {
  title: 'Reservations',
  todayLabel: 'Today',
  newReservationLabel: 'New booking',
  prevLabel: 'Previous',
  nextLabel: 'Next',
}

interface ReservationPageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Long-form date display e.g. "May 1, 2026 (Fri)". */
  dateDisplay: ReactNode
  /** Compact variant for mobile e.g. "5/1 (Fri)". */
  dateDisplayCompact?: ReactNode
  copy?: Partial<ReservationPageHeaderCopy>
  onPrev?: () => void
  onNext?: () => void
  onToday?: () => void
  onPickDate?: () => void
  onNewBooking?: () => void
  /** Replace the new-booking button entirely. */
  newBookingSlot?: ReactNode
}

export const ReservationPageHeader = forwardRef<HTMLDivElement, ReservationPageHeaderProps>(
  (
    {
      dateDisplay,
      dateDisplayCompact,
      copy,
      onPrev,
      onNext,
      onToday,
      onPickDate,
      onNewBooking,
      newBookingSlot,
      className,
      ...props
    },
    ref,
  ) => {
    const L: ReservationPageHeaderCopy = { ...DEFAULT_COPY, ...copy }
    const compact = dateDisplayCompact ?? dateDisplay

    return (
      <div
        ref={ref}
        className={cn('mb-4 flex items-center justify-between gap-2 md:gap-3', className)}
        {...props}
      >
        <div className="flex min-w-0 items-center gap-1">
          <h1 className="hidden text-2xl font-semibold tracking-tight text-[var(--color-text)] md:block">
            {L.title}
          </h1>
          <button
            type="button"
            aria-label={L.prevLabel}
            onClick={onPrev}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-card-hover)]"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onPickDate}
            className="inline-flex h-8 min-w-0 items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 text-sm font-medium tabular-nums text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-card-hover)]"
          >
            <span className="truncate md:hidden">{compact}</span>
            <span className="hidden truncate md:inline">{dateDisplay}</span>
            <ChevronDown className="size-3.5 shrink-0 text-[var(--color-text-muted)]" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={L.nextLabel}
            onClick={onNext}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-card-hover)]"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onToday}
            className="ml-1 inline-flex h-8 shrink-0 items-center rounded-[var(--radius-sm)] px-3 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/10"
          >
            {L.todayLabel}
          </button>
        </div>
        {newBookingSlot ?? (
          <>
            <button
              type="button"
              aria-label={L.newReservationLabel}
              onClick={onNewBooking}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-hover)] md:hidden"
            >
              <CalendarPlus className="size-4" aria-hidden />
            </button>
            <Button onClick={onNewBooking} className="hidden gap-1.5 md:inline-flex">
              <CalendarPlus className="size-3.5" aria-hidden />
              {L.newReservationLabel}
            </Button>
          </>
        )}
      </div>
    )
  },
)
ReservationPageHeader.displayName = 'ReservationPageHeader'
