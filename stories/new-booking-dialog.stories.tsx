import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import { NewBookingDialog } from '../src/components/new-booking-dialog'

const meta: Meta = {
  title: 'Components/NewBookingDialog',
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
        <NewBookingDialog
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
