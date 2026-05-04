import type { Meta, StoryObj } from '@storybook/react'
import {
  RecentKaruteList,
  type RecentKaruteItem,
} from '../src/components/recent-karute-list'

const meta: Meta<typeof RecentKaruteList> = {
  title: 'Components/RecentKaruteList',
  component: RecentKaruteList,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof RecentKaruteList>

const items: RecentKaruteItem[] = [
  {
    id: 'k-1',
    customerName: 'Misaki Tanaka',
    karuteNumber: '0142',
    sessionDate: '04/29',
    summary: 'Mid-shaft dryness improved; recommended leave-in conditioner.',
    entryCount: 6,
    staffName: 'Akari Sato',
  },
  {
    id: 'k-2',
    customerName: 'Yuko Suzuki',
    karuteNumber: '0118',
    sessionDate: '04/28',
    summary: 'Touch-up + treatment. Asked about smoothing options for next visit.',
    entryCount: 4,
    staffName: 'Naomi Nakamura',
  },
  {
    id: 'k-3',
    customerName: 'Reiko Saito',
    sessionDate: '04/27',
    summary: 'Style change requested. Provisional karute pending review.',
    entryCount: 2,
    staffName: 'Akari Sato',
  },
]

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <RecentKaruteList items={items} onShowAll={() => console.info('show all')} />
    </div>
  ),
}

export const WithItemLinks: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <RecentKaruteList
        items={items}
        asItemLink={(item, children) => (
          <a
            href={`/karute/${item.id}`}
            onClick={(e) => e.preventDefault()}
            style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
          >
            {children}
          </a>
        )}
        showAllSlot={(children) => (
          <a href="/karute" onClick={(e) => e.preventDefault()}>
            {children}
          </a>
        )}
      />
    </div>
  ),
}
