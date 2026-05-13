import { ShieldCheck, AlertTriangle } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

export interface ConsentCheckCardLabels {
  /** Title shown when consent is granted, e.g. "Recording consent on file" */
  grantedTitle: string
  /** Description shown after the customer's name when granted */
  grantedDesc: string
  /** Prefix for the granted date, e.g. "Granted " */
  grantedWhen: string
  /** Title shown when no active consent, e.g. "Consent missing" */
  missingTitle: string
  /** Description shown after the customer's name when missing */
  missingDesc: string
  /** Action button label, e.g. "Start consent flow" */
  startFlow: string
}

interface ConsentCheckCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  consented: boolean
  consentDate?: string
  customerName: string
  labels: ConsentCheckCardLabels
  onStartConsent?: () => void
}

export const ConsentCheckCard = forwardRef<HTMLDivElement, ConsentCheckCardProps>(
  ({ consented, consentDate, customerName, labels, onStartConsent, className, ...props }, ref) => {
    if (consented) {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-[var(--radius-md)] bg-[var(--color-success)]/10 p-4 ring-1 ring-[var(--color-success)]/20',
            className,
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)] text-white">
              <ShieldCheck className="size-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--color-success)]">
                  {labels.grantedTitle}
                </span>
                {consentDate && (
                  <span className="text-[11px] tabular-nums text-[var(--color-success)]/80">
                    {labels.grantedWhen}{consentDate}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-success)]/90">
                {customerName}
                {labels.grantedDesc}
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-md)] bg-[var(--color-warning)]/10 p-4 ring-1 ring-[var(--color-warning)]/20',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-warning)] text-white">
            <AlertTriangle className="size-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[var(--color-warning)]">
              {labels.missingTitle}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-warning)]/90">
              {customerName}
              {labels.missingDesc}
            </p>
            {onStartConsent && (
              <button
                type="button"
                onClick={onStartConsent}
                className="mt-3 inline-flex h-7 items-center rounded-md bg-[var(--color-bg-card)] px-3 text-xs font-medium text-[var(--color-warning)] ring-1 ring-[var(--color-warning)]/30 transition-colors hover:bg-[var(--color-warning)]/10"
              >
                {labels.startFlow}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  },
)
ConsentCheckCard.displayName = 'ConsentCheckCard'
