import { forwardRef, type ReactNode, type LabelHTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

interface DialogFieldProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  label: ReactNode
  hint?: ReactNode
  required?: boolean
  children: ReactNode
}

export const DialogField = forwardRef<HTMLLabelElement, DialogFieldProps>(
  ({ label, hint, required, children, className, ...props }, ref) => (
    <label ref={ref} className={cn('block', className)} {...props}>
      <span className="mb-1 block text-xs font-medium text-[var(--color-text)]">
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--color-destructive)]" aria-hidden>
            *
          </span>
        )}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-[var(--color-text-muted)]">{hint}</span>}
    </label>
  ),
)
DialogField.displayName = 'DialogField'
