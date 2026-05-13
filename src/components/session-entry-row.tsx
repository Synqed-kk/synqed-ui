import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// One row in the session-entries timeline. Pure presentation —
// caller picks the category palette. Tone keys map to existing
// theme tokens.
// ------------------------------------------------------------

export type SessionEntryTone = 'treatment' | 'concern' | 'condition' | 'product' | 'next'

const tones: Record<SessionEntryTone, string> = {
  treatment: 'bg-[var(--color-text)] text-[var(--color-text-inverse)]',
  concern:
    'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20',
  condition:
    'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/30',
  product:
    'bg-[var(--color-bg-muted)] text-[var(--color-text)] border border-[var(--color-border)]',
  next:
    'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20',
}

export interface SessionEntryRowData {
  id: string
  /** Time tag, e.g. "10:42". */
  time: string
  /** Body of the entry. */
  content: string
  categoryLabel: string
  categoryTone: SessionEntryTone
}

interface SessionEntryRowProps extends HTMLAttributes<HTMLDivElement> {
  entry: SessionEntryRowData
}

export const SessionEntryRow = forwardRef<HTMLDivElement, SessionEntryRowProps>(
  ({ entry, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group flex cursor-pointer items-start gap-3 px-3 py-2.5 transition-colors hover:bg-[var(--color-bg-card-hover)]',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-flex h-6 shrink-0 items-center justify-center rounded-full px-2.5 text-[11px] font-medium',
          tones[entry.categoryTone],
        )}
      >
        {entry.categoryLabel}
      </span>
      <span className="w-11 shrink-0 pt-1 text-xs tabular-nums text-[var(--color-text-muted)]">
        {entry.time}
      </span>
      <p className="flex-1 text-sm leading-relaxed text-[var(--color-text)]/90">
        {entry.content}
      </p>
    </div>
  ),
)
SessionEntryRow.displayName = 'SessionEntryRow'
