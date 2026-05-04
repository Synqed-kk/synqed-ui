import type { Meta, StoryObj } from '@storybook/react'
import { CustomersListSkeleton } from '../src/components/customers-list-skeleton'

const meta: Meta<typeof CustomersListSkeleton> = {
  title: 'Components/CustomersListSkeleton',
  component: CustomersListSkeleton,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomersListSkeleton>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <CustomersListSkeleton />
    </div>
  ),
}
export const FewRows: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <CustomersListSkeleton rows={3} />
    </div>
  ),
}
