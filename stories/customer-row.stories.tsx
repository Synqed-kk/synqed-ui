import type { Meta, StoryObj } from '@storybook/react'
import { CustomerRow, type CustomerRowData } from '../src/components/customer-row'

const meta: Meta<typeof CustomerRow> = {
  title: 'Components/CustomerRow',
  component: CustomerRow,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomerRow>

const sample: CustomerRowData = {
  id: 'c-1',
  name: 'Misaki Tanaka',
  initials: 'MT',
  age: 32,
  gender: 'Female',
  registeredDate: '2024-08-12',
  staffName: 'Akari Sato',
  karuteNumber: '0142',
  phone: '090-1234-5678',
  signalTone: 'on_track',
  signalLabel: 'On track',
  visitCount: 12,
  visitChain: [true, true, false, true, true],
  lastVisitDate: '2026-04-08',
  lastVisitDaysAgo: 14,
  nextPredictedVisit: 'mid-June',
  staffStripeColor: 'var(--color-accent)',
}

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <CustomerRow customer={sample} />
    </div>
  ),
}

export const Masked: Story = {
  render: () => (
    <div style={{ maxWidth: 1100, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <CustomerRow customer={{ ...sample, masked: true }} />
    </div>
  ),
}

export const PendingDeletion: Story = {
  render: () => (
    <div style={{ maxWidth: 1100, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <CustomerRow
        customer={{ ...sample, pendingDeletion: { daysRemaining: 12 } }}
      />
    </div>
  ),
}
