import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from '../src/components/page-header'
import { Button } from '../src/components/button'

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: { title: 'Customers', subtitle: '128 active customers across 3 stores' },
}

export const WithActions: Story = {
  args: {
    title: 'Customers',
    subtitle: 'Manage your customer records',
    actions: (
      <>
        <Button variant="ghost">Export</Button>
        <Button>New customer</Button>
      </>
    ),
  },
}

export const TitleOnly: Story = { args: { title: 'Settings' } }
