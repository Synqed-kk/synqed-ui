import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DiscreetRecordingIndicator } from '../src/components/discreet-recording-indicator'

const meta: Meta<typeof DiscreetRecordingIndicator> = {
  title: 'Components/DiscreetRecordingIndicator',
  component: DiscreetRecordingIndicator,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof DiscreetRecordingIndicator>

export const MobileClosed: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false)
      return (
        <div style={{ padding: 24, background: 'var(--color-bg)', minHeight: 400 }}>
          <DiscreetRecordingIndicator
            variant="mobile"
            open={open}
            onOpenChange={setOpen}
            elapsed="03:12"
            onStop={() => console.info('stop')}
          />
        </div>
      )
    }
    return <Demo />
  },
}

export const MobileOpen: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(true)
      return (
        <div style={{ padding: 24, background: 'var(--color-bg)', minHeight: 400 }}>
          <DiscreetRecordingIndicator
            variant="mobile"
            open={open}
            onOpenChange={setOpen}
            elapsed="03:12"
            onStop={() => console.info('stop')}
            autoCloseMs={0}
          />
        </div>
      )
    }
    return <Demo />
  },
}

export const Desktop: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false)
      return (
        <div style={{ minHeight: 600, background: 'var(--color-bg)', position: 'relative' }}>
          <p style={{ padding: 16, color: 'var(--color-text)' }}>
            Desktop variant — bottom-right (md+ only).
          </p>
          <DiscreetRecordingIndicator
            variant="desktop"
            open={open}
            onOpenChange={setOpen}
            elapsed="03:12"
            onStop={() => console.info('stop')}
          />
        </div>
      )
    }
    return <Demo />
  },
}
