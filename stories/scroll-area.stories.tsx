import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '../src/components/scroll-area'

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
}
export default meta
type Story = StoryObj<typeof ScrollArea>

export const Vertical: Story = {
  render: () => (
    <ScrollArea
      style={{
        height: 200,
        width: 300,
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
      }}
    >
      <div style={{ padding: 16 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
