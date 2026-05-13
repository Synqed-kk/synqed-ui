import { CheckCircle2, Loader2, Pencil } from 'lucide-react'
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

// ------------------------------------------------------------
// Edit customer dialog — name / phone / email / assigned staff.
// Caller wires the mutation; this component renders chrome and
// manages local form + status.
// ------------------------------------------------------------

export interface EditCustomerStaff {
  id: string
  name: string
}

export interface EditCustomerInitial {
  name: string
  phone?: string | null
  email?: string | null
  staffId: string
}

export interface EditCustomerPatch {
  name?: string
  phone?: string | null
  email?: string | null
  staffId?: string
}

export interface EditCustomerDialogCopy {
  title: string
  description: (name: string) => string
  name: string
  namePlaceholder: string
  phone: string
  phonePlaceholder: string
  phoneHint: string
  email: string
  emailHint: string
  emailInvalid: string
  staff: string
  staffHint: string
  saving: string
  saved: string
  savedDesc: (name: string) => string
  cancel: string
  save: string
}

const DEFAULT_COPY: EditCustomerDialogCopy = {
  title: 'Edit customer',
  description: (name) => `Update ${name}'s contact info and assigned staff.`,
  name: 'Name',
  namePlaceholder: 'Misaki Tanaka',
  phone: 'Phone',
  phonePlaceholder: '090-0000-0000',
  phoneHint: 'Can be changed or cleared.',
  email: 'Email',
  emailHint: 'Optional. Leave empty to clear.',
  emailInvalid: 'Invalid email format.',
  staff: 'Assigned staff',
  staffHint: 'Future visits route to this staff. Past karute keep the original.',
  saving: 'Saving…',
  saved: 'Updated',
  savedDesc: (name) => `${name}'s profile has been updated.`,
  cancel: 'Cancel',
  save: 'Save',
}

interface EditCustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial: EditCustomerInitial | null
  staff: EditCustomerStaff[]
  copy?: Partial<EditCustomerDialogCopy>
  onSubmit: (patch: EditCustomerPatch) => Promise<void> | void
}

type Step = 'form' | 'saving' | 'saved'

export function EditCustomerDialog({
  open,
  onOpenChange,
  initial,
  staff,
  copy,
  onSubmit,
}: EditCustomerDialogProps) {
  const L: EditCustomerDialogCopy = { ...DEFAULT_COPY, ...copy }
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [staffId, setStaffId] = useState('')
  const [step, setStep] = useState<Step>('form')

  useEffect(() => {
    if (open && initial) {
      setName(initial.name)
      setPhone(initial.phone ?? '')
      setEmail(initial.email ?? '')
      setStaffId(initial.staffId)
      setStep('form')
    }
  }, [open, initial])

  useEffect(() => {
    if (step !== 'saved') return
    const id = window.setTimeout(() => onOpenChange(false), 1000)
    return () => window.clearTimeout(id)
  }, [step, onOpenChange])

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const emailValid = trimmedEmail === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
  const canSubmit = step === 'form' && trimmedName.length > 0 && emailValid

  const handleSave = async () => {
    if (!canSubmit || !initial) return
    const patch: EditCustomerPatch = {}
    if (trimmedName !== initial.name) patch.name = trimmedName
    const prevPhone = initial.phone ?? ''
    const trimmedPhone = phone.trim()
    if (trimmedPhone !== prevPhone) patch.phone = trimmedPhone === '' ? null : trimmedPhone
    const prevEmail = initial.email ?? ''
    if (trimmedEmail !== prevEmail) patch.email = trimmedEmail === '' ? null : trimmedEmail
    if (staffId !== initial.staffId) patch.staffId = staffId
    if (Object.keys(patch).length === 0) {
      onOpenChange(false)
      return
    }
    setStep('saving')
    try {
      await onSubmit(patch)
      setStep('saved')
    } catch {
      setStep('form')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="flex items-center gap-2">
          <Pencil className="size-4 text-[var(--color-accent)]" aria-hidden />
          {L.title}
        </DialogTitle>
        <DialogDescription>{L.description(initial?.name ?? '')}</DialogDescription>

        {step === 'form' && (
          <div className="space-y-3 py-2">
            <DialogField label={L.name} required>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={L.namePlaceholder}
                autoFocus
              />
            </DialogField>
            <DialogField label={L.phone} hint={L.phoneHint}>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={L.phonePlaceholder}
              />
            </DialogField>
            <DialogField
              label={L.email}
              hint={trimmedEmail.length > 0 && !emailValid ? L.emailInvalid : L.emailHint}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
                className={
                  trimmedEmail.length > 0 && !emailValid
                    ? 'ring-2 ring-[var(--color-destructive)]/40'
                    : undefined
                }
              />
            </DialogField>
            <DialogField label={L.staff} hint={L.staffHint}>
              <Select value={staffId} onValueChange={setStaffId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {staff.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </DialogField>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {L.cancel}
              </Button>
              <Button onClick={handleSave} disabled={!canSubmit}>
                {L.save}
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
            <div className="text-sm font-semibold text-[var(--color-text)]">{L.saved}</div>
            <div className="max-w-[280px] text-center text-[11px] leading-relaxed text-[var(--color-text-muted)]">
              {L.savedDesc(initial?.name ?? '')}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
