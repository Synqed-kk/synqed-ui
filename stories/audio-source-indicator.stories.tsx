import type { Meta, StoryObj } from '@storybook/react'
import { AudioSourceIndicator } from '../src/components/audio-source-indicator'

const meta: Meta<typeof AudioSourceIndicator> = {
  title: 'Components/AudioSourceIndicator',
  component: AudioSourceIndicator,
  argTypes: {
    source: { control: 'select', options: ['phone_mic', 'external_bluetooth', 'external_wired'] },
    size: { control: 'inline-radio', options: ['compact', 'block'] },
  },
}
export default meta
type Story = StoryObj<typeof AudioSourceIndicator>

export const CompactPhone: Story = {
  args: {
    source: 'phone_mic',
    size: 'compact',
    label: 'Phone mic',
    subtitle: 'Default. Clear capture within 1–2m of the customer.',
  },
}

export const BlockBluetooth: Story = {
  args: {
    source: 'external_bluetooth',
    size: 'block',
    label: 'External Bluetooth mic',
    subtitle: 'Improved accuracy in noisy spaces. Phase 2 integration.',
  },
}

export const BlockWired: Story = {
  args: {
    source: 'external_wired',
    size: 'block',
    label: 'External wired mic',
    subtitle: 'Best quality. Lightning / USB-C. Phase 2 integration.',
  },
}
