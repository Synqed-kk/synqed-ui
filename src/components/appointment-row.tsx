import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { SignalChip, type SignalTone } from './signal-chip.js'

export interface AppointmentRowData {
  time: string
  durationMinutes: number
  customerName: string
  service: string
  staffName: string
  statusLabel: string
  statusTone: SignalTone
  karuteNumber?: string
  isNew?: boolean
  isActive?: boolean
}

interface AppointmentRowProps extends HTMLAttributes<HTMLDivElement> {
  appointment: AppointmentRowData
  honorific?: string
  minutesSuffix?: string
  newLabel?: string
  renderKaruteNumber?: (value: string) => ReactNode
}

export const AppointmentRow = forwardRef<HTMLDivElement, AppointmentRowProps>(
  (
    {
      appointment,
      honorific = '',
      minutesSuffix = ' min',
      newLabel = 'New',
      renderKaruteNumber,
      className,
      ...props
    },
    ref,
  ) => {
    const { time, durationMinutes, customerName, service, staffName, statusLabel, statusTone, karuteNumber, isNew, isActive } =
      appointment
    return (
      <div
        ref={ref}
        className={cn(
          'group flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border px-3 py-2.5 transition-colors',
          isActive
            ? 'border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10'
            : 'border-transparent hover:bg-[var(--color-bg-card-hover)]',
          className,
        )}
        {...props}
      >
        <div className="w-14 shrink-0 text-sm tabular-nums">
          <div className="font-semibold text-[var(--color-text)]">{time}</div>
          <div className="text-[11px] text-[var(--color-text-muted)]">
            {durationMinutes}
            {minutesSuffix}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-medium text-[var(--color-text)]">{customerName}</span>
            {honorific && <span className="shrink-0 text-xs text-[var(--color-text-muted)]">{honorific}</span>}
            {karuteNumber && renderKaruteNumber ? renderKaruteNumber(karuteNumber) : null}
            {isNew && (
              <span className="inline-flex h-4 shrink-0 items-center rounded border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-1.5 text-[10px] font-medium text-[var(--color-accent)]">
                {newLabel}
              </span>
            )}
          </div>
          <div className="mt-0.5 truncate text-xs text-[var(--color-text-muted)]">
            {service} · {staffName}
          </div>
        </div>
        <SignalChip tone={statusTone} label={statusLabel} className="shrink-0" />
      </div>
    )
  },
)
AppointmentRow.displayName = 'AppointmentRow'
