import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import { NewKaruteDialog } from '../src/components/new-karute-dialog'

const meta: Meta = {
  title: 'Components/NewKaruteDialog',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <NewKaruteDialog
          open={open}
          onOpenChange={setOpen}
          staff={[
            { id: 's2', name: 'Akari Sato' },
            { id: 's3', name: 'Naomi Nakamura' },
          ]}
          onSubmit={async (payload) => {
            console.info('submit', payload)
            await new Promise((r) => setTimeout(r, 500))
          }}
        />
      </div>
    )
  },
}
