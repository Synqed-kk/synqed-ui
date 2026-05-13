import type { Meta, StoryObj } from '@storybook/react'
import { CustomersPageHeader } from '../src/components/customers-page-header'

const meta: Meta<typeof CustomersPageHeader> = {
  title: 'Components/CustomersPageHeader',
  component: CustomersPageHeader,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomersPageHeader>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <CustomersPageHeader
        title="Customers"
        meta="Registered 124 · Showing 12"
        ctaLabel="Add customer"
        onCta={() => console.info('add customer')}
      />
    </div>
  ),
}
