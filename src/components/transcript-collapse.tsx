import { ChevronDown, Mic, Play } from 'lucide-react'
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { ConsentBadge } from './consent-badge.js'

// ------------------------------------------------------------
// Collapsible recording / transcript card — header with consent
// chip + duration, expanded body with playback chrome and either
// the diarized view (caller-provided) or a plain-text fallback.
// ------------------------------------------------------------

export interface TranscriptCollapseCopy {
  title: string
  playbackPrefix: string
  consentGrantedLabel: string
  consentMissingLabel: string
  playAriaLabel: string
}

const DEFAULT_COPY: TranscriptCollapseCopy = {
  title: 'Recording transcript',
  playbackPrefix: 'Duration ',
  consentGrantedLabel: 'Consent',
  consentMissingLabel: 'No consent',
  playAriaLabel: 'Play recording',
}

interface TranscriptCollapseProps extends HTMLAttributes<HTMLDivElement> {
  consent: boolean
  consentDate?: string
  durationLabel: string
  /** Plain-text fallback when no diarized view is provided. */
  content: string
  /** Optional pre-rendered diarized view. Caller supplies a
   *  DiarizedTranscriptView etc. */
  diarizedSlot?: ReactNode
  copy?: Partial<TranscriptCollapseCopy>
  defaultOpen?: boolean
  onPlay?: () => void
}

export function TranscriptCollapse({
  consent,
  consentDate,
  durationLabel,
  content,
  diarizedSlot,
  copy,
  defaultOpen = false,
  onPlay,
  className,
  ...props
}: TranscriptCollapseProps) {
  const L: TranscriptCollapseCopy = { ...DEFAULT_COPY, ...copy }
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)]',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[var(--color-bg-card-hover)]"
      >
        <Mic className="size-4 shrink-0 text-[var(--color-accent)]" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">{L.title}</span>
            <ConsentBadge
              consent={consent}
              consentDate={consentDate}
              grantedLabel={L.consentGrantedLabel}
              missingLabel={L.consentMissingLabel}
            />
          </div>
          <span className="mt-0.5 block text-xs tabular-nums text-[var(--color-text-muted)]">
            {L.playbackPrefix}
            {durationLabel}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'size-4 text-[var(--color-text-muted)] transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <div className="border-t border-[var(--color-border)] px-4 pb-4">
          <div className="mb-3 mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onPlay}
              aria-label={L.playAriaLabel}
              className="flex size-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              <Play className="ml-0.5 size-3.5" fill="currentColor" />
            </button>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-bg-muted)]">
              <div className="h-full w-0 rounded-full bg-[var(--color-accent)]" />
            </div>
            <span className="text-xs tabular-nums text-[var(--color-text-muted)]">
              00:00 / {durationLabel}
            </span>
          </div>
          {diarizedSlot ? (
            <div className="max-h-[420px] overflow-y-auto pr-1">{diarizedSlot}</div>
          ) : (
            <div className="max-h-48 overflow-y-auto rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-3">
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[var(--color-text)]/80">
                {content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
