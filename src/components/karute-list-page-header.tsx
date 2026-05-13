import { FilePlus2 } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'

// ------------------------------------------------------------
// Karute list page header — title + meta line + new-karute CTA.
// ------------------------------------------------------------

interface KaruteListPageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  meta?: ReactNode
  ctaLabel: string
  onCta?: () => void
  ctaSlot?: ReactNode
}

export const KaruteListPageHeader = forwardRef<HTMLDivElement, KaruteListPageHeaderProps>(
  ({ title, meta, ctaLabel, onCta, ctaSlot, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 flex items-start justify-between gap-4 md:mb-5', className)}
      {...props}
    >
      <div className="min-w-0">
        <h1 className="hidden text-2xl font-semibold tracking-tight text-[var(--color-text)] md:block">
          {title}
        </h1>
        {meta && (
          <div className="text-[13px] tabular-nums text-[var(--color-text-muted)] md:mt-1 md:text-sm">
            {meta}
          </div>
        )}
      </div>
      {ctaSlot ?? (
        <Button onClick={onCta} className="h-10 gap-1.5">
          <FilePlus2 className="size-3.5" />
          {ctaLabel}
        </Button>
      )}
    </div>
  ),
)
KaruteListPageHeader.displayName = 'KaruteListPageHeader'
