import type { Meta, StoryObj } from '@storybook/react'
import {
  ReservationLegend,
  type ReservationLegendItem,
} from '../src/components/reservation-legend'

const meta: Meta<typeof ReservationLegend> = {
  title: 'Components/ReservationLegend',
  component: ReservationLegend,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ReservationLegend>

const items: ReservationLegendItem[] = [
  { tone: 'booked', label: 'Booked' },
  { tone: 'in_progress', label: 'In progress' },
  { tone: 'completed', label: 'Completed' },
  { tone: 'new_customer', label: 'New' },
  { tone: 'pending', label: 'Pending' },
  { tone: 'block', label: 'Blocked' },
]

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <ReservationLegend items={items} />
    </div>
  ),
}
