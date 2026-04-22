import { Check } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

interface ConsentBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  consent: boolean
  grantedLabel: string
  missingLabel: string
  consentDate?: string
}

export const ConsentBadge = forwardRef<HTMLSpanElement, ConsentBadgeProps>(
  ({ consent, grantedLabel, missingLabel, consentDate, className, ...props }, ref) => {
    const base =
      'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium border'
    if (!consent) {
      return (
        <span
          ref={ref}
          className={cn(
            base,
            'border-[var(--color-destructive)]/20 bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]',
            className,
          )}
          {...props}
        >
          {missingLabel}
        </span>
      )
    }
    return (
      <span
        ref={ref}
        className={cn(
          base,
          'border-[var(--color-success)]/20 bg-[var(--color-success)]/10 text-[var(--color-success)]',
          className,
        )}
        title={consentDate}
        {...props}
      >
        <Check className="size-2.5" strokeWidth={3} />
        {grantedLabel}
      </span>
    )
  },
)
ConsentBadge.displayName = 'ConsentBadge'
