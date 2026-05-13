import type { Meta, StoryObj } from '@storybook/react'
import {
  CustomerSessionHistory,
  type SessionHistoryItem,
} from '../src/components/customer-session-history'

const meta: Meta<typeof CustomerSessionHistory> = {
  title: 'Components/CustomerSessionHistory',
  component: CustomerSessionHistory,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomerSessionHistory>

const sessions: SessionHistoryItem[] = [
  {
    id: 's-1',
    dateDisplay: '04/08',
    weekday: 'Wed',
    service: 'Color · Touch-up',
    duration: 90,
    staffName: 'Akari Sato',
    summary: 'Mid-shaft dryness improved; recommended leave-in conditioner.',
    entryCount: 6,
    takeaways: [
      'Customer responsive to product recommendations',
      'Schedule travel constraints mentioned for June',
    ],
    entriesByCategory: {
      condition: ['Mid-shaft dryness has improved'],
      product: ['Leave-in conditioner — demoed application'],
      treatment: ['Color touch-up + gloss'],
      next: ['Suggest 6-week revisit'],
    },
    memoryExtractedCount: 2,
    aiStatusTone: 'summarized',
    aiStatusLabel: 'AI summarized',
    conversionStatus: 'active',
    isLatest: true,
  },
  {
    id: 's-2',
    dateDisplay: '02/14',
    weekday: 'Sat',
    service: 'Cut + Color',
    duration: 120,
    staffName: 'Akari Sato',
    summary: 'Significant length cut; warm tone color introduced.',
    entryCount: 4,
    takeaways: [],
    entriesByCategory: {
      treatment: ['Cut to shoulder length', 'Warm copper highlights'],
      next: ['Touch-up in 8 weeks'],
    },
    memoryExtractedCount: 1,
    aiStatusTone: 'summarized',
    aiStatusLabel: 'AI summarized',
    conversionStatus: 'active',
  },
]

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 920 }}>
      <CustomerSessionHistory sessions={sessions} />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 920 }}>
      <CustomerSessionHistory sessions={[]} />
    </div>
  ),
}
