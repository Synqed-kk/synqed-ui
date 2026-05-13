import { ChevronRight, FileText, Share2 } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'
import { KaruteNumberBadge } from './karute-number-badge.js'

// ------------------------------------------------------------
// Karute detail breadcrumb — customers → <name> → karute · <date>
// + PDF export and Share buttons. Pure presenter; caller wires
// nav, print, and share handlers.
// ------------------------------------------------------------

export interface KaruteBreadcrumbCopy {
  customersLabel: string
  karutePrefix: string
  pdfExportLabel: string
  shareLabel: string
}

const DEFAULT_COPY: KaruteBreadcrumbCopy = {
  customersLabel: 'Customers',
  karutePrefix: 'Karute',
  pdfExportLabel: 'PDF',
  shareLabel: 'Share',
}

interface KaruteBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  customerName: string
  sessionDate: string
  karuteNumber?: string
  copy?: Partial<KaruteBreadcrumbCopy>
  /** Render-prop for the customers crumb. Receives the children to wrap. */
  customersHrefSlot?: (children: ReactNode) => ReactNode
  /** Render-prop for the customer name crumb. */
  customerHrefSlot?: (children: ReactNode) => ReactNode
  onPdfExport?: () => void
  onShare?: () => void
  /** When provided, replaces the default Share button content. */
  shareSlot?: ReactNode
}

export const KaruteBreadcrumb = forwardRef<HTMLDivElement, KaruteBreadcrumbProps>(
  (
    {
      customerName,
      sessionDate,
      karuteNumber,
      copy,
      customersHrefSlot,
      customerHrefSlot,
      onPdfExport,
      onShare,
      shareSlot,
      className,
      ...props
    },
    ref,
  ) => {
    const L: KaruteBreadcrumbCopy = { ...DEFAULT_COPY, ...copy }
    const customersCrumbContent = (
      <span className="hover:text-[var(--color-text)] transition-colors">
        {L.customersLabel}
      </span>
    )
    const customerCrumbContent = (
      <span className="inline-flex items-baseline gap-1 hover:text-[var(--color-text)] transition-colors">
        {customerName}
        {karuteNumber && <KaruteNumberBadge value={karuteNumber} />}
      </span>
    )

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-page)] px-4 py-3 md:px-6',
          className,
        )}
        {...props}
      >
        <nav className="hidden min-w-0 items-center gap-1.5 text-sm text-[var(--color-text-muted)] md:flex">
          {customersHrefSlot ? customersHrefSlot(customersCrumbContent) : customersCrumbContent}
          <ChevronRight className="size-3.5 text-[var(--color-border-strong)]" />
          {customerHrefSlot ? customerHrefSlot(customerCrumbContent) : customerCrumbContent}
          <ChevronRight className="size-3.5 text-[var(--color-border-strong)]" />
          <span className="truncate font-medium text-[var(--color-text)]">
            {L.karutePrefix} {sessionDate}
          </span>
        </nav>
        <div className="inline-flex items-baseline gap-1 truncate text-xs tabular-nums text-[var(--color-text-muted)] md:hidden">
          {customerHrefSlot ? customerHrefSlot(customerCrumbContent) : customerCrumbContent}
          <span>· {sessionDate}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2 print:hidden">
          {onPdfExport && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPdfExport}
              aria-label={L.pdfExportLabel}
              className="gap-1.5"
            >
              <FileText className="size-3.5" />
              <span className="hidden md:inline">{L.pdfExportLabel}</span>
            </Button>
          )}
          {shareSlot ?? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onShare}
              aria-label={L.shareLabel}
              className="gap-1.5"
            >
              <Share2 className="size-3.5" />
              <span className="hidden md:inline">{L.shareLabel}</span>
            </Button>
          )}
        </div>
      </div>
    )
  },
)
KaruteBreadcrumb.displayName = 'KaruteBreadcrumb'
