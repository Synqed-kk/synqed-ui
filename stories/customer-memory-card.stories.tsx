import type { Meta, StoryObj } from '@storybook/react'
import {
  CustomerMemoryCard,
  type CustomerMemoryData,
} from '../src/components/customer-memory-card'

const meta: Meta<typeof CustomerMemoryCard> = {
  title: 'Components/CustomerMemoryCard',
  component: CustomerMemoryCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomerMemoryCard>

const sample: CustomerMemoryData = {
  customerId: 'c-1',
  updatedThisVisit: 2,
  lastUpdatedDisplay: 'Apr 22, 2026',
  intake: {
    firstVisitDate: '2024-08-12',
    occupation: 'Marketing manager',
    goalLabel: 'Ongoing maintenance',
    heardFromLabel: 'via Instagram',
  },
  items: [
    {
      id: 'm-1',
      category: 'personal',
      label: 'Dog named Rug (Shiba)',
      detail: 'Adopted last year from a rescue.',
      source: 'staff',
      confidence: 1,
      pinned: true,
      suggestTalkingPoint: true,
      sourceSessionDate: '2026-02-14',
    },
    {
      id: 'm-2',
      category: 'body',
      label: 'Pollen allergy',
      detail: 'Flares in spring; affects scalp irritation.',
      source: 'ai_extraction',
      confidence: 0.62,
      pinned: false,
      sourceSessionDate: '2026-04-08',
    },
    {
      id: 'm-3',
      category: 'goal',
      label: 'Wants subtle warm tones',
      source: 'ai_extraction',
      confidence: 0.84,
      pinned: false,
      sourceSessionDate: '2026-02-14',
    },
  ],
}

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerMemoryCard
        memory={sample}
        customerName="Misaki Tanaka"
        onAdd={() => console.info('add')}
        onTogglePin={(item) => console.info('pin', item.id)}
        onEdit={(item) => console.info('edit', item.id)}
        onRemove={(item) => console.info('remove', item.id)}
      />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CustomerMemoryCard
        memory={{
          customerId: 'c-2',
          updatedThisVisit: 0,
          lastUpdatedDisplay: 'Never updated',
          intake: {},
          items: [],
        }}
        customerName="New Customer"
      />
    </div>
  ),
}
