import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Horizontal time axis — hour labels across the top of a Gantt
// schedule. Pairs with StaffRow / ReservationGrid.
// ------------------------------------------------------------

interface TimeAxisProps extends HTMLAttributes<HTMLDivElement> {
  startHour: number
  /** Inclusive end hour shown as a label. Range = endHour - startHour. */
  endHour: number
  hourWidth: number
  /** Format a 24-hour integer to the displayed label. Default `HH:00`. */
  formatHour?: (hour: number) => string
}

const defaultFormat = (h: number) => `${h.toString().padStart(2, '0')}:00`

export const TimeAxis = forwardRef<HTMLDivElement, TimeAxisProps>(
  ({ startHour, endHour, hourWidth, formatHour = defaultFormat, className, ...props }, ref) => {
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
    return (
      <div
        ref={ref}
        className={cn(
          'relative h-8 border-b border-[var(--color-border)] bg-[var(--color-bg-muted)]',
          className,
        )}
        {...props}
      >
        {hours.map((hour, i) => (
          <div
            key={hour}
            className="absolute bottom-0 top-0 flex items-center"
            style={{ left: `${i * hourWidth}px`, width: `${hourWidth}px` }}
          >
            <span className="px-2 text-[11px] tabular-nums text-[var(--color-text-muted)]">
              {formatHour(hour)}
            </span>
          </div>
        ))}
        {hours.slice(1).map((hour, i) => (
          <div
            key={`tick-${hour}`}
            className="absolute bottom-0 top-0 w-px bg-[var(--color-border)]"
            style={{ left: `${(i + 1) * hourWidth}px` }}
          />
        ))}
      </div>
    )
  },
)
TimeAxis.displayName = 'TimeAxis'
