import type { Meta, StoryObj } from '@storybook/react'
import { AIActionCard } from '../src/components/ai-action-card'

const meta: Meta<typeof AIActionCard> = {
  title: 'Components/AIActionCard',
  component: AIActionCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof AIActionCard>

export const High: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <AIActionCard
        action={{
          id: '1',
          priority: 'high',
          priorityLabel: 'High',
          title: 'Reach out to Misaki Tanaka — 65 days since last visit',
          rationale:
            'Last 3 visits were spaced every 4 weeks. She is 9 weeks overdue — typical dormancy threshold. A short LINE message referencing her last session is the highest-leverage action today.',
          ctaLabel: 'Draft message',
        }}
        onCta={() => alert('cta')}
        onApprove={() => alert('approved')}
        onDismiss={() => alert('dismissed')}
      />
    </div>
  ),
}

export const Medium: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <AIActionCard
        action={{
          id: '2',
          priority: 'medium',
          priorityLabel: 'Med',
          title: 'Add Hanako Yamada to rebook list',
          rationale: 'Her last three appointments booked same-day. She may want to book forward.',
          ctaLabel: 'Open customer',
        }}
      />
    </div>
  ),
}

export const Low: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <AIActionCard
        action={{
          id: '3',
          priority: 'low',
          priorityLabel: 'Low',
          title: 'Review 2 draft karutes from yesterday',
          rationale: 'Drafts are 18h old. They will be auto-archived after 48h without confirmation.',
          ctaLabel: 'Open drafts',
        }}
      />
    </div>
  ),
}
