import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import type { PhotoCategory } from '../src/components/photo-category-picker'
import {
  PhotoGallerySheet,
  type GalleryPhoto,
} from '../src/components/photo-gallery-sheet'

const meta: Meta = {
  title: 'Components/PhotoGallerySheet',
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

const photos: GalleryPhoto[] = [
  {
    id: 'pr-12',
    storageUrl: 'https://picsum.photos/seed/tanaka-skin-12/1200/1200',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-skin-12/400/400',
    categoryLabel: 'Skin',
    categoryKey: 'esthetic_skin',
    categoryColor: 'blue',
    caption: 'Cheek hydration improving.',
    capturedAtLabel: '2026-04-20',
    capturedByStaffName: 'Akari Sato',
  },
  {
    id: 'pr-11',
    storageUrl: 'https://picsum.photos/seed/tanaka-after-11/1200/1200',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-after-11/400/400',
    categoryLabel: 'After',
    categoryKey: 'esthetic_after',
    categoryColor: 'green',
    caption: 'Even tone after hydration.',
    capturedAtLabel: '2026-04-20',
    capturedByStaffName: 'Akari Sato',
  },
  {
    id: 'pr-10',
    storageUrl: 'https://picsum.photos/seed/tanaka-skin-10/1200/1200',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-skin-10/400/400',
    categoryLabel: 'Skin',
    categoryKey: 'esthetic_skin',
    categoryColor: 'blue',
    caption: 'Dryness during pollen season.',
    capturedAtLabel: '2026-03-22',
    capturedByStaffName: 'Akari Sato',
  },
  {
    id: 'pr-08',
    storageUrl: 'https://picsum.photos/seed/tanaka-concern-08/1200/1200',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-concern-08/400/400',
    categoryLabel: 'Concern',
    categoryKey: 'esthetic_concern',
    categoryColor: 'amber',
    capturedAtLabel: '2026-03-22',
    capturedByStaffName: 'Akari Sato',
  },
  {
    id: 'pr-05',
    storageUrl: 'https://picsum.photos/seed/tanaka-skin-05/1200/1200',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-skin-05/400/400',
    categoryLabel: 'Skin',
    categoryKey: 'esthetic_skin',
    categoryColor: 'blue',
    caption: 'Initial visit baseline.',
    capturedAtLabel: '2026-01-27',
    capturedByStaffName: 'Akari Sato',
  },
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open gallery</Button>
        <PhotoGallerySheet
          open={open}
          onOpenChange={setOpen}
          photos={photos}
          categories={categories}
          title="Misaki Tanaka"
        />
      </div>
    )
  },
}

export const SinglePhoto: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open with one photo</Button>
        <PhotoGallerySheet
          open={open}
          onOpenChange={setOpen}
          photos={[photos[0]!]}
          categories={categories}
          title="Misaki Tanaka"
        />
      </div>
    )
  },
}
