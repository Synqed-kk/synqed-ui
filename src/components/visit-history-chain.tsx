import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

interface VisitHistoryChainProps extends HTMLAttributes<HTMLDivElement> {
  chain: boolean[]
  visitCount: number
  /** Custom accessible description. Receives (filled, total, totalVisits). */
  describe?: (info: { filled: number; total: number; totalVisits: number }) => string
}

function defaultDescribe({ filled, total, totalVisits }: { filled: number; total: number; totalVisits: number }) {
  return `${filled} of last ${total} visits attended. ${totalVisits} total visits.`
}

export const VisitHistoryChain = forwardRef<HTMLDivElement, VisitHistoryChainProps>(
  ({ chain, visitCount, describe = defaultDescribe, className, ...props }, ref) => {
    const filledCount = chain.filter(Boolean).length
    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        <div className="flex items-center gap-1">
          {chain.map((visited, i) => (
            <span
              key={i}
              className={cn(
                'size-1.5 rounded-full',
                visited
                  ? 'bg-[var(--color-success)]'
                  : 'border border-[var(--color-border-strong)] bg-[var(--color-bg-muted)]',
              )}
              aria-hidden
            />
          ))}
        </div>
        <span className="text-[11px] tabular-nums text-[var(--color-text-muted)]">
          {filledCount}/{chain.length}
        </span>
        <span className="sr-only">{describe({ filled: filledCount, total: chain.length, totalVisits: visitCount })}</span>
      </div>
    )
  },
)
VisitHistoryChain.displayName = 'VisitHistoryChain'
