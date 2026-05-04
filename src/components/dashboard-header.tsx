import { Crown } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Dashboard greeting header — owner badge + name + date.
// Pure presenter; caller computes the greeting line + role.
// ------------------------------------------------------------

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Pre-composed greeting line e.g. "Good morning, Akari". */
  greeting: ReactNode
  /** Pre-formatted date e.g. "Friday, May 1 · 2026". */
  dateFormatted: ReactNode
  /** When set, renders a small role pill on the right. */
  ownerBadgeLabel?: string
  /** Caller-controlled role flag. Defaults to `false` (no badge). */
  isOwner?: boolean
}

export const DashboardHeader = forwardRef<HTMLDivElement, DashboardHeaderProps>(
  ({ greeting, dateFormatted, ownerBadgeLabel, isOwner, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-5 md:mb-6', className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-[var(--color-text)] md:text-2xl">
            {greeting}
          </h1>
          <div className="mt-1 text-[13px] tabular-nums text-[var(--color-text-muted)] md:text-sm">
            {dateFormatted}
          </div>
        </div>
        {isOwner && ownerBadgeLabel && (
          <span
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-3 text-[13px] font-medium text-[var(--color-accent)]"
            aria-label={ownerBadgeLabel}
          >
            <Crown className="size-3.5" aria-hidden />
            {ownerBadgeLabel}
          </span>
        )}
      </div>
    </div>
  ),
)
DashboardHeader.displayName = 'DashboardHeader'
