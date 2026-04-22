import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '../src/components/separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 300, color: 'var(--color-text)' }}>
      <div>Above</div>
      <Separator orientation="horizontal" style={{ margin: '12px 0' }} />
      <div>Below</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: 60, alignItems: 'center', gap: 16, color: 'var(--color-text)' }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Middle</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
}
