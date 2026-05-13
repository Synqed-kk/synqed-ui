import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import {
  CustomerDeleteDialog,
  CustomerExportDialog,
} from '../src/components/customer-data-action-dialogs'

const meta: Meta = {
  title: 'Components/CustomerDataActionDialogs',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const Export: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open export dialog</Button>
        <CustomerExportDialog
          open={open}
          onOpenChange={setOpen}
          customerName="Misaki Tanaka"
          onExport={async (fmt) => {
            console.info('export', fmt)
            await new Promise((r) => setTimeout(r, 1500))
          }}
        />
      </div>
    )
  },
}

export const Delete: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="destructive">
          Open delete dialog
        </Button>
        <CustomerDeleteDialog
          open={open}
          onOpenChange={setOpen}
          customerName="Misaki Tanaka"
          onDelete={async () => {
            console.info('delete')
            await new Promise((r) => setTimeout(r, 1000))
          }}
        />
      </div>
    )
  },
}
