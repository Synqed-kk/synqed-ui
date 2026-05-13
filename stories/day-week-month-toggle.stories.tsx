import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  DayWeekMonthToggle,
  type DayWeekMonthView,
} from '../src/components/day-week-month-toggle'

const meta: Meta<typeof DayWeekMonthToggle> = {
  title: 'Components/DayWeekMonthToggle',
  component: DayWeekMonthToggle,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DayWeekMonthToggle>

export const Interactive: Story = {
  render: () => {
    const [view, setView] = useState<DayWeekMonthView>('day')
    return <DayWeekMonthToggle view={view} onChange={setView} />
  },
}

export const WeekActive: Story = {
  render: () => <DayWeekMonthToggle view="week" onChange={() => {}} />,
}
