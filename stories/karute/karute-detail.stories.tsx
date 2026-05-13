import type { Meta, StoryObj } from '@storybook/react'

// Karute/KaruteDetail — recomposes karute's
// /[locale]/(app)/karute/[id]/page.tsx using lifted synqed-ui components.
//
// Mirrors components/karute/KaruteDetailView.tsx:
//   - KaruteHeader: thin row with Customer / Date / Staff label-value pairs and
//     a small delete icon on the right.
//   - AIAdvice block (prominent at top).
//   - ExportButtons row.
//   - Two-column layout: left = entries grouped by category (with Add Entry
//     form on top); right = AI summary card + collapsible transcript.
//
// Spike uses KaruteBreadcrumb + AISummaryCard + SessionEntryTimeline +
// TranscriptCollapse with a structured single-page composition. Karute's
// layout is closer to a 2-column dashboard; the categories on the left are
// simple grouped lists (not the spike's timeline tone-coded rows).

import { Button } from '../../src/components/button'
import { TranscriptCollapse } from '../../src/components/transcript-collapse'
import { AISummaryCard } from '../../src/components/ai-summary-card'

const meta: Meta = {
  title: 'Karute/KaruteDetail',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

const karute = {
  id: 'k1',
  customerName: 'Misaki Tanaka',
  staffName: 'Akari Sato',
  sessionDate: '2026-04-19',
  summary:
    'Cheek dryness is the main concern. Worsening with pollen season — moisture boost course applied. Customer noted improvement after last visit.',
  transcript:
    'Welcome back. How is your skin feeling today?\nA bit dry on the cheeks again — pollen season is rough.\nLet\'s do the moisture boost course again, with extra hyaluronic.\nThat sounds great. Should I keep using the unscented cleanser?\nYes — keep that, and consider an SPF 30+ daily through May.',
  entries: [
    { id: 'e1', category: 'Symptom', content: 'Cheek dryness', source_quote: '"a bit dry on the cheeks again"', confidence_score: 0.92, is_manual: false, created_at: '2026-04-19' },
    { id: 'e2', category: 'Treatment', content: 'Moisture boost facial', source_quote: '"do the moisture boost course again"', confidence_score: 0.95, is_manual: false, created_at: '2026-04-19' },
    { id: 'e3', category: 'Treatment', content: 'Extra hyaluronic application', source_quote: null, confidence_score: 0.83, is_manual: false, created_at: '2026-04-19' },
    { id: 'e4', category: 'Product', content: 'Continue unscented cleanser', source_quote: null, confidence_score: 0.78, is_manual: false, created_at: '2026-04-19' },
    { id: 'e5', category: 'Product', content: 'Recommend SPF 30+ daily', source_quote: '"consider an SPF 30+ daily through May"', confidence_score: 0.85, is_manual: false, created_at: '2026-04-19' },
    { id: 'e6', category: 'Next visit', content: 'Re-evaluate moisture in 4 weeks', source_quote: null, confidence_score: 0.7, is_manual: true, created_at: '2026-04-19' },
  ],
}

const grouped = karute.entries.reduce<Record<string, typeof karute.entries>>((acc, entry) => {
  const cat = entry.category || 'Other'
  if (!acc[cat]) acc[cat] = []
  acc[cat].push(entry)
  return acc
}, {})

const categoryOrder = Object.keys(grouped).sort()

function TrashIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

// ----------------------------------------------------------------------------
// KaruteHeader (mirrors components/karute/KaruteHeader.tsx)
//
// Note: synqed-ui has KaruteBreadcrumb (used by spike) but karute today doesn't
// use breadcrumbs — it uses a simple label/value header row. Inlined here.
// ----------------------------------------------------------------------------
function KaruteHeader() {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-border pb-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Customer</p>
        <p className="text-lg font-semibold text-foreground">{karute.customerName}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Date</p>
        <p className="text-sm text-foreground">{new Date(karute.sessionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Staff</p>
        <p className="text-sm text-foreground">{karute.staffName}</p>
      </div>
      <div className="ml-auto">
        <button
          type="button"
          className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
          aria-label="Delete karute"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// Entry card (mirrors components/karute/EntryCard.tsx — compact)
// ----------------------------------------------------------------------------
function EntryCard({ entry }: { entry: typeof karute.entries[number] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-foreground flex-1">{entry.content}</p>
        {entry.is_manual && (
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 shrink-0">Manual</span>
        )}
      </div>
      {entry.source_quote && (
        <p className="text-xs text-muted-foreground italic mt-1.5">{entry.source_quote}</p>
      )}
      {entry.confidence_score !== null && !entry.is_manual && (
        <p className="text-[10px] text-muted-foreground/60 mt-1">
          Confidence {Math.round((entry.confidence_score ?? 0) * 100)}%
        </p>
      )}
    </div>
  )
}

function KaruteDetailPage() {
  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="space-y-6">
        <KaruteHeader />

        {/* AI Advice — prominent at top.
            Karute uses a custom AIAdvice component. synqed-ui has AISummaryCard
            (different shape). Stubbing as a styled card. */}
        <div className="rounded-2xl border border-border/30 bg-gradient-to-r from-amber-500/5 to-transparent p-6">
          <h3 className="text-sm font-semibold mb-3">Advice for next visit</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Continue moisture-boost course; pair with light hyaluronic mask
            between visits. Reinforce SPF habits through pollen season.
          </p>
        </div>

        {/* Export buttons — small horizontal row */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export PDF</Button>
          <Button variant="outline" size="sm">Export Markdown</Button>
          <Button variant="outline" size="sm">Copy summary</Button>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: entries grouped by category */}
          <div className="space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Entries</h2>

            {/* Karute renders <AddEntryForm /> here. No synqed-ui equivalent
                for "add manual entry to karute" inline form. */}
            <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3">
              <p className="text-sm text-muted-foreground">+ Add manual entry…</p>
            </div>

            {categoryOrder.map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                  {category}
                </h3>
                {grouped[category].map((e) => (
                  <EntryCard key={e.id} entry={e} />
                ))}
              </div>
            ))}
          </div>

          {/* Right: AI summary + collapsible transcript */}
          <div className="space-y-4">
            {/* synqed-ui's AISummaryCard takes a bullet array; karute's summary
                is a single paragraph. Splitting on sentences for parity. */}
            <AISummaryCard
              title="AI summary"
              sessionDate={karute.sessionDate}
              summary={karute.summary.split(/\.\s+/).filter(Boolean).map((s) => s.endsWith('.') ? s : `${s}.`)}
            />

            <TranscriptCollapse
              consent
              consentDate={karute.sessionDate}
              durationLabel="42:18"
              defaultOpen={false}
              content={karute.transcript}
              onPlay={() => {}}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export const Default: Story = { render: () => <KaruteDetailPage /> }
