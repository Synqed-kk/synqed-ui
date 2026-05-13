import type { Meta, StoryObj } from '@storybook/react'
import { ReservationPageHeader } from '../src/components/reservation-page-header'

const meta: Meta<typeof ReservationPageHeader> = {
  title: 'Components/ReservationPageHeader',
  component: ReservationPageHeader,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ReservationPageHeader>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <ReservationPageHeader
        dateDisplay="May 1, 2026 (Fri)"
        dateDisplayCompact="5/1 (Fri)"
        onPrev={() => console.info('prev')}
        onNext={() => console.info('next')}
        onToday={() => console.info('today')}
        onPickDate={() => console.info('pick date')}
        onNewBooking={() => console.info('new booking')}
      />
    </div>
  ),
}
