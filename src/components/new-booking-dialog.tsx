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
// "New booking" creation dialog. Pure presenter; caller wires
// onSubmit to the persistence layer.
// ------------------------------------------------------------

export interface NewBookingStaff {
  id: string
  name: string
}

export interface NewBookingSubmit {
  customer: string
  date: string
  time: string
  duration: string
  staffId: string
  service: string
}

export interface NewBookingDialogCopy {
  title: string
  description: string
  customer: string
  customerPlaceholder: string
  date: string
  time: string
  duration: string
  staff: string
  service: string
  servicePlaceholder: string
  cancel: string
  save: string
  saving: string
  saved: string
}

const DEFAULT_COPY: NewBookingDialogCopy = {
  title: 'New booking',
  description: 'Create a new customer booking.',
  customer: 'Customer',
  customerPlaceholder: 'Search by name or add new',
  date: 'Date',
  time: 'Time',
  duration: 'Duration',
  staff: 'Staff',
  service: 'Service',
  servicePlaceholder: 'e.g., Facial · Moisture Boost',
  cancel: 'Cancel',
  save: 'Create booking',
  saving: 'Creating…',
  saved: 'Created',
}

interface NewBookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staff: NewBookingStaff[]
  durationOptions?: string[]
  copy?: Partial<NewBookingDialogCopy>
  onSubmit: (payload: NewBookingSubmit) => Promise<void> | void
}

type Status = 'idle' | 'saving' | 'saved'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function nextHourHm(): string {
  const d = new Date()
  d.setMinutes(0, 0, 0)
  d.setHours(d.getHours() + 1)
  return `${d.getHours().toString().padStart(2, '0')}:00`
}

export function NewBookingDialog({
  open,
  onOpenChange,
  staff,
  durationOptions = ['30', '45', '60', '75', '90'],
  copy,
  onSubmit,
}: NewBookingDialogProps) {
  const L: NewBookingDialogCopy = { ...DEFAULT_COPY, ...copy }
  const defaultDuration = durationOptions[Math.floor(durationOptions.length / 2)] ?? '60'
  const [customer, setCustomer] = useState('')
  const [date, setDate] = useState(todayIso())
  const [time, setTime] = useState(nextHourHm())
  const [duration, setDuration] = useState(defaultDuration)
  const [staffId, setStaffId] = useState(staff[0]?.id ?? '')
  const [service, setService] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (!open) {
      const id = window.setTimeout(() => {
        setCustomer('')
        setDate(todayIso())
        setTime(nextHourHm())
        setDuration(defaultDuration)
        setStaffId(staff[0]?.id ?? '')
        setService('')
        setStatus('idle')
      }, 200)
      return () => window.clearTimeout(id)
    }
  }, [open, staff, defaultDuration])

  const canSubmit =
    status === 'idle' &&
    customer.trim().length > 0 &&
    service.trim().length > 0 &&
    date.length > 0 &&
    time.length > 0

  const handleSave = async () => {
    if (!canSubmit) return
    setStatus('saving')
    try {
      await onSubmit({ customer, date, time, duration, staffId, service })
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
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </DialogField>
            <DialogField label={L.time} required>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </DialogField>
          </div>
          <div className="grid grid-cols-2 gap-3">
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
          </div>
          <DialogField label={L.service} required>
            <Input
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder={L.servicePlaceholder}
            />
          </DialogField>
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
