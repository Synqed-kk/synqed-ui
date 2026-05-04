import type { Meta, StoryObj } from '@storybook/react'
import { CustomerSignalChip } from '../src/components/customer-signal-chip'

const meta: Meta<typeof CustomerSignalChip> = {
  title: 'Components/CustomerSignalChip',
  component: CustomerSignalChip,
  argTypes: {
    tone: {
      control: 'select',
      options: ['new', 'on_track', 'needs_followup', 'dormant_risk'],
    },
  },
}
export default meta
type Story = StoryObj<typeof CustomerSignalChip>

export const New: Story = { args: { tone: 'new', label: 'New' } }
export const OnTrack: Story = { args: { tone: 'on_track', label: 'On track' } }
export const NeedsFollowup: Story = { args: { tone: 'needs_followup', label: 'Follow up' } }
export const DormantRisk: Story = { args: { tone: 'dormant_risk', label: 'Dormant risk' } }
