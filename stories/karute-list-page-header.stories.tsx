import type { Meta, StoryObj } from '@storybook/react'
import { KaruteListPageHeader } from '../src/components/karute-list-page-header'

const meta: Meta<typeof KaruteListPageHeader> = {
  title: 'Components/KaruteListPageHeader',
  component: KaruteListPageHeader,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof KaruteListPageHeader>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <KaruteListPageHeader
        title="Karute"
        meta="This month 84 · April 2026 · Showing 12"
        ctaLabel="New karute"
        onCta={() => console.info('new karute')}
      />
    </div>
  ),
}
