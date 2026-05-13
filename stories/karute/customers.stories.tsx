import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

// Karute/Customers — recomposes karute's /[locale]/(app)/customers/page.tsx
// using lifted synqed-ui components.
//
// Mirrors:
//   - app/[locale]/(app)/customers/page.tsx (server)
//   - components/customers/CustomerCards.tsx (3-col grid of card-tiles, NOT rows)
//   - components/customers/CustomerSearch.tsx (small search input, no chips)
//   - components/customers/CustomerFilters.tsx (Staff dropdown, Sort dropdown,
//     Type pill toggle: All / Nominated / Walk-in)
//   - components/customers/Pagination.tsx
//
// Spike/Customers differs significantly: spike uses CustomerRow (full-width
// horizontal rows with visit chain, signal chip, predicted next visit, staff
// stripe color) and CustomersFilterBar (segmented chip bar with counts). Karute
// today renders compact 3-column avatar+name cards with phone/email and a
// delete-on-hover trash icon.

import { Button } from '../../src/components/button'
import { Input } from '../../src/components/input'
import { Pagination } from '../../src/components/pagination'

const meta: Meta = {
  title: 'Karute/Customers',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

// Karute's Customer shape (from src/types/database.ts) — only the fields
// CustomerCards actually reads.
interface KaruteCustomer {
  id: string
  name: string
  phone: string | null
  email: string | null
  created_at: string
  tags?: string[]
}

const customers: KaruteCustomer[] = [
  { id: 'c1', name: 'Misaki Tanaka', phone: '090-2134-5678', email: 'misaki.tanaka@example.com', created_at: '2026-02-10', tags: ['VIP'] },
  { id: 'c2', name: 'Yuko Suzuki', phone: '080-3245-6789', email: 'yuko.suzuki@example.co.jp', created_at: '2025-08-03' },
  { id: 'c3', name: 'Reiko Saito', phone: '090-4356-7890', email: 'reiko.s@example.com', created_at: '2025-05-17' },
  { id: 'c4', name: 'Yumi Takahashi', phone: '070-5467-8901', email: null, created_at: '2026-04-03', tags: ['New'] },
  { id: 'c5', name: 'Mitsuki Yamada', phone: '090-6578-9012', email: 'mitsuki.yamada@example.com', created_at: '2025-03-12' },
  { id: 'c6', name: 'Aya Kobayashi', phone: '080-7689-0123', email: 'aya.k@example.jp', created_at: '2026-03-28', tags: ['New'] },
  { id: 'c7', name: 'Tomomi Watanabe', phone: '090-8790-1234', email: 'tomomi.watanabe@example.com', created_at: '2025-11-02' },
  { id: 'c8', name: 'Kana Kimura', phone: '03-3456-7890', email: 'kana.kimura@example.co.jp', created_at: '2024-09-08' },
  { id: 'c9', name: 'Mizuho Kato', phone: '080-2122-3344', email: null, created_at: '2025-07-21' },
  { id: 'c10', name: 'Ai Matsumoto', phone: null, email: 'ai.matsumoto@example.jp', created_at: '2025-02-18' },
  { id: 'c11', name: 'Rina Shimizu', phone: '090-6566-7788', email: 'rina.shimizu@example.co.jp', created_at: '2024-11-30' },
  { id: 'c12', name: 'Saya Mori', phone: '090-8788-9900', email: null, created_at: '2025-01-20' },
]

function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '?'
}
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ----------------------------------------------------------------------------
// Inline icons
// ----------------------------------------------------------------------------
function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
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
function StaffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

// ----------------------------------------------------------------------------
// Card (mirrors components/customers/CustomerCards.tsx)
// ----------------------------------------------------------------------------
//
// NOTE: synqed-ui's CustomerRow is a full-width row with visit chain + signal
// chip + predicted-next-visit and staff stripe — much richer than karute's
// current card. To honestly reflect karute's UI, we render a compact card
// inline. (Where synqed-ui has Avatar/Badge/Card primitives, those map to
// pieces of this composition.)

function KaruteCustomerCard({ c }: { c: KaruteCustomer }) {
  return (
    <div className="group rounded-xl border border-border/30 bg-card hover:bg-muted/30 transition-all hover:shadow-md p-4 flex items-start gap-3 cursor-pointer">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {getInitials(c.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
            {c.name}
          </p>
          {c.tags?.map((tag) => (
            <span key={tag} className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        {c.phone && <p className="text-xs text-muted-foreground mt-0.5">{c.phone}</p>}
        {c.email && <p className="text-xs text-muted-foreground truncate">{c.email}</p>}
        <p className="text-[10px] text-muted-foreground/60 mt-1.5">Added {formatDate(c.created_at)}</p>
      </div>
      <button
        type="button"
        className="shrink-0 p-1.5 rounded-md text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-red-500 hover:!bg-red-500/10 transition-all"
        aria-label="Delete"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

// ----------------------------------------------------------------------------
// Page composition
// ----------------------------------------------------------------------------

function KaruteCustomersPage() {
  const [page, setPage] = useState(1)
  const totalCount = customers.length
  const totalItems = 84 // pretend total across pages

  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="space-y-4">
        {/* Header — title + count + "New customer" CTA (karute opens a sheet) */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{totalItems} customers</p>
          </div>
          {/* Karute renders <CustomerSheet /> here — opens a side sheet with a
              create form. synqed-ui has NewCustomerDialog (modal); not the same
              UX. Using a Button placeholder. */}
          <Button>New customer</Button>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative max-w-sm">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              <SearchIcon />
            </span>
            <Input className="pl-9" type="search" placeholder="Search customers" />
          </div>

          {/* Karute filter bar: Staff dropdown + Sort dropdown + 3-pill type toggle.
              synqed-ui has CustomersFilterBar (segmented chips with counts) but
              that's the spike's design — not what karute uses today. Inlining
              karute's actual select-based controls. */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5">
              <StaffIcon />
              <select className="bg-transparent text-sm text-foreground focus:outline-none appearance-none cursor-pointer pr-4">
                <option>All staff</option>
                <option>Akari Sato</option>
                <option>Naomi Nakamura</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5">
              <CalendarIcon />
              <select className="bg-transparent text-sm text-foreground focus:outline-none appearance-none cursor-pointer pr-4">
                <option>Recent</option>
                <option>Name</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className="flex items-center">
              {['All', 'Nominated', 'Walk-in'].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  className={`px-3 py-1.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg border ${
                    i === 0
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-background text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card grid — 1/2/3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c) => (
            <KaruteCustomerCard key={c.id} c={c} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalItems={totalItems}
          pageSize={12}
        />

        <p className="text-xs text-muted-foreground/60 text-center">
          Showing {totalCount} of {totalItems} customers
        </p>
      </div>
    </main>
  )
}

export const Default: Story = {
  render: () => <KaruteCustomersPage />,
}
