import type { Meta, StoryObj } from '@storybook/react'
import { DashboardHeader } from '../src/components/dashboard-header'

const meta: Meta<typeof DashboardHeader> = {
  title: 'Components/DashboardHeader',
  component: DashboardHeader,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DashboardHeader>

export const Staff: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <DashboardHeader
        greeting="Good morning, Akari"
        dateFormatted="Friday, May 1 · 2026"
      />
    </div>
  ),
}

export const Owner: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <DashboardHeader
        greeting="Good afternoon, Liam"
        dateFormatted="Friday, May 1 · 2026"
        isOwner
        ownerBadgeLabel="Owner view"
      />
    </div>
  ),
}
