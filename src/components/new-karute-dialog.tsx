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
// "New karute" creation dialog.
// ------------------------------------------------------------

export interface NewKaruteStaff {
  id: string
  name: string
}

export interface NewKaruteSubmit {
  customer: string
  date: string
  duration: string
  staffId: string
  service: string
}

export interface NewKaruteDialogCopy {
  title: string
  description: string
  customer: string
  customerPlaceholder: string
  date: string
  duration: string
  staff: string
  service: string
  servicePlaceholder: string
  tipMessage: string
  cancel: string
  save: string
  saving: string
  saved: string
}

const DEFAULT_COPY: NewKaruteDialogCopy = {
  title: 'Create new karute',
  description: 'Manually create a new customer session record.',
  customer: 'Customer',
  customerPlaceholder: 'Search by name',
  date: 'Session date',
  duration: 'Duration',
  staff: 'Staff',
  service: 'Service',
  servicePlaceholder: 'e.g., Facial · Moisture Boost',
  tipMessage: 'Tip: use the Record page to auto-generate karute entries from session audio.',
  cancel: 'Cancel',
  save: 'Create karute',
  saving: 'Creating…',
  saved: 'Created',
}

interface NewKaruteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staff: NewKaruteStaff[]
  durationOptions?: string[]
  copy?: Partial<NewKaruteDialogCopy>
  onSubmit: (payload: NewKaruteSubmit) => Promise<void> | void
}

type Status = 'idle' | 'saving' | 'saved'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function NewKaruteDialog({
  open,
  onOpenChange,
  staff,
  durationOptions = ['30', '45', '60', '90'],
  copy,
  onSubmit,
}: NewKaruteDialogProps) {
  const L: NewKaruteDialogCopy = { ...DEFAULT_COPY, ...copy }
  const [customer, setCustomer] = useState('')
  const [date, setDate] = useState(todayIso())
  const [duration, setDuration] = useState(durationOptions[Math.floor(durationOptions.length / 2)] ?? '60')
  const [staffId, setStaffId] = useState(staff[0]?.id ?? '')
  const [service, setService] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (!open) {
      const id = window.setTimeout(() => {
        setCustomer('')
        setDate(todayIso())
        setDuration(durationOptions[Math.floor(durationOptions.length / 2)] ?? '60')
        setStaffId(staff[0]?.id ?? '')
        setService('')
        setStatus('idle')
      }, 200)
      return () => window.clearTimeout(id)
    }
  }, [open, staff, durationOptions])

  const canSubmit =
    status === 'idle' &&
    customer.trim().length > 0 &&
    service.trim().length > 0 &&
    date.length > 0

  const handleSave = async () => {
    if (!canSubmit) return
    setStatus('saving')
    try {
      await onSubmit({ customer, date, duration, staffId, service })
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
          <DialogField label={L.customer} required>
            <Input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder={L.customerPlaceholder}
              autoFocus
            />
          </DialogField>
          <div className="grid grid-cols-2 gap-3">
            <DialogField label={L.date} required>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </DialogField>
            <DialogField label={L.duration}>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v} min
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </DialogField>
          </div>
          <DialogField label={L.staff}>
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
          <DialogField label={L.service} required>
            <Input
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder={L.servicePlaceholder}
            />
          </DialogField>
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 p-3 text-xs leading-relaxed text-[var(--color-accent)]">
            {L.tipMessage}
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {L.cancel}
          </Button>
          <Button onClick={handleSave} disabled={!canSubmit}>
            {status === 'saving' ? L.saving : status === 'saved' ? L.saved : L.save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
