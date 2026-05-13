import { FilePlus2, FileText, Mic } from 'lucide-react'
import { type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog.js'
import { KaruteNumberBadge } from './karute-number-badge.js'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './sheet.js'

// ------------------------------------------------------------
// Bottom-sheet (mobile) / centered dialog (desktop) of actions for a
// tapped booking: view existing karute, create new karute, start
// recording. Pure presenter; caller decides routing + recording start.
// ------------------------------------------------------------

export interface BookingActionSheetCopy {
  honorific: string
  subtitleFirst: string
  subtitleReturn: string
  viewKarute: string
  viewKaruteHint: string
  newKarute: string
  newKaruteHintFirst: string
  newKaruteHintReturn: string
  startRecording: string
  startRecordingHint: string
  startRecordingHintFirst: string
  firstTimeNote: string
}

const DEFAULT_COPY: BookingActionSheetCopy = {
  honorific: '',
  subtitleFirst: 'First-time customer. Recording will create a provisional karute.',
  subtitleReturn: 'Booked customer. Choose an action.',
  viewKarute: 'View karute',
  viewKaruteHint: 'Review prior sessions and last-visit recommendations',
  newKarute: 'Create new karute',
  newKaruteHintFirst: 'Manually create a karute for this customer',
  newKaruteHintReturn: "Add a new karute for today's session",
  startRecording: 'Start recording',
  startRecordingHint: 'AI will draft the karute from the session audio',
  startRecordingHintFirst:
    "Creates a provisional karute. You'll resolve conversion status after the session.",
  firstTimeNote:
    "First-time customers start as a provisional karute. If they convert it becomes active; if not, it's kept for AI coaching learning (and hidden from the customer list).",
}

interface BookingActionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customerName: string
  karuteNumber?: string
  /** True when the booked customer already has at least one karute on file. */
  hasExistingKarute: boolean
  /** True for a customer with no prior visits. Surfaces alternate copy + flows. */
  isFirstTimeVisit: boolean
  /** Use the bottom-sheet (mobile) variant. Defaults to false (dialog). */
  isMobile?: boolean
  copy?: Partial<BookingActionSheetCopy>
  /** Render-prop wrapping the "view karute" action — typically a routing link. */
  viewKaruteSlot?: (children: ReactNode) => ReactNode
  /** Render-prop wrapping the "create new karute" action. */
  newKaruteSlot?: (children: ReactNode) => ReactNode
  /** Optional callback when user taps "view karute" without a slot. */
  onViewKarute?: () => void
  /** Optional callback when user taps "new karute" without a slot. */
  onNewKarute?: () => void
  /** Recording start callback. */
  onStartRecording?: () => void
}

export function BookingActionSheet({
  open,
  onOpenChange,
  customerName,
  karuteNumber,
  hasExistingKarute,
  isFirstTimeVisit,
  isMobile = false,
  copy,
  viewKaruteSlot,
  newKaruteSlot,
  onViewKarute,
  onNewKarute,
  onStartRecording,
}: BookingActionSheetProps) {
  const L: BookingActionSheetCopy = { ...DEFAULT_COPY, ...copy }
  const titleWithBadge = (
    <span className="inline-flex items-baseline gap-1.5">
      <span>
        {customerName}
        {L.honorific}
      </span>
      {karuteNumber && <KaruteNumberBadge value={karuteNumber} />}
    </span>
  )
  const subtitle = isFirstTimeVisit ? L.subtitleFirst : L.subtitleReturn

  const handleStartRecord = () => {
    onStartRecording?.()
    onOpenChange(false)
  }

  const close = () => onOpenChange(false)

  const viewKaruteRow = hasExistingKarute && (
    <ActionRow
      tone="accent"
      icon={<FileText className="size-4" strokeWidth={2} aria-hidden />}
      title={L.viewKarute}
      hint={L.viewKaruteHint}
      onClick={() => {
        onViewKarute?.()
        close()
      }}
      slot={viewKaruteSlot}
    />
  )

  const newKaruteRow = (
    <ActionRow
      tone="indigo"
      icon={<FilePlus2 className="size-4" strokeWidth={2} aria-hidden />}
      title={L.newKarute}
      hint={isFirstTimeVisit ? L.newKaruteHintFirst : L.newKaruteHintReturn}
      onClick={() => {
        onNewKarute?.()
        close()
      }}
      slot={newKaruteSlot}
    />
  )

  const recordRow = (
    <button
      type="button"
      onClick={handleStartRecord}
      className="flex w-full items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-destructive)]/20 bg-[var(--color-destructive)]/5 p-3 text-left transition-colors active:bg-[var(--color-destructive)]/10"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-destructive)] text-[var(--color-destructive-text)]">
        <Mic className="size-4" strokeWidth={2} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-[var(--color-text)]">
          {L.startRecording}
        </div>
        <div className="mt-0.5 text-[12px] text-[var(--color-text-muted)]">
          {isFirstTimeVisit ? L.startRecordingHintFirst : L.startRecordingHint}
        </div>
      </div>
    </button>
  )

  const body = (
    <div className="space-y-2 pt-2">
      {viewKaruteRow}
      {newKaruteRow}
      {recordRow}
      {isFirstTimeVisit && (
        <div className="mt-1 rounded-[var(--radius-md)] bg-[var(--color-warning)]/10 p-3 text-[11px] leading-relaxed text-[var(--color-warning)]">
          {L.firstTimeNote}
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="text-[17px]">{titleWithBadge}</SheetTitle>
            <SheetDescription>{subtitle}</SheetDescription>
          </SheetHeader>
          {body}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>{titleWithBadge}</DialogTitle>
        <DialogDescription>{subtitle}</DialogDescription>
        {body}
      </DialogContent>
    </Dialog>
  )
}

// ------------------------------------------------------------
// Internal: a single action row, supports a render-prop slot.
// ------------------------------------------------------------

interface ActionRowProps {
  tone: 'accent' | 'indigo'
  icon: ReactNode
  title: string
  hint: string
  onClick?: () => void
  slot?: (children: ReactNode) => ReactNode
}

function ActionRow({ tone, icon, title, hint, onClick, slot }: ActionRowProps) {
  const inner = (
    <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 transition-colors active:bg-[var(--color-bg-card-hover)]">
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]',
          tone === 'accent'
            ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
            : 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]',
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <div className="text-[15px] font-semibold text-[var(--color-text)]">{title}</div>
        <div className="mt-0.5 text-[12px] text-[var(--color-text-muted)]">{hint}</div>
      </div>
    </div>
  )

  if (slot) return <>{slot(inner)}</>
  return (
    <button type="button" onClick={onClick} className="block w-full">
      {inner}
    </button>
  )
}
