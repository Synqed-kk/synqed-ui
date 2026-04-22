import { ArrowRight, Check, X } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

export type AIActionPriority = 'high' | 'medium' | 'low'

export interface AIActionData {
  id: string
  priority: AIActionPriority
  priorityLabel: string
  title: string
  rationale: string
  ctaLabel: string
}

const priorityStyles: Record<AIActionPriority, string> = {
  high: 'bg-[var(--color-destructive)] text-[var(--color-destructive-text)]',
  medium:
    'bg-[var(--color-warning)]/15 text-[var(--color-warning)] border border-[var(--color-warning)]/30',
  low: 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
}

interface AIActionCardProps extends HTMLAttributes<HTMLDivElement> {
  action: AIActionData
  onCta?: (action: AIActionData) => void
  onApprove?: (action: AIActionData) => void
  onDismiss?: (action: AIActionData) => void
  approveAriaLabel?: string
  dismissAriaLabel?: string
}

export const AIActionCard = forwardRef<HTMLDivElement, AIActionCardProps>(
  (
    {
      action,
      onCta,
      onApprove,
      onDismiss,
      approveAriaLabel = 'Approve',
      dismissAriaLabel = 'Dismiss',
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'group rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4',
        'transition-all hover:border-[var(--color-accent)]/40 hover:shadow-sm',
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'inline-flex h-5 shrink-0 items-center justify-center rounded-full px-2 text-[11px] font-semibold tabular-nums',
            priorityStyles[action.priority],
          )}
        >
          {action.priorityLabel}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-snug text-[var(--color-text)]">{action.title}</div>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">{action.rationale}</p>
          <button
            type="button"
            onClick={() => onCta?.(action)}
            className="group/cta mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            {action.ctaLabel}
            <ArrowRight className="size-3 transition-transform group-hover/cta:translate-x-0.5" />
          </button>
        </div>
        <div className="flex shrink-0 items-start gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {onDismiss && (
            <button
              type="button"
              onClick={() => onDismiss(action)}
              className="flex size-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
              aria-label={dismissAriaLabel}
            >
              <X className="size-3.5" />
            </button>
          )}
          {onApprove && (
            <button
              type="button"
              onClick={() => onApprove(action)}
              className="flex size-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-success)] hover:bg-[var(--color-success)]/10"
              aria-label={approveAriaLabel}
            >
              <Check className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  ),
)
AIActionCard.displayName = 'AIActionCard'
