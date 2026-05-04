import type { Meta, StoryObj } from '@storybook/react'
import { AISummaryCard } from '../src/components/ai-summary-card'
import { MobileKaruteSheets } from '../src/components/mobile-karute-sheets'
import { TranscriptCollapse } from '../src/components/transcript-collapse'

const meta: Meta<typeof MobileKaruteSheets> = {
  title: 'Components/MobileKaruteSheets',
  component: MobileKaruteSheets,
  parameters: { layout: 'padded', viewport: { defaultViewport: 'mobile1' } },
}
export default meta
type Story = StoryObj<typeof MobileKaruteSheets>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <MobileKaruteSheets
        sessionDate="2026-04-22"
        summaryContent={
          <AISummaryCard
            title="AI summary"
            sessionDate="2026-04-22"
            summary={[
              'Mid-shaft dryness improved.',
              'Recommended a leave-in conditioner; demoed application.',
              'Booking next session in ~6 weeks.',
            ]}
          />
        }
        transcriptContent={
          <TranscriptCollapse
            consent
            consentDate="2026-04-22"
            durationLabel="42:18"
            defaultOpen
            content="Welcome back. How has your hair felt since the last session?"
          />
        }
      />
    </div>
  ),
}
