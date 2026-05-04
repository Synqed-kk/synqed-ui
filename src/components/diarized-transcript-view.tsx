import { AlertTriangle, Users, Volume2, Pencil, Check, X } from 'lucide-react'
import { useState, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Types — local; in karute/synqed-core these mirror the
// `recordings.diarized_transcript` jsonb schema.
// ------------------------------------------------------------

export type SpeakerRole = 'staff' | 'customer' | 'staff_2' | 'unknown'

export interface DiarizedSpeaker {
  id: string
  role: SpeakerRole
  /** Display label (caller-localized). */
  label: string
}

export interface DiarizedSegment {
  id: string
  speakerId: string
  /** 0–1 confidence the diarization engine has in the speakerId. */
  speakerConfidence: number
  startSeconds: number
  /** Segment body (caller-localized). */
  text: string
  /** True when the segment overlaps another speaker's audio. */
  isOverlap?: boolean
  /** When staff has already corrected the speaker label, the new id. */
  staffRelabeledSpeakerId?: string
}

export interface DiarizedTranscript {
  /** 0–1 overall diarization confidence. */
  overallConfidence: number
  speakers: DiarizedSpeaker[]
  segments: DiarizedSegment[]
  /** Engine name for the footer (e.g. "openai-whisper"). */
  source?: string
}

export interface DiarizedTranscriptCopy {
  noTranscript: string
  speakersLabel: string
  reviewRecommended: string
  reviewRecommendedBody: (pct: number) => string
  overlapLabel: string
  overlapTitle: string
  relabeledLabel: string
  relabeledTitle: string
  reviewPromptTitle: string
  reviewPromptBadge: string
  reviewPromptQuestion: string
  editLabel: string
  relabelAs: string
  footerSource: (src: string) => string
}

const DEFAULT_COPY: DiarizedTranscriptCopy = {
  noTranscript: 'Transcript not available yet.',
  speakersLabel: 'Speakers',
  reviewRecommended: 'Overall speaker identification is low-confidence',
  reviewRecommendedBody: (pct) =>
    `Diarization confidence is ${pct}%. We recommend reviewing the important parts.`,
  overlapLabel: 'Overlap',
  overlapTitle: "Segment overlaps with another speaker's audio",
  relabeledLabel: 'Corrected',
  relabeledTitle: 'Staff has corrected this speaker label',
  reviewPromptTitle: 'Speaker identification uncertain for this segment',
  reviewPromptBadge: 'Review',
  reviewPromptQuestion: 'Who said this?',
  editLabel: 'Edit speaker',
  relabelAs: 'Relabel as',
  footerSource: (src) => `Transcription engine: ${src}`,
}

export const SPEAKER_CONFIDENCE_REVIEW_THRESHOLD = 0.7
export const OVERALL_CONFIDENCE_BANNER_THRESHOLD = 0.7

// ------------------------------------------------------------
// Speaker tone — staff/customer/staff_2/unknown map onto theme tokens.
// Multi-speaker conversations need distinct tones; we lean on the
// existing token palette (accent / destructive / warning / muted)
// rather than introducing per-role hues.
// ------------------------------------------------------------

interface SpeakerTone {
  bubble: string
  chip: string
  text: string
}

const speakerTones: Record<SpeakerRole, SpeakerTone> = {
  staff: {
    bubble: 'border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10',
    chip: 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]',
    text: 'text-[var(--color-accent)]',
  },
  customer: {
    bubble: 'border-[var(--color-destructive)]/20 bg-[var(--color-destructive)]/10',
    chip: 'bg-[var(--color-destructive)]/15 text-[var(--color-destructive)]',
    text: 'text-[var(--color-destructive)]',
  },
  staff_2: {
    bubble: 'border-[var(--color-warning)]/20 bg-[var(--color-warning)]/10',
    chip: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
    text: 'text-[var(--color-warning)]',
  },
  unknown: {
    bubble: 'border-[var(--color-border)] bg-[var(--color-bg-muted)]',
    chip: 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]',
    text: 'text-[var(--color-text-muted)]',
  },
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

interface DiarizedTranscriptViewProps extends HTMLAttributes<HTMLDivElement> {
  transcript: DiarizedTranscript
  /** Plain-text fallback rendered when transcript.segments is empty. */
  fallbackText?: string
  /** Localized copy bag. Falls back to English defaults. */
  copy?: Partial<DiarizedTranscriptCopy>
  /** Whether staff can relabel speakers. Hides relabel affordances when false. */
  allowRelabel?: boolean
  /** Called when staff relabels a segment. Optional — local state always applies. */
  onRelabel?: (segmentId: string, newSpeakerId: string) => void
}

export function DiarizedTranscriptView({
  transcript,
  fallbackText,
  copy,
  allowRelabel = true,
  onRelabel,
  className,
  ...props
}: DiarizedTranscriptViewProps) {
  const L: DiarizedTranscriptCopy = { ...DEFAULT_COPY, ...copy }
  const [localRelabels, setLocalRelabels] = useState<Record<string, string>>({})

  if (!transcript.segments || transcript.segments.length === 0) {
    return (
      <div
        className={cn(
          'max-h-48 overflow-y-auto rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-3',
          className,
        )}
        {...props}
      >
        {fallbackText ? (
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[var(--color-text)]">
            {fallbackText}
          </pre>
        ) : (
          <p className="text-xs italic text-[var(--color-text-muted)]">{L.noTranscript}</p>
        )}
      </div>
    )
  }

  const speakerById = new Map(transcript.speakers.map((s) => [s.id, s]))
  const effectiveSpeakerId = (seg: DiarizedSegment): string =>
    localRelabels[seg.id] ?? seg.staffRelabeledSpeakerId ?? seg.speakerId
  const overallLow = transcript.overallConfidence < OVERALL_CONFIDENCE_BANNER_THRESHOLD

  const relabelSegment = (segmentId: string, newSpeakerId: string) => {
    setLocalRelabels((prev) => ({ ...prev, [segmentId]: newSpeakerId }))
    onRelabel?.(segmentId, newSpeakerId)
  }

  return (
    <div className={cn('space-y-3', className)} {...props}>
      {overallLow && (
        <div className="flex items-start gap-2 rounded-[var(--radius-sm)] border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-3 py-2.5">
          <AlertTriangle
            className="mt-0.5 size-3.5 shrink-0 text-[var(--color-warning)]"
            aria-hidden
          />
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-[var(--color-warning)]">
              {L.reviewRecommended}
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
              {L.reviewRecommendedBody(Math.round(transcript.overallConfidence * 100))}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          <Users className="size-3" aria-hidden />
          {L.speakersLabel}
        </span>
        {transcript.speakers.map((sp) => {
          const tone = speakerTones[sp.role]
          return (
            <span
              key={sp.id}
              className={cn(
                'inline-flex h-5 items-center gap-1 rounded-full px-2 text-[11px] font-medium',
                tone.chip,
              )}
            >
              {sp.label}
            </span>
          )
        })}
      </div>

      <ol className="space-y-2">
        {transcript.segments.map((seg) => {
          const effectiveId = effectiveSpeakerId(seg)
          const speaker = speakerById.get(effectiveId) ?? transcript.speakers[0]
          if (!speaker) return null
          const tone = speakerTones[speaker.role]
          const lowConf = seg.speakerConfidence < SPEAKER_CONFIDENCE_REVIEW_THRESHOLD
          const relabeled = !!localRelabels[seg.id] || !!seg.staffRelabeledSpeakerId

          return (
            <li key={seg.id} className="group flex gap-2">
              <div className="w-11 shrink-0 pt-1 text-right">
                <span className="text-[10px] tabular-nums text-[var(--color-text-muted)]">
                  {formatTime(seg.startSeconds)}
                </span>
              </div>
              <div
                className={cn(
                  'flex-1 rounded-[var(--radius-sm)] border px-3 py-2',
                  tone.bubble,
                )}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className={cn('text-[11px] font-semibold', tone.text)}>
                    {speaker.label}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {seg.isOverlap && (
                      <span
                        className="inline-flex h-4 items-center gap-0.5 rounded bg-[var(--color-warning)]/15 px-1.5 text-[9px] font-medium text-[var(--color-warning)]"
                        title={L.overlapTitle}
                      >
                        <Volume2 className="size-2.5" aria-hidden />
                        {L.overlapLabel}
                      </span>
                    )}
                    {relabeled && (
                      <span
                        className="inline-flex h-4 items-center gap-0.5 rounded bg-[var(--color-accent)]/15 px-1.5 text-[9px] font-medium text-[var(--color-accent)]"
                        title={L.relabeledTitle}
                      >
                        <Check className="size-2.5" aria-hidden />
                        {L.relabeledLabel}
                      </span>
                    )}
                    {allowRelabel && lowConf && !relabeled && (
                      <RelabelPrompt
                        speakers={transcript.speakers}
                        copy={L}
                        onRelabel={(newId) => relabelSegment(seg.id, newId)}
                      />
                    )}
                    {allowRelabel && !lowConf && (
                      <SegmentMenu
                        segmentSpeakerId={seg.speakerId}
                        speakers={transcript.speakers}
                        copy={L}
                        onRelabel={(newId) => relabelSegment(seg.id, newId)}
                      />
                    )}
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--color-text)]">
                  {seg.text}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      {transcript.source && (
        <p className="pt-1 text-center text-[10px] text-[var(--color-text-muted)]">
          {L.footerSource(transcript.source)}
        </p>
      )}
    </div>
  )
}

// ------------------------------------------------------------
// Inline low-confidence relabel prompt
// ------------------------------------------------------------

function RelabelPrompt({
  speakers,
  copy,
  onRelabel,
}: {
  speakers: DiarizedSpeaker[]
  copy: DiarizedTranscriptCopy
  onRelabel: (newSpeakerId: string) => void
}) {
  const [open, setOpen] = useState(false)
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={copy.reviewPromptTitle}
        className="inline-flex h-5 items-center gap-0.5 rounded bg-[var(--color-warning)]/15 px-1.5 text-[10px] font-medium text-[var(--color-warning)] transition-colors hover:bg-[var(--color-warning)]/25"
      >
        <AlertTriangle className="size-2.5" aria-hidden />
        {copy.reviewPromptBadge}
      </button>
    )
  }
  return (
    <div className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--color-warning)]/40 bg-[var(--color-bg-card)] p-1 shadow-sm">
      <span className="px-1 text-[10px] text-[var(--color-text-muted)]">
        {copy.reviewPromptQuestion}
      </span>
      {speakers
        .filter((s) => s.role !== 'unknown')
        .map((sp) => (
          <button
            key={sp.id}
            type="button"
            onClick={() => {
              onRelabel(sp.id)
              setOpen(false)
            }}
            className="h-5 rounded bg-[var(--color-accent)]/15 px-1.5 text-[10px] font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/25"
          >
            {sp.label}
          </button>
        ))}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="close"
        className="inline-flex size-4 items-center justify-center rounded text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)]"
      >
        <X className="size-2.5" aria-hidden />
      </button>
    </div>
  )
}

// ------------------------------------------------------------
// Hover-revealed segment edit menu
// ------------------------------------------------------------

function SegmentMenu({
  segmentSpeakerId,
  speakers,
  copy,
  onRelabel,
}: {
  segmentSpeakerId: string
  speakers: DiarizedSpeaker[]
  copy: DiarizedTranscriptCopy
  onRelabel: (newSpeakerId: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={copy.editLabel}
        className="inline-flex size-4 items-center justify-center rounded text-[var(--color-text-muted)] opacity-0 transition-opacity hover:bg-[var(--color-bg-muted)] focus:opacity-100 group-hover:opacity-100"
      >
        <Pencil className="size-2.5" aria-hidden />
      </button>
      {open && (
        <div className="absolute right-0 top-5 z-10 min-w-[140px] rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-1 shadow-md">
          <div className="px-1.5 py-0.5 text-[10px] text-[var(--color-text-muted)]">
            {copy.relabelAs}
          </div>
          {speakers.map((sp) => (
            <button
              key={sp.id}
              type="button"
              onClick={() => {
                onRelabel(sp.id)
                setOpen(false)
              }}
              disabled={sp.id === segmentSpeakerId}
              className="block h-6 w-full rounded px-1.5 text-left text-[11px] hover:bg-[var(--color-bg-muted)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sp.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
