import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import { PostSessionResolutionDialog } from '../src/components/post-session-resolution-dialog'

const meta: Meta = {
  title: 'Components/PostSessionResolutionDialog',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Resolve session</Button>
        <PostSessionResolutionDialog
          open={open}
          onOpenChange={setOpen}
          customerName="Misaki Tanaka"
          declinedReasons={[
            { key: 'budget', label: 'Budget' },
            { key: 'considering', label: 'Considering' },
            { key: 'mismatch', label: 'Not a fit' },
            { key: 'rebooked_later', label: 'Will follow up' },
            { key: 'other', label: 'Other' },
          ]}
          onResolve={(status, reason) => console.info('resolve', status, reason)}
        />
      </div>
    )
  },
}
