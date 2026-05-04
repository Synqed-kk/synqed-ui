import type { Meta, StoryObj } from '@storybook/react'
import {
  MonthGrid,
  type MonthDensityBucket,
  type MonthGridCell,
} from '../src/components/month-grid'

const meta: Meta<typeof MonthGrid> = {
  title: 'Components/MonthGrid',
  component: MonthGrid,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof MonthGrid>

function buildCells(anchor: Date, today: Date): MonthGridCell[] {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const last = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  const startDay = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(first.getDate() - startDay)
  const endDay = (7 - last.getDay()) % 7
  const end = new Date(last)
  end.setDate(last.getDate() + endDay + 1)

  const cells: MonthGridCell[] = []
  const cur = new Date(start)
  while (cur < end) {
    const seed = (cur.getDate() * 31 + cur.getMonth()) % 11
    const count = Math.max(0, seed - 2)
    const density: MonthDensityBucket =
      count === 0 ? 'empty' : count < 3 ? 'light' : count < 6 ? 'medium' : 'busy'
    cells.push({
      id: cur.toISOString().slice(0, 10),
      date: new Date(cur),
      inMonth: cur.getMonth() === anchor.getMonth(),
      isToday:
        cur.getFullYear() === today.getFullYear() &&
        cur.getMonth() === today.getMonth() &&
        cur.getDate() === today.getDate(),
      count,
      density,
    })
    cur.setDate(cur.getDate() + 1)
  }
  return cells
}

export const Default: Story = {
  render: () => {
    const today = new Date(2026, 4, 15)
    const cells = buildCells(today, today)
    return (
      <div style={{ maxWidth: 720 }}>
        <MonthGrid cells={cells} onPickDay={(d) => console.info('pick', d.toISOString())} />
      </div>
    )
  },
}
