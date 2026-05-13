import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import { DashboardStatCard, type DashboardStatCardData } from './dashboard-stat-card.js'

// ------------------------------------------------------------
// Horizontal grid of stat tiles for the dashboard top strip.
// ------------------------------------------------------------

interface DashboardStatStripProps extends HTMLAttributes<HTMLDivElement> {
  stats: DashboardStatCardData[]
}

export const DashboardStatStrip = forwardRef<HTMLDivElement, DashboardStatStripProps>(
  ({ stats, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3', className)}
      {...props}
    >
      {stats.map((s, i) => (
        <DashboardStatCard key={`${s.label}-${i}`} stat={s} />
      ))}
    </div>
  ),
)
DashboardStatStrip.displayName = 'DashboardStatStrip'
