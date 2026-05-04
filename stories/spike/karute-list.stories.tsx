import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
// TODO: add app shell / sidebar when layout components ship in W4

import { KaruteListFilterBar, type KaruteListFilter } from '../../src/components/karute-list-filter-bar'
import { KaruteListPageHeader } from '../../src/components/karute-list-page-header'
import {
  KaruteListRow,
  type KaruteListRowData,
} from '../../src/components/karute-list-row'
import { Pagination } from '../../src/components/pagination'

const meta: Meta = {
  title: 'Spike/Karute List',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Mock data — adapted from synqed-karute-design-spike/src/mock/karute-list.ts
// (English variants).
// ----------------------------------------------------------------------------

type SpikeAI = 'AI要約済' | 'AI補完待ち' | 'レビュー要' | '下書き'
const aiToneMap: Record<SpikeAI, KaruteListRowData['aiStatusTone']> = {
  AI要約済: 'summarized',
  AI補完待ち: 'pending',
  レビュー要: 'review_needed',
  下書き: 'draft',
}
const aiLabelMap: Record<SpikeAI, string> = {
  AI要約済: 'AI summarized',
  AI補完待ち: 'AI pending',
  レビュー要: 'Review needed',
  下書き: 'Draft',
}

const STAFF_COLORS: Record<string, string> = {
  'Akari Sato': 'var(--color-accent)',
  'Naomi Nakamura': '#a78bfa',
}

interface SpikeKarute {
  id: string
  date: string
  dateDisplay: string
  weekday: string
  customerName: string
  customerInitials: string
  service: string
  duration: number
  entryCount: number
  aiStatus: SpikeAI
  staffName: string
  summary: string
  conversionStatus?: 'provisional' | 'declined' | 'active'
  karuteNumber?: string
}

const raw: SpikeKarute[] = [
  { id: 'k001', date: '2026-04-19', dateDisplay: 'Apr 19, 2026', weekday: 'Sun', customerName: 'Misaki Tanaka', customerInitials: 'MT', karuteNumber: '00120', service: 'Facial · Moisture Boost', duration: 60, entryCount: 5, aiStatus: 'AI要約済', staffName: 'Akari Sato', summary: 'Cheek dryness is main concern. Worsening with pollen season — moisture boost course applied. Sample of new product offered.' },
  { id: 'k002', date: '2026-04-19', dateDisplay: 'Apr 19, 2026', weekday: 'Sun', customerName: 'Aya Kobayashi', customerInitials: 'AK', karuteNumber: '00122', service: 'Aroma Treatment', duration: 75, entryCount: 4, aiStatus: 'AI要約済', staffName: 'Naomi Nakamura', summary: 'New customer. Prefers lavender-based oil, strong pressure for full-body relaxation.', conversionStatus: 'provisional' },
  { id: 'k003', date: '2026-04-19', dateDisplay: 'Apr 19, 2026', weekday: 'Sun', customerName: 'Mitsuki Yamada', customerInitials: 'MY', karuteNumber: '00110', service: 'Facial · Aging Care', duration: 60, entryCount: 3, aiStatus: 'AI補完待ち', staffName: 'Akari Sato', summary: 'Recording complete, entries pending. Eligible for May campaign, held for review.' },
  { id: 'k004', date: '2026-04-18', dateDisplay: 'Apr 18, 2026', weekday: 'Sat', customerName: 'Yuko Suzuki', customerInitials: 'YS', karuteNumber: '00116', service: 'Body Care · 90min', duration: 90, entryCount: 4, aiStatus: 'AI要約済', staffName: 'Naomi Nakamura', summary: 'Severe shoulder and neck tension. 90-min body care improved range of motion.' },
  { id: 'k005', date: '2026-04-18', dateDisplay: 'Apr 18, 2026', weekday: 'Sat', customerName: 'Reiko Saito', customerInitials: 'RS', karuteNumber: '00112', service: 'Head Spa', duration: 45, entryCount: 3, aiStatus: 'AI要約済', staffName: 'Akari Sato', summary: 'Continued head spa for headache relief. Third session — symptoms stable.' },
  { id: 'k006', date: '2026-04-18', dateDisplay: 'Apr 18, 2026', weekday: 'Sat', customerName: 'Tomomi Watanabe', customerInitials: 'TW', karuteNumber: '00119', service: 'Body Care · 60min', duration: 60, entryCount: 2, aiStatus: 'レビュー要', staffName: 'Naomi Nakamura', summary: 'AI confidence is low in places — back tension transcript needs human review.' },
  { id: 'k007', date: '2026-04-17', dateDisplay: 'Apr 17, 2026', weekday: 'Fri', customerName: 'Yumi Takahashi', customerInitials: 'YT', karuteNumber: '00123', service: 'Facial · Basic', duration: 60, entryCount: 6, aiStatus: 'AI要約済', staffName: 'Akari Sato', summary: 'Sensitive-skin facial. New customer — skin assessment performed. Recommendations recorded for next visit.', conversionStatus: 'active' },
  { id: 'k008', date: '2026-04-17', dateDisplay: 'Apr 17, 2026', weekday: 'Fri', customerName: 'Kana Kimura', customerInitials: 'KK', karuteNumber: '00105', service: 'Head Spa', duration: 45, entryCount: 2, aiStatus: 'AI要約済', staffName: 'Akari Sato', summary: 'Eye fatigue concern. Heavy PC work — added neck and shoulder approach.' },
  { id: 'k009', date: '2026-04-16', dateDisplay: 'Apr 16, 2026', weekday: 'Thu', customerName: 'Miyu Maeda', customerInitials: 'MM', karuteNumber: '00101', service: 'Facial · Premium', duration: 90, entryCount: 5, aiStatus: 'AI要約済', staffName: 'Akari Sato', summary: 'Annual pass member. Skin moisture +12% vs last visit. Maintenance plan continued.' },
  { id: 'k010', date: '2026-04-16', dateDisplay: 'Apr 16, 2026', weekday: 'Thu', customerName: 'Shiori Inoue', customerInitials: 'SI', karuteNumber: '00118', service: 'Aroma Treatment', duration: 60, entryCount: 3, aiStatus: 'AI補完待ち', staffName: 'Naomi Nakamura', summary: 'Recording present, awaiting auto-generation. Mentions hay-fever skin irritation.' },
  { id: 'k011', date: '2026-04-15', dateDisplay: 'Apr 15, 2026', weekday: 'Wed', customerName: 'Mitsuki Yamada', customerInitials: 'MY', karuteNumber: '00110', service: 'Facial · Aging Care', duration: 60, entryCount: 4, aiStatus: 'AI要約済', staffName: 'Akari Sato', summary: 'Aging-care campaign resonates. Customer signaling intent to purchase next visit.' },
  { id: 'k012', date: '2026-04-15', dateDisplay: 'Apr 15, 2026', weekday: 'Wed', customerName: 'Saya Mori', customerInitials: 'SM', karuteNumber: '00108', service: 'Body Care · 60min', duration: 60, entryCount: 3, aiStatus: 'AI要約済', staffName: 'Akari Sato', summary: 'Lower back pain has improved. Continued stretching guidance.' },
]

const items: KaruteListRowData[] = raw.map((k) => ({
  id: k.id,
  date: k.date,
  dateDisplay: k.dateDisplay,
  weekday: k.weekday,
  customerName: k.customerName,
  customerInitials: k.customerInitials,
  karuteNumber: k.karuteNumber,
  service: k.service,
  duration: k.duration,
  staffName: k.staffName,
  summary: k.summary,
  entryCount: k.entryCount,
  aiStatusTone: aiToneMap[k.aiStatus],
  aiStatusLabel: aiLabelMap[k.aiStatus],
  conversionStatus: k.conversionStatus,
  staffStripeColor: STAFF_COLORS[k.staffName] ?? 'var(--color-accent)',
}))

type FilterKey = 'all' | 'summarized' | 'pending' | 'review_needed' | 'draft'

const filters: KaruteListFilter<FilterKey>[] = [
  { key: 'all', label: 'All' },
  { key: 'summarized', label: 'AI summarized' },
  { key: 'pending', label: 'AI pending' },
  { key: 'review_needed', label: 'Needs review' },
  { key: 'draft', label: 'Draft' },
]

const PAGE_SIZE = 8

function KaruteListPage() {
  const [activeKey, setActiveKey] = useState<FilterKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const counts: Record<FilterKey, number> = {
    all: items.length,
    summarized: items.filter((i) => i.aiStatusTone === 'summarized').length,
    pending: items.filter((i) => i.aiStatusTone === 'pending').length,
    review_needed: items.filter((i) => i.aiStatusTone === 'review_needed').length,
    draft: items.filter((i) => i.aiStatusTone === 'draft').length,
  }

  const filtered = items.filter((i) => {
    if (activeKey !== 'all' && i.aiStatusTone !== activeKey) return false
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      return (
        i.customerName.toLowerCase().includes(q) ||
        i.service.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q)
      )
    }
    return true
  })

  const start = (currentPage - 1) * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <KaruteListPageHeader
        title="Karute"
        meta={`24 this month · Last 14 days · Showing ${filtered.length}`}
        ctaLabel="New karute"
        onCta={() => {}}
      />

      <KaruteListFilterBar<FilterKey>
        filters={filters}
        activeKey={activeKey}
        onChange={setActiveKey}
        counts={counts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by customer, service, summary…"
      />

      <div className="bg-[var(--color-bg-card)] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">
            No karute match this filter.
          </div>
        ) : (
          paginated.map((item) => <KaruteListRow key={item.id} item={item} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
      />
    </main>
  )
}

export const Default: Story = {
  render: () => <KaruteListPage />,
}

export const Empty: Story = {
  render: () => (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <KaruteListPageHeader
        title="Karute"
        meta="0 this month"
        ctaLabel="New karute"
        onCta={() => {}}
      />
      <div className="bg-[var(--color-bg-card)] ring-1 ring-black/5 rounded-xl px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">
        No karute yet. Create your first session record to start.
      </div>
    </main>
  ),
}
