import type { Meta, StoryObj } from '@storybook/react'
import { KaruteListRow, type KaruteListRowData } from '../src/components/karute-list-row'

const meta: Meta<typeof KaruteListRow> = {
  title: 'Components/KaruteListRow',
  component: KaruteListRow,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof KaruteListRow>

const sample: KaruteListRowData = {
  id: 'k-1',
  date: '2026-04-19',
  dateDisplay: '04/19',
  weekday: 'Sun',
  customerName: 'Misaki Tanaka',
  customerInitials: 'MT',
  karuteNumber: '0142',
  service: 'Color · Touch-up',
  duration: 90,
  staffName: 'Akari Sato',
  summary: 'Mid-shaft dryness improved; recommended leave-in conditioner',
  entryCount: 6,
  aiStatusTone: 'summarized',
  aiStatusLabel: 'AI summarized',
  conversionStatus: 'active',
  staffStripeColor: 'var(--color-accent)',
}

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <KaruteListRow item={sample} />
    </div>
  ),
}

export const ProvisionalNeedsReview: Story = {
  render: () => (
    <div style={{ maxWidth: 1100, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <KaruteListRow
        item={{
          ...sample,
          conversionStatus: 'provisional',
          aiStatusTone: 'review_needed',
          aiStatusLabel: 'Review needed',
        }}
      />
    </div>
  ),
}
