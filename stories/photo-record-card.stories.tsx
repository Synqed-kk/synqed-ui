import type { Meta, StoryObj } from '@storybook/react'
import { PhotoRecordCard } from '../src/components/photo-record-card'
import type { PhotoThumbnailRecord } from '../src/components/photo-thumbnail'

const meta: Meta<typeof PhotoRecordCard> = {
  title: 'Components/PhotoRecordCard',
  component: PhotoRecordCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PhotoRecordCard>

const recent: PhotoThumbnailRecord[] = [
  {
    id: 'pr-12',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-skin-12/400/400',
    categoryLabel: 'Skin',
    categoryColor: 'blue',
    capturedAtLabel: '2026-04-20',
  },
  {
    id: 'pr-11',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-after-11/400/400',
    categoryLabel: 'After',
    categoryColor: 'green',
    capturedAtLabel: '2026-04-20',
  },
  {
    id: 'pr-10',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-skin-10/400/400',
    categoryLabel: 'Skin',
    categoryColor: 'blue',
    capturedAtLabel: '2026-03-22',
  },
  {
    id: 'pr-08',
    thumbnailUrl: 'https://picsum.photos/seed/tanaka-concern-08/400/400',
    categoryLabel: 'Concern',
    categoryColor: 'amber',
    capturedAtLabel: '2026-03-22',
  },
]

export const WithPhotos: Story = {
  args: {
    recentPhotos: recent,
    totalPhotoCount: 12,
    onAdd: () => console.info('add'),
    onShowGallery: () => console.info('show gallery'),
    onPhotoClick: (id) => console.info('photo click', id),
  },
  render: (args) => (
    <div className="max-w-xl">
      <PhotoRecordCard {...args} />
    </div>
  ),
}

export const Empty: Story = {
  args: {
    recentPhotos: [],
    totalPhotoCount: 0,
    onAdd: () => console.info('add'),
  },
  render: (args) => (
    <div className="max-w-xl">
      <PhotoRecordCard {...args} />
    </div>
  ),
}

export const AddPaused: Story = {
  args: {
    recentPhotos: recent,
    totalPhotoCount: 12,
    addDisabled: true,
    addDisabledTooltip: 'Customer scheduled for deletion (3d left).',
    onShowGallery: () => console.info('show gallery'),
  },
  render: (args) => (
    <div className="max-w-xl">
      <PhotoRecordCard {...args} />
    </div>
  ),
}
