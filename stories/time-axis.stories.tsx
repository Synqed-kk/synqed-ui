import type { Meta, StoryObj } from '@storybook/react'
import { TimeAxis } from '../src/components/time-axis'

const meta: Meta<typeof TimeAxis> = {
  title: 'Components/TimeAxis',
  component: TimeAxis,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof TimeAxis>

export const Default: Story = {
  render: () => (
    <div style={{ width: 110 * 11, border: '1px solid var(--color-border)' }}>
      <TimeAxis startHour={9} endHour={20} hourWidth={110} />
    </div>
  ),
}
