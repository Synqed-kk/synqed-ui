import { FileText } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Bullet-list AI summary for a session, rendered as a small card.
// ------------------------------------------------------------

interface AISummaryCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  summary: string[]
  sessionDate: string
}

export const AISummaryCard = forwardRef<HTMLDivElement, AISummaryCardProps>(
  ({ title, summary, sessionDate, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5',
        className,
      )}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-[var(--color-accent)]" />
          <span className="text-sm font-semibold text-[var(--color-text)]">{title}</span>
        </div>
        <span className="text-xs tabular-nums text-[var(--color-text-muted)]">{sessionDate}</span>
      </div>
      <ul className="space-y-2">
        {summary.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm leading-relaxed text-[var(--color-text)]/85"
          >
            <span className="mt-1 shrink-0 text-[var(--color-accent)]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
)
AISummaryCard.displayName = 'AISummaryCard'
