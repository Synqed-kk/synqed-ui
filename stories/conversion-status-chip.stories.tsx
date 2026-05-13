import type { Meta, StoryObj } from '@storybook/react'
import { ConversionStatusChip } from '../src/components/conversion-status-chip'

const meta: Meta<typeof ConversionStatusChip> = {
  title: 'Components/ConversionStatusChip',
  component: ConversionStatusChip,
}
export default meta
type Story = StoryObj<typeof ConversionStatusChip>

export const Provisional: Story = { args: { status: 'provisional' } }
export const Declined: Story = { args: { status: 'declined' } }
export const ActiveExplicit: Story = { args: { status: 'active', showActive: true } }
export const ActiveHidden: Story = {
  render: () => (
    <div style={{ padding: 8 }}>
      <ConversionStatusChip status="active" />
      <span style={{ marginLeft: 8, color: '#888', fontSize: 12 }}>(renders nothing)</span>
    </div>
  ),
}
