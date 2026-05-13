import { AlertTriangle, Phone } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Avatar } from './avatar.js'
import {
  CustomerSignalChip,
  type CustomerSignalTone,
} from './customer-signal-chip.js'
import { KaruteNumberBadge } from './karute-number-badge.js'
import { VisitHistoryChain } from './visit-history-chain.js'

// ------------------------------------------------------------
// Customer list row — pure presenter. Privacy/masking and routing
// are caller responsibilities; this component just renders what
// it's given.
// ------------------------------------------------------------

export interface CustomerRowData {
  id: string
  name: string
  initials: string
  age: number | string
  gender: string
  registeredDate: string
  staffName: string
  karuteNumber?: string
  phone?: string | null
  email?: string | null
  signalTone: CustomerSignalTone
  signalLabel: string
  visitCount: number
  visitChain: boolean[]
  lastVisitDate: string
  lastVisitDaysAgo: number
  nextPredictedVisit?: string
  /** Per-staff accent color for the left stripe (CSS color value). */
  staffStripeColor?: string
  /** Hide PII / replace name with anonymized label. Caller decides. */
  masked?: boolean
  maskedDisplayName?: string
  /** Pending soft-delete UI. */
  pendingDeletion?: { daysRemaining: number }
}

export interface CustomerRowCopy {
  honorific: string
  metaSeparator: string
  joinedPrefix: string
  staffPrefix: string
  recommendVisitLabel: string
  daysAgoSuffix: string
  visitCountSuffix: string
  newLabel: string
  pendingLabel: (days: number) => string
  pendingTooltip: (days: number) => string
  maskedHint: string
}

const DEFAULT_COPY: CustomerRowCopy = {
  honorific: '',
  metaSeparator: ' · ',
  joinedPrefix: 'Joined ',
  staffPrefix: 'Staff: ',
  recommendVisitLabel: 'Next:',
  daysAgoSuffix: 'd ago',
  visitCountSuffix: ' visits',
  newLabel: 'New',
  pendingLabel: (days) => `Deletion ${days}d`,
  pendingTooltip: (days) => `Pending deletion — ${days}d left`,
  maskedHint: 'Details managed by owner',
}

interface CustomerRowProps extends HTMLAttributes<HTMLDivElement> {
  customer: CustomerRowData
  copy?: Partial<CustomerRowCopy>
  /** Optional render-prop wrapper — useful for routing. Default is a div. */
  asLink?: (children: ReactNode) => ReactNode
}

function lastVisitTint(daysAgo: number): string {
  if (daysAgo <= 14) return 'text-[var(--color-text)]'
  if (daysAgo <= 45) return 'text-[var(--color-text)]/80'
  if (daysAgo <= 90) return 'text-[var(--color-warning)]'
  return 'text-[var(--color-destructive)]'
}

export const CustomerRow = forwardRef<HTMLDivElement, CustomerRowProps>(
  ({ customer, copy, asLink, className, ...props }, ref) => {
    const L: CustomerRowCopy = { ...DEFAULT_COPY, ...copy }
    const c = customer
    const masked = c.masked
    const displayName = masked ? c.maskedDisplayName ?? 'Customer' : c.name
    const meta = `${c.age}${L.metaSeparator}${c.gender}${L.metaSeparator}${L.joinedPrefix}${c.registeredDate}`

    const inner = (
      <div
        ref={ref}
        className={cn(
          'group relative flex min-h-[64px] items-center gap-3 border-b border-[var(--color-border)] px-4 py-3 last:border-b-0',
          'transition-colors hover:bg-[var(--color-bg-card-hover)]',
          c.pendingDeletion && 'opacity-70',
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full"
          style={{ background: c.staffStripeColor ?? 'var(--color-accent)' }}
        />

        <Avatar
          initials={masked ? '—' : c.initials}
          size="sm"
          className="size-9 shrink-0"
          color={masked ? 'var(--color-bg-muted)' : undefined}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-1">
            <span
              className={cn(
                'truncate text-sm font-medium',
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
            {!masked && c.karuteNumber && <KaruteNumberBadge value={c.karuteNumber} />}
            {c.pendingDeletion && (
              <span
                className="inline-flex h-4 shrink-0 items-center gap-1 rounded border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-1.5 text-[10px] font-medium text-[var(--color-warning)]"
                title={L.pendingTooltip(c.pendingDeletion.daysRemaining)}
              >
                <AlertTriangle className="size-2.5" aria-hidden />
                {L.pendingLabel(c.pendingDeletion.daysRemaining)}
              </span>
            )}
          </div>
          <div className="mt-0.5 truncate text-[11px] tabular-nums text-[var(--color-text-muted)]">
            {masked ? L.maskedHint : meta}
          </div>
          {!masked && c.phone && (
            <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] tabular-nums text-[var(--color-text-muted)]">
              <Phone className="size-2.5 shrink-0" aria-hidden />
              <span>{c.phone}</span>
            </div>
          )}
        </div>

        <div className="hidden w-[100px] shrink-0 md:block">
          <VisitHistoryChain chain={c.visitChain} visitCount={c.visitCount} />
        </div>

        <div className="hidden w-[120px] shrink-0 text-xs tabular-nums md:block">
          <div className={lastVisitTint(c.lastVisitDaysAgo)}>{c.lastVisitDate}</div>
          <div className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
            {c.lastVisitDaysAgo}
            {L.daysAgoSuffix}
          </div>
        </div>

        <div className="hidden w-[100px] shrink-0 text-xs md:block">
          <div className="text-[11px] text-[var(--color-text-muted)]">
            {L.recommendVisitLabel}
          </div>
          <div className="mt-0.5 font-medium text-[var(--color-text)]">
            {masked ? '—' : c.nextPredictedVisit ?? '—'}
          </div>
        </div>

        <div className="hidden w-[90px] shrink-0 justify-start md:flex">
          <CustomerSignalChip tone={c.signalTone} label={c.signalLabel} />
        </div>

        <div className="hidden w-[120px] shrink-0 truncate text-[11px] text-[var(--color-text-muted)] md:block">
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden
              className="inline-block size-1.5 rounded-full"
              style={{ background: c.staffStripeColor ?? 'var(--color-accent)' }}
            />
            {L.staffPrefix}
            {c.staffName}
          </span>
        </div>

        <div className="hidden w-[52px] shrink-0 text-right md:block">
          <span className="inline-flex h-5 items-center rounded bg-[var(--color-bg-muted)] px-1.5 text-[11px] font-medium tabular-nums text-[var(--color-text)]/80">
            {c.visitCount}
            {L.visitCountSuffix}
          </span>
        </div>
      </div>
    )

    return asLink ? <>{asLink(inner)}</> : inner
  },
)
CustomerRow.displayName = 'CustomerRow'
