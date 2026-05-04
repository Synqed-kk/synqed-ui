import { Bell, ChevronLeft, Square } from 'lucide-react'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Sticky mobile header — back affordance on the left, page title in
// the middle, and a configurable right slot:
//   - bell with optional unread badge,
//   - or a "stop recording" pill (with running timer),
//   - or any custom node via `rightSlot`.
// ------------------------------------------------------------

export interface MobileHeaderCopy {
  back: string
  notifications: string
  stopRecording: string
}

const DEFAULT_COPY: MobileHeaderCopy = {
  back: 'Back',
  notifications: 'Notifications',
  stopRecording: 'Stop recording',
}

interface MobileHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string
  /** Show back arrow on the left. Defaults to false. */
  showBack?: boolean
  onBack?: () => void

  /** Right-slot mode. Default = bell. */
  rightVariant?: 'bell' | 'stopRecording' | 'custom' | 'none'
  /** Used when rightVariant = 'bell'. */
  unreadCount?: number
  onNotifications?: () => void
  /** Used when rightVariant = 'stopRecording'. */
  recordingElapsed?: string
  onStopRecording?: () => void
  /** Used when rightVariant = 'custom'. */
  rightSlot?: ReactNode

  copy?: Partial<MobileHeaderCopy>
}

export const MobileHeader = forwardRef<HTMLElement, MobileHeaderProps>(
  (
    {
      title,
      showBack = false,
      onBack,
      rightVariant = 'bell',
      unreadCount = 0,
      onNotifications,
      recordingElapsed,
      onStopRecording,
      rightSlot,
      copy,
      className,
      ...props
    },
    ref,
  ) => {
    const L: MobileHeaderCopy = { ...DEFAULT_COPY, ...copy }

    return (
      <header
        ref={ref}
        data-mobile-chrome="true"
        className={cn(
          'sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl md:hidden',
          className,
        )}
        {...props}
      >
        <div className="flex h-14 items-center gap-1 px-2">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label={L.back}
              className="inline-flex size-11 items-center justify-center rounded-full text-[var(--color-text)] transition-colors active:bg-[var(--color-bg-muted)]"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
          ) : (
            <span aria-hidden className="size-11 shrink-0" />
          )}

          <h1 className="flex-1 truncate px-1 text-center text-[17px] font-semibold tracking-tight text-[var(--color-text)]">
            {title}
          </h1>

          {rightVariant === 'stopRecording' ? (
            <button
              type="button"
              onClick={onStopRecording}
              aria-label={L.stopRecording}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[var(--color-recording,var(--color-destructive))] pl-1 pr-2.5 text-white transition-colors active:opacity-90"
            >
              <span className="relative inline-flex size-6 items-center justify-center rounded-full bg-white/25">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/20" />
                <Square className="relative size-2.5" fill="currentColor" aria-hidden />
              </span>
              {recordingElapsed && (
                <span className="text-xs font-medium leading-none tabular-nums">
                  {recordingElapsed}
                </span>
              )}
            </button>
          ) : rightVariant === 'custom' ? (
            <div className="inline-flex size-11 items-center justify-center">{rightSlot}</div>
          ) : rightVariant === 'none' ? (
            <span aria-hidden className="size-11 shrink-0" />
          ) : (
            <button
              type="button"
              onClick={onNotifications}
              aria-label={L.notifications}
              className="relative inline-flex size-11 items-center justify-center rounded-full text-[var(--color-text)] transition-colors active:bg-[var(--color-bg-muted)]"
            >
              <Bell className="size-5" aria-hidden />
              {unreadCount > 0 && (
                <span
                  aria-hidden
                  className="absolute right-1.5 top-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-destructive)] px-1 text-[10px] font-semibold leading-none tabular-nums text-white ring-2 ring-[var(--color-bg-card)]"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}
        </div>
      </header>
    )
  },
)
MobileHeader.displayName = 'MobileHeader'
