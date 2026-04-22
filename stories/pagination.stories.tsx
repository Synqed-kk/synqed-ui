import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Pagination } from '../src/components/pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof Pagination>

function Controlled({ totalItems, pageSize }: { totalItems: number; pageSize: number }) {
  const [page, setPage] = useState(1)
  return (
    <div style={{ width: 600 }}>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalItems={totalItems}
        pageSize={pageSize}
      />
    </div>
  )
}

export const Few: Story = { render: () => <Controlled totalItems={42} pageSize={10} /> }
export const Many: Story = { render: () => <Controlled totalItems={327} pageSize={20} /> }
export const SinglePage: Story = { render: () => <Controlled totalItems={5} pageSize={10} /> }
export const Empty: Story = { render: () => <Controlled totalItems={0} pageSize={10} /> }
