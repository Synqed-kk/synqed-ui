import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileJson,
  FileText,
  Loader2,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog.js'
import { Input } from './input.js'

// ------------------------------------------------------------
// APPI customer-rights dialogs.
// ------------------------------------------------------------

export type CustomerExportFormat = 'pdf' | 'json'

export interface CustomerExportDialogCopy {
  title: string
  description: (name: string) => string
  scopeTitle: string
  scopeBullets: string[]
  formatLabel: string
  formatPdf: string
  formatPdfDesc: string
  formatJson: string
  formatJsonDesc: string
  deliveryNote: string
  startButton: string
  processingTitle: string
  processingDesc: string
  completeTitle: string
  completeDesc: (format: CustomerExportFormat) => string
  auditNote: string
  cancel: string
  close: string
}

const DEFAULT_EXPORT_COPY: CustomerExportDialogCopy = {
  title: 'Export customer data',
  description: (name) => `Generate an encrypted export of ${name}'s data.`,
  scopeTitle: 'What gets exported',
  scopeBullets: [
    'Customer profile',
    'Customer memory',
    'Karute history',
    'Photos',
    'Recording transcripts (consented sessions only)',
    'Audit log excerpt (last 90 days)',
  ],
  formatLabel: 'Format',
  formatPdf: 'PDF',
  formatPdfDesc: 'Human-readable; ideal for handing to the customer.',
  formatJson: 'JSON',
  formatJsonDesc: 'Structured; for migration into another system.',
  deliveryNote: 'A signed download URL (24h TTL) is emailed when generation completes.',
  startButton: 'Start export',
  processingTitle: 'Generating export…',
  processingDesc: 'Building the encrypted export file.',
  completeTitle: 'Export complete',
  completeDesc: (format) => `Export generated as ${format.toUpperCase()}.`,
  auditNote: 'This export has been recorded in the audit log.',
  cancel: 'Cancel',
  close: 'Close',
}

interface CustomerExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customerName: string
  copy?: Partial<CustomerExportDialogCopy>
  /** Called when the user confirms; resolve to advance to "complete". */
  onExport: (format: CustomerExportFormat) => Promise<void> | void
  /** Optional render prop for an audit-link slot in the complete state. */
  auditLinkSlot?: ReactNode
}

type ExportStep = 'confirm' | 'processing' | 'complete'

function FormatCard({
  active,
  onSelect,
  Icon,
  title,
  desc,
}: {
  active: boolean
  onSelect: () => void
  Icon: typeof FileText
  title: string
  desc: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'rounded-[var(--radius-sm)] border p-3 text-left transition-colors',
        active
          ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10'
          : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)]/30',
      )}
    >
      <div className="flex items-start gap-2">
        <Icon
          className={cn(
            'mt-0.5 size-4 shrink-0',
            active ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]/70',
          )}
          aria-hidden
        />
        <div>
          <div className="text-xs font-semibold text-[var(--color-text)]">{title}</div>
          <div className="mt-0.5 text-[10px] leading-relaxed text-[var(--color-text-muted)]">
            {desc}
          </div>
        </div>
      </div>
    </button>
  )
}

export function CustomerExportDialog({
  open,
  onOpenChange,
  customerName,
  copy,
  onExport,
  auditLinkSlot,
}: CustomerExportDialogProps) {
  const L: CustomerExportDialogCopy = { ...DEFAULT_EXPORT_COPY, ...copy }
  const [step, setStep] = useState<ExportStep>('confirm')
  const [format, setFormat] = useState<CustomerExportFormat>('pdf')

  useEffect(() => {
    if (!open) {
      const id = window.setTimeout(() => {
        setStep('confirm')
        setFormat('pdf')
      }, 200)
      return () => window.clearTimeout(id)
    }
  }, [open])

  const kickoff = async () => {
    setStep('processing')
    try {
      await onExport(format)
      setStep('complete')
    } catch {
      setStep('confirm')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="flex items-center gap-2">
          <Download className="size-4 text-[var(--color-accent)]" aria-hidden />
          {L.title}
        </DialogTitle>
        <DialogDescription>{L.description(customerName)}</DialogDescription>

        {step === 'confirm' && (
          <div className="space-y-3 py-2">
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-3 py-2.5">
              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-accent)]">
                <ShieldCheck className="size-3" aria-hidden />
                {L.scopeTitle}
              </div>
              <ul className="space-y-0.5 text-xs text-[var(--color-text)]/80">
                {L.scopeBullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-1.5 text-[11px] font-medium text-[var(--color-text)]">
                {L.formatLabel}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormatCard
                  active={format === 'pdf'}
                  onSelect={() => setFormat('pdf')}
                  Icon={FileText}
                  title={L.formatPdf}
                  desc={L.formatPdfDesc}
                />
                <FormatCard
                  active={format === 'json'}
                  onSelect={() => setFormat('json')}
                  Icon={FileJson}
                  title={L.formatJson}
                  desc={L.formatJsonDesc}
                />
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-[var(--color-text-muted)]">
              {L.deliveryNote}
            </p>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {L.cancel}
              </Button>
              <Button onClick={kickoff} className="gap-1.5">
                <Download className="size-3.5" aria-hidden />
                {L.startButton}
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center gap-3 py-6">
            <Loader2
              className="size-8 animate-spin text-[var(--color-accent)]"
              aria-hidden
            />
            <div className="text-sm font-medium text-[var(--color-text)]">
              {L.processingTitle}
            </div>
            <div className="max-w-[280px] text-center text-[11px] leading-relaxed text-[var(--color-text-muted)]">
              {L.processingDesc}
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-3 py-4">
            <div className="flex items-center gap-2 text-[var(--color-success)]">
              <CheckCircle2 className="size-5" aria-hidden />
              <span className="text-sm font-semibold">{L.completeTitle}</span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text)]/85">
              {L.completeDesc(format)}
            </p>
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-muted)] px-3 py-2 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
              {L.auditNote} {auditLinkSlot}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => onOpenChange(false)}>{L.close}</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ============================================================
// Delete dialog
// ============================================================

export interface CustomerDeleteDialogCopy {
  title: string
  description: (name: string) => string
  cascadeTitle: string
  cascadeBullets: string[]
  recoveryNote: string
  confirmLabel: (word: string) => string
  confirmButton: string
  processingTitle: string
  completeTitle: string
  completeDesc: (name: string) => string
  recoveryComplete: string
  cancel: string
  close: string
}

const DEFAULT_DELETE_COPY: CustomerDeleteDialogCopy = {
  title: 'Delete customer data',
  description: (name) => `Delete all data for ${name}.`,
  cascadeTitle: 'Cascade deletion',
  cascadeBullets: [
    'Customer profile (name, contact, registration info)',
    'All karute (including all entries)',
    'Customer memory (all items)',
    'Photo records',
    'Recording files & transcripts',
  ],
  recoveryNote:
    'Soft-delete allows 30 days for recovery before permanent deletion runs.',
  confirmLabel: (word) => `Type "${word}" to confirm:`,
  confirmButton: 'Confirm deletion',
  processingTitle: 'Scheduling deletion…',
  completeTitle: 'Deletion scheduled',
  completeDesc: (name) =>
    `${name}'s data has been soft-deleted. Recovery is possible for the next 30 days.`,
  recoveryComplete:
    "Click 'Undo deletion' on the audit log entry to recover before the window expires.",
  cancel: 'Cancel',
  close: 'Close',
}

interface CustomerDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customerName: string
  /** Word user must type. Defaults to "DELETE". */
  confirmWord?: string
  copy?: Partial<CustomerDeleteDialogCopy>
  onDelete: () => Promise<void> | void
}

type DeleteStep = 'confirm' | 'processing' | 'complete'

export function CustomerDeleteDialog({
  open,
  onOpenChange,
  customerName,
  confirmWord = 'DELETE',
  copy,
  onDelete,
}: CustomerDeleteDialogProps) {
  const L: CustomerDeleteDialogCopy = { ...DEFAULT_DELETE_COPY, ...copy }
  const [step, setStep] = useState<DeleteStep>('confirm')
  const [confirmText, setConfirmText] = useState('')

  useEffect(() => {
    if (!open) {
      const id = window.setTimeout(() => {
        setStep('confirm')
        setConfirmText('')
      }, 200)
      return () => window.clearTimeout(id)
    }
  }, [open])

  const canConfirm = confirmText.trim() === confirmWord

  const kickoff = async () => {
    if (!canConfirm) return
    setStep('processing')
    try {
      await onDelete()
      setStep('complete')
    } catch {
      setStep('confirm')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="flex items-center gap-2 text-[var(--color-destructive)]">
          <Trash2 className="size-4" aria-hidden />
          {L.title}
        </DialogTitle>
        <DialogDescription>{L.description(customerName)}</DialogDescription>

        {step === 'confirm' && (
          <div className="space-y-3 py-2">
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-destructive)]/20 bg-[var(--color-destructive)]/10 px-3 py-2.5">
              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-destructive)]">
                <AlertTriangle className="size-3" aria-hidden />
                {L.cascadeTitle}
              </div>
              <ul className="space-y-0.5 text-xs text-[var(--color-text)]/80">
                {L.cascadeBullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-2 rounded-[var(--radius-sm)] border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-3 py-2.5 text-[11px] leading-relaxed text-[var(--color-warning)]">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              <div>{L.recoveryNote}</div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-[var(--color-text)]">
                {L.confirmLabel(confirmWord)}
              </label>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={confirmWord}
                autoFocus
                className={canConfirm ? 'ring-2 ring-[var(--color-destructive)]/40' : undefined}
              />
            </div>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {L.cancel}
              </Button>
              <Button
                variant="destructive"
                onClick={kickoff}
                disabled={!canConfirm}
                className="gap-1.5"
              >
                <Trash2 className="size-3.5" aria-hidden />
                {L.confirmButton}
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center gap-3 py-6">
            <Loader2
              className="size-8 animate-spin text-[var(--color-destructive)]"
              aria-hidden
            />
            <div className="text-sm font-medium text-[var(--color-text)]">
              {L.processingTitle}
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-3 py-4">
            <div className="flex items-center gap-2 text-[var(--color-success)]">
              <CheckCircle2 className="size-5" aria-hidden />
              <span className="text-sm font-semibold">{L.completeTitle}</span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text)]/85">
              {L.completeDesc(customerName)}
            </p>
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-3 py-2 text-[11px] leading-relaxed text-[var(--color-warning)]">
              {L.recoveryComplete}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => onOpenChange(false)}>{L.close}</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
