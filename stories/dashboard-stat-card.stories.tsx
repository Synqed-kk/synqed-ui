import type { Meta, StoryObj } from '@storybook/react'
import { DashboardStatCard } from '../src/components/dashboard-stat-card'

const meta: Meta<typeof DashboardStatCard> = {
  title: 'Components/DashboardStatCard',
  component: DashboardStatCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DashboardStatCard>

export const Basic: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <DashboardStatCard
        stat={{ label: 'Today customers', value: 12, unit: '' }}
      />
    </div>
  ),
}

export const WithPositiveTrend: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <DashboardStatCard
        stat={{
          label: 'Weekly recordings',
          value: 38,
          unit: '',
          trend: 12,
          trendSuffix: '% vs last week',
        }}
      />
    </div>
  ),
}

export const WithNegativeTrend: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <DashboardStatCard
        stat={{
          label: 'Rebooking rate',
          value: 64,
          unit: '%',
          trend: -3,
          trendSuffix: '%',
        }}
      />
    </div>
  ),
}
