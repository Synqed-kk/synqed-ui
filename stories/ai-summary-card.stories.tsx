import type { Meta, StoryObj } from '@storybook/react'
import { AISummaryCard } from '../src/components/ai-summary-card'

const meta: Meta<typeof AISummaryCard> = {
  title: 'Components/AISummaryCard',
  component: AISummaryCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof AISummaryCard>

export const Default: Story = {
  args: {
    title: 'AI summary',
    sessionDate: '2026-04-22',
    summary: [
      'Customer reports dryness near the ends; color held longer than last visit.',
      'Recommended a deeper conditioning treatment alongside the touch-up.',
      'Booking next session in ~6 weeks; mentioned travel constraints.',
    ],
  },
}
