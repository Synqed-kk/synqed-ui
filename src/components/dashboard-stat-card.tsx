import { TrendingDown, TrendingUp } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Single dashboard stat tile (label, big value, optional unit
// + delta vs. prior period). Pure presenter.
// ------------------------------------------------------------

export interface DashboardStatCardData {
  label: string
  value: number | string
  unit?: string
  trend?: number
  /** Suffix appended to trend value (e.g. " %", "% vs last week"). */
  trendSuffix?: string
}

interface DashboardStatCardProps extends HTMLAttributes<HTMLDivElement> {
  stat: DashboardStatCardData
}

export const DashboardStatCard = forwardRef<HTMLDivElement, DashboardStatCardProps>(
  ({ stat, className, ...props }, ref) => {
    const { label, value, unit, trend, trendSuffix = '' } = stat
    const showTrend = trend !== undefined
    const trendPositive = (trend ?? 0) >= 0

    return (
      <div
        ref={ref}
        className={cn(
          'min-w-0 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:px-5 md:py-4',
          className,
        )}
        {...props}
      >
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="truncate text-[11px] text-[var(--color-text-muted)]">{label}</div>
          {showTrend && (
            <div
              className={cn(
                'flex shrink-0 items-center gap-0.5 text-[11px] font-medium tabular-nums',
                trendPositive
                  ? 'text-[var(--color-success)]'
                  : 'text-[var(--color-destructive)]',
              )}
            >
              {trendPositive ? (
                <TrendingUp className="size-3" aria-hidden />
              ) : (
                <TrendingDown className="size-3" aria-hidden />
              )}
              <span>
                {trendPositive ? '+' : ''}
                {trend}
                {trendSuffix}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[22px] font-semibold leading-none tracking-tight tabular-nums text-[var(--color-text)] md:text-[24px]">
            {value}
          </span>
          {unit && <span className="text-[12px] text-[var(--color-text-muted)]">{unit}</span>}
        </div>
      </div>
    )
  },
)
DashboardStatCard.displayName = 'DashboardStatCard'
