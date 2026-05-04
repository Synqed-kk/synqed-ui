import { Search } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Input } from './input.js'

// ------------------------------------------------------------
// Karute list filter bar — same chrome as the customers filter bar
// but parameterized by the caller's filter keys.
// ------------------------------------------------------------

export interface KaruteListFilter<K extends string = string> {
  key: K
  label: string
}

interface KaruteListFilterBarProps<K extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  filters: KaruteListFilter<K>[]
  activeKey: K
  onChange: (key: K) => void
  counts: Record<K, number>
  searchQuery: string
  onSearchChange: (q: string) => void
  searchPlaceholder?: string
  trailingSlot?: ReactNode
}

function KaruteListFilterBarInner<K extends string>(
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
  }: KaruteListFilterBarProps<K>,
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
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => onChange(filter.key)}
                className={cn(
                  'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors',
                  active
                    ? 'bg-[var(--color-chrome)] text-[var(--color-text-inverse)]'
                    : 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-card-hover)]',
                )}
              >
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

export const KaruteListFilterBar = forwardRef(KaruteListFilterBarInner) as <
  K extends string = string,
>(
  props: KaruteListFilterBarProps<K> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement
