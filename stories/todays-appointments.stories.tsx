import type { Meta, StoryObj } from '@storybook/react'
import { AppointmentRow } from '../src/components/appointment-row'
import { TodaysAppointments } from '../src/components/todays-appointments'

const meta: Meta<typeof TodaysAppointments> = {
  title: 'Components/TodaysAppointments',
  component: TodaysAppointments,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof TodaysAppointments>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 540 }}>
      <TodaysAppointments
        total={4}
        completed={2}
        onShowAll={() => console.info('show all')}
      >
        <AppointmentRow
          appointment={{
            time: '10:00',
            durationMinutes: 60,
            customerName: 'Misaki Tanaka',
            service: 'Color · Touch-up',
            staffName: 'Akari',
            statusLabel: 'Completed',
            statusTone: 'neutral',
          }}
        />
        <AppointmentRow
          appointment={{
            time: '11:30',
            durationMinutes: 75,
            customerName: 'Yuko Suzuki',
            service: 'Cut + Style',
            staffName: 'Naomi',
            statusLabel: 'Completed',
            statusTone: 'neutral',
          }}
        />
        <AppointmentRow
          appointment={{
            time: '14:00',
            durationMinutes: 60,
            customerName: 'Reiko Saito',
            service: 'Treatment',
            staffName: 'Akari',
            statusLabel: 'In progress',
            statusTone: 'warning',
            isActive: true,
          }}
        />
        <AppointmentRow
          appointment={{
            time: '16:00',
            durationMinutes: 90,
            customerName: 'Aya Kobayashi',
            service: 'Initial consult',
            staffName: 'Naomi',
            statusLabel: 'Booked',
            statusTone: 'success',
            isNew: true,
          }}
        />
      </TodaysAppointments>
    </div>
  ),
}
