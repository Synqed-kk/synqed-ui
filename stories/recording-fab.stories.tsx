import type { Meta, StoryObj } from '@storybook/react'
import { RecordingFab } from '../src/components/recording-fab'

const meta: Meta<typeof RecordingFab> = {
  title: 'Components/RecordingFab',
  component: RecordingFab,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof RecordingFab>

export const Idle: Story = {
  render: () => (
    <div style={{ minHeight: 400, background: 'var(--color-bg)', position: 'relative' }}>
      <p style={{ padding: 16, color: 'var(--color-text)' }}>
        Desktop only — visible on md+ viewports.
      </p>
      <RecordingFab onStart={() => console.info('start')} />
    </div>
  ),
}

export const Recording: Story = {
  render: () => (
    <div style={{ minHeight: 400, background: 'var(--color-bg)', position: 'relative' }}>
      <RecordingFab recording elapsed="03:12" onStop={() => console.info('stop')} />
    </div>
  ),
}

export const Japanese: Story = {
  render: () => (
    <div style={{ minHeight: 400, background: 'var(--color-bg)', position: 'relative' }}>
      <RecordingFab
        copy={{ start: '録音を開始', stop: '録音を停止' }}
        onStart={() => console.info('start')}
      />
    </div>
  ),
}
