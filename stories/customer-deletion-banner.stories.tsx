import type { Meta, StoryObj } from '@storybook/react'
import { CustomerDeletionBanner } from '../src/components/customer-deletion-banner'

const meta: Meta<typeof CustomerDeletionBanner> = {
  title: 'Components/CustomerDeletionBanner',
  component: CustomerDeletionBanner,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomerDeletionBanner>

export const Warning: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerDeletionBanner
        title="Misaki Tanaka is scheduled for deletion — 18 days remaining"
        body="Permanent deletion on May 1, 2026. Inside the 30-day recovery window."
        blockedNote="New karute, recording, and photo uploads are paused for this customer."
        undoLabel="Undo deletion"
        daysRemaining={18}
        onUndo={() => console.info('undo')}
      />
    </div>
  ),
}

export const Urgent: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerDeletionBanner
        title="Misaki Tanaka is scheduled for deletion — 4 days remaining"
        body="Permanent deletion on April 19, 2026. Inside the 30-day recovery window."
        undoLabel="Undo deletion"
        daysRemaining={4}
        onUndo={() => console.info('undo')}
      />
    </div>
  ),
}
