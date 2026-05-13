import { Check, Clock3, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './button.js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog.js'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Post-session resolution dialog — "Did this session convert?"
// Three-way pick (active / declined / hold) plus optional
// declined-reason tags. Pure: caller wires the mutation.
// ------------------------------------------------------------

export type PostSessionStatus = 'active' | 'declined' | 'provisional'

export interface PostSessionResolutionCopy {
  titlePrefix: string
  subtitle: string
  intro: string
  optActive: string
  optActiveHint: string
  optDeclined: string
  optDeclinedHint: string
  optHold: string
  optHoldHint: string
  reasonLabel: string
  coachingNote: string
  cancel: string
  save: string
}

const DEFAULT_COPY: PostSessionResolutionCopy = {
  titlePrefix: 'Session result — ',
  subtitle: 'Captured alongside the recording to track closing rate.',
  intro: 'A single tap drives closing-rate, AI coaching, and customer-list hygiene.',
  optActive: 'Converted',
  optActiveHint: 'Booked or paid. Saved as a regular karute.',
  optDeclined: "Did not convert this time",
  optDeclinedHint: 'Kept for AI coaching analysis but hidden from the customer list.',
  optHold: 'Decide later',
  optHoldHint: 'Provisional status; auto-resolves to declined after 14 days.',
  reasonLabel: 'Reason (optional)',
  coachingNote:
    'Convert / decline records help the AI learn top-performer conversation patterns.',
  cancel: 'Cancel',
  save: 'Save',
}

export interface PostSessionResolutionReason {
  key: string
  label: string
}

interface PostSessionResolutionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customerName: string
  declinedReasons?: PostSessionResolutionReason[]
  copy?: Partial<PostSessionResolutionCopy>
  onResolve: (status: PostSessionStatus, declinedReason?: string) => void
}

function ChoiceButton({
  variant,
  selected,
  onClick,
  label,
  hint,
}: {
  variant: 'active' | 'declined' | 'hold'
  selected: boolean
  onClick: () => void
  label: string
  hint: string
}) {
  const Icon = variant === 'active' ? Check : variant === 'declined' ? X : Clock3
  const baseTint =
    'bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text)]'
  const selectedTint =
    variant === 'active'
      ? 'bg-[var(--color-success)]/10 border-[var(--color-success)]/40 text-[var(--color-text)]'
      : variant === 'declined'
        ? 'bg-[var(--color-destructive)]/10 border-[var(--color-destructive)]/40 text-[var(--color-text)]'
        : baseTint
  const iconBg =
    variant === 'active'
      ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
      : variant === 'declined'
        ? 'bg-[var(--color-destructive)]/15 text-[var(--color-destructive)]'
        : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]'

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-[var(--radius-md)] border p-3 text-left transition-all active:scale-[0.99]',
        selected ? selectedTint : baseTint,
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)]',
          iconBg,
        )}
      >
        <Icon className="size-4" strokeWidth={2.25} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold">{label}</div>
        <div className="mt-0.5 text-xs leading-snug text-[var(--color-text-muted)]">{hint}</div>
      </div>
    </button>
  )
}

export function PostSessionResolutionDialog({
  open,
  onOpenChange,
  customerName,
  declinedReasons,
  copy,
  onResolve,
}: PostSessionResolutionDialogProps) {
  const L: PostSessionResolutionCopy = { ...DEFAULT_COPY, ...copy }
  const [choice, setChoice] = useState<'active' | 'declined' | null>(null)
  const reasons = declinedReasons ?? []
  const [reason, setReason] = useState<string>(reasons[0]?.key ?? '')

  const submitActive = () => {
    onResolve('active')
    onOpenChange(false)
  }
  const submitDeclined = () => {
    onResolve('declined', reason || undefined)
    onOpenChange(false)
  }
  const submitHold = () => {
    onResolve('provisional')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>
          {L.titlePrefix}
          {customerName}
        </DialogTitle>
        <DialogDescription>{L.subtitle}</DialogDescription>
        <div className="space-y-4 pt-2">
          <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">{L.intro}</p>
          <div className="grid grid-cols-1 gap-2">
            <ChoiceButton
              variant="active"
              selected={choice === 'active'}
              onClick={() => setChoice('active')}
              label={L.optActive}
              hint={L.optActiveHint}
            />
            <ChoiceButton
              variant="declined"
              selected={choice === 'declined'}
              onClick={() => setChoice('declined')}
              label={L.optDeclined}
              hint={L.optDeclinedHint}
            />
            <ChoiceButton
              variant="hold"
              selected={false}
              onClick={submitHold}
              label={L.optHold}
              hint={L.optHoldHint}
            />
          </div>
          {choice === 'declined' && reasons.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-medium text-[var(--color-text)]">
                {L.reasonLabel}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {reasons.map((r) => {
                  const active = reason === r.key
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setReason(r.key)}
                      className={cn(
                        'h-7 rounded-full px-3 text-xs font-medium transition-colors',
                        active
                          ? 'bg-[var(--color-chrome)] text-[var(--color-text-inverse)]'
                          : 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)]/80',
                      )}
                    >
                      {r.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          <div className="rounded-[var(--radius-sm)] bg-[var(--color-accent)]/10 p-3 text-[11px] leading-relaxed text-[var(--color-accent)]">
            {L.coachingNote}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10">
              {L.cancel}
            </Button>
            <Button
              disabled={choice === null}
              onClick={choice === 'active' ? submitActive : submitDeclined}
              className="h-10"
            >
              {L.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
