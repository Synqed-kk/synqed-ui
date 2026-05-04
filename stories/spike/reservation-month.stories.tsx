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
  MonthGrid,
  type MonthGridCell,
  type MonthDensityBucket,
} from '../../src/components/month-grid'

const meta: Meta = {
  title: 'Spike/Reservation Month',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Build April 2026 calendar cells (Apr 1 = Wed). Booking counts for the days
// in the spike's mock are realistic; counts on filler days outside Apr are
// 0 / "empty" density.
// ----------------------------------------------------------------------------

const TODAY_KEY = '2026-04-19'

interface SeedDay {
  date: string // ISO date
  count: number
}

const seed: SeedDay[] = [
  { date: '2026-04-01', count: 5 },
  { date: '2026-04-02', count: 4 },
  { date: '2026-04-03', count: 6 },
  { date: '2026-04-04', count: 9 },
  { date: '2026-04-05', count: 7 },
  { date: '2026-04-06', count: 3 },
  { date: '2026-04-07', count: 6 },
  { date: '2026-04-08', count: 5 },
  { date: '2026-04-09', count: 8 },
  { date: '2026-04-10', count: 7 },
  { date: '2026-04-11', count: 9 },
  { date: '2026-04-12', count: 7 },
  { date: '2026-04-13', count: 5 },
  { date: '2026-04-14', count: 7 },
  { date: '2026-04-15', count: 6 },
  { date: '2026-04-16', count: 4 },
  { date: '2026-04-17', count: 8 },
  { date: '2026-04-18', count: 9 },
  { date: '2026-04-19', count: 8 },
  { date: '2026-04-20', count: 0 },
  { date: '2026-04-21', count: 4 },
  { date: '2026-04-22', count: 6 },
  { date: '2026-04-23', count: 5 },
  { date: '2026-04-24', count: 8 },
  { date: '2026-04-25', count: 9 },
  { date: '2026-04-26', count: 7 },
  { date: '2026-04-27', count: 0 },
  { date: '2026-04-28', count: 5 },
  { date: '2026-04-29', count: 6 },
  { date: '2026-04-30', count: 7 },
]

function densityFor(count: number): MonthDensityBucket {
  if (count === 0) return 'empty'
  if (count <= 3) return 'light'
  if (count <= 6) return 'medium'
  return 'busy'
}

function isoDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function buildCells(year: number, month0: number): MonthGridCell[] {
  // Monday-first grid. Find the Monday on/before the 1st.
  const first = new Date(year, month0, 1)
  const firstDayOfWeek = first.getDay() // 0 = Sun
  const offsetToMonday = (firstDayOfWeek + 6) % 7 // shift so 0 == Mon
  const start = new Date(year, month0, 1 - offsetToMonday)

  const cells: MonthGridCell[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const iso = isoDate(d)
    const seedDay = seed.find((s) => s.date === iso)
    const count = d.getMonth() === month0 ? seedDay?.count ?? 0 : 0
    cells.push({
      id: iso,
      date: d,
      inMonth: d.getMonth() === month0,
      isToday: iso === TODAY_KEY,
      count,
      density: d.getMonth() === month0 ? densityFor(count) : 'empty',
    })
  }
  // Trim trailing fully-out-of-month rows
  while (cells.length > 35 && cells.slice(-7).every((c) => !c.inMonth)) {
    cells.splice(-7, 7)
  }
  return cells
}

const cells = buildCells(2026, 3) // April = month 3

const legendItems: ReservationLegendItem[] = [
  { tone: 'booked', label: 'Booked' },
  { tone: 'in_progress', label: 'In progress' },
  { tone: 'completed', label: 'Completed' },
  { tone: 'new_customer', label: 'New customer' },
  { tone: 'pending', label: 'Pending' },
]

function ReservationMonthPage() {
  const [view, setView] = useState<DayWeekMonthView>('month')
  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <ReservationPageHeader
        dateDisplay="April 2026"
        dateDisplayCompact="Apr 2026"
        onPrev={() => {}}
        onNext={() => {}}
        onToday={() => {}}
        onNewBooking={() => {}}
      />

      <div className="mb-4">
        <DayWeekMonthToggle view={view} onChange={setView} />
      </div>

      <ReservationLegend items={legendItems} />

      <MonthGrid cells={cells} onPickDay={() => {}} />
    </main>
  )
}

export const Default: Story = {
  render: () => <ReservationMonthPage />,
}
