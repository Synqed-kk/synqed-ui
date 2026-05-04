import type { Meta, StoryObj } from '@storybook/react'
import { AIOutreachCard } from '../src/components/ai-outreach-card'

const meta: Meta<typeof AIOutreachCard> = {
  title: 'Components/AIOutreachCard',
  component: AIOutreachCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof AIOutreachCard>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AIOutreachCard
        channel="LINE"
        subscript="Misaki Tanaka · scheduled via LINE"
        preview={
          'Hi Misaki — hope the moisture treatment is still feeling good! ' +
          'You mentioned wanting to schedule a touch-up around the holidays. ' +
          "Want me to hold a slot the week of Dec 16?"
        }
        onEdit={() => console.info('edit')}
        onSend={() => console.info('send')}
      />
    </div>
  ),
}
