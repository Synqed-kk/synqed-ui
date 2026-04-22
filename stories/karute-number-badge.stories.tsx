import type { Meta, StoryObj } from '@storybook/react'
import { KaruteNumberBadge } from '../src/components/karute-number-badge'

const meta: Meta<typeof KaruteNumberBadge> = {
  title: 'Components/KaruteNumberBadge',
  component: KaruteNumberBadge,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
  },
}
export default meta
type Story = StoryObj<typeof KaruteNumberBadge>

export const Small: Story = { args: { value: '00128', size: 'sm' } }
export const Medium: Story = { args: { value: '00128', size: 'md' } }

export const BesideName: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text)' }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>田中 美咲</span>
      <KaruteNumberBadge value="00128" />
    </div>
  ),
}

export const CustomPrefix: Story = { args: { value: 'KR-0042', size: 'md', prefix: '' } }
