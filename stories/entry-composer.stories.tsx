import type { Meta, StoryObj } from '@storybook/react'
import { EntryComposer } from '../src/components/entry-composer'

const meta: Meta<typeof EntryComposer> = {
  title: 'Components/EntryComposer',
  component: EntryComposer,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof EntryComposer>

const HINTS: { match: RegExp; category: string }[] = [
  { match: /dry|skin|pain|tension|sore/i, category: 'Condition' },
  { match: /worry|concern|ask/i, category: 'Concern' },
  { match: /cream|shampoo|product|lotion/i, category: 'Product' },
  { match: /next|book|visit/i, category: 'Next' },
  { match: /treatment|massage|facial/i, category: 'Treatment' },
]

function categorize(text: string) {
  if (text.length < 4) return null
  for (const h of HINTS) {
    if (h.match.test(text)) {
      return { category: h.category, confidence: 0.86 + Math.min(text.length / 200, 0.12) }
    }
  }
  return { category: 'Concern', confidence: 0.71 }
}

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <EntryComposer categorize={categorize} />
    </div>
  ),
}
