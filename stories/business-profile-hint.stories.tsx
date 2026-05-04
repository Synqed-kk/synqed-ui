import type { Meta, StoryObj } from '@storybook/react'
import { BusinessProfileHint } from '../src/components/business-profile-hint'

const meta: Meta<typeof BusinessProfileHint> = {
  title: 'Components/BusinessProfileHint',
  component: BusinessProfileHint,
  argTypes: {
    size: { control: 'inline-radio', options: ['inline', 'block'] },
  },
}
export default meta
type Story = StoryObj<typeof BusinessProfileHint>

export const Block: Story = {
  args: {
    size: 'block',
    label: 'Hair salon',
    tagline:
      'Coaching cards prioritize color-history continuity, rebook timing, and chair-time efficiency.',
    onSettings: () => alert('open settings'),
  },
}

export const Inline: Story = {
  args: {
    size: 'inline',
    label: 'Hair salon',
    tagline:
      'Coaching cards prioritize color-history continuity, rebook timing, and chair-time efficiency.',
  },
}

export const BlockNoLink: Story = {
  args: {
    size: 'block',
    label: 'Esthetic clinic',
    tagline:
      'Surfaces emphasize before/after photo continuity and treatment-plan adherence.',
  },
}
