import { AlertCircle, RotateCcw } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { Button } from './button.js'
import { cn } from '../utils/cn.js'

interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  error: Error | { message: string }
  title?: string
  helpHint?: string
  retryLabel?: string
  onRetry?: () => void
}

export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      error,
      title = 'Something went wrong',
      helpHint = 'If the problem persists, please contact support.',
      retryLabel = 'Retry',
      onRetry,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-md)] border border-[var(--color-destructive)]/20 bg-[var(--color-bg-card)]',
        'p-6 text-center',
        className,
      )}
      {...props}
    >
      <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]">
        <AlertCircle className="size-6" />
      </div>
      <div className="mb-1 text-sm font-semibold text-[var(--color-text)]">{title}</div>
      <div className="mb-4 font-mono text-xs text-[var(--color-text-muted)]">{error.message}</div>
      <div className="mb-4 text-xs text-[var(--color-text-muted)]">{helpHint}</div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="gap-1.5">
          <RotateCcw className="size-3.5" />
          {retryLabel}
        </Button>
      )}
    </div>
  ),
)
ErrorState.displayName = 'ErrorState'
