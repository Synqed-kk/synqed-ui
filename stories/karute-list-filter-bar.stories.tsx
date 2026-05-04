import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { KaruteListFilterBar } from '../src/components/karute-list-filter-bar'

type FilterKey = 'all' | 'this_week' | 'pending' | 'review' | 'draft'

const meta: Meta = {
  title: 'Components/KaruteListFilterBar',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<FilterKey>('all')
    const [q, setQ] = useState('')
    return (
      <div style={{ maxWidth: 980 }}>
        <KaruteListFilterBar<FilterKey>
          activeKey={active}
          onChange={setActive}
          searchQuery={q}
          onSearchChange={setQ}
          searchPlaceholder="Search karute"
          filters={[
            { key: 'all', label: 'All' },
            { key: 'this_week', label: 'This week' },
            { key: 'pending', label: 'AI pending' },
            { key: 'review', label: 'Review needed' },
            { key: 'draft', label: 'Draft' },
          ]}
          counts={{ all: 84, this_week: 12, pending: 5, review: 3, draft: 6 }}
        />
      </div>
    )
  },
}
