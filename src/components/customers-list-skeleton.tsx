import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import { Skeleton } from './skeleton.js'

// ------------------------------------------------------------
// Loading state placeholder for the customers list. Layout
// matches the populated row roughly so the swap doesn't shift.
// ------------------------------------------------------------

interface CustomersListSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** How many rows to render. Defaults to 8. */
  rows?: number
}

export const CustomersListSkeleton = forwardRef<HTMLDivElement, CustomersListSkeletonProps>(
  ({ rows = 8, className, ...props }, ref) => (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div className="mb-4 space-y-3">
        <Skeleton className="h-10 w-full" />
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-24" />
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-card)] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-4 border-b border-black/5 bg-[var(--color-bg-muted)] px-4 py-2.5">
          <div className="size-9 shrink-0" />
          <Skeleton className="h-3 max-w-[80px] flex-1" />
          <Skeleton className="h-3 w-[100px] shrink-0" />
          <Skeleton className="h-3 w-[130px] shrink-0" />
          <Skeleton className="h-3 w-[100px] shrink-0" />
          <Skeleton className="h-3 w-[90px] shrink-0" />
          <Skeleton className="h-3 w-[120px] shrink-0" />
          <Skeleton className="h-3 w-[52px] shrink-0" />
          <div className="size-4 shrink-0" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-[var(--color-border)] px-4 py-3 last:border-b-0"
          >
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-60" />
            </div>
            <Skeleton className="h-3 w-[100px] shrink-0" />
            <div className="w-[130px] space-y-1 shrink-0">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-[100px] shrink-0" />
            <Skeleton className="h-5 w-[70px] shrink-0 rounded-full" />
            <Skeleton className="h-3 w-[100px] shrink-0" />
            <Skeleton className="h-5 w-[40px] shrink-0 rounded" />
            <div className="size-4 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  ),
)
CustomersListSkeleton.displayName = 'CustomersListSkeleton'
