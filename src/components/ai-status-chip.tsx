import { Sparkles, Clock, AlertCircle, FileEdit } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// AI completion status for a karute row. Four discrete states
// the spike maps to single-token tones. Icons are baked in so
// callers don't need to repeat the pattern.
// ------------------------------------------------------------

export type AIStatusTone = 'summarized' | 'pending' | 'review_needed' | 'draft'

interface ToneSpec {
  classes: string
  Icon: React.ComponentType<{ className?: string }>
}

const tones: Record<AIStatusTone, ToneSpec> = {
  summarized: {
    classes:
      'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
    Icon: Sparkles,
  },
  pending: {
    classes:
      'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30',
    Icon: Clock,
  },
  review_needed: {
    classes:
      'bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/20',
    Icon: AlertCircle,
  },
  draft: {
    classes:
      'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] border-[var(--color-border)]',
    Icon: FileEdit,
  },
}

interface AIStatusChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone: AIStatusTone
  label: string
}

export const AIStatusChip = forwardRef<HTMLSpanElement, AIStatusChipProps>(
  ({ tone, label, className, ...props }, ref) => {
    const { classes, Icon } = tones[tone]
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[11px] font-medium',
          classes,
          className,
        )}
        {...props}
      >
        <Icon className="size-2.5" />
        {label}
      </span>
    )
  },
)
AIStatusChip.displayName = 'AIStatusChip'
