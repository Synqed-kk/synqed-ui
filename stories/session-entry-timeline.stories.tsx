import type { Meta, StoryObj } from '@storybook/react'
import { SessionEntryTimeline } from '../src/components/session-entry-timeline'

const meta: Meta<typeof SessionEntryTimeline> = {
  title: 'Components/SessionEntryTimeline',
  component: SessionEntryTimeline,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof SessionEntryTimeline>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SessionEntryTimeline
        title="Current session"
        sessionDate="2026-04-22"
        entries={[
          { id: '1', time: '10:42', content: 'Mid-shaft dryness improved.', categoryLabel: 'Condition', categoryTone: 'condition' },
          { id: '2', time: '10:55', content: 'Recommended leave-in conditioner.', categoryLabel: 'Product', categoryTone: 'product' },
          { id: '3', time: '11:14', content: 'Color touch-up + gloss.', categoryLabel: 'Treatment', categoryTone: 'treatment' },
          { id: '4', time: '11:42', content: 'Suggested a 6-week revisit.', categoryLabel: 'Next', categoryTone: 'next' },
        ]}
      />
    </div>
  ),
}
