import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import { PhotoCaptureDialog } from '../src/components/photo-capture-dialog'
import type { PhotoCategory } from '../src/components/photo-category-picker'

const meta: Meta = {
  title: 'Components/PhotoCaptureDialog',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

const categories: PhotoCategory[] = [
  { key: 'esthetic_skin', label: 'Skin condition', color: 'blue' },
  { key: 'esthetic_before', label: 'Before', color: 'slate' },
  { key: 'esthetic_after', label: 'After', color: 'green' },
  { key: 'esthetic_concern', label: 'Concern', color: 'amber' },
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open capture dialog</Button>
        <PhotoCaptureDialog
          open={open}
          onOpenChange={setOpen}
          categories={categories}
          onCapture={(submit) => {
            console.info('capture', submit)
            setOpen(false)
          }}
        />
      </div>
    )
  },
}
