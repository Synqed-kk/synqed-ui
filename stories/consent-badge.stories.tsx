import type { Meta, StoryObj } from '@storybook/react'
import { ConsentBadge } from '../src/components/consent-badge'

const meta: Meta<typeof ConsentBadge> = {
  title: 'Components/ConsentBadge',
  component: ConsentBadge,
}
export default meta
type Story = StoryObj<typeof ConsentBadge>

export const Granted: Story = {
  args: {
    consent: true,
    grantedLabel: 'Consent granted',
    missingLabel: 'Consent missing',
    consentDate: '2026-04-20',
  },
}

export const Missing: Story = {
  args: {
    consent: false,
    grantedLabel: 'Consent granted',
    missingLabel: 'Consent missing',
  },
}
