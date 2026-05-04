import { Target, Settings as SettingsIcon } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

interface BusinessProfileHintProps extends HTMLAttributes<HTMLElement> {
  /** Active business-type label (e.g. "Hair salon"). */
  label: string
  /** One-sentence tagline shown in block size; tooltip in inline size. */
  tagline: string
  /** Compact pill or full block callout. */
  size?: 'inline' | 'block'
  /** Block prefix label (e.g. "Tuned for"). Defaults to "Tuned for". */
  prefix?: string
  /** Block "change settings" link label. Defaults to "Change". */
  settingsLabel?: string
  /** Render a settings link/button. Omit to hide entirely. */
  settingsSlot?: ReactNode
  /** Convenience: when settingsSlot is omitted, render a default button wired to this callback. */
  onSettings?: () => void
}

export const BusinessProfileHint = forwardRef<HTMLElement, BusinessProfileHintProps>(
  (
    {
      label,
      tagline,
      size = 'block',
      prefix = 'Tuned for',
      settingsLabel = 'Change',
      settingsSlot,
      onSettings,
      className,
      ...props
    },
    ref,
  ) => {
    if (size === 'inline') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(
            'inline-flex h-5 items-center gap-1 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-2 text-[10px] font-medium text-[var(--color-accent)]',
            className,
          )}
          title={tagline}
          {...(props as HTMLAttributes<HTMLSpanElement>)}
        >
          <Target className="size-2.5 shrink-0" aria-hidden />
          <span className="max-w-[180px] truncate">
            {prefix}: {label}
          </span>
        </span>
      )
    }

    const settings =
      settingsSlot ??
      (onSettings ? (
        <button
          type="button"
          onClick={onSettings}
          className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
        >
          <SettingsIcon className="size-3" aria-hidden />
          {settingsLabel}
        </button>
      ) : null)

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          'flex items-start gap-2 rounded-[var(--radius-sm)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-3 py-2',
          className,
        )}
        {...(props as HTMLAttributes<HTMLDivElement>)}
      >
        <Target
          className="mt-0.5 size-3.5 shrink-0 text-[var(--color-accent)]"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[var(--color-accent)]">
            <span className="text-[10px] uppercase tracking-wider">{prefix}</span>
            <span className="text-[var(--color-text)]">{label}</span>
          </div>
          <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
            {tagline}
          </p>
        </div>
        {settings}
      </div>
    )
  },
)
BusinessProfileHint.displayName = 'BusinessProfileHint'
