import type { Meta, StoryObj } from '@storybook/react'
import { AIBodyPredictionCard } from '../src/components/ai-body-prediction-card'

const meta: Meta<typeof AIBodyPredictionCard> = {
  title: 'Components/AIBodyPredictionCard',
  component: AIBodyPredictionCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof AIBodyPredictionCard>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <AIBodyPredictionCard
        headline="Hydration trending up; mid-shaft brittleness has improved since last visit."
        confidence={0.78}
        trendValue="+12%"
        recommendedVisit={{ window: 'Mid-June', weeksOut: '6 weeks out' }}
        rationale={[
          'Customer used recommended leave-in treatment 4–5 days/week.',
          'Self-reported brittle ends dropped from 7/10 to 3/10.',
          'No new color services since the last appointment.',
        ]}
      />
    </div>
  ),
}
