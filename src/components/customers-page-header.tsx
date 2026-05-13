import { UserPlus } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'

// ------------------------------------------------------------
// Customers index page header — title, count summary, primary
// "new customer" CTA. Pure presenter; caller owns the dialog.
// ------------------------------------------------------------

interface CustomersPageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  /** Pre-rendered meta line e.g. "Registered 124 · Showing 12". */
  meta?: ReactNode
  ctaLabel: string
  onCta?: () => void
  /** Replace the default Button slot for advanced uses. */
  ctaSlot?: ReactNode
}

export const CustomersPageHeader = forwardRef<HTMLDivElement, CustomersPageHeaderProps>(
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
          <UserPlus className="size-3.5" />
          {ctaLabel}
        </Button>
      )}
    </div>
  ),
)
CustomersPageHeader.displayName = 'CustomersPageHeader'
