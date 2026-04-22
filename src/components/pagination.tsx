import { ChevronLeft, ChevronRight } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  currentPage: number
  onPageChange: (page: number) => void
  totalItems: number
  pageSize: number
  /** Rendered as the count summary. Receives total/start/end, returns a node. */
  renderSummary?: (info: { total: number; start: number; end: number; pageCount: number }) => React.ReactNode
  prevAriaLabel?: string
  nextAriaLabel?: string
  pageAriaLabel?: (page: number) => string
}

function buildPageWindow(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const window: (number | '…')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) window.push('…')
  for (let i = start; i <= end; i++) window.push(i)
  if (end < total - 1) window.push('…')
  window.push(total)
  return window
}

function defaultSummary({
  total,
  start,
  end,
  pageCount,
}: {
  total: number
  start: number
  end: number
  pageCount: number
}) {
  if (total === 0) return '0 items'
  if (pageCount === 1) return `${total} items`
  return `${start}–${end} of ${total}`
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      onPageChange,
      totalItems,
      pageSize,
      renderSummary = defaultSummary,
      prevAriaLabel = 'Previous page',
      nextAriaLabel = 'Next page',
      pageAriaLabel = (p) => `Page ${p}`,
      className,
      ...props
    },
    ref,
  ) => {
    const pageCount = Math.max(1, Math.ceil(totalItems / pageSize))
    const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
    const rangeEnd = Math.min(totalItems, currentPage * pageSize)

    const btnBase =
      'inline-flex items-center justify-center size-7 rounded-[var(--radius-sm)] text-xs tabular-nums transition-colors'

    return (
      <div
        ref={ref}
        className={cn('mt-4 flex flex-wrap items-center justify-between gap-2', className)}
        {...props}
      >
        <div className="text-xs tabular-nums text-[var(--color-text-muted)]">
          {renderSummary({ total: totalItems, start: rangeStart, end: rangeEnd, pageCount })}
        </div>

        {pageCount > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label={prevAriaLabel}
              className={cn(
                btnBase,
                'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]',
                'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
              )}
            >
              <ChevronLeft className="size-3.5" />
            </button>

            {buildPageWindow(currentPage, pageCount).map((p, idx) =>
              p === '…' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="inline-flex size-7 items-center justify-center text-xs text-[var(--color-text-muted)]"
                  aria-hidden
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPageChange(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  aria-label={pageAriaLabel(p)}
                  className={cn(
                    btnBase,
                    p === currentPage
                      ? 'bg-[var(--color-chrome)] font-medium text-[var(--color-text-inverse)]'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]',
                  )}
                >
                  {p}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
              disabled={currentPage === pageCount}
              aria-label={nextAriaLabel}
              className={cn(
                btnBase,
                'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]',
                'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
              )}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    )
  },
)
Pagination.displayName = 'Pagination'
