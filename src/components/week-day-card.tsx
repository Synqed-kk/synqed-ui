import { BellRing, ChevronRight, Circle, ShieldAlert, Sparkles } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Single day card in the week-overview view. Pure presenter.
// Caller owns booking summary aggregation; this component just
// displays counts, utilization, flag chips, and chip rows.
// ------------------------------------------------------------

export interface WeekDayBookingChip {
  id: string
  startTime: string
  /** First-name or short label for the customer (caller pre-shortens). */
  shortName: string
  /** CSS color value for the staff dot. */
  staffColor?: string
}

export interface WeekDayCardData {
  dateNumber: number
  monthNumber: number
  weekdayLabel: string
  isToday?: boolean
  /** Overall booking count for the day. */
  count: number
  /** Booked minutes — used for utilization calc. */
  bookedMinutes: number
  /** Available minutes for the day (zero = closed). */
  availableMinutes: number
  /** Number of new-customer bookings (drives the chip). */
  newCustomerCount: number
  /** Reminder-pending count. */
  remindersPending: number
  /** Consent-not-yet-granted count. */
  consentPending: number
  /** Unconfirmed bookings count. */
  unconfirmed: number
  /** Booking chips to render — caller passes only the visible window. */
  visibleBookings: WeekDayBookingChip[]
  /** Hidden count (rest beyond `visibleBookings`). */
  hiddenCount: number
}

export interface WeekDayCardCopy {
  todayBadge: string
  bookingsCountSuffix: string
  utilizedLabel: string
  openLabel: string
  newLabel: string
  reminderLabel: string
  consentLabel: string
  pendingLabel: string
  emptyLabel: string
  moreLabel: string
}

const DEFAULT_COPY: WeekDayCardCopy = {
  todayBadge: 'Today',
  bookingsCountSuffix: ' bookings',
  utilizedLabel: 'utilized',
  openLabel: 'open',
  newLabel: 'new',
  reminderLabel: 'reminders',
  consentLabel: 'consent',
  pendingLabel: 'pending',
  emptyLabel: 'No bookings',
  moreLabel: 'more',
}

interface WeekDayCardProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  data: WeekDayCardData
  copy?: Partial<WeekDayCardCopy>
  /** Format minutes-of-open-time, e.g. `2h 30m`. Default = `Hh Mm`. */
  formatOpenDuration?: (minutes: number) => string
  /** Tap to expand. */
  onPick?: () => void
  /** Tap "more" to expand. */
  onMore?: () => void
}

function defaultFormatOpen(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const r = minutes % 60
  if (h === 0) return `${r}m`
  if (r === 0) return `${h}h`
  return `${h}h ${r}m`
}

export const WeekDayCard = forwardRef<HTMLElement, WeekDayCardProps>(
  ({ data, copy, formatOpenDuration = defaultFormatOpen, onPick, onMore, className, ...props }, ref) => {
    const L: WeekDayCardCopy = { ...DEFAULT_COPY, ...copy }
    const utilization =
      data.availableMinutes > 0
        ? Math.round((data.bookedMinutes / data.availableMinutes) * 100)
        : 0
    const openMinutes = Math.max(0, data.availableMinutes - data.bookedMinutes)

    return (
      <article
        ref={ref}
        className={cn(
          'flex flex-col rounded-[var(--radius-lg)] border bg-[var(--color-bg-card)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
          data.isToday
            ? 'border-[var(--color-accent)]/40'
            : 'border-[var(--color-border)]',
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={onPick}
          className="w-full rounded-t-[var(--radius-lg)] border-b border-[var(--color-border)] p-3 text-left transition-colors hover:bg-[var(--color-bg-card-hover)] md:p-3.5"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[22px] font-semibold leading-none tabular-nums text-[var(--color-text)]">
                  {data.dateNumber}
                </span>
                <span className="text-[12px] leading-none tabular-nums text-[var(--color-text-muted)]">
                  /{data.monthNumber}
                </span>
                <span className="ml-1 text-[12px] font-medium leading-none text-[var(--color-text-muted)]">
                  {data.weekdayLabel}
                </span>
              </div>
              {data.isToday && (
                <span className="mt-1.5 inline-flex h-4 items-center rounded-full bg-[var(--color-accent)] px-1.5 text-[9px] font-semibold uppercase leading-none tracking-wider text-[var(--color-accent-text)]">
                  {L.todayBadge}
                </span>
              )}
            </div>
            <ChevronRight className="mt-1 size-4 shrink-0 text-[var(--color-text-muted)]" aria-hidden />
          </div>
        </button>

        <div className="flex-1 space-y-2 p-3 md:p-3.5">
          {data.count === 0 ? (
            <div className="text-[11px] italic text-[var(--color-text-muted)]">
              {L.emptyLabel}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-bg-muted)] px-2 text-[11px] font-medium tabular-nums text-[var(--color-text)]">
                  {data.count}
                  {L.bookingsCountSuffix}
                </span>
                <UtilizationChip pct={utilization} label={L.utilizedLabel} />
                {openMinutes > 0 && (
                  <span className="text-[10px] tabular-nums text-[var(--color-text-muted)]">
                    {formatOpenDuration(openMinutes)} {L.openLabel}
                  </span>
                )}
              </div>

              {data.newCustomerCount + data.remindersPending + data.consentPending + data.unconfirmed >
                0 && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px]">
                  {data.newCustomerCount > 0 && (
                    <FlagChip
                      tone="success"
                      icon={<Sparkles className="size-2.5" />}
                      text={`${data.newCustomerCount} ${L.newLabel}`}
                    />
                  )}
                  {data.remindersPending > 0 && (
                    <FlagChip
                      tone="warning"
                      icon={<BellRing className="size-2.5" />}
                      text={`${data.remindersPending} ${L.reminderLabel}`}
                    />
                  )}
                  {data.consentPending > 0 && (
                    <FlagChip
                      tone="muted"
                      icon={<ShieldAlert className="size-2.5" />}
                      text={`${data.consentPending} ${L.consentLabel}`}
                    />
                  )}
                  {data.unconfirmed > 0 && (
                    <FlagChip
                      tone="warning"
                      icon={<Circle className="size-2.5" />}
                      text={`${data.unconfirmed} ${L.pendingLabel}`}
                    />
                  )}
                </div>
              )}

              <div className="space-y-1 pt-1">
                {data.visibleBookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-2 text-[11px] leading-tight">
                    <span
                      aria-hidden
                      className="inline-block size-1.5 shrink-0 rounded-full"
                      style={{ background: b.staffColor ?? 'var(--color-accent)' }}
                    />
                    <span className="w-10 shrink-0 tabular-nums text-[var(--color-text-muted)]">
                      {b.startTime}
                    </span>
                    <span className="truncate text-[var(--color-text)]">{b.shortName}</span>
                  </div>
                ))}
                {data.hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={onMore ?? onPick}
                    className="text-[10px] font-medium text-[var(--color-accent)] transition-colors hover:opacity-80"
                  >
                    +{data.hiddenCount} {L.moreLabel}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    )
  },
)
WeekDayCard.displayName = 'WeekDayCard'

// ------------------------------------------------------------

function UtilizationChip({ pct, label }: { pct: number; label: string }) {
  const tone =
    pct === 0
      ? 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]'
      : pct < 30
        ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
        : pct < 70
          ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
          : 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]'
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center rounded-full px-2 text-[11px] font-medium tabular-nums',
        tone,
      )}
    >
      {pct}% {label}
    </span>
  )
}

function FlagChip({
  tone,
  icon,
  text,
}: {
  tone: 'success' | 'warning' | 'muted'
  icon: ReactNode
  text: string
}) {
  const cls =
    tone === 'success'
      ? 'text-[var(--color-success)]'
      : tone === 'warning'
        ? 'text-[var(--color-warning)]'
        : 'text-[var(--color-text-muted)]'
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap', cls)}>
      {icon}
      {text}
    </span>
  )
}
