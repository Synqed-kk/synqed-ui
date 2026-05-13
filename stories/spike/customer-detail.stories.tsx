import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Brain, ChevronLeft, ClipboardList, Images, ShieldCheck } from 'lucide-react'
// TODO: add app shell / sidebar when layout components ship in W4

import {
  CustomerMemoryCard,
  type CustomerMemoryData,
} from '../../src/components/customer-memory-card'
import { CustomerPrivacyPanel } from '../../src/components/customer-privacy-panel'
import { CustomerProfileIdentity } from '../../src/components/customer-profile-identity'
import {
  CustomerSessionHistory,
  type SessionHistoryItem,
} from '../../src/components/customer-session-history'
import { CustomerDeletionBanner } from '../../src/components/customer-deletion-banner'
import { VisitHistoryChain } from '../../src/components/visit-history-chain'
import { customerRows } from '../_mocks/customers'

const meta: Meta = {
  title: 'Spike/Customer Detail',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Mock data — adapted from synqed-karute-design-spike's customer-memory.ts
// (c1 田中 美咲 / Misaki Tanaka) and customers.ts.
// ----------------------------------------------------------------------------

const customer = customerRows[0]!  // Misaki Tanaka

const memory: CustomerMemoryData = {
  customerId: customer.id,
  updatedThisVisit: 2,
  lastUpdatedDisplay: 'Mar 22, 2026',
  intake: {
    firstVisitDate: 'Feb 10, 2026',
    occupation: 'Sedentary work — IT engineer (mostly remote)',
    goalLabel: 'Maintenance',
    heardFromLabel: 'Instagram',
  },
  items: [
    {
      id: 'm-1',
      category: 'personal',
      label: 'Dog "Rug" — 3-year-old Shiba',
      detail:
        'Adopted last year from a shelter. Has pollen allergy. Walked 1 hr morning + evening.',
      sourceSessionDate: 'Feb 10, 2026',
      source: 'ai_extraction',
      confidence: 0.92,
      pinned: true,
      suggestTalkingPoint: true,
    },
    {
      id: 'm-2',
      category: 'personal',
      label: 'Lives with husband',
      detail: 'Husband works in finance, often comes home late.',
      sourceSessionDate: 'Feb 10, 2026',
      source: 'ai_extraction',
      confidence: 0.85,
      pinned: false,
    },
    {
      id: 'm-3',
      category: 'personal',
      label: 'Recent Kyoto trip',
      detail: 'Family trip to Arashiyama — loved the bamboo grove.',
      sourceSessionDate: 'Mar 22, 2026',
      source: 'ai_extraction',
      confidence: 0.88,
      pinned: false,
      suggestTalkingPoint: true,
    },
    {
      id: 'm-4',
      category: 'body',
      label: 'Cheek dryness (worse during pollen season)',
      detail: 'Symptoms worsened from late March, with tingling sensation.',
      sourceSessionDate: 'Mar 22, 2026',
      source: 'ai_extraction',
      confidence: 0.95,
      pinned: true,
    },
    {
      id: 'm-5',
      category: 'body',
      label: 'Long-desk shoulder tension',
      detail:
        'Almost all day in seated remote-work posture. Chief complaint in February — improving now.',
      sourceSessionDate: 'Feb 10, 2026',
      source: 'ai_extraction',
      confidence: 0.9,
      pinned: false,
    },
    {
      id: 'm-6',
      category: 'preference',
      label: 'Prefers gentle pressure',
      detail: 'Confirmed during first session.',
      sourceSessionDate: 'Feb 10, 2026',
      source: 'staff',
      confidence: 1,
      pinned: true,
    },
    {
      id: 'm-7',
      category: 'goal',
      label: 'Maintenance — keep skin clear before summer',
      sourceSessionDate: 'Feb 10, 2026',
      source: 'intake_form',
      confidence: 1,
      pinned: false,
    },
  ],
}

const sessions: SessionHistoryItem[] = [
  {
    id: 's-3',
    dateDisplay: 'Mar 22, 2026',
    weekday: 'Sun',
    service: 'Facial · Moisture Boost',
    duration: 60,
    staffName: 'Akari Sato',
    summary:
      'Cheek dryness has worsened with pollen season — moisture boost course applied. Customer reports tingling on cheeks early evenings.',
    entryCount: 5,
    takeaways: [
      'Recommend follow-up moisture mask within 2 weeks',
      'Suggested booking before May campaign starts',
    ],
    entriesByCategory: {
      concern: ['Cheek dryness', 'Tingling sensation'],
      condition: ['Mild redness around T-zone'],
      treatment: ['Moisture-boost facial', 'Gentle exfoliation'],
      product: ['Recommended ceramide cream'],
      next: ['Follow-up in 2–3 weeks'],
    },
    memoryExtractedCount: 2,
    aiStatusTone: 'summarized',
    aiStatusLabel: 'AI summarized',
    conversionStatus: 'active',
    isLatest: true,
  },
  {
    id: 's-2',
    dateDisplay: 'Feb 28, 2026',
    weekday: 'Sat',
    service: 'Facial · Basic',
    duration: 60,
    staffName: 'Akari Sato',
    summary: 'Routine facial. No new concerns; talked about new puppy training.',
    entryCount: 4,
    takeaways: ['Customer mentioned upcoming Kyoto trip'],
    entriesByCategory: {
      concern: ['Mild dryness'],
      treatment: ['Basic facial'],
      next: ['Continue monthly cadence'],
    },
    memoryExtractedCount: 1,
    aiStatusTone: 'summarized',
    aiStatusLabel: 'AI summarized',
    conversionStatus: 'active',
  },
  {
    id: 's-1',
    dateDisplay: 'Feb 10, 2026',
    weekday: 'Tue',
    service: 'First-visit consult + Facial',
    duration: 90,
    staffName: 'Akari Sato',
    summary:
      'First visit — full intake captured. Concerns: shoulder tension, occasional cheek dryness. Goal: maintenance.',
    entryCount: 6,
    takeaways: [
      'Captured full intake',
      'Customer prefers gentle pressure',
    ],
    entriesByCategory: {
      concern: ['Shoulder tension', 'Cheek dryness'],
      condition: ['Forward shoulder posture'],
      treatment: ['Light facial', 'Shoulder release'],
      next: ['Trial monthly cadence'],
    },
    memoryExtractedCount: 4,
    aiStatusTone: 'summarized',
    aiStatusLabel: 'AI summarized',
    conversionStatus: 'active',
  },
]

type Tab = 'memory' | 'sessions' | 'photos' | 'privacy'
const tabs: { key: Tab; label: string; icon: typeof Brain; count?: number }[] = [
  { key: 'memory', label: 'Memory', icon: Brain, count: memory.items.length },
  { key: 'sessions', label: 'Sessions', icon: ClipboardList, count: sessions.length },
  { key: 'photos', label: 'Photos', icon: Images, count: 0 },
  { key: 'privacy', label: 'Privacy', icon: ShieldCheck },
]

function CustomerDetailPage({
  initialTab = 'memory',
  withDeletion = false,
}: {
  initialTab?: Tab
  withDeletion?: boolean
}) {
  const [tab, setTab] = useState<Tab>(initialTab)

  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1120px] mx-auto space-y-4 md:space-y-5">
      <div className="hidden md:flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)]">
        <span className="inline-flex items-center gap-1">
          <ChevronLeft className="size-3.5" aria-hidden />
          Back to customers
        </span>
      </div>

      {withDeletion && (
        <CustomerDeletionBanner
          title="Pending deletion in 14 days"
          body="This customer will be permanently deleted on May 15, 2026 unless undone."
          undoLabel="Undo deletion"
          daysRemaining={14}
          onUndo={() => {}}
        />
      )}

      <CustomerProfileIdentity
        name={customer.name}
        initials={customer.initials}
        age={customer.age}
        gender={customer.gender}
        registeredDate={customer.registeredDate}
        visitCount={customer.visitCount}
        staffName={customer.staffName}
        karuteNumber={customer.karuteNumber}
        signalTone={customer.signalTone}
        signalLabel={customer.signalLabel}
        phone={customer.phone}
        email={customer.email}
        nextPredictedVisit={customer.nextPredictedVisit}
        recordingConsent={{ granted: true, tooltip: 'Granted Feb 10, 2026' }}
        onEdit={() => {}}
      />

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 md:p-5">
        <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2">
          Visit history
        </div>
        <VisitHistoryChain chain={customer.visitChain} visitCount={customer.visitCount} />
      </section>

      <nav
        aria-label="Profile tabs"
        className="flex items-center gap-1 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible border-b border-[var(--color-border)]"
      >
        {tabs.map((t) => {
          const active = tab === t.key
          const Icon = t.icon
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`relative inline-flex items-center gap-1.5 h-10 px-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
                active
                  ? 'text-[var(--color-text)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <Icon
                className={`size-3.5 ${active ? 'text-[var(--color-accent)]' : ''}`}
                aria-hidden
              />
              <span>{t.label}</span>
              {typeof t.count === 'number' && (
                <span className="text-[10px] tabular-nums text-[var(--color-text-muted)]">
                  {t.count}
                </span>
              )}
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-accent)] rounded-full"
                />
              )}
            </button>
          )
        })}
      </nav>

      <div>
        {tab === 'memory' && (
          <CustomerMemoryCard memory={memory} customerName={customer.name} onAdd={() => {}} />
        )}
        {tab === 'sessions' && <CustomerSessionHistory sessions={sessions} />}
        {tab === 'photos' && (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center text-sm text-[var(--color-text-muted)]">
            Photo records component is not part of this composition story (handled by
            karute / photo-records flow).
          </div>
        )}
        {tab === 'privacy' && (
          <CustomerPrivacyPanel
            title="Privacy & data rights"
            intro="Under APPI, this customer can request to see, export, or delete their data."
            accessHistory={{
              title: 'Recent access',
              description: 'See who has viewed this profile in the last 30 days.',
              actionLabel: 'View log',
              onAction: () => {},
            }}
            actions={[
              {
                id: 'export',
                tone: 'neutral',
                title: 'Export customer data',
                description: 'Download a JSON archive of every record we hold.',
                actionLabel: 'Export',
                onAction: () => {},
              },
              {
                id: 'revoke-consent',
                tone: 'warning',
                title: 'Revoke recording consent',
                description: 'Future sessions will not be recorded.',
                actionLabel: 'Revoke',
                onAction: () => {},
              },
              {
                id: 'delete',
                tone: 'danger',
                title: 'Delete customer',
                description:
                  'Schedules a 30-day soft-delete. The customer can be restored within the window.',
                actionLabel: 'Delete',
                onAction: () => {},
              },
            ]}
            footerDisclaimer="All actions are written to the audit log."
          />
        )}
      </div>
    </main>
  )
}

export const Default: Story = {
  render: () => <CustomerDetailPage />,
}

export const SessionsTab: Story = {
  render: () => <CustomerDetailPage initialTab="sessions" />,
}

export const PrivacyTab: Story = {
  render: () => <CustomerDetailPage initialTab="privacy" />,
}

export const PendingDeletion: Story = {
  render: () => <CustomerDetailPage withDeletion />,
}
