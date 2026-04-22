import type { Meta, StoryObj } from '@storybook/react'
import { ErrorState } from '../src/components/error-state'

const meta: Meta<typeof ErrorState> = {
  title: 'Components/ErrorState',
  component: ErrorState,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ErrorState>

export const Default: Story = {
  args: {
    error: new Error('PGRST301: Network request timed out'),
    onRetry: () => alert('retrying'),
  },
}

export const NoRetry: Story = {
  args: { error: new Error('Permission denied') },
}

export const Customized: Story = {
  args: {
    error: new Error('Failed to load customers'),
    title: 'Could not load data',
    helpHint: 'Check your connection and retry.',
    retryLabel: 'Try again',
    onRetry: () => alert('retrying'),
  },
}
