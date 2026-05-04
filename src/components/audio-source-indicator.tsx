import { Smartphone, Bluetooth, Cable, type LucideIcon } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

export type AudioSource = 'phone_mic' | 'external_bluetooth' | 'external_wired'

const iconMap: Record<AudioSource, LucideIcon> = {
  phone_mic: Smartphone,
  external_bluetooth: Bluetooth,
  external_wired: Cable,
}

const toneFor: Record<AudioSource, 'neutral' | 'accent'> = {
  phone_mic: 'neutral',
  external_bluetooth: 'accent',
  external_wired: 'accent',
}

const toneClasses = {
  neutral:
    'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
  accent:
    'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20',
} as const

interface AudioSourceIndicatorProps extends HTMLAttributes<HTMLElement> {
  source: AudioSource
  /** Compact pill (h-5 with icon + short label) or block (larger with subtitle). */
  size?: 'compact' | 'block'
  label: string
  subtitle?: string
}

export const AudioSourceIndicator = forwardRef<HTMLElement, AudioSourceIndicatorProps>(
  ({ source, size = 'compact', label, subtitle, className, ...props }, ref) => {
    const Icon = iconMap[source]
    const tone = toneClasses[toneFor[source]]

    if (size === 'compact') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(
            'inline-flex h-5 items-center gap-1 rounded-full px-2 text-[10px] font-medium',
            tone,
            className,
          )}
          title={subtitle}
          {...(props as HTMLAttributes<HTMLSpanElement>)}
        >
          <Icon className="size-2.5" aria-hidden />
          <span className="max-w-[160px] truncate">{label}</span>
        </span>
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          'inline-flex items-start gap-2 rounded-[var(--radius-sm)] px-3 py-2',
          tone,
          className,
        )}
        {...(props as HTMLAttributes<HTMLDivElement>)}
      >
        <Icon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        <div className="min-w-0">
          <div className="text-[12px] font-semibold">{label}</div>
          {subtitle && <div className="text-[10px] leading-relaxed opacity-80">{subtitle}</div>}
        </div>
      </div>
    )
  },
)
AudioSourceIndicator.displayName = 'AudioSourceIndicator'
