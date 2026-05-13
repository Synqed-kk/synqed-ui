import type { Meta, StoryObj } from '@storybook/react'
import { DisclosureModeIndicator } from '../src/components/disclosure-mode-indicator'

const meta: Meta<typeof DisclosureModeIndicator> = {
  title: 'Components/DisclosureModeIndicator',
  component: DisclosureModeIndicator,
  argTypes: {
    mode: { control: 'inline-radio', options: ['A', 'B', 'C'] },
    size: { control: 'inline-radio', options: ['compact', 'block'] },
  },
}
export default meta
type Story = StoryObj<typeof DisclosureModeIndicator>

export const ModeACompact: Story = {
  args: {
    mode: 'A',
    size: 'compact',
    label: 'Mode A · Implicit',
    summary: 'Recording starts silently. No customer-facing prompt.',
  },
}

export const ModeBCompact: Story = {
  args: {
    mode: 'B',
    size: 'compact',
    label: 'Mode B · Verbal',
    summary: 'Read the suggested script before starting.',
  },
}

export const ModeCCompact: Story = {
  args: {
    mode: 'C',
    size: 'compact',
    label: 'Mode C · Tablet consent',
    summary: 'Tablet consent should already be on file for this customer.',
  },
}

export const ModeBBlock: Story = {
  args: {
    mode: 'B',
    size: 'block',
    label: 'Mode B · Verbal',
    summary: 'Read the suggested script before starting the recording.',
    script:
      'May I record this consultation so I can take better notes for your records?',
    showScriptLabel: 'Show suggested script',
    copyLabel: 'Copy',
  },
}
