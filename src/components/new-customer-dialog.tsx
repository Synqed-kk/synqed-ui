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
// "New customer" dialog. Pure: caller passes the staff list,
// localized copy, and an async submit handler. Internal status
// machine handles idle / saving / saved feedback.
// ------------------------------------------------------------

export interface NewCustomerStaff {
  id: string
  name: string
}

export type NewCustomerGender = 'female' | 'male' | 'other'

export interface NewCustomerSubmit {
  familyName: string
  givenName: string
  age: string
  gender: NewCustomerGender
  phone: string
  email: string
  preferredStaffId: string | null
}

export interface NewCustomerDialogCopy {
  title: string
  description: string
  familyName: string
  familyNamePlaceholder: string
  givenName: string
  givenNamePlaceholder: string
  age: string
  agePlaceholder: string
  gender: string
  female: string
  male: string
  other: string
  phone: string
  phonePlaceholder: string
  phoneInvalid: string
  email: string
  emailPlaceholder: string
  emailInvalid: string
  preferredStaff: string
  noPreference: string
  cancel: string
  save: string
  saving: string
  saved: string
}

const DEFAULT_COPY: NewCustomerDialogCopy = {
  title: 'Add new customer',
  description: 'Register the basics for this customer.',
  familyName: 'Family name',
  familyNamePlaceholder: 'Tanaka',
  givenName: 'Given name',
  givenNamePlaceholder: 'Misaki',
  age: 'Age',
  agePlaceholder: '32',
  gender: 'Gender',
  female: 'Female',
  male: 'Male',
  other: 'Other',
  phone: 'Phone',
  phonePlaceholder: '090-0000-0000',
  phoneInvalid: 'Invalid phone format.',
  email: 'Email',
  emailPlaceholder: 'customer@example.com',
  emailInvalid: 'Invalid email format.',
  preferredStaff: 'Preferred staff',
  noPreference: 'No preference',
  cancel: 'Cancel',
  save: 'Create customer',
  saving: 'Creating…',
  saved: 'Created',
}

interface NewCustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staff: NewCustomerStaff[]
  copy?: Partial<NewCustomerDialogCopy>
  /** Phone validator. Returns true when the value is acceptable. */
  validatePhone?: (raw: string) => boolean
  /** Email validator. */
  validateEmail?: (raw: string) => boolean
  /** Async submit. Resolve to success or throw to retry. */
  onSubmit: (payload: NewCustomerSubmit) => Promise<void> | void
}

const defaultPhoneCheck = (raw: string) => {
  const v = raw.trim()
  return v === '' || /^[\d+\-\s]{6,}$/.test(v)
}
const defaultEmailCheck = (raw: string) => {
  const v = raw.trim()
  return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

type Status = 'idle' | 'saving' | 'saved'

const BLANK = {
  familyName: '',
  givenName: '',
  age: '',
  gender: 'female' as NewCustomerGender,
  phone: '',
  email: '',
  preferredStaffId: null as string | null,
}

export function NewCustomerDialog({
  open,
  onOpenChange,
  staff,
  copy,
  validatePhone = defaultPhoneCheck,
  validateEmail = defaultEmailCheck,
  onSubmit,
}: NewCustomerDialogProps) {
  const L: NewCustomerDialogCopy = { ...DEFAULT_COPY, ...copy }
  const [form, setForm] = useState({ ...BLANK })
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (!open) {
      const id = window.setTimeout(() => {
        setForm({ ...BLANK })
        setStatus('idle')
      }, 200)
      return () => window.clearTimeout(id)
    }
  }, [open])

  const phoneValid = validatePhone(form.phone)
  const emailValid = validateEmail(form.email)
  const canSubmit =
    status === 'idle' && form.familyName.trim().length > 0 && phoneValid && emailValid

  const handleSubmit = async () => {
    if (!canSubmit) return
    setStatus('saving')
    try {
      await onSubmit({ ...form })
      setStatus('saved')
      window.setTimeout(() => onOpenChange(false), 600)
    } catch {
      setStatus('idle')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>{L.title}</DialogTitle>
        <DialogDescription>{L.description}</DialogDescription>
        <div className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <DialogField label={L.familyName} required>
              <Input
                value={form.familyName}
                onChange={(e) => setForm((f) => ({ ...f, familyName: e.target.value }))}
                placeholder={L.familyNamePlaceholder}
                autoFocus
              />
            </DialogField>
            <DialogField label={L.givenName}>
              <Input
                value={form.givenName}
                onChange={(e) => setForm((f) => ({ ...f, givenName: e.target.value }))}
                placeholder={L.givenNamePlaceholder}
              />
            </DialogField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <DialogField label={L.age}>
              <Input
                type="number"
                inputMode="numeric"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                placeholder={L.agePlaceholder}
                min={0}
                max={120}
              />
            </DialogField>
            <DialogField label={L.gender}>
              <Select
                value={form.gender}
                onValueChange={(v: NewCustomerGender) =>
                  setForm((f) => ({ ...f, gender: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">{L.female}</SelectItem>
                  <SelectItem value="male">{L.male}</SelectItem>
                  <SelectItem value="other">{L.other}</SelectItem>
                </SelectContent>
              </Select>
            </DialogField>
          </div>
          <DialogField
            label={L.phone}
            hint={form.phone.length > 0 && !phoneValid ? L.phoneInvalid : undefined}
          >
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder={L.phonePlaceholder}
              aria-invalid={!phoneValid}
              className={!phoneValid ? 'ring-2 ring-[var(--color-destructive)]/40' : undefined}
            />
          </DialogField>
          <DialogField
            label={L.email}
            hint={form.email.length > 0 && !emailValid ? L.emailInvalid : undefined}
          >
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder={L.emailPlaceholder}
              aria-invalid={!emailValid}
              className={!emailValid ? 'ring-2 ring-[var(--color-destructive)]/40' : undefined}
            />
          </DialogField>
          <DialogField label={L.preferredStaff}>
            <Select
              value={form.preferredStaffId ?? '__none__'}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, preferredStaffId: v === '__none__' ? null : v }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">{L.noPreference}</SelectItem>
                {staff.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogField>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {L.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {status === 'saving' ? L.saving : status === 'saved' ? L.saved : L.save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
