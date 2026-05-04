import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Day / Week / Month segmented toggle. Mirrors the pill aesthetic
// of ViewModeSelector so the two read as siblings in a filter row.
// ------------------------------------------------------------

export type DayWeekMonthView = 'day' | 'week' | 'month'

export interface DayWeekMonthToggleCopy {
  day: string
  week: string
  month: string
}

const DEFAULT_COPY: DayWeekMonthToggleCopy = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
}

interface DayWeekMonthToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  view: DayWeekMonthView
  onChange: (view: DayWeekMonthView) => void
  copy?: Partial<DayWeekMonthToggleCopy>
}

export function DayWeekMonthToggle({
  view,
  onChange,
  copy,
  className,
  ...props
}: DayWeekMonthToggleProps) {
  const L: DayWeekMonthToggleCopy = { ...DEFAULT_COPY, ...copy }
  const items: { value: DayWeekMonthView; label: string }[] = [
    { value: 'day', label: L.day },
    { value: 'week', label: L.week },
    { value: 'month', label: L.month },
  ]
  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-0.5',
        className,
      )}
      {...props}
    >
      {items.map((it) => {
        const active = view === it.value
        return (
          <button
            key={it.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(it.value)}
            className={cn(
              'inline-flex h-8 items-center rounded-[var(--radius-sm)] px-3 text-[13px] font-medium transition-colors',
              active
                ? 'bg-[var(--color-bg-card)] text-[var(--color-text)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
            )}
          >
            {it.label}
          </button>
        )
      })}
    </div>
  )
}
