import type { Meta, StoryObj } from '@storybook/react'
// TODO: add app shell / sidebar when layout components ship in W4

import { AIBodyPredictionCard } from '../../src/components/ai-body-prediction-card'
import { AIOutreachCard } from '../../src/components/ai-outreach-card'
import { AISummaryCard } from '../../src/components/ai-summary-card'
import { CustomerHeaderCard } from '../../src/components/customer-header-card'
import {
  CustomerMemoryCard,
  type CustomerMemoryData,
} from '../../src/components/customer-memory-card'
import { EntryComposer } from '../../src/components/entry-composer'
import { KaruteBreadcrumb } from '../../src/components/karute-breadcrumb'
import {
  SessionEntryTimeline,
} from '../../src/components/session-entry-timeline'
import type { SessionEntryRowData, SessionEntryTone } from '../../src/components/session-entry-row'
import { TranscriptCollapse } from '../../src/components/transcript-collapse'

const meta: Meta = {
  title: 'Spike/Karute (Current Session)',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Mock data adapted from synqed-karute-design-spike/src/mock/karute-detail.ts
// (English variant, customer = Misaki Tanaka).
// ----------------------------------------------------------------------------

const customer = {
  name: 'Misaki Tanaka',
  age: 32,
  gender: 'Female',
  initials: 'MT',
  visitCount: 3,
  lastVisitDate: 'Mar 22, 2026',
  lastVisitDaysAgo: 28,
  phone: '090-2134-5678',
  email: 'misaki.tanaka@example.com',
  karuteNumber: '00120',
}

const staffName = 'Akari Sato'
const session = {
  dateFormatted: 'Apr 19, 2026',
  service: 'Facial · Moisture Boost Course',
  duration: 60,
}

type SpikeCategory = '施術' | '相談' | '体調' | '商品提案' | '次回'
const categoryLabel: Record<SpikeCategory, string> = {
  施術: 'Treatment',
  相談: 'Concern',
  体調: 'Condition',
  商品提案: 'Recommendation',
  次回: 'Next visit',
}
const categoryTone: Record<SpikeCategory, SessionEntryTone> = {
  施術: 'treatment',
  相談: 'concern',
  体調: 'condition',
  商品提案: 'product',
  次回: 'next',
}

const rawEntries: { id: string; category: SpikeCategory; time: string; content: string }[] = [
  { id: 'e1', category: '施術', time: '14:00', content: 'Facial · Moisture Boost Course (60 min) performed. Light shoulder work at the end.' },
  { id: 'e2', category: '相談', time: '14:35', content: 'Customer concerned about cheek dryness. Noticed worsening since pollen season started.' },
  { id: 'e3', category: '体調', time: '14:40', content: 'Previous shoulder tension concern has improved. Maintenance menu is sufficient today.' },
  { id: 'e4', category: '商品提案', time: '14:55', content: "Provided sample of new moisturizer 'MoistShield.' Positive response as pollen-season care." },
  { id: 'e5', category: '次回', time: '15:00', content: 'Customer wants to book mid-May. Suggested weekday evening after Golden Week.' },
]

const entries: SessionEntryRowData[] = rawEntries.map((e) => ({
  id: e.id,
  time: e.time,
  content: e.content,
  categoryLabel: categoryLabel[e.category],
  categoryTone: categoryTone[e.category],
}))

const aiSummary = [
  'Main concern: cheek dryness. Trending worse with pollen season.',
  "Previous shoulder tension has improved — today's focus is maintenance.",
  'Sample of new moisturizer provided — positive response.',
  'Next visit requested for mid-May, weekday evening after Golden Week.',
]

const transcript = {
  consent: true,
  consentDate: 'Feb 10, 2026',
  durationLabel: '58 min 14 sec',
  content:
    "(14:02) Sato: Thanks for coming in again today. How's the shoulder tension from last time?\n(14:02) Ms. Tanaka: Much better, thank you. Lately though, I'm noticing cheek dryness...\n(14:05) Sato: Has it been since pollen season started?\n(14:05) Ms. Tanaka: Yes, since late March my skin's been a bit tingly...\n(14:08) Sato: Let's do a strong moisture course today then. Would you like a facial massage too?\n(14:08) Ms. Tanaka: Yes please.",
}

const memory: CustomerMemoryData = {
  customerId: 'c1',
  updatedThisVisit: 2,
  lastUpdatedDisplay: 'Mar 22, 2026',
  intake: {
    firstVisitDate: 'Feb 10, 2026',
    occupation: 'Sedentary work — IT engineer',
    goalLabel: 'Maintenance',
  },
  items: [
    {
      id: 'm-1',
      category: 'personal',
      label: 'Dog "Rug" — 3-year-old Shiba',
      detail: 'Adopted from a shelter. Has pollen allergy.',
      sourceSessionDate: 'Feb 10, 2026',
      source: 'ai_extraction',
      confidence: 0.92,
      pinned: true,
      suggestTalkingPoint: true,
    },
    {
      id: 'm-2',
      category: 'body',
      label: 'Cheek dryness (worse during pollen season)',
      sourceSessionDate: 'Mar 22, 2026',
      source: 'ai_extraction',
      confidence: 0.95,
      pinned: true,
    },
    {
      id: 'm-3',
      category: 'preference',
      label: 'Prefers gentle pressure',
      source: 'staff',
      confidence: 1,
      pinned: true,
    },
  ],
}

// Naive demo categorizer for EntryComposer.
function categorize(text: string) {
  const t = text.trim()
  if (t.length < 4) return null
  const lower = t.toLowerCase()
  if (lower.includes('product') || lower.includes('sample')) {
    return { category: 'Recommendation', confidence: 0.84 }
  }
  if (lower.includes('next') || lower.includes('book')) {
    return { category: 'Next visit', confidence: 0.78 }
  }
  if (lower.includes('dry') || lower.includes('tension') || lower.includes('pain')) {
    return { category: 'Concern', confidence: 0.82 }
  }
  return { category: 'Treatment', confidence: 0.7 }
}

function KarutePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-page)]">
      <KaruteBreadcrumb
        customerName={customer.name}
        sessionDate={session.dateFormatted}
        karuteNumber={customer.karuteNumber}
        onPdfExport={() => {}}
        onShare={() => {}}
      />

      <div className="max-w-[1280px] mx-auto pb-10 px-4 md:px-6 pt-5 space-y-5">
        <CustomerHeaderCard
          name={customer.name}
          initials={customer.initials}
          age={customer.age}
          gender={customer.gender}
          visitCount={customer.visitCount}
          lastVisitDate={customer.lastVisitDate}
          lastVisitDaysAgo={customer.lastVisitDaysAgo}
          staffName={staffName}
          service={session.service}
          sessionDate={session.dateFormatted}
          karuteNumber={customer.karuteNumber}
          phone={customer.phone}
          email={customer.email}
          recordingConsent={{ granted: true, tooltip: 'Consent: Feb 10, 2026' }}
          onEdit={() => {}}
        />

        <CustomerMemoryCard memory={memory} customerName={customer.name} onAdd={() => {}} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AIBodyPredictionCard
            headline="Cheek dryness risk is elevated due to the spring pollen season"
            confidence={0.82}
            trendValue="Improving"
            recommendedVisit={{ window: 'Mid-May', weeksOut: '3-4 weeks out' }}
            rationale={[
              'Based on past 3 visits, next visit ~4 weeks out is optimal',
              'Pollen-season session history shows frequent dryness worsening',
              'Skin moisture improved vs last visit — maintenance timing',
            ]}
          />
          <AIOutreachCard
            channel="LINE"
            subscript={`${customer.name} · scheduled via LINE`}
            preview="How did your skin feel after your last visit? Spring pollen season tends to change skin condition — about the cheek dryness you mentioned last time..."
            onEdit={() => {}}
            onSend={() => {}}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
            <SessionEntryTimeline
              title="Session entries"
              sessionDate={session.dateFormatted}
              entries={entries}
            />
            <EntryComposer categorize={categorize} onAdd={() => {}} />
          </div>
          <div className="space-y-4">
            <AISummaryCard
              title="AI summary"
              summary={aiSummary}
              sessionDate={session.dateFormatted}
            />
            <TranscriptCollapse
              consent={transcript.consent}
              consentDate={transcript.consentDate}
              durationLabel={transcript.durationLabel}
              content={transcript.content}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export const Default: Story = {
  render: () => <KarutePage />,
}

export const TranscriptOpen: Story = {
  render: () => (
    <main className="min-h-screen bg-[var(--color-bg-page)]">
      <KaruteBreadcrumb
        customerName={customer.name}
        sessionDate={session.dateFormatted}
        karuteNumber={customer.karuteNumber}
      />
      <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-5 pb-10">
        <TranscriptCollapse
          defaultOpen
          consent={transcript.consent}
          consentDate={transcript.consentDate}
          durationLabel={transcript.durationLabel}
          content={transcript.content}
        />
      </div>
    </main>
  ),
}
