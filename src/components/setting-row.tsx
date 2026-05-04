import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Settings row primitive — label/description on the left (or top),
// the editable control on the right (or below). Vertical orientation
// stacks at every breakpoint; horizontal stacks on mobile and goes
// side-by-side with a 220px label column on md+.
// ------------------------------------------------------------

export type SettingRowOrientation = 'horizontal' | 'vertical'

interface SettingRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  description?: string
  orientation?: SettingRowOrientation
  children: ReactNode
}

export const SettingRow = forwardRef<HTMLDivElement, SettingRowProps>(
  ({ label, description, orientation = 'horizontal', children, className, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn(
            'border-b border-[var(--color-border)] py-4 last:border-b-0',
            className,
          )}
          {...props}
        >
          <div className="mb-2">
            <div className="text-[14px] font-medium text-[var(--color-text)]">{label}</div>
            {description && (
              <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--color-text-muted)]">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'border-b border-[var(--color-border)] py-4 last:border-b-0 md:flex md:items-start md:gap-6',
          className,
        )}
        {...props}
      >
        <div className="mb-2 md:mb-0 md:w-[220px] md:shrink-0">
          <div className="text-[14px] font-medium text-[var(--color-text)]">{label}</div>
          {description && (
            <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--color-text-muted)] md:mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    )
  },
)
SettingRow.displayName = 'SettingRow'
