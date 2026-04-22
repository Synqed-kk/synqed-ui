import type { Meta, StoryObj } from '@storybook/react'
import { DialogField } from '../src/components/dialog-field'
import { Input } from '../src/components/input'

const meta: Meta<typeof DialogField> = {
  title: 'Components/DialogField',
  component: DialogField,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DialogField>

export const Default: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DialogField label="Name">
        <Input placeholder="Customer name" />
      </DialogField>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DialogField label="Email" required>
        <Input type="email" placeholder="name@example.com" />
      </DialogField>
    </div>
  ),
}

export const WithHint: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DialogField label="Phone" hint="Include country code">
        <Input placeholder="+81 90 1234 5678" />
      </DialogField>
    </div>
  ),
}
