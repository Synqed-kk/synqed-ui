import { Mail, Pencil, Phone, ShieldCheck } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Avatar } from './avatar.js'
import {
  ConversionStatusChip,
  type ConversionStatus,
  type ConversionStatusCopy,
} from './conversion-status-chip.js'
import { KaruteNumberBadge } from './karute-number-badge.js'

// ------------------------------------------------------------
// Karute-detail header card — session-scoped customer summary
// pinned at the top of the karute page. Includes service +
// session date + an optional "change conversion status" link.
// ------------------------------------------------------------

export interface CustomerHeaderCardCopy {
  honorific: string
  staffPrefix: string
  changeStatusLabel: string
  editLabel: string
  editAriaLabel: string
  recordingConsentGranted: string
  recordingConsentDeclined: string
  /** Builder for the "N visit" suffix. Receives the visit ordinal. */
  visitOrdinal: (n: number) => string
  /** Builder for the trailing "last visit" caption. */
  lastVisitCaption: (date: string, daysAgo: number) => string
  conversionCopy?: Partial<ConversionStatusCopy>
}

const DEFAULT_COPY: CustomerHeaderCardCopy = {
  honorific: '',
  staffPrefix: 'Staff',
  changeStatusLabel: 'Change status',
  editLabel: 'Edit',
  editAriaLabel: 'Edit customer',
  recordingConsentGranted: 'Recording consent',
  recordingConsentDeclined: 'Recording declined',
  visitOrdinal: (n) => `${n} visits`,
  lastVisitCaption: (date, daysAgo) => `${date} · ${daysAgo}d ago`,
}

interface CustomerHeaderCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  initials: string
  age: number | string
  gender: string
  visitCount: number
  lastVisitDate: string
  lastVisitDaysAgo: number
  staffName: string
  service: string
  sessionDate: string
  karuteNumber?: string
  phone?: string | null
  email?: string | null
  conversionStatus?: ConversionStatus
  /** When set, renders a "change status" inline button after the chip. */
  onChangeStatus?: () => void
  recordingConsent?: { granted: boolean; tooltip?: string }
  copy?: Partial<CustomerHeaderCardCopy>
  onEdit?: () => void
  /** Optional content rendered after the contact row, e.g. tags. */
  trailingSlot?: ReactNode
}

export const CustomerHeaderCard = forwardRef<HTMLDivElement, CustomerHeaderCardProps>(
  (
    {
      name,
      initials,
      age,
      gender,
      visitCount,
      lastVisitDate,
      lastVisitDaysAgo,
      staffName,
      service,
      sessionDate,
      karuteNumber,
      phone,
      email,
      conversionStatus,
      onChangeStatus,
      recordingConsent,
      copy,
      onEdit,
      trailingSlot,
      className,
      ...props
    },
    ref,
  ) => {
    const L: CustomerHeaderCardCopy = { ...DEFAULT_COPY, ...copy }
    const showChangeStatus =
      !!onChangeStatus &&
      (conversionStatus === 'provisional' || conversionStatus === 'declined')

    return (
      <div
        ref={ref}
        className={cn(
          'border-b border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-4 md:px-6 md:py-5',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <Avatar
            initials={initials}
            size="md"
            className="size-11 shrink-0 md:size-14"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-baseline gap-2">
                <h1 className="truncate text-[22px] font-semibold leading-tight tracking-tight text-[var(--color-text)] md:text-2xl">
                  {name}
                </h1>
                {L.honorific && (
                  <span className="text-[15px] leading-tight text-[var(--color-text-muted)] md:text-lg">
                    {L.honorific}
                  </span>
                )}
                {karuteNumber && <KaruteNumberBadge value={karuteNumber} size="md" />}
                <ConversionStatusChip
                  status={conversionStatus}
                  showActive={
                    conversionStatus === 'provisional' || conversionStatus === 'declined'
                  }
                  copy={L.conversionCopy}
                />
                {showChangeStatus && (
                  <button
                    type="button"
                    onClick={onChangeStatus}
                    className="text-[11px] font-medium text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-accent-hover)]"
                  >
                    {L.changeStatusLabel}
                  </button>
                )}
                {recordingConsent && (
                  <span
                    className={cn(
                      'inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[10px] font-medium',
                      recordingConsent.granted
                        ? 'border-[var(--color-success)]/20 bg-[var(--color-success)]/10 text-[var(--color-success)]'
                        : 'border-[var(--color-destructive)]/20 bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]',
                    )}
                    title={recordingConsent.tooltip}
                  >
                    <ShieldCheck className="size-2.5" aria-hidden />
                    {recordingConsent.granted
                      ? L.recordingConsentGranted
                      : L.recordingConsentDeclined}
                  </span>
                )}
              </div>
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  aria-label={L.editAriaLabel}
                  className="inline-flex h-8 shrink-0 items-center gap-1 rounded-[var(--radius-sm)] px-2.5 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
                >
                  <Pencil className="size-3.5" aria-hidden />
                  <span className="hidden sm:inline">{L.editLabel}</span>
                </button>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--color-text-muted)]">
              <span className="tabular-nums">
                {age} · {gender}
              </span>
              <span className="text-[var(--color-border-strong)]">·</span>
              <span className="tabular-nums">{L.visitOrdinal(visitCount)}</span>
              <span className="text-[var(--color-border-strong)]">·</span>
              <span className="tabular-nums">
                {L.lastVisitCaption(lastVisitDate, lastVisitDaysAgo)}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-sm">
              <span className="font-medium text-[var(--color-text)]">{service}</span>
              <span className="text-[var(--color-border-strong)]">·</span>
              <span className="tabular-nums text-[var(--color-text-muted)]">{sessionDate}</span>
              <span className="text-[var(--color-border-strong)]">·</span>
              <span className="text-[var(--color-text-muted)]">
                {L.staffPrefix}{' '}
                <span className="text-[var(--color-text)]/85">{staffName}</span>
              </span>
            </div>

            {(phone || email) && (
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-text)]"
                  >
                    <Phone className="size-3 shrink-0" aria-hidden />
                    <span className="tabular-nums">{phone}</span>
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex max-w-[260px] items-center gap-1 truncate transition-colors hover:text-[var(--color-text)]"
                  >
                    <Mail className="size-3 shrink-0" aria-hidden />
                    <span className="truncate">{email}</span>
                  </a>
                )}
              </div>
            )}

            {trailingSlot}
          </div>
        </div>
      </div>
    )
  },
)
CustomerHeaderCard.displayName = 'CustomerHeaderCard'
