import { Calendar, Mail, Pencil, Phone, ShieldCheck, User } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import { Avatar } from './avatar.js'
import {
  CustomerSignalChip,
  type CustomerSignalTone,
} from './customer-signal-chip.js'
import { KaruteNumberBadge } from './karute-number-badge.js'

// ------------------------------------------------------------
// Customer profile header — identity, demographics, contact,
// preferred staff. Customer-scoped (not session-scoped); see
// CustomerHeaderCard for the karute-detail variant.
// ------------------------------------------------------------

export interface CustomerProfileIdentityCopy {
  honorific: string
  joinedPrefix: string
  visitsLabel: (n: number) => string
  preferredStaffLabel: string
  nextVisitLabel: string
  editLabel: string
  editAriaLabel: string
  recordingConsentGranted: string
  recordingConsentDeclined: string
}

const DEFAULT_COPY: CustomerProfileIdentityCopy = {
  honorific: '',
  joinedPrefix: 'Joined',
  visitsLabel: (n) => `${n} visits`,
  preferredStaffLabel: 'Preferred staff',
  nextVisitLabel: 'Next visit predicted:',
  editLabel: 'Edit',
  editAriaLabel: 'Edit customer',
  recordingConsentGranted: 'Recording consent',
  recordingConsentDeclined: 'Recording declined',
}

interface CustomerProfileIdentityProps extends HTMLAttributes<HTMLElement> {
  name: string
  initials: string
  age: number | string
  gender: string
  registeredDate: string
  visitCount: number
  staffName: string
  karuteNumber?: string
  signalTone: CustomerSignalTone
  signalLabel: string
  phone?: string | null
  email?: string | null
  nextPredictedVisit?: string
  /** Mode-C consent indicator. Set undefined to hide. */
  recordingConsent?: { granted: boolean; tooltip?: string }
  copy?: Partial<CustomerProfileIdentityCopy>
  onEdit?: () => void
}

export const CustomerProfileIdentity = forwardRef<HTMLElement, CustomerProfileIdentityProps>(
  (
    {
      name,
      initials,
      age,
      gender,
      registeredDate,
      visitCount,
      staffName,
      karuteNumber,
      signalTone,
      signalLabel,
      phone,
      email,
      nextPredictedVisit,
      recordingConsent,
      copy,
      onEdit,
      className,
      ...props
    },
    ref,
  ) => {
    const L: CustomerProfileIdentityCopy = { ...DEFAULT_COPY, ...copy }
    return (
      <section
        ref={ref}
        className={cn(
          'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 md:p-6',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-4 md:gap-5">
          <Avatar
            initials={initials}
            size="lg"
            className="size-14 shrink-0 md:size-20"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-baseline gap-2">
                <h1 className="truncate text-[22px] font-semibold leading-tight tracking-tight text-[var(--color-text)] md:text-[28px]">
                  {name}
                </h1>
                {L.honorific && (
                  <span className="text-base leading-tight text-[var(--color-text-muted)] md:text-lg">
                    {L.honorific}
                  </span>
                )}
                {karuteNumber && <KaruteNumberBadge value={karuteNumber} size="md" />}
                <CustomerSignalChip tone={signalTone} label={signalLabel} />
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

            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[13px] tabular-nums text-[var(--color-text-muted)]">
              <User className="size-3" aria-hidden />
              <span>
                {age} · {gender}
              </span>
              <span className="mx-1 text-[var(--color-border-strong)]">·</span>
              <Calendar className="size-3" aria-hidden />
              <span>
                {L.joinedPrefix} {registeredDate}
              </span>
              <span className="mx-1 text-[var(--color-border-strong)]">·</span>
              <span>{L.visitsLabel(visitCount)}</span>
            </div>

            {(phone || email) && (
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px]">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-[var(--color-text)]/85 transition-colors hover:text-[var(--color-text)]"
                  >
                    <Phone className="size-3.5" aria-hidden />
                    <span className="tabular-nums">{phone}</span>
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex max-w-[300px] items-center gap-1.5 truncate text-[var(--color-text)]/85 transition-colors hover:text-[var(--color-text)]"
                  >
                    <Mail className="size-3.5" aria-hidden />
                    <span className="truncate">{email}</span>
                  </a>
                )}
              </div>
            )}

            <div className="mt-3 text-xs text-[var(--color-text-muted)]">
              <span className="font-medium">{L.preferredStaffLabel}</span>{' '}
              <span className="text-[var(--color-text)]/85">{staffName}</span>
              {nextPredictedVisit && (
                <>
                  <span className="mx-1.5 text-[var(--color-border-strong)]">·</span>
                  <span>
                    {L.nextVisitLabel}{' '}
                    <span className="text-[var(--color-text)]/85">{nextPredictedVisit}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  },
)
CustomerProfileIdentity.displayName = 'CustomerProfileIdentity'
