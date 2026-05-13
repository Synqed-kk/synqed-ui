import type { Meta, StoryObj } from '@storybook/react'
import { SessionEntryRow } from '../src/components/session-entry-row'

const meta: Meta<typeof SessionEntryRow> = {
  title: 'Components/SessionEntryRow',
  component: SessionEntryRow,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof SessionEntryRow>

export const Stack: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SessionEntryRow
        entry={{
          id: '1',
          time: '10:42',
          content: 'Mid-shaft dryness improved since the last visit.',
          categoryLabel: 'Condition',
          categoryTone: 'condition',
        }}
      />
      <SessionEntryRow
        entry={{
          id: '2',
          time: '10:55',
          content: 'Recommended a leave-in conditioner; demoed application.',
          categoryLabel: 'Product',
          categoryTone: 'product',
        }}
      />
      <SessionEntryRow
        entry={{
          id: '3',
          time: '11:14',
          content: 'Color touch-up; gloss treatment for shine.',
          categoryLabel: 'Treatment',
          categoryTone: 'treatment',
        }}
      />
    </div>
  ),
}
