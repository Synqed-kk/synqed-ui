import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CustomersFilterBar } from '../src/components/customers-filter-bar'

type FilterKey = 'all' | 'assigned' | 'new' | 'followup' | 'dormant' | 'pending'

const meta: Meta = {
  title: 'Components/CustomersFilterBar',
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
        <CustomersFilterBar<FilterKey>
          activeKey={active}
          onChange={setActive}
          searchQuery={q}
          onSearchChange={setQ}
          searchPlaceholder="Search customers"
          filters={[
            { key: 'all', label: 'All' },
            { key: 'assigned', label: 'Assigned to me' },
            { key: 'new', label: 'New (30d)' },
            { key: 'followup', label: 'Follow up' },
            { key: 'dormant', label: 'Dormant 90d+' },
            { key: 'pending', label: 'Pending deletion', warning: true, title: 'Within recovery window' },
          ]}
          counts={{ all: 124, assigned: 38, new: 9, followup: 4, dormant: 6, pending: 2 }}
        />
      </div>
    )
  },
}
