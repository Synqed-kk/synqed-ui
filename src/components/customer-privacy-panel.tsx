import {
  AlertTriangle,
  Download,
  History,
  ShieldCheck,
  ShieldOff,
  Trash2,
  Undo2,
  type LucideIcon,
} from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// APPI rights surface for a customer profile — the
// access-history shortcut + 1–N action rows. The surface itself
// is dumb; caller wires the dialogs and audit writes.
// ------------------------------------------------------------

export type CustomerPrivacyTone = 'neutral' | 'warning' | 'danger'

export interface CustomerPrivacyAction {
  id: string
  /** Visual icon. Defaults derived from `tone` when omitted. */
  icon?: LucideIcon
  tone: CustomerPrivacyTone
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  disabled?: boolean
}

export interface CustomerPrivacyAccessHistory {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

interface CustomerPrivacyPanelProps extends HTMLAttributes<HTMLElement> {
  title: string
  intro: string
  /** Optional shortcut row pinned at the top. */
  accessHistory?: CustomerPrivacyAccessHistory
  actions: CustomerPrivacyAction[]
  footerDisclaimer?: ReactNode
}

const TONE_TO_ICON: Record<CustomerPrivacyTone, LucideIcon> = {
  neutral: Download,
  warning: ShieldOff,
  danger: Trash2,
}

function toneClasses(tone: CustomerPrivacyTone) {
  if (tone === 'danger') {
    return {
      container:
        'border border-[var(--color-destructive)]/20 bg-[var(--color-destructive)]/5',
      icon: 'text-[var(--color-destructive)]',
      button:
        'bg-[var(--color-destructive)] text-[var(--color-destructive-text)] hover:opacity-90',
    }
  }
  if (tone === 'warning') {
    return {
      container: 'border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5',
      icon: 'text-[var(--color-warning)]',
      button:
        'bg-[var(--color-warning)] text-[var(--color-text-inverse)] hover:opacity-90',
    }
  }
  return {
    container: 'border border-[var(--color-border)] bg-[var(--color-bg-muted)]',
    icon: 'text-[var(--color-text)]/70',
    button:
      'bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)]',
  }
}

export const CustomerPrivacyPanel = forwardRef<HTMLElement, CustomerPrivacyPanelProps>(
  ({ title, intro, accessHistory, actions, footerDisclaimer, className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5',
        className,
      )}
      {...props}
    >
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="size-4 text-[var(--color-accent)]" aria-hidden />
        <h2 className="text-sm font-semibold text-[var(--color-text)]">{title}</h2>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-[var(--color-text-muted)]">{intro}</p>

      <div className="space-y-2">
        {accessHistory && (
          <div className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-3">
            <History
              className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-[var(--color-text)]">
                {accessHistory.title}
              </div>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                {accessHistory.description}
              </p>
            </div>
            <button
              type="button"
              onClick={accessHistory.onAction}
              className="inline-flex h-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 text-xs font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              {accessHistory.actionLabel}
            </button>
          </div>
        )}

        {actions.map((a) => {
          const Icon = a.icon ?? TONE_TO_ICON[a.tone]
          const classes = toneClasses(a.tone)
          // Substitute Undo2 for "warning" rows hosting a recovery affordance is up to caller.
          const Render = Icon === ShieldOff && a.tone === 'warning' ? ShieldOff : Icon
          // Use Undo2 only when caller passes it explicitly.
          const FinalIcon = a.icon ?? Render
          return (
            <div
              key={a.id}
              className={cn(
                'flex items-start gap-3 rounded-[var(--radius-sm)] p-3',
                classes.container,
              )}
            >
              <FinalIcon className={cn('mt-0.5 size-4 shrink-0', classes.icon)} aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-[var(--color-text)]">{a.title}</div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                  {a.description}
                </p>
              </div>
              <button
                type="button"
                onClick={a.onAction}
                disabled={a.disabled}
                className={cn(
                  'inline-flex h-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] px-3 text-xs font-medium transition-colors',
                  'disabled:cursor-not-allowed disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-muted)]',
                  classes.button,
                )}
              >
                {a.actionLabel}
              </button>
            </div>
          )
        })}
      </div>

      {footerDisclaimer && (
        <p className="mt-4 flex items-start gap-1 text-[10px] text-[var(--color-text-muted)]">
          <AlertTriangle className="mt-0.5 size-3 shrink-0" aria-hidden />
          {footerDisclaimer}
        </p>
      )}
    </section>
  ),
)
CustomerPrivacyPanel.displayName = 'CustomerPrivacyPanel'
// Re-export Undo2 helpers for convenience: callers may use this icon
// for the "undo deletion" warning row.
export { Undo2 as PrivacyUndoIcon }
