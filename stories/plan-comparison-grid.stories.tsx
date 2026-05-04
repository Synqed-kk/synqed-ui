import type { Meta, StoryObj } from '@storybook/react'
import {
  PlanComparisonGrid,
  type PlanCardData,
} from '../src/components/plan-comparison-grid'

const meta: Meta<typeof PlanComparisonGrid> = {
  title: 'Components/PlanComparisonGrid',
  component: PlanComparisonGrid,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PlanComparisonGrid>

const cards: PlanCardData[] = [
  {
    tier: 'free',
    title: 'Free',
    price: '¥0',
    pitch: 'Try the basics. No AI features, but core karute + customer management works.',
    features: [
      '1 store max',
      '15 customers max',
      '10 recordings / month',
      '× AI karute auto-generation',
      '× Customer memory auto-extract',
    ],
  },
  {
    tier: 'standard',
    title: 'Standard',
    price: '¥6,800 / store / month',
    pitch: 'All the core AI features. Right for most single-site and small-team salons.',
    features: [
      'Unlimited stores',
      'Unlimited customers',
      'Unlimited recordings',
      'AI karute auto-generation',
      'Customer memory auto-extract',
      '× Advanced coaching analytics',
      '× Priority support',
    ],
  },
  {
    tier: 'professional',
    title: 'Professional',
    price: '¥9,800 / store / month',
    pitch: 'For multi-site operations. Advanced coaching + bundle discounts.',
    features: [
      'Everything in Standard',
      'Advanced coaching analytics',
      'Priority AI action ranking',
      'Reserve bundle discount',
      'Priority support',
      '14-day free trial available',
    ],
    highlight: true,
  },
]

export const FreeUser: Story = {
  render: () => (
    <PlanComparisonGrid
      currentTier="free"
      cards={cards}
      trialAvailable
      onAction={(tier) => console.info('action', tier)}
      onStartTrial={() => console.info('trial')}
    />
  ),
}

export const StandardUser: Story = {
  render: () => (
    <PlanComparisonGrid
      currentTier="standard"
      cards={cards}
      onAction={(tier) => console.info('action', tier)}
    />
  ),
}

export const ProfessionalUser: Story = {
  render: () => (
    <PlanComparisonGrid
      currentTier="professional"
      cards={cards}
      onAction={(tier) => console.info('action', tier)}
    />
  ),
}
