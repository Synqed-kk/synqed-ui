import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
// TODO: add app shell / sidebar when layout components ship in W4

import { CustomerDeletionBanner } from '../../src/components/customer-deletion-banner'
import { CustomerRow } from '../../src/components/customer-row'
import { CustomersFilterBar, type CustomersFilter } from '../../src/components/customers-filter-bar'
import { CustomersListSkeleton } from '../../src/components/customers-list-skeleton'
import { CustomersPageHeader } from '../../src/components/customers-page-header'
import { ErrorState } from '../../src/components/error-state'
import { Pagination } from '../../src/components/pagination'

import { customerRows, customerCounts } from '../_mocks/customers'

const meta: Meta = {
  title: 'Spike/Customers List',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

type FilterKey =
  | 'all'
  | 'new'
  | 'on_track'
  | 'needs_followup'
  | 'dormant_risk'
  | 'pending_deletion'

const filters: CustomersFilter<FilterKey>[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'on_track', label: 'On track' },
  { key: 'needs_followup', label: 'Follow-up' },
  { key: 'dormant_risk', label: 'Dormant risk' },
  { key: 'pending_deletion', label: 'Pending deletion', warning: true },
]

const PAGE_SIZE = 8

function CustomersPage() {
  const [activeKey, setActiveKey] = useState<FilterKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = customerRows.filter((c) => {
    if (activeKey !== 'all') {
      if (activeKey === 'new' && c.signalTone !== 'new') return false
      if (activeKey === 'on_track' && c.signalTone !== 'on_track') return false
      if (activeKey === 'needs_followup' && c.signalTone !== 'needs_followup')
        return false
      if (activeKey === 'dormant_risk' && c.signalTone !== 'dormant_risk') return false
      if (activeKey === 'pending_deletion' && !c.pendingDeletion) return false
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      return (
        c.name.toLowerCase().includes(q) ||
        c.staffName.toLowerCase().includes(q) ||
        String(c.age).includes(q)
      )
    }
    return true
  })

  const start = (currentPage - 1) * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <CustomersPageHeader
        title="Customers"
        meta={`Registered ${customerRows.length} · Showing ${filtered.length}`}
        ctaLabel="New customer"
        onCta={() => {}}
      />

      <CustomersFilterBar<FilterKey>
        filters={filters}
        activeKey={activeKey}
        onChange={setActiveKey}
        counts={customerCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, staff, age…"
      />

      <div className="bg-[var(--color-bg-card)] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-xl overflow-hidden">
        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-[var(--color-bg-muted)] border-b border-[var(--color-border)] text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          <div className="size-9 shrink-0" aria-hidden />
          <div className="flex-1 min-w-0">Customer</div>
          <div className="shrink-0 w-[100px]">Visits</div>
          <div className="shrink-0 w-[120px]">Last visit</div>
          <div className="shrink-0 w-[100px]">AI predict</div>
          <div className="shrink-0 w-[90px]">Status</div>
          <div className="shrink-0 w-[120px]">Staff</div>
          <div className="shrink-0 w-[52px] text-right">Total</div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">
            No customers match this filter.
          </div>
        ) : (
          paginated.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} />
          ))
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
  render: () => <CustomersPage />,
}

export const WithDeletionBanner: Story = {
  render: () => (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <CustomersPageHeader
        title="Customers"
        meta={`Registered ${customerRows.length} · Showing ${customerRows.length}`}
        ctaLabel="New customer"
        onCta={() => {}}
      />

      <div className="mb-4">
        <CustomerDeletionBanner
          title="2 customers pending deletion"
          body="These customers will be permanently deleted in 5 days unless undone."
          undoLabel="Undo deletion"
          daysRemaining={5}
          onUndo={() => {}}
        />
      </div>

      <div className="bg-[var(--color-bg-card)] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-xl overflow-hidden">
        {customerRows.slice(0, 6).map((customer, i) => (
          <CustomerRow
            key={customer.id}
            customer={
              i < 2
                ? { ...customer, pendingDeletion: { daysRemaining: 5 } }
                : customer
            }
          />
        ))}
      </div>
    </main>
  ),
}

export const Loading: Story = {
  render: () => (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <CustomersPageHeader
        title="Customers"
        meta="Loading…"
        ctaLabel="New customer"
        onCta={() => {}}
      />
      <CustomersListSkeleton />
    </main>
  ),
}

export const Error: Story = {
  render: () => (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <CustomersPageHeader
        title="Customers"
        ctaLabel="New customer"
        onCta={() => {}}
      />
      <ErrorState
        error={{ message: "Couldn't load customers." }}
        onRetry={() => {}}
      />
    </main>
  ),
}

export const Empty: Story = {
  render: () => (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1400px] mx-auto">
      <CustomersPageHeader
        title="Customers"
        meta="Registered 0"
        ctaLabel="New customer"
        onCta={() => {}}
      />
      <CustomersFilterBar<FilterKey>
        filters={filters}
        activeKey="all"
        onChange={() => {}}
        counts={{
          all: 0,
          new: 0,
          on_track: 0,
          needs_followup: 0,
          dormant_risk: 0,
          pending_deletion: 0,
        }}
        searchQuery=""
        onSearchChange={() => {}}
        searchPlaceholder="Search…"
      />
      <div className="bg-[var(--color-bg-card)] ring-1 ring-black/5 rounded-xl px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">
        No customers yet. Add your first customer to start.
      </div>
    </main>
  ),
}
