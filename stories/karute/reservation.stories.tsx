import type { Meta, StoryObj } from '@storybook/react'

// Karute/Reservation — recomposes karute's /[locale]/(app)/appointments/page.tsx
// using lifted synqed-ui components.
//
// Karute does NOT have a `/reservation` route. The closest equivalent is
// `/appointments`, which renders <DashboardClient /> (a horizontal-time-axis
// timetable with one row per staff member, day/week/month tabs, and click-to-
// create slot interactions).
//
// Mirrors components/dashboard/DashboardClient.tsx + the calendar prototype
// (TimetableWithTabs):
//   - Top bar: prev/today/next + date label + "New booking" CTA
//   - Day/Week/Month tabs
//   - Time-axis header
//   - Staff rows with appointment bars positioned by start_time/duration
//
// synqed-ui has the matching primitives (ReservationPageHeader, TimeAxis,
// StaffRowHeader, AppointmentCard, DayWeekMonthToggle), so this story actually
// composes them properly. Karute's calendar uses bespoke logic (not these
// components) but the visual outcome is similar.

import { ReservationPageHeader } from '../../src/components/reservation-page-header'
import { TimeAxis } from '../../src/components/time-axis'
import { StaffRowHeader } from '../../src/components/staff-row-header'
import { AppointmentCard } from '../../src/components/appointment-card'
import { DayWeekMonthToggle, type DayWeekMonthView } from '../../src/components/day-week-month-toggle'
import { useState } from 'react'

const meta: Meta = {
  title: 'Karute/Reservation',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

const START_HOUR = 9
const END_HOUR = 20
const HOUR_WIDTH = 110
const ROW_HEIGHT = 88

const staff = [
  { id: 's1', name: 'Akari Sato', initials: 'AS', role: 'Senior', takesBookings: true, color: '#5a7a5a' },
  { id: 's2', name: 'Naomi Nakamura', initials: 'NN', role: 'Therapist', takesBookings: true, color: '#a78bfa' },
]

interface Appt {
  id: string
  staffId: string
  startMinute: number
  duration: number
  customerName: string
  service: string
  status: 'booked' | 'in_progress' | 'completed' | 'new_customer'
  statusLabel: string
}

const appts: Appt[] = [
  { id: 'a1', staffId: 's1', startMinute: 10 * 60, duration: 60, customerName: 'Yumi Takahashi', service: 'Facial', status: 'completed', statusLabel: 'Completed' },
  { id: 'a2', staffId: 's2', startMinute: 11 * 60 + 30, duration: 90, customerName: 'Yuko Suzuki', service: 'Body Care 90min', status: 'completed', statusLabel: 'Completed' },
  { id: 'a3', staffId: 's1', startMinute: 13 * 60 + 30, duration: 45, customerName: 'Reiko Saito', service: 'Head Spa', status: 'completed', statusLabel: 'Completed' },
  { id: 'a4', staffId: 's1', startMinute: 14 * 60, duration: 60, customerName: 'Misaki Tanaka', service: 'Facial · Moisture', status: 'in_progress', statusLabel: 'In progress' },
  { id: 'a5', staffId: 's2', startMinute: 15 * 60 + 30, duration: 75, customerName: 'Aya Kobayashi', service: 'Aroma', status: 'new_customer', statusLabel: 'New' },
  { id: 'a6', staffId: 's1', startMinute: 16 * 60 + 30, duration: 60, customerName: 'Mitsuki Yamada', service: 'Facial · Aging', status: 'booked', statusLabel: 'Booked' },
]

function minutesToLeftOffset(minute: number) {
  return ((minute - START_HOUR * 60) / 60) * HOUR_WIDTH
}
function minutesToWidth(min: number) {
  return (min / 60) * HOUR_WIDTH
}
function minutesToTimeStr(minute: number) {
  return `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`
}

function StaffRow({ s, appointments }: { s: typeof staff[number]; appointments: Appt[] }) {
  const count = appointments.length
  return (
    <div className="flex border-b border-border/40">
      <div className="w-[180px] shrink-0 border-r border-border/40">
        <StaffRowHeader
          staff={{ id: s.id, name: s.name, initials: s.initials, role: s.role, takesBookings: s.takesBookings }}
          count={count}
          rowHeight={ROW_HEIGHT}
          accentColor={s.color}
          bookingCountSuffix=" bookings"
        />
      </div>
      <div className="relative flex-1 overflow-hidden" style={{ height: ROW_HEIGHT }}>
        {/* Hour grid lines */}
        {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-border/20"
            style={{ left: i * HOUR_WIDTH }}
          />
        ))}
        {appointments.map((a) => (
          <AppointmentCard
            key={a.id}
            leftOffset={minutesToLeftOffset(a.startMinute)}
            width={minutesToWidth(a.duration)}
            rowHeight={ROW_HEIGHT}
            appointment={{
              id: a.id,
              displayName: a.customerName,
              service: a.service,
              startTime: minutesToTimeStr(a.startMinute),
              endTime: minutesToTimeStr(a.startMinute + a.duration),
              durationMinutes: a.duration,
              status: a.status,
              statusLabel: a.statusLabel,
              canRecord: a.status === 'in_progress',
            }}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  )
}

function KaruteReservationPage() {
  const [view, setView] = useState<DayWeekMonthView>('day')

  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="space-y-4">
        <ReservationPageHeader
          dateDisplay="May 1, 2026 (Fri)"
          dateDisplayCompact="5/1 (Fri)"
          onPrev={() => {}}
          onNext={() => {}}
          onToday={() => {}}
          onPickDate={() => {}}
          onNewBooking={() => {}}
        />

        {/* Day / Week / Month toggle.
            Karute's TimetableWithTabs has equivalent tabs but the day view is
            actually the only fully-built tab today. */}
        <DayWeekMonthToggle value={view} onChange={setView} />

        {/* Timetable */}
        <div className="rounded-xl border border-border bg-card overflow-x-auto">
          {/* Header row: empty left + time axis */}
          <div className="flex border-b border-border/40">
            <div className="w-[180px] shrink-0 border-r border-border/40 bg-muted/20" />
            <div style={{ width: (END_HOUR - START_HOUR) * HOUR_WIDTH }}>
              <TimeAxis startHour={START_HOUR} endHour={END_HOUR} hourWidth={HOUR_WIDTH} />
            </div>
          </div>
          {/* Staff rows */}
          <div style={{ width: 180 + (END_HOUR - START_HOUR) * HOUR_WIDTH }}>
            {staff.map((s) => (
              <StaffRow key={s.id} s={s} appointments={appts.filter((a) => a.staffId === s.id)} />
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Karute renders this via a bespoke TimetableWithTabs prototype (not the
          synqed-ui primitives shown here). The synqed-ui composition above is
          the closest equivalent for visual comparison.
        </p>
      </div>
    </main>
  )
}

export const Default: Story = { render: () => <KaruteReservationPage /> }
