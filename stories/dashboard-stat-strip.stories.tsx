import type { Meta, StoryObj } from '@storybook/react'
import { DashboardStatStrip } from '../src/components/dashboard-stat-strip'

const meta: Meta<typeof DashboardStatStrip> = {
  title: 'Components/DashboardStatStrip',
  component: DashboardStatStrip,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DashboardStatStrip>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <DashboardStatStrip
        stats={[
          {
            label: 'Weekly recordings',
            value: 38,
            trend: 12,
            trendSuffix: '% vs last week',
          },
          { label: "Today's customers", value: 12 },
          { label: 'Monthly karute', value: 84 },
          {
            label: 'Rebooking rate',
            value: 64,
            unit: '%',
            trend: -3,
            trendSuffix: '%',
          },
        ]}
      />
    </div>
  ),
}
