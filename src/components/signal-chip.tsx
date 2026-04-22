import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

export type SignalTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

const tones: Record<SignalTone, string> = {
  info: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
  warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30',
  danger: 'bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/20',
  neutral: 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] border-[var(--color-border)]',
}

interface SignalChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: SignalTone
  label: string
  icon?: React.ReactNode
}

export const SignalChip = forwardRef<HTMLSpanElement, SignalChipProps>(
  ({ tone = 'neutral', label, icon, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[11px] font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {icon}
      {label}
    </span>
  ),
)
SignalChip.displayName = 'SignalChip'
