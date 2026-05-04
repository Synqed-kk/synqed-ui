import { Check, Crown, Sparkles, Star, X } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import type { SubscriptionTier } from './subscription-summary-card.js'

// ------------------------------------------------------------
// Plan-comparison surface — three primary tiles + an Enterprise
// strip + an optional trial banner. Pure presenter; the caller
// passes copy + features and reacts to clicks via `onAction`.
// ------------------------------------------------------------

export interface PlanCardData {
  tier: SubscriptionTier
  title: string
  /** Pre-formatted price (e.g. "¥9,800 / store / month" or "¥0"). */
  price: string
  pitch: string
  /** Each line. Lines starting with "×" render with an X mark + muted tone. */
  features: string[]
  /** Mark this card as the highlighted/recommended pick. */
  highlight?: boolean
}

export interface PlanComparisonGridCopy {
  trialBannerTitle: string
  trialBannerBody: string
  trialBannerCta: string

  enterpriseTitle: string
  enterprisePitch: string
  enterpriseCta: string

  mostPopular: string
  currentPill: string
  /** Action label resolver — receives the current tier + the target tile's tier. */
  actionLabel: (current: SubscriptionTier, target: SubscriptionTier) => string
}

const DEFAULT_COPY: PlanComparisonGridCopy = {
  trialBannerTitle: '14-day free trial',
  trialBannerBody:
    'Try the Professional plan free for 14 days. Cancel anytime during the trial.',
  trialBannerCta: 'Start trial',

  enterpriseTitle: 'Enterprise',
  enterprisePitch:
    'For chains with 5+ stores. Volume discount, SLA, dedicated support, custom integrations.',
  enterpriseCta: 'Contact sales',

  mostPopular: 'Popular',
  currentPill: 'Current',
  actionLabel: (current, target) => {
    if (current === target) return 'Current plan'
    if (target === 'free') return 'Downgrade to Free'
    const titleCase = target.charAt(0).toUpperCase() + target.slice(1)
    return `Upgrade to ${titleCase}`
  },
}

interface PlanComparisonGridProps extends HTMLAttributes<HTMLDivElement> {
  currentTier: SubscriptionTier
  cards: PlanCardData[]
  /** Show the trial promo banner above the grid. */
  trialAvailable?: boolean
  copy?: Partial<PlanComparisonGridCopy>
  onAction?: (tier: SubscriptionTier) => void
  onStartTrial?: () => void
}

export const PlanComparisonGrid = forwardRef<HTMLDivElement, PlanComparisonGridProps>(
  (
    { currentTier, cards, trialAvailable = false, copy, onAction, onStartTrial, className, ...props },
    ref,
  ) => {
    const L: PlanComparisonGridCopy = { ...DEFAULT_COPY, ...copy }

    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {trialAvailable && (
          <div className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-4">
            <Sparkles
              className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-[var(--color-text)]">
                {L.trialBannerTitle}
              </div>
              <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--color-text-muted)]">
                {L.trialBannerBody}
              </p>
            </div>
            <button
              type="button"
              onClick={onStartTrial}
              className="inline-flex h-9 shrink-0 items-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 text-[13px] font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              {L.trialBannerCta}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {cards.map((card) => (
            <PlanCard
              key={card.tier}
              card={card}
              currentTier={currentTier}
              actionLabel={L.actionLabel(currentTier, card.tier)}
              mostPopularLabel={L.mostPopular}
              currentLabel={L.currentPill}
              onAction={onAction}
            />
          ))}
        </div>

        <div className="flex items-start gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4 md:p-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-warning)]/15 text-[var(--color-warning)]">
            <Crown className="size-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-semibold text-[var(--color-text)]">
              {L.enterpriseTitle}
            </div>
            <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--color-text-muted)]">
              {L.enterprisePitch}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAction?.('enterprise')}
            className="inline-flex h-9 shrink-0 items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3.5 text-[13px] font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-card-hover)]"
          >
            {L.enterpriseCta}
          </button>
        </div>
      </div>
    )
  },
)
PlanComparisonGrid.displayName = 'PlanComparisonGrid'

function PlanCard({
  card,
  currentTier,
  actionLabel,
  mostPopularLabel,
  currentLabel,
  onAction,
}: {
  card: PlanCardData
  currentTier: SubscriptionTier
  actionLabel: string
  mostPopularLabel: string
  currentLabel: string
  onAction?: (tier: SubscriptionTier) => void
}) {
  const isCurrent = card.tier === currentTier

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-[var(--radius-xl)] p-4 transition-colors',
        card.highlight
          ? 'border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/8'
          : isCurrent
            ? 'border border-[var(--color-accent)]/40 bg-[var(--color-bg-card-hover)]'
            : 'border border-[var(--color-border)] bg-[var(--color-bg-card)]',
      )}
    >
      {card.highlight && (
        <span className="absolute -top-2.5 left-4 inline-flex h-5 items-center gap-1 rounded-full bg-[var(--color-accent)] px-2 text-[10px] font-semibold text-[var(--color-accent-text)]">
          <Star className="size-2.5" aria-hidden />
          {mostPopularLabel}
        </span>
      )}
      {isCurrent && !card.highlight && (
        <span className="absolute -top-2.5 left-4 inline-flex h-5 items-center rounded-full bg-[var(--color-chrome)] px-2 text-[10px] font-semibold text-white">
          {currentLabel}
        </span>
      )}
      {isCurrent && card.highlight && (
        <span className="absolute -top-2.5 right-4 inline-flex h-5 items-center rounded-full bg-[var(--color-chrome)] px-2 text-[10px] font-semibold text-white">
          {currentLabel}
        </span>
      )}

      <div className="text-[15px] font-semibold text-[var(--color-text)]">{card.title}</div>
      <div className="mt-2 text-[22px] font-bold tabular-nums tracking-tight text-[var(--color-text)]">
        {card.price}
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-text-muted)]">
        {card.pitch}
      </p>

      <ul className="mt-4 flex-1 space-y-1.5">
        {card.features.map((feat, i) => {
          const negative = feat.startsWith('×')
          const text = negative ? feat.slice(1).trim() : feat
          return (
            <li
              key={i}
              className="flex items-start gap-1.5 text-[12px] leading-relaxed text-[var(--color-text)]/85"
            >
              {negative ? (
                <>
                  <X className="mt-0.5 size-3 shrink-0 text-[var(--color-text-muted)]" aria-hidden />
                  <span className="text-[var(--color-text-muted)]">{text}</span>
                </>
              ) : (
                <>
                  <Check
                    className="mt-0.5 size-3 shrink-0 text-[var(--color-success)]"
                    aria-hidden
                  />
                  <span>{text}</span>
                </>
              )}
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={() => onAction?.(card.tier)}
        disabled={isCurrent}
        className={cn(
          'mt-4 inline-flex h-10 w-full items-center justify-center rounded-[var(--radius-sm)] px-4 text-[13px] font-medium transition-colors',
          isCurrent
            ? 'cursor-not-allowed bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]'
            : card.highlight
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)]'
              : 'bg-[var(--color-chrome)] text-white hover:bg-[var(--color-chrome-hover)]',
        )}
      >
        {actionLabel}
      </button>
    </div>
  )
}
