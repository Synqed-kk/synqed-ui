import type { Meta, StoryObj } from '@storybook/react'
import { AppointmentRow } from '../src/components/appointment-row'
import { KaruteNumberBadge } from '../src/components/karute-number-badge'

const meta: Meta<typeof AppointmentRow> = {
  title: 'Components/AppointmentRow',
  component: AppointmentRow,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof AppointmentRow>

const base = {
  time: '14:00',
  durationMinutes: 60,
  customerName: '田中 美咲',
  service: 'カット＋カラー',
  staffName: '佐藤',
  karuteNumber: '00128',
}

export const Booked: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <AppointmentRow
        appointment={{ ...base, statusLabel: 'Booked', statusTone: 'success' }}
        honorific="様"
        minutesSuffix="分"
        renderKaruteNumber={(v) => <KaruteNumberBadge value={v} />}
      />
    </div>
  ),
}

export const InProgress: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <AppointmentRow
        appointment={{ ...base, statusLabel: 'In progress', statusTone: 'warning', isActive: true }}
        honorific="様"
        minutesSuffix="分"
        renderKaruteNumber={(v) => <KaruteNumberBadge value={v} />}
      />
    </div>
  ),
}

export const NewCustomer: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <AppointmentRow
        appointment={{ ...base, customerName: '山田 花子', statusLabel: 'Pending', statusTone: 'warning', isNew: true }}
        newLabel="新規"
        minutesSuffix="分"
      />
    </div>
  ),
}
