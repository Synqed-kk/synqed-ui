import {
  Eye,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Copy,
  type LucideIcon,
} from 'lucide-react'
import { forwardRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

export type DisclosureMode = 'A' | 'B' | 'C'

const iconMap: Record<DisclosureMode, LucideIcon> = {
  A: Eye,
  B: MessageSquare,
  C: ShieldCheck,
}

const toneMap: Record<DisclosureMode, string> = {
  A: 'border border-[var(--color-border)] bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]',
  B: 'border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  C: 'border border-[var(--color-success)]/20 bg-[var(--color-success)]/10 text-[var(--color-success)]',
}

interface DisclosureModeIndicatorProps extends HTMLAttributes<HTMLElement> {
  mode: DisclosureMode
  /** Localized mode label (e.g. "Mode A · Implicit"). */
  label: string
  /** One-sentence summary shown in block size and as tooltip in compact size. */
  summary: string
  /** Render the slim pill or the full card with the description and Mode-B script reveal. */
  size?: 'compact' | 'block'
  /** Mode-B suggested script. When provided in block size, surfaces a reveal/copy affordance. */
  script?: string
  /** Localized "Show suggested script" label (block only). */
  showScriptLabel?: string
  /** Localized "Copy" label (block only). */
  copyLabel?: string
}

export const DisclosureModeIndicator = forwardRef<HTMLElement, DisclosureModeIndicatorProps>(
  (
    {
      mode,
      label,
      summary,
      size = 'compact',
      script,
      showScriptLabel = 'Show suggested script',
      copyLabel = 'Copy',
      className,
      ...props
    },
    ref,
  ) => {
    const Icon = iconMap[mode]
    const tone = toneMap[mode]
    const [scriptOpen, setScriptOpen] = useState(false)

    if (size === 'compact') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(
            'inline-flex h-5 items-center gap-1 rounded-full px-2 text-[10px] font-medium',
            tone,
            className,
          )}
          title={summary}
          {...(props as HTMLAttributes<HTMLSpanElement>)}
        >
          <Icon className="size-2.5" aria-hidden />
          <span className="max-w-[140px] truncate">{label}</span>
        </span>
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn('rounded-[var(--radius-sm)] px-3 py-2', tone, className)}
        {...(props as HTMLAttributes<HTMLDivElement>)}
      >
        <div className="flex items-start gap-2">
          <Icon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold">{label}</div>
            <div className="mt-0.5 text-[10px] leading-relaxed opacity-80">{summary}</div>
            {mode === 'B' && script && (
              <>
                <button
                  type="button"
                  onClick={() => setScriptOpen((v) => !v)}
                  className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  {scriptOpen ? (
                    <ChevronUp className="size-2.5" aria-hidden />
                  ) : (
                    <ChevronDown className="size-2.5" aria-hidden />
                  )}
                  {showScriptLabel}
                </button>
                {scriptOpen && (
                  <div className="mt-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-card)] px-2 py-1.5">
                    <p className="text-[11px] italic leading-relaxed text-[var(--color-text)]">
                      {script}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(script)
                        }
                      }}
                      className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-medium opacity-80 transition-opacity hover:opacity-100"
                    >
                      <Copy className="size-2.5" aria-hidden />
                      {copyLabel}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    )
  },
)
DisclosureModeIndicator.displayName = 'DisclosureModeIndicator'
