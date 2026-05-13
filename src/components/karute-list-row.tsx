import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Avatar } from './avatar.js'
import { AIStatusChip, type AIStatusTone } from './ai-status-chip.js'
import {
  ConversionStatusChip,
  type ConversionStatus,
  type ConversionStatusCopy,
} from './conversion-status-chip.js'
import { KaruteNumberBadge } from './karute-number-badge.js'

// ------------------------------------------------------------
// Karute (session record) list row.
// ------------------------------------------------------------

export interface KaruteListRowData {
  id: string
  date: string
  /** Display variant of the date e.g. "04/19" — already localized. */
  dateDisplay: string
  weekday: string
  customerName: string
  customerInitials: string
  karuteNumber?: string
  service: string
  duration: number
  staffName: string
  summary: string
  entryCount: number
  aiStatusTone: AIStatusTone
  aiStatusLabel: string
  conversionStatus?: ConversionStatus
  /** Per-staff accent color for the left stripe (CSS color value). */
  staffStripeColor?: string
  /** Hide PII / replace name with anonymized label. */
  masked?: boolean
  maskedDisplayName?: string
  maskedSummary?: string
}

export interface KaruteListRowCopy {
  honorific: string
  staffPrefix: string
  minutesSuffix: string
  weekdaySuffix: string
  entryCountSuffix: string
  conversion?: Partial<ConversionStatusCopy>
}

const DEFAULT_COPY: KaruteListRowCopy = {
  honorific: '',
  staffPrefix: 'Staff: ',
  minutesSuffix: ' min',
  weekdaySuffix: '',
  entryCountSuffix: ' entries',
}

interface KaruteListRowProps extends HTMLAttributes<HTMLDivElement> {
  item: KaruteListRowData
  copy?: Partial<KaruteListRowCopy>
  asLink?: (children: ReactNode) => ReactNode
}

export const KaruteListRow = forwardRef<HTMLDivElement, KaruteListRowProps>(
  ({ item, copy, asLink, className, ...props }, ref) => {
    const L: KaruteListRowCopy = { ...DEFAULT_COPY, ...copy }
    const masked = item.masked
    const displayName = masked ? item.maskedDisplayName ?? 'Session' : item.customerName
    const displaySummary = masked
      ? item.maskedSummary ?? 'Details managed by assigned staff'
      : item.summary

    const inner = (
      <div
        ref={ref}
        className={cn(
          'group relative flex min-h-[60px] items-center gap-3 border-b border-[var(--color-border)] px-4 py-3 last:border-b-0',
          'transition-colors hover:bg-[var(--color-bg-card-hover)]',
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full"
          style={{ background: item.staffStripeColor ?? 'var(--color-accent)' }}
        />

        <div className="hidden w-14 shrink-0 text-center md:block">
          <div className="text-sm font-semibold tabular-nums text-[var(--color-text)]">
            {item.dateDisplay}
          </div>
          <div className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
            {item.weekday}
            {L.weekdaySuffix}
          </div>
        </div>

        <Avatar
          initials={masked ? '—' : item.customerInitials}
          size="sm"
          className="size-8 shrink-0 text-xs"
          color={masked ? 'var(--color-bg-muted)' : undefined}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                'min-w-0 truncate text-sm font-medium',
                masked ? 'italic text-[var(--color-text-muted)]' : 'text-[var(--color-text)]',
              )}
            >
              {displayName}
            </span>
            {!masked && L.honorific && (
              <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
                {L.honorific}
              </span>
            )}
            {!masked && item.karuteNumber && (
              <KaruteNumberBadge value={item.karuteNumber} />
            )}
          </div>
          <p className="mt-0.5 truncate text-[11px] text-[var(--color-text-muted)]">
            {displaySummary}
          </p>
        </div>

        <div className="hidden w-[200px] min-w-0 shrink-0 md:block">
          <div className="truncate text-xs text-[var(--color-text)]">{item.service}</div>
          <div className="mt-0.5 text-[11px] tabular-nums text-[var(--color-text-muted)]">
            {item.duration}
            {L.minutesSuffix} · {item.entryCount}
            {L.entryCountSuffix}
          </div>
        </div>

        <div className="hidden w-[140px] shrink-0 flex-wrap items-center justify-start gap-1.5 md:flex">
          <ConversionStatusChip status={item.conversionStatus} copy={L.conversion} />
          <AIStatusChip tone={item.aiStatusTone} label={item.aiStatusLabel} />
        </div>

        <div className="hidden w-[120px] shrink-0 truncate text-[11px] text-[var(--color-text-muted)] md:block">
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden
              className="inline-block size-1.5 rounded-full"
              style={{ background: item.staffStripeColor ?? 'var(--color-accent)' }}
            />
            {L.staffPrefix}
            {item.staffName}
          </span>
        </div>
      </div>
    )

    return asLink ? <>{asLink(inner)}</> : inner
  },
)
KaruteListRow.displayName = 'KaruteListRow'
