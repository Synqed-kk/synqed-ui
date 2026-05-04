import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import { Avatar } from './avatar.js'

// ------------------------------------------------------------
// Fixed left-column staff header for the reservation Gantt grid.
// Sibling of TimeAxis + StaffRow. Pure presenter.
// ------------------------------------------------------------

export interface StaffRowHeaderData {
  id: string
  name: string
  initials: string
  role: string
  takesBookings: boolean
}

interface StaffRowHeaderProps extends HTMLAttributes<HTMLDivElement> {
  staff: StaffRowHeaderData
  /** Booking count for the day (suffixed by `bookingCountSuffix`). */
  count: number
  rowHeight: number
  /** Optional accent color override (CSS color value). */
  accentColor?: string
  bookingCountSuffix?: string
}

export const StaffRowHeader = forwardRef<HTMLDivElement, StaffRowHeaderProps>(
  (
    { staff, count, rowHeight, accentColor, bookingCountSuffix = '', className, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'relative flex shrink-0 items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-muted)] px-3 last:border-b-0',
        className,
      )}
      style={{ height: `${rowHeight}px`, width: 180 }}
      {...props}
    >
      {staff.takesBookings && (
        <span
          aria-hidden
          className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full"
          style={{ background: accentColor ?? 'var(--color-accent)' }}
        />
      )}
      <Avatar
        initials={staff.initials}
        size="sm"
        className="size-9 text-xs"
        color={
          staff.takesBookings
            ? accentColor
            : 'var(--color-text)'
        }
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium leading-tight text-[var(--color-text)]">
          {staff.name}
        </div>
        <div className="truncate text-[11px] tabular-nums text-[var(--color-text-muted)]">
          {staff.role}
          {staff.takesBookings && (
            <>
              <span className="mx-1 text-[var(--color-border-strong)]">·</span>
              <span>
                {count}
                {bookingCountSuffix}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  ),
)
StaffRowHeader.displayName = 'StaffRowHeader'
