import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
// TODO: add app shell / sidebar when layout components ship in W4

import {
  DayWeekMonthToggle,
  type DayWeekMonthView,
} from '../../src/components/day-week-month-toggle'
import {
  ReservationLegend,
  type ReservationLegendItem,
} from '../../src/components/reservation-legend'
import { ReservationPageHeader } from '../../src/components/reservation-page-header'
import {
  WeekDayCard,
  type WeekDayCardData,
} from '../../src/components/week-day-card'

const meta: Meta = {
  title: 'Spike/Reservation Week',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Mock data — synthesized to match the reservation page's week-mode shape.
// Each day card aggregates ~hourly bookings for one weekday.
// ----------------------------------------------------------------------------

const STAFF_COLORS = {
  akari: 'var(--color-accent)',
  naomi: '#a78bfa',
}

const days: WeekDayCardData[] = [
  {
    dateNumber: 13,
    monthNumber: 4,
    weekdayLabel: 'Mon',
    count: 5,
    bookedMinutes: 270,
    availableMinutes: 540,
    newCustomerCount: 1,
    remindersPending: 0,
    consentPending: 1,
    unconfirmed: 0,
    visibleBookings: [
      { id: 'b-1', startTime: '10:00', shortName: 'Misaki', staffColor: STAFF_COLORS.akari },
      { id: 'b-2', startTime: '11:30', shortName: 'Yuko', staffColor: STAFF_COLORS.naomi },
      { id: 'b-3', startTime: '14:00', shortName: 'Reiko', staffColor: STAFF_COLORS.akari },
      { id: 'b-4', startTime: '16:00', shortName: 'Aya', staffColor: STAFF_COLORS.naomi },
    ],
    hiddenCount: 1,
  },
  {
    dateNumber: 14,
    monthNumber: 4,
    weekdayLabel: 'Tue',
    count: 7,
    bookedMinutes: 405,
    availableMinutes: 540,
    newCustomerCount: 2,
    remindersPending: 1,
    consentPending: 0,
    unconfirmed: 1,
    visibleBookings: [
      { id: 'b-5', startTime: '09:00', shortName: 'Yumi', staffColor: STAFF_COLORS.akari },
      { id: 'b-6', startTime: '10:30', shortName: 'Tomomi', staffColor: STAFF_COLORS.naomi },
      { id: 'b-7', startTime: '13:00', shortName: 'Yui', staffColor: STAFF_COLORS.naomi },
      { id: 'b-8', startTime: '15:00', shortName: 'Kana', staffColor: STAFF_COLORS.akari },
    ],
    hiddenCount: 3,
  },
  {
    dateNumber: 15,
    monthNumber: 4,
    weekdayLabel: 'Wed',
    count: 6,
    bookedMinutes: 360,
    availableMinutes: 540,
    newCustomerCount: 0,
    remindersPending: 0,
    consentPending: 0,
    unconfirmed: 0,
    visibleBookings: [
      { id: 'b-9', startTime: '10:00', shortName: 'Mitsuki', staffColor: STAFF_COLORS.akari },
      { id: 'b-10', startTime: '12:00', shortName: 'Saya', staffColor: STAFF_COLORS.akari },
      { id: 'b-11', startTime: '15:30', shortName: 'Hanako', staffColor: STAFF_COLORS.naomi },
    ],
    hiddenCount: 3,
  },
  {
    dateNumber: 16,
    monthNumber: 4,
    weekdayLabel: 'Thu',
    count: 4,
    bookedMinutes: 210,
    availableMinutes: 540,
    newCustomerCount: 0,
    remindersPending: 0,
    consentPending: 0,
    unconfirmed: 0,
    visibleBookings: [
      { id: 'b-12', startTime: '11:00', shortName: 'Miyu', staffColor: STAFF_COLORS.akari },
      { id: 'b-13', startTime: '14:30', shortName: 'Shiori', staffColor: STAFF_COLORS.naomi },
    ],
    hiddenCount: 2,
  },
  {
    dateNumber: 17,
    monthNumber: 4,
    weekdayLabel: 'Fri',
    count: 8,
    bookedMinutes: 480,
    availableMinutes: 540,
    newCustomerCount: 1,
    remindersPending: 2,
    consentPending: 0,
    unconfirmed: 0,
    visibleBookings: [
      { id: 'b-14', startTime: '09:00', shortName: 'Yumi', staffColor: STAFF_COLORS.akari },
      { id: 'b-15', startTime: '10:30', shortName: 'Kana', staffColor: STAFF_COLORS.akari },
      { id: 'b-16', startTime: '13:00', shortName: 'Mitsuki', staffColor: STAFF_COLORS.akari },
    ],
    hiddenCount: 5,
  },
  {
    dateNumber: 18,
    monthNumber: 4,
    weekdayLabel: 'Sat',
    count: 9,
    bookedMinutes: 540,
    availableMinutes: 540,
    newCustomerCount: 0,
    remindersPending: 0,
    consentPending: 0,
    unconfirmed: 1,
    visibleBookings: [
      { id: 'b-17', startTime: '09:00', shortName: 'Yuko', staffColor: STAFF_COLORS.naomi },
      { id: 'b-18', startTime: '11:00', shortName: 'Reiko', staffColor: STAFF_COLORS.akari },
      { id: 'b-19', startTime: '14:00', shortName: 'Tomomi', staffColor: STAFF_COLORS.naomi },
    ],
    hiddenCount: 6,
  },
  {
    dateNumber: 19,
    monthNumber: 4,
    weekdayLabel: 'Sun',
    isToday: true,
    count: 8,
    bookedMinutes: 510,
    availableMinutes: 540,
    newCustomerCount: 1,
    remindersPending: 0,
    consentPending: 0,
    unconfirmed: 1,
    visibleBookings: [
      { id: 'b-20', startTime: '10:00', shortName: 'Yumi', staffColor: STAFF_COLORS.akari },
      { id: 'b-21', startTime: '11:30', shortName: 'Yuko', staffColor: STAFF_COLORS.naomi },
      { id: 'b-22', startTime: '13:30', shortName: 'Reiko', staffColor: STAFF_COLORS.akari },
      { id: 'b-23', startTime: '14:00', shortName: 'Misaki', staffColor: STAFF_COLORS.akari },
    ],
    hiddenCount: 4,
  },
]

const legendItems: ReservationLegendItem[] = [
  { tone: 'booked', label: 'Booked' },
  { tone: 'in_progress', label: 'In progress' },
  { tone: 'completed', label: 'Completed' },
  { tone: 'new_customer', label: 'New customer' },
  { tone: 'pending', label: 'Pending' },
]

function ReservationWeekPage() {
  const [view, setView] = useState<DayWeekMonthView>('week')

  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <ReservationPageHeader
        dateDisplay="Apr 13 – 19, 2026"
        dateDisplayCompact="4/13–19"
        onPrev={() => {}}
        onNext={() => {}}
        onToday={() => {}}
        onNewBooking={() => {}}
      />

      <div className="mb-4">
        <DayWeekMonthToggle view={view} onChange={setView} />
      </div>

      <ReservationLegend items={legendItems} />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
        {days.map((day) => (
          <WeekDayCard
            key={`${day.monthNumber}-${day.dateNumber}`}
            data={day}
            onPick={() => {}}
          />
        ))}
      </section>
    </main>
  )
}

export const Default: Story = {
  render: () => <ReservationWeekPage />,
}
