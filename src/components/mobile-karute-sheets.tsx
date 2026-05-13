import { ChevronRight, FileText, Mic } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './sheet.js'

// ------------------------------------------------------------
// Mobile-only "AI assist" rows that open the AI summary and
// transcript as bottom sheets. Sheet bodies are caller-supplied
// nodes so this component stays composition-agnostic.
// ------------------------------------------------------------

export interface MobileKaruteSheetsCopy {
  sectionLabel: string
  summaryTitle: string
  summarySubtitle: string
  transcriptTitle: string
  transcriptSubtitle: string
}

const DEFAULT_COPY: MobileKaruteSheetsCopy = {
  sectionLabel: 'AI assist',
  summaryTitle: 'AI summary',
  summarySubtitle: "Today's session highlights",
  transcriptTitle: 'Recording transcript',
  transcriptSubtitle: 'Recording transcript',
}

interface MobileKaruteSheetsProps {
  sessionDate: string
  /** Body rendered inside the AI summary sheet. */
  summaryContent: ReactNode
  /** Body rendered inside the transcript sheet. */
  transcriptContent: ReactNode
  copy?: Partial<MobileKaruteSheetsCopy>
  className?: string
}

export function MobileKaruteSheets({
  sessionDate,
  summaryContent,
  transcriptContent,
  copy,
  className,
}: MobileKaruteSheetsProps) {
  const L: MobileKaruteSheetsCopy = { ...DEFAULT_COPY, ...copy }
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(false)

  return (
    <>
      <div className={cn('mt-4 md:hidden', className)}>
        <div className="mb-2 px-4 text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          {L.sectionLabel}
        </div>
        <div className="mx-4 divide-y divide-[var(--color-border)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <button
            type="button"
            onClick={() => setSummaryOpen(true)}
            className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3.5 transition-colors active:bg-[var(--color-bg-card-hover)]"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
              <FileText className="size-4" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="text-[15px] font-medium text-[var(--color-text)]">
                {L.summaryTitle}
              </div>
              <div className="truncate text-xs text-[var(--color-text-muted)]">
                {L.summarySubtitle}
              </div>
            </div>
            <ChevronRight
              className="size-4 shrink-0 text-[var(--color-text-muted)]"
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={() => setTranscriptOpen(true)}
            className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3.5 transition-colors active:bg-[var(--color-bg-card-hover)]"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-bg-muted)] text-[var(--color-text)]">
              <Mic className="size-4" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="text-[15px] font-medium text-[var(--color-text)]">
                {L.transcriptTitle}
              </div>
              <div className="truncate text-xs text-[var(--color-text-muted)]">
                {L.transcriptSubtitle}
              </div>
            </div>
            <ChevronRight
              className="size-4 shrink-0 text-[var(--color-text-muted)]"
              aria-hidden
            />
          </button>
        </div>
      </div>

      <Sheet open={summaryOpen} onOpenChange={setSummaryOpen}>
        <SheetContent side="bottom" className="max-h-[80vh]">
          <SheetHeader>
            <SheetTitle>{L.summaryTitle}</SheetTitle>
            <SheetDescription>{sessionDate}</SheetDescription>
          </SheetHeader>
          <div className="mt-3 -mx-1 overflow-y-auto px-1">{summaryContent}</div>
        </SheetContent>
      </Sheet>

      <Sheet open={transcriptOpen} onOpenChange={setTranscriptOpen}>
        <SheetContent side="bottom" className="max-h-[80vh]">
          <SheetHeader>
            <SheetTitle>{L.transcriptTitle}</SheetTitle>
            <SheetDescription>{L.transcriptSubtitle}</SheetDescription>
          </SheetHeader>
          <div className="mt-3 -mx-1 overflow-y-auto px-1">{transcriptContent}</div>
        </SheetContent>
      </Sheet>
    </>
  )
}
