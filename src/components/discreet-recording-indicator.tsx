import { Info, ShieldCheck, Square, X } from 'lucide-react'
import { useEffect, useRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// "Ninja dot" recording indicator — used in disclosure Mode A where
// the customer-facing surface should be discreet. Tiny pulsing dot;
// caller controls the reveal-popover open state (long-press logic
// lives in app code so we don't bake in a long-press dependency).
// ------------------------------------------------------------

export interface DiscreetRecordingIndicatorCopy {
  dotAria: string
  dotTitle: string
  recordingActive: string
  modeAHint: string
  privacyNote: string
  stop: string
  close: string
}

const DEFAULT_COPY: DiscreetRecordingIndicatorCopy = {
  dotAria: 'Recording active (discreet mode). Long-press to reveal.',
  dotTitle: 'Long-press to reveal',
  recordingActive: 'Recording (Mode A)',
  modeAHint:
    "Intentionally subtle so the customer doesn't notice. Recording proceeds normally.",
  privacyNote:
    "Mode A relies on your store's privacy policy disclosing AI recording as a purpose of use.",
  stop: 'Stop recording',
  close: 'Close',
}

interface DiscreetRecordingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Mobile = inline dot. Desktop = fixed bottom-right. */
  variant?: 'mobile' | 'desktop'
  /** Already-formatted timer (e.g. "03:12"). Shown in the reveal popover. */
  elapsed?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onStop?: () => void
  /** Auto-close the popover after this many ms with no interaction. 0 disables. */
  autoCloseMs?: number
  /** Bind the dot's interaction handler externally (e.g. long-press from a hook).
   *  When omitted, a click toggles the popover. */
  dotProps?: HTMLAttributes<HTMLButtonElement>
  copy?: Partial<DiscreetRecordingIndicatorCopy>
}

export function DiscreetRecordingIndicator({
  variant = 'mobile',
  elapsed,
  open,
  onOpenChange,
  onStop,
  autoCloseMs = 10_000,
  dotProps,
  copy,
  className,
  ...props
}: DiscreetRecordingIndicatorProps) {
  const L: DiscreetRecordingIndicatorCopy = { ...DEFAULT_COPY, ...copy }
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!open || !autoCloseMs) return
    if (typeof window === 'undefined') return
    timerRef.current = window.setTimeout(() => onOpenChange(false), autoCloseMs)
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [open, autoCloseMs, onOpenChange])

  useEffect(() => {
    if (!open) return
    if (typeof window === 'undefined') return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest('[data-discreet-reveal]')) return
      onOpenChange(false)
    }
    window.addEventListener('mousedown', onDocClick)
    return () => window.removeEventListener('mousedown', onDocClick)
  }, [open, onOpenChange])

  const positionClass =
    variant === 'mobile' ? 'relative' : 'hidden md:block fixed right-6 bottom-6 z-30'

  return (
    <div
      data-discreet-reveal
      className={cn(positionClass, className)}
      {...props}
    >
      <button
        type="button"
        aria-label={L.dotAria}
        title={L.dotTitle}
        onClick={() => onOpenChange(!open)}
        {...dotProps}
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-muted)] transition-colors hover:bg-[var(--color-bg-card-hover)]',
          variant === 'mobile' ? 'size-7' : 'size-9 shadow-md',
          dotProps?.className,
        )}
      >
        <span className="relative flex items-center justify-center">
          <span
            className="absolute inline-flex size-3 animate-ping rounded-full"
            style={{ background: 'var(--color-recording, var(--color-destructive))', opacity: 0.3 }}
          />
          <span
            className={cn(
              'relative inline-block rounded-full',
              variant === 'mobile' ? 'size-1.5' : 'size-2',
            )}
            style={{ background: 'var(--color-recording, var(--color-destructive))' }}
          />
        </span>
      </button>

      {open && (
        <div
          data-discreet-reveal
          className={cn(
            'absolute z-40 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 shadow-xl',
            variant === 'mobile' ? 'right-0 top-9 w-[280px]' : 'bottom-12 right-0 w-[320px]',
          )}
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-4 items-center justify-center">
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full"
                  style={{ background: 'var(--color-recording, var(--color-destructive))', opacity: 0.3 }}
                />
                <span
                  className="relative inline-block size-2 rounded-full"
                  style={{ background: 'var(--color-recording, var(--color-destructive))' }}
                />
              </span>
              <span className="text-[13px] font-semibold text-[var(--color-text)]">
                {L.recordingActive}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={L.close}
              className="inline-flex size-5 items-center justify-center rounded text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)]"
            >
              <X className="size-3" aria-hidden />
            </button>
          </div>

          {elapsed && (
            <div className="mb-2 text-[20px] font-semibold leading-none tabular-nums text-[var(--color-text)]">
              {elapsed}
            </div>
          )}

          <p className="mb-3 flex items-start gap-1 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
            <Info className="mt-0.5 size-3 shrink-0" aria-hidden />
            {L.modeAHint}
          </p>

          <p className="mb-3 flex items-start gap-1 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
            <ShieldCheck className="mt-0.5 size-3 shrink-0" aria-hidden />
            {L.privacyNote}
          </p>

          <button
            type="button"
            onClick={() => {
              onStop?.()
              onOpenChange(false)
            }}
            className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-destructive)] text-[13px] font-medium text-[var(--color-destructive-text)] transition-colors hover:opacity-90"
          >
            <Square className="size-3" fill="currentColor" aria-hidden />
            {L.stop}
          </button>
        </div>
      )}
    </div>
  )
}
