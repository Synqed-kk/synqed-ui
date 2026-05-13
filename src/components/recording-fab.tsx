import { Mic, Square } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Desktop floating action button — start/stop recording. Hidden on
// mobile (md:flex). Caller controls `recording` state and supplies
// callbacks. When recording, an elapsed timer is shown.
// ------------------------------------------------------------

export interface RecordingFabCopy {
  start: string
  stop: string
}

const DEFAULT_COPY: RecordingFabCopy = {
  start: 'Start recording',
  stop: 'Stop recording',
}

interface RecordingFabProps extends HTMLAttributes<HTMLButtonElement> {
  recording?: boolean
  /** Already-formatted timer (e.g. "03:12"). */
  elapsed?: string
  onStart?: () => void
  onStop?: () => void
  copy?: Partial<RecordingFabCopy>
}

export const RecordingFab = forwardRef<HTMLButtonElement, RecordingFabProps>(
  ({ recording = false, elapsed, onStart, onStop, copy, className, ...props }, ref) => {
    const L: RecordingFabCopy = { ...DEFAULT_COPY, ...copy }

    if (recording) {
      return (
        <button
          ref={ref}
          type="button"
          data-desktop-chrome="true"
          onClick={onStop}
          aria-label={L.stop}
          className={cn(
            'fixed bottom-6 right-6 z-30 hidden h-12 items-center gap-2.5 rounded-full bg-[var(--color-recording,var(--color-destructive))] pl-3 pr-5 text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98] md:flex',
            className,
          )}
          {...props}
        >
          <span className="relative flex size-7 items-center justify-center rounded-full bg-white/20">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/30" />
            <Square className="relative size-3" fill="currentColor" aria-hidden />
          </span>
          {elapsed && (
            <span className="text-sm font-medium tabular-nums">{elapsed}</span>
          )}
        </button>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        data-desktop-chrome="true"
        onClick={onStart}
        aria-label={L.start}
        className={cn(
          'fixed bottom-6 right-6 z-30 hidden h-12 items-center gap-2.5 rounded-full bg-[var(--color-chrome)] pl-4 pr-5 text-white shadow-lg shadow-black/20 transition-all hover:bg-[var(--color-chrome-hover)] hover:shadow-xl active:scale-[0.98] md:flex',
          className,
        )}
        {...props}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-[var(--color-recording,var(--color-destructive))]">
          <Mic className="size-3.5" aria-hidden />
        </span>
        <span className="text-sm font-medium">{L.start}</span>
      </button>
    )
  },
)
RecordingFab.displayName = 'RecordingFab'
