import { ArrowRight, Clock } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Dashboard "today's appointments" card — wraps a list of
// appointment rows (any presenter the caller chooses) with a
// header showing completed-vs-total and a "show all" link.
// ------------------------------------------------------------

export interface TodaysAppointmentsCopy {
  title: string
  showAll: string
}

const DEFAULT_COPY: TodaysAppointmentsCopy = {
  title: "Today's appointments",
  showAll: 'Show all',
}

interface TodaysAppointmentsProps extends HTMLAttributes<HTMLElement> {
  /** Total appointment count for the count chip. */
  total: number
  /** Number completed (left side of the count chip). */
  completed: number
  /** Pre-rendered rows. Caller composes AppointmentRow / their own row component. */
  children: ReactNode
  copy?: Partial<TodaysAppointmentsCopy>
  showAllSlot?: (children: ReactNode) => ReactNode
  onShowAll?: () => void
}

export const TodaysAppointments = forwardRef<HTMLElement, TodaysAppointmentsProps>(
  ({ total, completed, children, copy, showAllSlot, onShowAll, className, ...props }, ref) => {
    const L: TodaysAppointmentsCopy = { ...DEFAULT_COPY, ...copy }

    const showAllInner = (
      <span className="inline-flex items-center gap-0.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
        {L.showAll}
        <ArrowRight className="size-3" aria-hidden />
      </span>
    )

    return (
      <section
        ref={ref}
        className={cn(
          'rounded-[var(--radius-xl)] bg-[var(--color-bg-card)] p-4 ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
          className,
        )}
        {...props}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-[var(--color-accent)]" aria-hidden />
            <h3 className="text-sm font-semibold text-[var(--color-text)]">{L.title}</h3>
            <span className="text-xs tabular-nums text-[var(--color-text-muted)]">
              {completed} / {total}
            </span>
          </div>
          {showAllSlot ? (
            showAllSlot(showAllInner)
          ) : (
            <button type="button" onClick={onShowAll} className="contents">
              {showAllInner}
            </button>
          )}
        </div>
        <div className="space-y-0.5">{children}</div>
      </section>
    )
  },
)
TodaysAppointments.displayName = 'TodaysAppointments'
