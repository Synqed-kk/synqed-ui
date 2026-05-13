import type { Meta, StoryObj } from '@storybook/react'
import { TranscriptCollapse } from '../src/components/transcript-collapse'

const meta: Meta<typeof TranscriptCollapse> = {
  title: 'Components/TranscriptCollapse',
  component: TranscriptCollapse,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof TranscriptCollapse>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <TranscriptCollapse
        consent
        consentDate="2026-04-22"
        durationLabel="42:18"
        defaultOpen
        content={'Welcome back. How has your hair felt since the last color session?\nA little dry near the ends, but the color held up better than last time.'}
        onPlay={() => console.info('play')}
      />
    </div>
  ),
}

export const NoConsent: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <TranscriptCollapse
        consent={false}
        durationLabel="00:00"
        content="No transcript was recorded for this session."
      />
    </div>
  ),
}
