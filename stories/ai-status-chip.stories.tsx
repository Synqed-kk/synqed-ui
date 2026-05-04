import type { Meta, StoryObj } from '@storybook/react'
import { AIStatusChip } from '../src/components/ai-status-chip'

const meta: Meta<typeof AIStatusChip> = {
  title: 'Components/AIStatusChip',
  component: AIStatusChip,
  argTypes: {
    tone: {
      control: 'select',
      options: ['summarized', 'pending', 'review_needed', 'draft'],
    },
  },
}
export default meta
type Story = StoryObj<typeof AIStatusChip>

export const Summarized: Story = { args: { tone: 'summarized', label: 'AI summarized' } }
export const Pending: Story = { args: { tone: 'pending', label: 'AI pending' } }
export const ReviewNeeded: Story = {
  args: { tone: 'review_needed', label: 'Review needed' },
}
export const Draft: Story = { args: { tone: 'draft', label: 'Draft' } }
