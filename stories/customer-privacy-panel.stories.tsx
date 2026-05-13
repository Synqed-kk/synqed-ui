import type { Meta, StoryObj } from '@storybook/react'
import { Download, ShieldOff, Trash2, Undo2 } from 'lucide-react'
import { CustomerPrivacyPanel } from '../src/components/customer-privacy-panel'

const meta: Meta<typeof CustomerPrivacyPanel> = {
  title: 'Components/CustomerPrivacyPanel',
  component: CustomerPrivacyPanel,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomerPrivacyPanel>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerPrivacyPanel
        title="Privacy & data"
        intro="APPI-compliance actions for Misaki Tanaka. Owner privileges or assigned-staff action required."
        accessHistory={{
          title: 'Access history',
          description: 'See which staff accessed or modified this customer in the audit log.',
          actionLabel: 'View history',
          onAction: () => console.info('history'),
        }}
        actions={[
          {
            id: 'export',
            tone: 'neutral',
            icon: Download,
            title: 'Export data',
            description:
              'Encrypted PDF or JSON of profile, karute, memory, photos, transcripts.',
            actionLabel: 'Export',
            onAction: () => console.info('export'),
          },
          {
            id: 'revoke',
            tone: 'warning',
            icon: ShieldOff,
            title: 'Revoke recording consent',
            description: 'Stops recording on all future sessions for this customer.',
            actionLabel: 'Revoke consent',
            onAction: () => console.info('revoke'),
          },
          {
            id: 'delete',
            tone: 'danger',
            icon: Trash2,
            title: 'Delete customer data',
            description: 'Soft-deletes all data; permanent deletion in 30 days.',
            actionLabel: 'Delete data',
            onAction: () => console.info('delete'),
          },
        ]}
        footerDisclaimer="These actions are logged to the audit trail. Deletion is irreversible after 30 days."
      />
    </div>
  ),
}

export const WithUndoState: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerPrivacyPanel
        title="Privacy & data"
        intro="APPI-compliance actions for Misaki Tanaka."
        actions={[
          {
            id: 'export',
            tone: 'neutral',
            icon: Download,
            title: 'Export data',
            description: 'Encrypted PDF or JSON.',
            actionLabel: 'Export',
            onAction: () => console.info('export'),
          },
          {
            id: 'undo',
            tone: 'warning',
            icon: Undo2,
            title: 'Scheduled for deletion — 14 days remaining',
            description:
              'Permanent deletion on May 5. Undo to restore data and resume normal operation.',
            actionLabel: 'Undo deletion',
            onAction: () => console.info('undo'),
          },
        ]}
      />
    </div>
  ),
}
