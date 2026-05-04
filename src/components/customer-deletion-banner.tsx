import { AlertTriangle, Undo2 } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Pending soft-delete banner for the customer profile page.
// Tone heats from warning to destructive as the deadline nears.
// ------------------------------------------------------------

interface CustomerDeletionBannerProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  body: string
  blockedNote?: string
  undoLabel: string
  /** Days remaining drives the visual urgency. */
  daysRemaining: number
  /** Threshold below which the banner switches to destructive tone. */
  urgentThreshold?: number
  onUndo?: () => void
}

export const CustomerDeletionBanner = forwardRef<HTMLDivElement, CustomerDeletionBannerProps>(
  (
    {
      title,
      body,
      blockedNote,
      undoLabel,
      daysRemaining,
      urgentThreshold = 7,
      onUndo,
      className,
      ...props
    },
    ref,
  ) => {
    const urgent = daysRemaining <= urgentThreshold
    const ringClass = urgent
      ? 'border-[var(--color-destructive)]/30'
      : 'border-[var(--color-warning)]/30'
    const bgClass = urgent
      ? 'bg-[var(--color-destructive)]/10'
      : 'bg-[var(--color-warning)]/10'
    const iconClass = urgent ? 'text-[var(--color-destructive)]' : 'text-[var(--color-warning)]'
    const titleClass = urgent
      ? 'text-[var(--color-destructive)]'
      : 'text-[var(--color-warning)]'

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'flex items-start gap-3 rounded-[var(--radius-md)] border px-4 py-3',
          ringClass,
          bgClass,
          className,
        )}
        {...props}
      >
        <AlertTriangle className={cn('mt-0.5 size-5 shrink-0', iconClass)} aria-hidden />
        <div className="min-w-0 flex-1">
          <div className={cn('text-[13px] font-semibold', titleClass)}>{title}</div>
          <div className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text)]/75">
            {body}
          </div>
          {blockedNote && (
            <div className="mt-1 text-[10px] leading-relaxed text-[var(--color-text-muted)]">
              {blockedNote}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onUndo}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 text-xs font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-card-hover)]"
        >
          <Undo2 className="size-3.5" aria-hidden />
          {undoLabel}
        </button>
      </div>
    )
  },
)
CustomerDeletionBanner.displayName = 'CustomerDeletionBanner'
