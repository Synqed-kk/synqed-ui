import { Sparkles, TrendingUp, Calendar } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Predictive body / wellness card. Shows a headline insight,
// AI confidence bar, trend label, and recommended next visit.
// Caller-localized copy bag for labels + chrome.
// ------------------------------------------------------------

export interface AIBodyPredictionCopy {
  headerLabel: string
  confidenceLabel: string
  trendLabel: string
  recommendedVisitLabel: string
  rationaleToggle: string
}

const DEFAULT_COPY: AIBodyPredictionCopy = {
  headerLabel: 'AI body prediction',
  confidenceLabel: 'Confidence',
  trendLabel: 'Trend vs last visit',
  recommendedVisitLabel: 'Recommended next visit',
  rationaleToggle: 'AI rationale',
}

interface AIBodyPredictionCardProps extends HTMLAttributes<HTMLDivElement> {
  headline: string
  /** 0–1 */
  confidence: number
  trendValue: string
  recommendedVisit: { window: string; weeksOut: string }
  rationale: string[]
  copy?: Partial<AIBodyPredictionCopy>
}

export const AIBodyPredictionCard = forwardRef<HTMLDivElement, AIBodyPredictionCardProps>(
  (
    { headline, confidence, trendValue, recommendedVisit, rationale, copy, className, ...props },
    ref,
  ) => {
    const L: AIBodyPredictionCopy = { ...DEFAULT_COPY, ...copy }
    const pct = Math.round(confidence * 100)
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-md)] border border-[var(--color-accent)]/20 bg-[var(--color-bg-card)] p-5',
          className,
        )}
        {...props}
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)]">
            <Sparkles className="size-3.5" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            {L.headerLabel}
          </span>
        </div>
        <p className="mb-4 text-base font-semibold leading-relaxed tracking-tight text-[var(--color-text)]">
          {headline}
        </p>
        <div className="mb-4 space-y-3">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[13px]">
              <span className="text-[var(--color-text-muted)]">{L.confidenceLabel}</span>
              <span className="font-semibold tabular-nums text-[var(--color-accent)]">{pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-accent)]/10">
              <div
                className="h-full rounded-full bg-[var(--color-accent)] transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <TrendingUp className="size-3.5 shrink-0 text-[var(--color-success)]" />
            <span className="text-[var(--color-text-muted)]">{L.trendLabel}</span>
            <span className="font-medium text-[var(--color-success)]">{trendValue}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <Calendar className="size-3.5 shrink-0 text-[var(--color-accent)]" />
            <span className="text-[var(--color-text-muted)]">{L.recommendedVisitLabel}</span>
            <span className="font-medium text-[var(--color-text)]">{recommendedVisit.window}</span>
            <span className="tabular-nums text-[var(--color-text-muted)]">
              ({recommendedVisit.weeksOut})
            </span>
          </div>
        </div>
        <details className="group">
          <summary className="flex cursor-pointer select-none list-none items-center gap-1 text-[12px] text-[var(--color-text-muted)]">
            <span>{L.rationaleToggle}</span>
            <span className="text-[var(--color-text-muted)] transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <ul className="mt-2 space-y-1.5">
            {rationale.map((reason, i) => (
              <li
                key={i}
                className="flex gap-1.5 text-[13px] leading-relaxed text-[var(--color-text)]/75"
              >
                <span className="mt-0.5 shrink-0 text-[var(--color-accent)]">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    )
  },
)
AIBodyPredictionCard.displayName = 'AIBodyPredictionCard'
