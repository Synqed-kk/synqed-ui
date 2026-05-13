import type { Meta, StoryObj } from '@storybook/react'
import { WeekDayCard } from '../src/components/week-day-card'

const meta: Meta<typeof WeekDayCard> = {
  title: 'Components/WeekDayCard',
  component: WeekDayCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof WeekDayCard>

export const Today: Story = {
  render: () => (
    <div style={{ maxWidth: 240 }}>
      <WeekDayCard
        data={{
          dateNumber: 1,
          monthNumber: 5,
          weekdayLabel: 'Fri',
          isToday: true,
          count: 8,
          bookedMinutes: 360,
          availableMinutes: 600,
          newCustomerCount: 1,
          remindersPending: 2,
          consentPending: 1,
          unconfirmed: 0,
          visibleBookings: [
            { id: 'r1', startTime: '10:00', shortName: 'Misaki', staffColor: '#5a7a5a' },
            { id: 'r2', startTime: '11:30', shortName: 'Yuko', staffColor: '#c8873e' },
            { id: 'r3', startTime: '14:00', shortName: 'Reiko', staffColor: '#5a7a5a' },
            { id: 'r4', startTime: '16:00', shortName: 'Aya', staffColor: '#6366f1' },
          ],
          hiddenCount: 4,
        }}
        onPick={() => console.info('pick')}
      />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 240 }}>
      <WeekDayCard
        data={{
          dateNumber: 5,
          monthNumber: 5,
          weekdayLabel: 'Tue',
          count: 0,
          bookedMinutes: 0,
          availableMinutes: 600,
          newCustomerCount: 0,
          remindersPending: 0,
          consentPending: 0,
          unconfirmed: 0,
          visibleBookings: [],
          hiddenCount: 0,
        }}
      />
    </div>
  ),
}
