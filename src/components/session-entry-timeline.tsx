import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import { SessionEntryRow, type SessionEntryRowData } from './session-entry-row.js'

interface SessionEntryTimelineProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  sessionDate: string
  entries: SessionEntryRowData[]
}

export const SessionEntryTimeline = forwardRef<HTMLDivElement, SessionEntryTimelineProps>(
  ({ title, sessionDate, entries, className, ...props }, ref) => (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div className="mb-2 flex items-baseline justify-between px-3 pt-4 md:pt-0">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] md:text-sm md:normal-case md:tracking-normal md:text-[var(--color-text)]">
          {title}
        </h2>
        <span className="text-[11px] tabular-nums text-[var(--color-text-muted)] md:text-xs">
          {sessionDate}
        </span>
      </div>
      <div className="space-y-0.5">
        {entries.map((entry) => (
          <SessionEntryRow key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  ),
)
SessionEntryTimeline.displayName = 'SessionEntryTimeline'
