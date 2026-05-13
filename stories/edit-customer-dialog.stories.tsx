import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import { EditCustomerDialog } from '../src/components/edit-customer-dialog'

const meta: Meta = {
  title: 'Components/EditCustomerDialog',
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
        <EditCustomerDialog
          open={open}
          onOpenChange={setOpen}
          initial={{
            name: 'Misaki Tanaka',
            phone: '090-1234-5678',
            email: 'misaki@example.com',
            staffId: 's2',
          }}
          staff={[
            { id: 's2', name: 'Akari Sato' },
            { id: 's3', name: 'Naomi Nakamura' },
          ]}
          onSubmit={async (patch) => {
            console.info('patch', patch)
            await new Promise((r) => setTimeout(r, 500))
          }}
        />
      </div>
    )
  },
}
