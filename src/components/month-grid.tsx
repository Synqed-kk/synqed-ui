import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Compact 7×N month calendar grid. Each cell shows a date number
// and an optional booking-density dot + count. Pure presenter;
// caller computes the cells (including overflow days from adjacent
// months) and passes them in.
// ------------------------------------------------------------

export type MonthDensityBucket = 'empty' | 'light' | 'medium' | 'busy'

const DENSITY_CLASS: Record<MonthDensityBucket, string> = {
  empty: 'bg-transparent',
  light: 'bg-[var(--color-success)]',
  medium: 'bg-[var(--color-accent)]',
  busy: 'bg-[var(--color-warning)]',
}

export interface MonthGridCell {
  /** Stable id for the cell (typically ISO date). */
  id: string
  date: Date
  /** When false, the cell is dimmed as overflow from adjacent months. */
  inMonth: boolean
  /** When true, the cell ring/halo highlights as today. */
  isToday: boolean
  count: number
  density: MonthDensityBucket
}

export interface MonthGridCopy {
  weekdayLabels: [string, string, string, string, string, string, string]
  legendLight: string
  legendMedium: string
  legendBusy: string
}

const DEFAULT_COPY: MonthGridCopy = {
  weekdayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  legendLight: 'Light',
  legendMedium: 'Medium',
  legendBusy: 'Busy',
}

interface MonthGridProps extends HTMLAttributes<HTMLElement> {
  cells: MonthGridCell[]
  copy?: Partial<MonthGridCopy>
  onPickDay?: (date: Date) => void
  /** Hide the bottom density legend strip. */
  hideLegend?: boolean
}

export const MonthGrid = forwardRef<HTMLElement, MonthGridProps>(
  ({ cells, copy, onPickDay, hideLegend, className, ...props }, ref) => {
    const L: MonthGridCopy = {
      ...DEFAULT_COPY,
      ...copy,
      weekdayLabels: copy?.weekdayLabels ?? DEFAULT_COPY.weekdayLabels,
    }

    return (
      <section
        ref={ref}
        className={cn(
          'overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-bg-card)] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
          className,
        )}
        {...props}
      >
        <div className="grid grid-cols-7 border-b border-black/5">
          {L.weekdayLabels.map((label, i) => (
            <div
              key={label}
              className={cn(
                'px-2 py-2 text-center text-[11px] font-medium tabular-nums',
                i === 5
                  ? 'text-[var(--color-accent)]'
                  : i === 6
                    ? 'text-[var(--color-destructive)]'
                    : 'text-[var(--color-text-muted)]',
              )}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((cell) => {
            const dayOfWeek = cell.date.getDay()
            return (
              <button
                key={cell.id}
                type="button"
                onClick={() => onPickDay?.(cell.date)}
                aria-label={`${cell.id} · ${cell.count} bookings`}
                className={cn(
                  'relative flex aspect-square min-h-[64px] flex-col items-start gap-1 border-l border-t border-black/5 px-2 py-2 text-left transition-colors',
                  '[&:nth-child(7n+1)]:border-l-0',
                  'hover:bg-[var(--color-bg-card-hover)]',
                  !cell.inMonth && 'bg-[var(--color-bg-muted)]/40',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-6 items-center justify-center rounded-full text-[13px] font-medium leading-none tabular-nums',
                    cell.isToday
                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                      : !cell.inMonth
                        ? 'text-[var(--color-text-muted)]/60'
                        : dayOfWeek === 0
                          ? 'text-[var(--color-destructive)]'
                          : dayOfWeek === 6
                            ? 'text-[var(--color-accent)]'
                            : 'text-[var(--color-text)]',
                  )}
                >
                  {cell.date.getDate()}
                </span>

                {cell.count > 0 && cell.inMonth && (
                  <div className="mt-auto flex items-center gap-1.5">
                    {cell.density !== 'empty' && (
                      <span
                        className={cn(
                          'inline-block size-1.5 rounded-full',
                          DENSITY_CLASS[cell.density],
                        )}
                        aria-hidden
                      />
                    )}
                    <span className="text-[10px] font-medium leading-none tabular-nums text-[var(--color-text)]/80">
                      {cell.count}
                    </span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {!hideLegend && (
          <div className="flex flex-wrap items-center gap-3 border-t border-black/5 px-3 py-2 text-[10px] text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1">
              <span
                className={cn('inline-block size-1.5 rounded-full', DENSITY_CLASS.light)}
                aria-hidden
              />
              {L.legendLight}
            </span>
            <span className="inline-flex items-center gap-1">
              <span
                className={cn('inline-block size-1.5 rounded-full', DENSITY_CLASS.medium)}
                aria-hidden
              />
              {L.legendMedium}
            </span>
            <span className="inline-flex items-center gap-1">
              <span
                className={cn('inline-block size-1.5 rounded-full', DENSITY_CLASS.busy)}
                aria-hidden
              />
              {L.legendBusy}
            </span>
          </div>
        )}
      </section>
    )
  },
)
MonthGrid.displayName = 'MonthGrid'
