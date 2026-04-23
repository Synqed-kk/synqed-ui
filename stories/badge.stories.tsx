import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../src/components/badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning'],
    },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Badge', variant: 'default' } }
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } }
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } }
export const Ghost: Story = { args: { children: 'Ghost', variant: 'ghost' } }
export const Destructive: Story = { args: { children: 'Error', variant: 'destructive' } }
export const Success: Story = { args: { children: 'Done', variant: 'success' } }
export const Warning: Story = { args: { children: 'Warn', variant: 'warning' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="success">Done</Badge>
      <Badge variant="warning">Warn</Badge>
    </div>
  ),
}
