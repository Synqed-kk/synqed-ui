import type { Meta, StoryObj } from '@storybook/react'
import { PhotoCompareView } from '../src/components/photo-compare-view'

const meta: Meta<typeof PhotoCompareView> = {
  title: 'Components/PhotoCompareView',
  component: PhotoCompareView,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PhotoCompareView>

export const Default: Story = {
  args: {
    a: {
      storageUrl: 'https://picsum.photos/seed/tanaka-skin-05/600/600',
      caption: 'First visit baseline.',
      categoryLabel: 'Skin',
      capturedAtLabel: '2026-01-27',
    },
    b: {
      storageUrl: 'https://picsum.photos/seed/tanaka-skin-12/600/600',
      caption: 'Three months on.',
      categoryLabel: 'Skin',
      capturedAtLabel: '2026-04-20',
    },
  },
  render: (args) => (
    <div className="max-w-xl">
      <PhotoCompareView {...args} />
    </div>
  ),
}
