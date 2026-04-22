import type { Meta, StoryObj } from '@storybook/react'
import { SignalChip } from '../src/components/signal-chip'
import { Sparkles, Clock, AlertCircle, FileEdit } from 'lucide-react'

const meta: Meta<typeof SignalChip> = {
  title: 'Components/SignalChip',
  component: SignalChip,
  argTypes: {
    tone: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'] },
  },
}
export default meta
type Story = StoryObj<typeof SignalChip>

export const Info: Story = { args: { tone: 'info', label: 'New' } }
export const Success: Story = { args: { tone: 'success', label: 'On track' } }
export const Warning: Story = { args: { tone: 'warning', label: 'Needs follow-up' } }
export const Danger: Story = { args: { tone: 'danger', label: 'Dormant risk' } }
export const Neutral: Story = { args: { tone: 'neutral', label: 'Draft' } }

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <SignalChip tone="success" icon={<Sparkles className="size-2.5" />} label="AI summary ready" />
      <SignalChip tone="warning" icon={<Clock className="size-2.5" />} label="Pending AI" />
      <SignalChip tone="danger" icon={<AlertCircle className="size-2.5" />} label="Review needed" />
      <SignalChip tone="neutral" icon={<FileEdit className="size-2.5" />} label="Draft" />
    </div>
  ),
}
