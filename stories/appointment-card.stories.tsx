import type { Meta, StoryObj } from '@storybook/react'
import { AppointmentCard } from '../src/components/appointment-card'

const meta: Meta<typeof AppointmentCard> = {
  title: 'Components/AppointmentCard',
  component: AppointmentCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof AppointmentCard>

const ROW_HEIGHT = 88

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      width: 720,
      height: ROW_HEIGHT,
      border: '1px solid var(--color-border)',
      borderRadius: 8,
      background: 'var(--color-bg-card)',
    }}
  >
    {children}
  </div>
)

export const Booked: Story = {
  render: () => (
    <Frame>
      <AppointmentCard
        leftOffset={20}
        width={220}
        rowHeight={ROW_HEIGHT}
        appointment={{
          id: 'b-1',
          displayName: 'Misaki Tanaka',
          service: 'Color · Touch-up',
          startTime: '14:00',
          endTime: '15:00',
          durationMinutes: 60,
          status: 'booked',
          statusLabel: 'Booked',
          recordingConsentGranted: true,
        }}
        onClick={() => console.info('open')}
      />
    </Frame>
  ),
}

export const InProgress: Story = {
  render: () => (
    <Frame>
      <AppointmentCard
        leftOffset={20}
        width={220}
        rowHeight={ROW_HEIGHT}
        appointment={{
          id: 'b-2',
          displayName: 'Yuko Suzuki',
          service: 'Cut + Style',
          startTime: '14:00',
          endTime: '15:15',
          durationMinutes: 75,
          status: 'in_progress',
          statusLabel: 'In progress',
          canRecord: true,
        }}
        onClick={() => console.info('open')}
        onStartRecord={() => console.info('record')}
      />
    </Frame>
  ),
}

export const NewCustomer: Story = {
  render: () => (
    <Frame>
      <AppointmentCard
        leftOffset={20}
        width={220}
        rowHeight={ROW_HEIGHT}
        appointment={{
          id: 'b-3',
          displayName: 'Aya Kobayashi',
          service: 'First consult',
          startTime: '14:00',
          endTime: '15:30',
          durationMinutes: 90,
          status: 'new_customer',
          statusLabel: 'New',
          aiFlag: 'Reminder not sent',
        }}
        onClick={() => console.info('open')}
      />
    </Frame>
  ),
}

export const Tight: Story = {
  render: () => (
    <Frame>
      <AppointmentCard
        leftOffset={20}
        width={70}
        rowHeight={ROW_HEIGHT}
        appointment={{
          id: 'b-4',
          displayName: 'Reiko Saito',
          service: 'Quick trim',
          startTime: '14:00',
          endTime: '14:30',
          durationMinutes: 30,
          status: 'booked',
          statusLabel: 'Booked',
        }}
      />
    </Frame>
  ),
}
