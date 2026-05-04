import { AlertTriangle, CreditCard, Crown, Sparkles } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Compact subscription banner — five status flavors that render
// distinctively (past_due alarm, trialing pitch, free upgrade nudge,
// active paid summary, professional crown). Pure presenter — caller
// formats prices/dates and supplies a CTA via `ctaSlot` or `onCta`.
// ------------------------------------------------------------

export type SubscriptionTier = 'free' | 'standard' | 'professional' | 'enterprise'
export type SubscriptionStatus = 'past_due' | 'trialing' | 'active' | 'canceled'

export interface SubscriptionSummaryCardCopy {
  pastDueTitle: string
  pastDueBody: string
  pastDueCta: string

  trialTitle: (daysLeft: number) => string
  trialBody: string
  trialCta: string

  freeTitle: string
  freeBody: string
  freeCta: string

  activeTitle: (tierLabel: string) => string
  /** {total} per period (e.g. ¥9800). {nextDate} pre-formatted. */
  activeBody: (args: { total: string; nextDate: string }) => string
  storeCount: (n: number) => string
  manageCta: string
}

const DEFAULT_COPY: SubscriptionSummaryCardCopy = {
  pastDueTitle: "There's an issue with your payment",
  pastDueBody:
    "Your last charge failed. Service will be restricted if the payment method isn't updated soon.",
  pastDueCta: 'Update payment',

  trialTitle: (days) =>
    days <= 0 ? 'Your trial has ended' : `Trial — ${days} day${days === 1 ? '' : 's'} left`,
  trialBody: 'Pick a plan before your trial ends or you will be downgraded.',
  trialCta: 'Choose a plan',

  freeTitle: "You're on the Free plan",
  freeBody: 'Upgrade to unlock AI karute generation and unlimited recordings.',
  freeCta: 'See plans',

  activeTitle: (tier) => `${tier} plan`,
  activeBody: ({ total, nextDate }) => `${total} / month · Next charge ${nextDate}`,
  storeCount: (n) => `${n} store${n === 1 ? '' : 's'}`,
  manageCta: 'Manage',
}

interface SubscriptionSummaryCardProps extends HTMLAttributes<HTMLDivElement> {
  status: SubscriptionStatus
  tier: SubscriptionTier
  /** Pre-formatted human label for the active tier (e.g. "Professional"). */
  tierLabel?: string
  storeCount?: number
  /** Required when status === 'active'. */
  monthlyTotalFormatted?: string
  /** Required when status === 'active'. */
  nextBillingDateFormatted?: string
  /** Required when status === 'trialing'. */
  trialDaysLeft?: number
  copy?: Partial<SubscriptionSummaryCardCopy>
  /** Tap handler for the right-side CTA. */
  onCta?: () => void
  /** Replace the CTA with a custom element (e.g. router Link). */
  ctaSlot?: (label: string) => ReactNode
}

export const SubscriptionSummaryCard = forwardRef<HTMLDivElement, SubscriptionSummaryCardProps>(
  (
    {
      status,
      tier,
      tierLabel,
      storeCount = 1,
      monthlyTotalFormatted,
      nextBillingDateFormatted,
      trialDaysLeft = 0,
      copy,
      onCta,
      ctaSlot,
      className,
      ...props
    },
    ref,
  ) => {
    const L: SubscriptionSummaryCardCopy = { ...DEFAULT_COPY, ...copy }

    const renderCta = (label: string, tone: 'destructive' | 'accent' | 'chrome' | 'outline') => {
      const styles =
        tone === 'destructive'
          ? 'bg-[var(--color-destructive)] text-[var(--color-destructive-text)] hover:opacity-90'
          : tone === 'accent'
            ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)]'
            : tone === 'chrome'
              ? 'bg-[var(--color-chrome)] text-white hover:bg-[var(--color-chrome-hover)]'
              : 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-card-hover)]'

      const inner = (
        <span
          className={cn(
            'inline-flex h-8 shrink-0 items-center rounded-[var(--radius-sm)] px-3 text-[12px] font-medium transition-colors',
            styles,
          )}
        >
          {label}
        </span>
      )
      if (ctaSlot) return ctaSlot(label)
      return (
        <button type="button" onClick={onCta} className="contents">
          {inner}
        </button>
      )
    }

    if (status === 'past_due') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-destructive)]/40 bg-[var(--color-destructive)]/10 px-4 py-3',
            className,
          )}
          {...props}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-destructive)] text-[var(--color-destructive-text)]">
            <AlertTriangle className="size-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-[var(--color-destructive)]">
              {L.pastDueTitle}
            </div>
            <div className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
              {L.pastDueBody}
            </div>
          </div>
          {renderCta(L.pastDueCta, 'destructive')}
        </div>
      )
    }

    if (status === 'trialing') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-3',
            className,
          )}
          {...props}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)]">
            <Sparkles className="size-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-[var(--color-text)]">
              {L.trialTitle(trialDaysLeft)}
            </div>
            <div className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)] tabular-nums">
              {L.trialBody}
            </div>
          </div>
          {renderCta(L.trialCta, 'accent')}
        </div>
      )
    }

    if (tier === 'free') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-muted)] px-4 py-3',
            className,
          )}
          {...props}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-card)] text-[var(--color-text-muted)]">
            <CreditCard className="size-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-[var(--color-text)]">{L.freeTitle}</div>
            <div className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
              {L.freeBody}
            </div>
          </div>
          {renderCta(L.freeCta, 'chrome')}
        </div>
      )
    }

    // Active paid
    const isPro = tier === 'professional'
    const label = tierLabel ?? tier
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full text-white',
            isPro
              ? 'bg-[var(--color-warning)]'
              : 'bg-[var(--color-accent)] text-[var(--color-accent-text)]',
          )}
        >
          {isPro ? <Crown className="size-4" aria-hidden /> : <CreditCard className="size-4" aria-hidden />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[13px] font-semibold text-[var(--color-text)]">
              {L.activeTitle(label)}
            </span>
            <span className="text-[11px] tabular-nums text-[var(--color-text-muted)]">
              · {L.storeCount(storeCount)}
            </span>
          </div>
          <div className="mt-0.5 text-[11px] leading-relaxed tabular-nums text-[var(--color-text-muted)]">
            {L.activeBody({
              total: monthlyTotalFormatted ?? '—',
              nextDate: nextBillingDateFormatted ?? '—',
            })}
          </div>
        </div>
        {renderCta(L.manageCta, 'outline')}
      </div>
    )
  },
)
SubscriptionSummaryCard.displayName = 'SubscriptionSummaryCard'
