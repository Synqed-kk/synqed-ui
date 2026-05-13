import { AlertCircle, Mic } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Single booking card positioned absolutely in the reservation
// Gantt grid. Pure presenter — caller positions, picks tone, and
// supplies callbacks. Privacy/masking is the caller's job.
// ------------------------------------------------------------

export type AppointmentCardStatus =
  | 'booked'
  | 'in_progress'
  | 'completed'
  | 'new_customer'
  | 'pending'

const STATUS_TONE: Record<
  AppointmentCardStatus,
  { bg: string; border: string; accent: string; chip: string }
> = {
  booked: {
    bg: 'bg-[var(--color-success)]/10',
    border: 'border-[var(--color-success)]/30',
    accent: 'bg-[var(--color-success)]',
    chip: 'bg-[var(--color-success)] text-[var(--color-text-inverse)]',
  },
  in_progress: {
    bg: 'bg-[var(--color-warning)]/15',
    border: 'border-[var(--color-warning)]',
    accent: 'bg-[var(--color-warning)]',
    chip: 'bg-[var(--color-warning)] text-[var(--color-text-inverse)]',
  },
  completed: {
    bg: 'bg-[var(--color-bg-muted)]',
    border: 'border-[var(--color-border-strong)]',
    accent: 'bg-[var(--color-border-strong)]',
    chip: 'bg-[var(--color-bg-muted)] text-[var(--color-text)]/80',
  },
  new_customer: {
    bg: 'bg-[var(--color-accent)]/10',
    border: 'border-[var(--color-accent)] [border-style:dashed]',
    accent: 'bg-[var(--color-accent)]',
    chip: 'bg-[var(--color-accent)] text-[var(--color-accent-text)]',
  },
  pending: {
    bg: 'bg-[var(--color-warning)]/10',
    border: 'border-[var(--color-warning)]/30 [border-style:dashed]',
    accent: 'bg-[var(--color-warning)]',
    chip: 'bg-[var(--color-warning)]/30 text-[var(--color-warning)]',
  },
}

export interface AppointmentCardData {
  id: string
  /** Display name (already masked by caller if applicable). */
  displayName: string
  service: string
  /** "HH:MM" format. */
  startTime: string
  /** "HH:MM" format. */
  endTime: string
  durationMinutes: number
  status: AppointmentCardStatus
  statusLabel: string
  /** When set, surfaces the AI alert icon with this text as title. */
  aiFlag?: string
  /** True when the recording mic should be tappable (e.g. consent + not done). */
  canRecord?: boolean
  /** True when the customer has granted recording consent (mic shown read-only). */
  recordingConsentGranted?: boolean
}

interface AppointmentCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  appointment: AppointmentCardData
  /** Pixel left offset within the lane. */
  leftOffset: number
  /** Pixel width of the card. */
  width: number
  /** Lane row height — the card is positioned with 4px insets. */
  rowHeight: number
  /** Title attribute (optional pre-formatted tooltip). */
  hoverTitle?: string
  /** Honorific suffix appended to the name e.g. " 様". */
  honorific?: string
  minutesSuffix?: string
  /** Aria/title hint on the recording mic button. */
  recordTitle?: string
  onClick?: () => void
  onStartRecord?: () => void
}

export const AppointmentCard = forwardRef<HTMLDivElement, AppointmentCardProps>(
  (
    {
      appointment,
      leftOffset,
      width,
      rowHeight,
      hoverTitle,
      honorific = '',
      minutesSuffix = ' min',
      recordTitle,
      onClick,
      onStartRecord,
      className,
      ...props
    },
    ref,
  ) => {
    const tone = STATUS_TONE[appointment.status]
    const tight = width < 90
    const isLive = appointment.status === 'in_progress'

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick?.()
      }
    }

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'group absolute overflow-hidden rounded-[var(--radius-md)] border text-left transition-all',
          'cursor-pointer hover:z-10 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
          tone.bg,
          tone.border,
          className,
        )}
        style={{
          left: `${leftOffset + 2}px`,
          width: `${width - 4}px`,
          top: '4px',
          height: `${rowHeight - 8}px`,
        }}
        title={hoverTitle}
        {...props}
      >
        <div className={cn('absolute bottom-0 left-0 top-0 w-[3px]', tone.accent)} aria-hidden />
        <div className="flex h-full min-w-0 flex-col py-1.5 pl-2.5 pr-1.5">
          <div className="flex min-w-0 items-start justify-between gap-1">
            <div className="min-w-0 truncate text-[11px] font-semibold text-[var(--color-text)]">
              {appointment.displayName}
              {honorific && (
                <span className="ml-0.5 font-normal text-[var(--color-text-muted)]">
                  {honorific}
                </span>
              )}
            </div>
            {!tight && (
              <span
                className={cn(
                  'inline-flex h-4 shrink-0 items-center rounded-full px-1 text-[9px] font-medium',
                  tone.chip,
                )}
              >
                {appointment.statusLabel}
              </span>
            )}
          </div>
          {!tight && (
            <div className="mt-0.5 truncate text-[10px] text-[var(--color-text)]/65">
              {appointment.service}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 truncate text-[10px] tabular-nums text-[var(--color-text-muted)]">
              <span>{appointment.startTime}</span>
              {!tight && (
                <>
                  <span className="text-[var(--color-border-strong)]">–</span>
                  <span>{appointment.endTime}</span>
                </>
              )}
              {width >= 70 && (
                <>
                  <span className="text-[var(--color-border-strong)]">·</span>
                  <span>
                    {appointment.durationMinutes}
                    {minutesSuffix}
                  </span>
                </>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              {appointment.aiFlag && (
                <span title={appointment.aiFlag} className="inline-flex items-center">
                  <AlertCircle className="size-2.5 text-[var(--color-destructive)]" aria-hidden />
                </span>
              )}
              {appointment.canRecord && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onStartRecord?.()
                  }}
                  title={recordTitle}
                  className="relative z-10 inline-flex size-5 items-center justify-center rounded-full hover:bg-[var(--color-bg-card)]/70"
                >
                  <Mic className="size-3 text-[var(--color-destructive)]" aria-hidden />
                </button>
              )}
              {appointment.recordingConsentGranted && !appointment.canRecord && (
                <span className="inline-flex items-center" title={recordTitle}>
                  <Mic className="size-2.5 text-[var(--color-success)]" aria-hidden />
                </span>
              )}
              {isLive && (
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-warning)] opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-warning)]" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)
AppointmentCard.displayName = 'AppointmentCard'
