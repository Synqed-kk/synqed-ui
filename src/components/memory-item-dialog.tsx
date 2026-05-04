import { Brain, CheckCircle2, Loader2, Pencil, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './button.js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog.js'
import { DialogField } from './dialog-field.js'
import { Input } from './input.js'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select.js'
import type { MemoryCategory } from './customer-memory-card.js'

// ------------------------------------------------------------
// Add or edit a single customer memory item.
// ------------------------------------------------------------

export interface MemoryItemDraft {
  category: MemoryCategory
  label: string
  detail?: string
}

export interface MemoryItemDialogCopy {
  addTitle: string
  editTitle: string
  addDescription: (name: string) => string
  editDescription: (name: string) => string
  category: string
  label: string
  labelHint: string
  labelPlaceholder: string
  detail: string
  detailHint: string
  detailPlaceholder: string
  saving: string
  added: string
  saved: string
  cancel: string
  addSave: string
  editSave: string
  categoryLabels: Record<MemoryCategory, string>
}

const DEFAULT_COPY: MemoryItemDialogCopy = {
  addTitle: 'Add memory item',
  editTitle: 'Edit memory item',
  addDescription: (name) => `Add a new item to ${name}'s customer memory.`,
  editDescription: (name) => `Update this memory item for ${name}.`,
  category: 'Category',
  label: 'Item',
  labelHint: 'Short scannable phrase.',
  labelPlaceholder: 'e.g. Pollen allergy',
  detail: 'Detail (optional)',
  detailHint: 'Any context, history, or notes.',
  detailPlaceholder: 'Context, history, notes…',
  saving: 'Saving…',
  added: 'Added',
  saved: 'Updated',
  cancel: 'Cancel',
  addSave: 'Add',
  editSave: 'Save',
  categoryLabels: {
    personal: 'Personal',
    body: 'Body & health',
    preference: 'Preferences',
    goal: 'Goals',
    lifestyle: 'Lifestyle',
  },
}

type Step = 'form' | 'saving' | 'saved'

type Props =
  | {
      open: boolean
      onOpenChange: (open: boolean) => void
      mode: 'add'
      customerName: string
      copy?: Partial<MemoryItemDialogCopy>
      onSubmit: (draft: MemoryItemDraft) => Promise<void> | void
      initial?: undefined
    }
  | {
      open: boolean
      onOpenChange: (open: boolean) => void
      mode: 'edit'
      customerName: string
      copy?: Partial<MemoryItemDialogCopy>
      onSubmit: (draft: MemoryItemDraft) => Promise<void> | void
      initial: MemoryItemDraft
    }

export function MemoryItemDialog(props: Props) {
  const { open, onOpenChange, mode, customerName, onSubmit } = props
  const L: MemoryItemDialogCopy = { ...DEFAULT_COPY, ...props.copy }
  const [label, setLabel] = useState('')
  const [detail, setDetail] = useState('')
  const [category, setCategory] = useState<MemoryCategory>('body')
  const [step, setStep] = useState<Step>('form')

  useEffect(() => {
    if (!open) return
    if (mode === 'edit' && props.initial) {
      setLabel(props.initial.label)
      setDetail(props.initial.detail ?? '')
      setCategory(props.initial.category)
    } else {
      setLabel('')
      setDetail('')
      setCategory('body')
    }
    setStep('form')
  }, [open, mode, props])

  useEffect(() => {
    if (step !== 'saved') return
    const id = window.setTimeout(() => onOpenChange(false), 900)
    return () => window.clearTimeout(id)
  }, [step, onOpenChange])

  const trimmedLabel = label.trim()
  const canSubmit = step === 'form' && trimmedLabel.length > 0

  const handleSave = async () => {
    if (!canSubmit) return
    setStep('saving')
    try {
      await onSubmit({
        label: trimmedLabel,
        detail: detail.trim() || undefined,
        category,
      })
      setStep('saved')
    } catch {
      setStep('form')
    }
  }

  const Icon = mode === 'add' ? Plus : Pencil
  const title = mode === 'add' ? L.addTitle : L.editTitle
  const description =
    mode === 'add' ? L.addDescription(customerName) : L.editDescription(customerName)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="flex items-center gap-2">
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
            <Icon className="size-3.5" aria-hidden />
          </span>
          {title}
          <Brain
            className="ml-auto size-3.5 text-[var(--color-text-muted)]"
            aria-hidden
          />
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        {step === 'form' && (
          <div className="space-y-3 py-2">
            <DialogField label={L.category} required>
              <Select value={category} onValueChange={(v: MemoryCategory) => setCategory(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(L.categoryLabels) as MemoryCategory[]).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {L.categoryLabels[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </DialogField>
            <DialogField label={L.label} required hint={L.labelHint}>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={L.labelPlaceholder}
                autoFocus
              />
            </DialogField>
            <DialogField label={L.detail} hint={L.detailHint}>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder={L.detailPlaceholder}
                rows={3}
                className="w-full resize-y rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2 text-sm leading-relaxed text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
              />
            </DialogField>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {L.cancel}
              </Button>
              <Button onClick={handleSave} disabled={!canSubmit}>
                {mode === 'add' ? L.addSave : L.editSave}
              </Button>
            </div>
          </div>
        )}

        {step === 'saving' && (
          <div className="flex flex-col items-center gap-3 py-6">
            <Loader2
              className="size-8 animate-spin text-[var(--color-accent)]"
              aria-hidden
            />
            <div className="text-sm font-medium text-[var(--color-text)]">{L.saving}</div>
          </div>
        )}

        {step === 'saved' && (
          <div className="flex flex-col items-center gap-2 py-6">
            <CheckCircle2 className="size-10 text-[var(--color-success)]" aria-hidden />
            <div className="text-sm font-semibold text-[var(--color-text)]">
              {mode === 'add' ? L.added : L.saved}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
