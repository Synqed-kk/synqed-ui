import type { Meta, StoryObj } from '@storybook/react'
import { VisitHistoryChain } from '../src/components/visit-history-chain'

const meta: Meta<typeof VisitHistoryChain> = {
  title: 'Components/VisitHistoryChain',
  component: VisitHistoryChain,
}
export default meta
type Story = StoryObj<typeof VisitHistoryChain>

export const Regular: Story = {
  args: { chain: [true, true, true, false, true], visitCount: 12 },
}

export const Sparse: Story = {
  args: { chain: [false, true, false, false, true], visitCount: 4 },
}

export const Perfect: Story = {
  args: { chain: [true, true, true, true, true], visitCount: 20 },
}
