import { ArrowRight, Sparkles, X } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Soft prompt banner shown on the dashboard when onboarding hasn't
// been completed. Pure presenter — caller controls visibility +
// dismissal persistence.
// ------------------------------------------------------------

export interface OnboardingBannerCopy {
  title: string
  body: string
  startLabel: string
  dismissLabel: string
}

const DEFAULT_COPY: OnboardingBannerCopy = {
  title: 'Finish setting up your store',
  body: 'Pick your business type + recording disclosure mode so the AI is tuned to your salon. Takes about 2 minutes.',
  startLabel: 'Start setup',
  dismissLabel: 'Dismiss',
}

interface OnboardingBannerProps extends HTMLAttributes<HTMLDivElement> {
  copy?: Partial<OnboardingBannerCopy>
  onStart?: () => void
  onDismiss?: () => void
  /** Replace the start CTA with a render-prop slot (e.g. for routing). */
  startSlot?: (children: ReactNode) => ReactNode
}

export const OnboardingBanner = forwardRef<HTMLDivElement, OnboardingBannerProps>(
  ({ copy, onStart, onDismiss, startSlot, className, ...props }, ref) => {
    const L: OnboardingBannerCopy = { ...DEFAULT_COPY, ...copy }

    const startInner = (
      <span className="inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 text-[12px] font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-hover)]">
        {L.startLabel}
        <ArrowRight className="size-3.5" aria-hidden />
      </span>
    )

    return (
      <div
        ref={ref}
        className={cn(
          'mb-5 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 p-4 md:mb-6 md:p-5',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)]">
            <Sparkles className="size-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-semibold text-[var(--color-text)] md:text-[15px]">
              {L.title}
            </div>
            <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--color-text-muted)]">
              {L.body}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {startSlot ? (
                startSlot(startInner)
              ) : (
                <button type="button" onClick={onStart} className="contents">
                  {startInner}
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  onClick={onDismiss}
                  className="inline-flex h-8 items-center gap-1 px-2 text-[11px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  <X className="size-3" aria-hidden />
                  {L.dismissLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)
OnboardingBanner.displayName = 'OnboardingBanner'
