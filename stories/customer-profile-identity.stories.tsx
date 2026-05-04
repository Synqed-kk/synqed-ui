import type { Meta, StoryObj } from '@storybook/react'
import { CustomerProfileIdentity } from '../src/components/customer-profile-identity'

const meta: Meta<typeof CustomerProfileIdentity> = {
  title: 'Components/CustomerProfileIdentity',
  component: CustomerProfileIdentity,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomerProfileIdentity>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerProfileIdentity
        name="Misaki Tanaka"
        initials="MT"
        age={32}
        gender="Female"
        registeredDate="2024-08-12"
        visitCount={12}
        staffName="Akari Sato"
        karuteNumber="0142"
        signalTone="on_track"
        signalLabel="On track"
        phone="090-1234-5678"
        email="misaki@example.com"
        nextPredictedVisit="mid-June"
        onEdit={() => console.info('edit')}
      />
    </div>
  ),
}

export const WithRecordingConsent: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerProfileIdentity
        name="Misaki Tanaka"
        initials="MT"
        age={32}
        gender="Female"
        registeredDate="2024-08-12"
        visitCount={12}
        staffName="Akari Sato"
        signalTone="needs_followup"
        signalLabel="Follow up"
        recordingConsent={{ granted: true, tooltip: 'Scope: All sessions · Granted 2026-01-04' }}
      />
    </div>
  ),
}
