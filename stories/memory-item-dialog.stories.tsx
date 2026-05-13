import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import { MemoryItemDialog } from '../src/components/memory-item-dialog'

const meta: Meta = {
  title: 'Components/MemoryItemDialog',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const Add: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Add memory item</Button>
        <MemoryItemDialog
          open={open}
          onOpenChange={setOpen}
          mode="add"
          customerName="Misaki Tanaka"
          onSubmit={async (draft) => {
            console.info('add', draft)
            await new Promise((r) => setTimeout(r, 400))
          }}
        />
      </div>
    )
  },
}

export const Edit: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Edit memory item</Button>
        <MemoryItemDialog
          open={open}
          onOpenChange={setOpen}
          mode="edit"
          customerName="Misaki Tanaka"
          initial={{
            category: 'body',
            label: 'Pollen allergy',
            detail: 'Flares in spring; affects scalp irritation.',
          }}
          onSubmit={async (draft) => {
            console.info('edit', draft)
            await new Promise((r) => setTimeout(r, 400))
          }}
        />
      </div>
    )
  },
}
