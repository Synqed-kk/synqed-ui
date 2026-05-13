import type { Meta, StoryObj } from '@storybook/react'
import { SubscriptionSummaryCard } from '../src/components/subscription-summary-card'

const meta: Meta<typeof SubscriptionSummaryCard> = {
  title: 'Components/SubscriptionSummaryCard',
  component: SubscriptionSummaryCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof SubscriptionSummaryCard>

export const ActiveStandard: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SubscriptionSummaryCard
        status="active"
        tier="standard"
        tierLabel="Standard"
        storeCount={3}
        monthlyTotalFormatted="¥9,800"
        nextBillingDateFormatted="May 15, 2026"
        onCta={() => console.info('manage')}
      />
    </div>
  ),
}

export const ActiveProfessional: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SubscriptionSummaryCard
        status="active"
        tier="professional"
        tierLabel="Professional"
        storeCount={5}
        monthlyTotalFormatted="¥24,500"
        nextBillingDateFormatted="May 15, 2026"
        onCta={() => console.info('manage')}
      />
    </div>
  ),
}

export const Trialing: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SubscriptionSummaryCard
        status="trialing"
        tier="professional"
        trialDaysLeft={9}
        onCta={() => console.info('choose plan')}
      />
    </div>
  ),
}

export const PastDue: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SubscriptionSummaryCard
        status="past_due"
        tier="standard"
        onCta={() => console.info('update payment')}
      />
    </div>
  ),
}

export const Free: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SubscriptionSummaryCard
        status="active"
        tier="free"
        onCta={() => console.info('see plans')}
      />
    </div>
  ),
}

export const WithCtaSlot: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SubscriptionSummaryCard
        status="active"
        tier="standard"
        tierLabel="Standard"
        storeCount={2}
        monthlyTotalFormatted="¥6,800"
        nextBillingDateFormatted="May 15, 2026"
        ctaSlot={(label) => (
          <a
            href="/settings?tab=subscription"
            onClick={(e) => e.preventDefault()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 12px',
              height: 32,
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--color-text)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {label}
          </a>
        )}
      />
    </div>
  ),
}
