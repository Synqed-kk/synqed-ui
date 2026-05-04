import type { Meta, StoryObj } from '@storybook/react'

// Karute/KaruteList — recomposes karute's /[locale]/(app)/karute/page.tsx.
//
// Mirrors:
//   - app/[locale]/(app)/karute/page.tsx — server-side query for all karute
//     records, ordered by created_at desc.
//   - components/karute/KaruteListItem.tsx — single row per karute record:
//     customer name (title), summary preview (truncated to 80 chars), date
//     and entry-count on the right, hover trash.
//
// Karute's list is sparse compared to spike. It has:
//   - A plain title "Karute" with no count, no filters, no search.
//   - A vertical stack of compact rows (no signal chips, no AI status, no
//     conversion status, no service/duration columns, no staff stripe).
//
// Spike/KaruteList renders KaruteListPageHeader + KaruteListFilterBar +
// KaruteListRow with a much richer row layout. The gap is significant.

import { Button } from '../../src/components/button'

const meta: Meta = {
  title: 'Karute/KaruteList',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

interface KaruteListItem {
  id: string
  customerName: string
  createdAt: string
  entryCount: number
  summary: string | null
}

const items: KaruteListItem[] = [
  { id: 'k1', customerName: 'Misaki Tanaka', createdAt: '2026-04-19', entryCount: 5, summary: 'Cheek dryness is main concern. Worsening with pollen season — moisture boost course applied.' },
  { id: 'k2', customerName: 'Yuko Suzuki', createdAt: '2026-04-18', entryCount: 4, summary: 'Severe shoulder and neck tension. 90-min body care improved range of motion.' },
  { id: 'k3', customerName: 'Reiko Saito', createdAt: '2026-04-18', entryCount: 3, summary: 'Continued head spa treatment for headache relief. Third session — symptoms stable.' },
  { id: 'k4', customerName: 'Yumi Takahashi', createdAt: '2026-04-17', entryCount: 6, summary: 'Sensitive-skin facial. New customer — skin assessment performed.' },
  { id: 'k5', customerName: 'Mitsuki Yamada', createdAt: '2026-04-15', entryCount: 4, summary: 'Aging care focus. Shows interest in May campaign products.' },
  { id: 'k6', customerName: 'Aya Kobayashi', createdAt: '2026-03-28', entryCount: 2, summary: 'First aroma treatment. Stress relief reported.' },
  { id: 'k7', customerName: 'Kana Kimura', createdAt: '2026-04-12', entryCount: 5, summary: 'Routine head spa. Feedback positive on staff change.' },
  { id: 'k8', customerName: 'Tomomi Watanabe', createdAt: '2026-03-10', entryCount: 4, summary: '90-min body care. Customer reported sleep improvements after session.' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function TrashIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

// ----------------------------------------------------------------------------
// KaruteListItem (mirrors components/karute/KaruteListItem.tsx)
//
// NOTE: synqed-ui's KaruteListRow has many fields karute doesn't capture
// (service, duration, staffName, aiStatusTone, conversionStatus). Inlining a
// compact row to honestly reflect karute's sparse list.
// ----------------------------------------------------------------------------
function KaruteListRow({ item }: { item: KaruteListItem }) {
  const summaryPreview = item.summary && item.summary.length > 80 ? item.summary.slice(0, 80) + '…' : item.summary ?? ''
  return (
    <div className="group block rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/50 cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground">{item.customerName}</p>
          {summaryPreview && (
            <p className="mt-0.5 truncate text-sm text-muted-foreground">{summaryPreview}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm text-muted-foreground">{formatDate(item.createdAt)}</span>
            <span className="text-xs text-muted-foreground">{item.entryCount} entries</span>
          </div>
          <button
            type="button"
            className="shrink-0 p-1.5 rounded-md text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-red-500 hover:!bg-red-500/10 transition-all"
            aria-label="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

function KaruteListPage() {
  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="space-y-4">
        {/* Header — karute today is just a title (no count, no filters, no CTA).
            Spike renders KaruteListPageHeader + KaruteListFilterBar here. Gap. */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Karute</h1>
          {/* Karute does NOT have a "New karute" CTA on this page (you create
              karute from a recording). Adding a hint button to mirror the
              empty space — comment out if even more honest. */}
          <Button variant="ghost" size="sm" className="opacity-60" disabled>
            New karute (from recording)
          </Button>
        </div>

        {/* Records list */}
        {items.length === 0 ? (
          <div className="rounded-lg border border-border py-12 text-center text-sm text-muted-foreground">
            No karute records yet
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <KaruteListRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export const Default: Story = { render: () => <KaruteListPage /> }
