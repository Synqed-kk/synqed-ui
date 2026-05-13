import type { Meta, StoryObj } from '@storybook/react'
import { StaffRowHeader } from '../src/components/staff-row-header'

const meta: Meta<typeof StaffRowHeader> = {
  title: 'Components/StaffRowHeader',
  component: StaffRowHeader,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof StaffRowHeader>

export const TakesBookings: Story = {
  render: () => (
    <div style={{ width: 180, border: '1px solid var(--color-border)', borderRadius: 8 }}>
      <StaffRowHeader
        staff={{
          id: 's1',
          name: 'Akari Sato',
          initials: 'AS',
          role: 'Senior',
          takesBookings: true,
        }}
        count={6}
        rowHeight={88}
        accentColor="#5a7a5a"
        bookingCountSuffix=" bookings"
      />
    </div>
  ),
}

export const OwnerLane: Story = {
  render: () => (
    <div style={{ width: 180, border: '1px solid var(--color-border)', borderRadius: 8 }}>
      <StaffRowHeader
        staff={{
          id: 's0',
          name: 'Liam Kim',
          initials: 'LK',
          role: 'Owner',
          takesBookings: false,
        }}
        count={0}
        rowHeight={88}
      />
    </div>
  ),
}
