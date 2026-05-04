import { ArrowRight, ClipboardList } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { KaruteNumberBadge } from './karute-number-badge.js'

// ------------------------------------------------------------
// Dashboard "recent karute" card — recent N session records with
// summary, entry count, and "show all" link.
// ------------------------------------------------------------

export interface RecentKaruteItem {
  id: string
  customerName: string
  karuteNumber?: string
  sessionDate: string
  summary: string
  entryCount: number
  staffName: string
}

export interface RecentKaruteListCopy {
  title: string
  showAll: string
  honorific: string
  staffPrefix: string
  entryCountSuffix: string
}

const DEFAULT_COPY: RecentKaruteListCopy = {
  title: 'Recent karute',
  showAll: 'Show all',
  honorific: '',
  staffPrefix: 'Staff: ',
  entryCountSuffix: ' entries',
}

interface RecentKaruteListProps extends HTMLAttributes<HTMLElement> {
  items: RecentKaruteItem[]
  copy?: Partial<RecentKaruteListCopy>
  /** Optional render-prop wrapper around each row (e.g. routing). */
  asItemLink?: (item: RecentKaruteItem, children: ReactNode) => ReactNode
  /** Optional slot for the "show all" link. */
  showAllSlot?: (children: ReactNode) => ReactNode
  onShowAll?: () => void
}

export const RecentKaruteList = forwardRef<HTMLElement, RecentKaruteListProps>(
  ({ items, copy, asItemLink, showAllSlot, onShowAll, className, ...props }, ref) => {
    const L: RecentKaruteListCopy = { ...DEFAULT_COPY, ...copy }

    const showAllInner = (
      <span className="inline-flex items-center gap-0.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
        {L.showAll}
        <ArrowRight className="size-3" aria-hidden />
      </span>
    )

    return (
      <section
        ref={ref}
        className={cn(
          'rounded-[var(--radius-xl)] bg-[var(--color-bg-card)] p-4 ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
          className,
        )}
        {...props}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <ClipboardList className="size-4 text-[var(--color-accent)]" aria-hidden />
            <h3 className="text-sm font-semibold text-[var(--color-text)]">{L.title}</h3>
          </div>
          {showAllSlot ? (
            showAllSlot(showAllInner)
          ) : (
            <button type="button" onClick={onShowAll} className="contents">
              {showAllInner}
            </button>
          )}
        </div>
        <div className="space-y-0.5">
          {items.map((item) => {
            const inner = (
              <div className="block rounded-[var(--radius-sm)] px-3 py-3 transition-colors hover:bg-[var(--color-bg-card-hover)]">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex min-w-0 items-baseline gap-1">
                    <span className="truncate text-sm font-medium text-[var(--color-text)]">
                      {item.customerName}
                    </span>
                    {L.honorific && (
                      <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
                        {L.honorific}
                      </span>
                    )}
                    {item.karuteNumber && <KaruteNumberBadge value={item.karuteNumber} />}
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-[var(--color-text-muted)]">
                    {item.sessionDate}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--color-text)]/70">
                  {item.summary}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                  <span className="tabular-nums">
                    {item.entryCount}
                    {L.entryCountSuffix}
                  </span>
                  <span className="text-[var(--color-border-strong)]">·</span>
                  <span>
                    {L.staffPrefix}
                    {item.staffName}
                  </span>
                </div>
              </div>
            )

            return (
              <div key={item.id}>
                {asItemLink ? asItemLink(item, inner) : inner}
              </div>
            )
          })}
        </div>
      </section>
    )
  },
)
RecentKaruteList.displayName = 'RecentKaruteList'
