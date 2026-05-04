import type { Meta, StoryObj } from '@storybook/react'
import {
  DiarizedTranscriptView,
  type DiarizedTranscript,
} from '../src/components/diarized-transcript-view'

const meta: Meta<typeof DiarizedTranscriptView> = {
  title: 'Components/DiarizedTranscriptView',
  component: DiarizedTranscriptView,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DiarizedTranscriptView>

const fullTranscript: DiarizedTranscript = {
  overallConfidence: 0.86,
  source: 'openai-whisper',
  speakers: [
    { id: 'sp-staff', role: 'staff', label: 'Staff (Yui)' },
    { id: 'sp-customer', role: 'customer', label: 'Customer' },
  ],
  segments: [
    {
      id: 'seg-1',
      speakerId: 'sp-staff',
      speakerConfidence: 0.94,
      startSeconds: 3,
      text: 'Welcome back. How has your hair felt since the last color session?',
    },
    {
      id: 'seg-2',
      speakerId: 'sp-customer',
      speakerConfidence: 0.89,
      startSeconds: 11,
      text: 'A little dry near the ends, but the color held up better than last time.',
    },
    {
      id: 'seg-3',
      speakerId: 'sp-staff',
      speakerConfidence: 0.62,
      startSeconds: 27,
      text: 'Got it. We can do a deeper conditioning treatment alongside the touch-up today.',
      isOverlap: true,
    },
    {
      id: 'seg-4',
      speakerId: 'sp-customer',
      speakerConfidence: 0.81,
      startSeconds: 35,
      text: "That sounds great — let's do it.",
      staffRelabeledSpeakerId: 'sp-customer',
    },
  ],
}

export const Full: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <DiarizedTranscriptView transcript={fullTranscript} />
    </div>
  ),
}

export const FallbackText: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <DiarizedTranscriptView
        transcript={{ overallConfidence: 1, speakers: [], segments: [] }}
        fallbackText={
          'Welcome back. How has your hair felt since the last color session?\n' +
          'A little dry near the ends, but the color held up better than last time.\n' +
          'Got it — we can do a deeper conditioning treatment alongside the touch-up today.'
        }
      />
    </div>
  ),
}

export const NoRelabel: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <DiarizedTranscriptView transcript={fullTranscript} allowRelabel={false} />
    </div>
  ),
}
