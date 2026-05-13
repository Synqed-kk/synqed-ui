import type { Meta, StoryObj } from '@storybook/react'
import { OnboardingBanner } from '../src/components/onboarding-banner'

const meta: Meta<typeof OnboardingBanner> = {
  title: 'Components/OnboardingBanner',
  component: OnboardingBanner,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof OnboardingBanner>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <OnboardingBanner
        onStart={() => console.info('start setup')}
        onDismiss={() => console.info('dismiss')}
      />
    </div>
  ),
}

export const WithLinkSlot: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <OnboardingBanner
        startSlot={(children) => (
          <a href="/welcome" onClick={(e) => e.preventDefault()}>
            {children}
          </a>
        )}
        onDismiss={() => console.info('dismiss')}
      />
    </div>
  ),
}
