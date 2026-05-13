import type { Meta, StoryObj } from '@storybook/react'
import { PhotoThumbnail } from '../src/components/photo-thumbnail'

const meta: Meta<typeof PhotoThumbnail> = {
  title: 'Components/PhotoThumbnail',
  component: PhotoThumbnail,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof PhotoThumbnail>

export const Default: Story = {
  args: {
    photo: {
      id: 'pr-12',
      thumbnailUrl: 'https://picsum.photos/seed/tanaka-skin-12/400/400',
      caption: 'Hydration treatment, follow-up.',
      categoryLabel: 'Skin',
      categoryColor: 'blue',
      capturedAtLabel: '2026-04-20',
    },
    onClick: () => console.info('thumb tap'),
  },
  render: (args) => (
    <div className="w-40">
      <PhotoThumbnail {...args} />
    </div>
  ),
}

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
  render: (args) => (
    <div className="w-40">
      <PhotoThumbnail {...args} />
    </div>
  ),
}

export const Dimmed: Story = {
  args: {
    ...Default.args,
    dimmed: true,
  },
  render: (args) => (
    <div className="w-40">
      <PhotoThumbnail {...args} />
    </div>
  ),
}

export const NonInteractive: Story = {
  args: {
    photo: {
      id: 'pr-09',
      thumbnailUrl: 'https://picsum.photos/seed/tanaka-after-09/400/400',
      categoryLabel: 'After',
      categoryColor: 'green',
      capturedAtLabel: '2026-03-22',
    },
  },
  render: (args) => (
    <div className="w-40">
      <PhotoThumbnail {...args} />
    </div>
  ),
}
