import { AlertTriangle, Search } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Input } from './input.js'

// ------------------------------------------------------------
// Customers list filter bar — search + chip filters. Caller owns
// the filter keys and supplies labels + counts. Pure presenter.
// ------------------------------------------------------------

export interface CustomersFilter<K extends string = string> {
  key: K
  label: string
  /** Optional warning treatment (e.g. "pending deletion"). */
  warning?: boolean
  /** Tooltip on hover. */
  title?: string
}

interface CustomersFilterBarProps<K extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  filters: CustomersFilter<K>[]
  activeKey: K
  onChange: (key: K) => void
  counts: Record<K, number>
  searchQuery: string
  onSearchChange: (q: string) => void
  searchPlaceholder?: string
  trailingSlot?: ReactNode
}

function CustomersFilterBarInner<K extends string>(
  {
    filters,
    activeKey,
    onChange,
    counts,
    searchQuery,
    onSearchChange,
    searchPlaceholder = 'Search…',
    trailingSlot,
    className,
    ...props
  }: CustomersFilterBarProps<K>,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={cn('mb-4 space-y-3', className)} {...props}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 pl-9 text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((filter) => {
            const active = filter.key === activeKey
            const count = counts[filter.key] ?? 0
            const baseClasses =
              'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors'
            const activeClasses = filter.warning
              ? 'bg-[var(--color-warning)] text-[var(--color-text-inverse)]'
              : 'bg-[var(--color-chrome)] text-[var(--color-text-inverse)]'
            const idleClasses = filter.warning
              ? 'border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
              : 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-card-hover)]'
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => onChange(filter.key)}
                title={filter.title}
                className={cn(baseClasses, active ? activeClasses : idleClasses)}
              >
                {filter.warning && <AlertTriangle className="size-3" aria-hidden />}
                {filter.label}
                <span
                  className={cn(
                    'tabular-nums text-[11px]',
                    active ? 'opacity-75' : 'text-[var(--color-text-muted)]',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        {trailingSlot}
      </div>
    </div>
  )
}

export const CustomersFilterBar = forwardRef(CustomersFilterBarInner) as <
  K extends string = string,
>(
  props: CustomersFilterBarProps<K> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement
