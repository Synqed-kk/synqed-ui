import type { Meta, StoryObj } from '@storybook/react'
// TODO: add app shell / sidebar when layout components ship in W4

import {
  AIActionCard,
  type AIActionData,
  type AIActionPriority,
} from '../../src/components/ai-action-card'
import { AppointmentRow, type AppointmentRowData } from '../../src/components/appointment-row'
import { DashboardHeader } from '../../src/components/dashboard-header'
import {
  DashboardStatStrip,
} from '../../src/components/dashboard-stat-strip'
import type { DashboardStatCardData } from '../../src/components/dashboard-stat-card'
import { OnboardingBanner } from '../../src/components/onboarding-banner'
import {
  RecentKaruteList,
  type RecentKaruteItem,
} from '../../src/components/recent-karute-list'
import { TodaysAppointments } from '../../src/components/todays-appointments'
import { ErrorState } from '../../src/components/error-state'
import { Skeleton } from '../../src/components/skeleton'
import type { SignalTone } from '../../src/components/signal-chip'

const meta: Meta = {
  title: 'Spike/Dashboard',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Mock data — lifted from synqed-karute-design-spike/src/mock/dashboard.ts and
// adapted to the synqed-ui prop shapes.
// ----------------------------------------------------------------------------

const greeting = {
  name: 'Jon Chan',
  dateFormatted: 'Sun, April 19, 2026',
}

const stats: DashboardStatCardData[] = [
  { label: 'Weekly recordings', value: 12, trend: 3 },
  { label: "Today's customers", value: 8 },
  { label: 'Monthly karute', value: 24 },
  { label: 'Rebooking rate', value: 78, unit: '%', trend: 5, trendSuffix: '%' },
]

type SpikePriority = '高' | '中' | '低'
const priorityMap: Record<SpikePriority, AIActionPriority> = {
  高: 'high',
  中: 'medium',
  低: 'low',
}
const priorityLabel: Record<SpikePriority, string> = {
  高: 'High',
  中: 'Medium',
  低: 'Low',
}

const aiActions: AIActionData[] = [
  {
    id: 'a1',
    priority: priorityMap['高'],
    priorityLabel: priorityLabel['高'],
    title: 'Send next-visit reminder to Misaki Tanaka',
    rationale:
      '28 days since last visit. Timing is right for a pollen-season moisture care recommendation.',
    ctaLabel: 'Send message',
  },
  {
    id: 'a2',
    priority: priorityMap['高'],
    priorityLabel: priorityLabel['高'],
    title: "Complete Yuko Suzuki's karute",
    rationale:
      "After yesterday's treatment, entries are missing. Can be auto-generated from the recording.",
    ctaLabel: 'Complete with AI',
  },
  {
    id: 'a3',
    priority: priorityMap['中'],
    priorityLabel: priorityLabel['中'],
    title: 'Follow up with Mitsuki Yamada',
    rationale:
      'Eligible for the May campaign. Her last interest-signals pair well with the new products.',
    ctaLabel: 'Review suggestion',
  },
]

type SpikeStatus = '予約済' | '施術中' | '完了' | '未確定'
const statusLabel: Record<SpikeStatus, string> = {
  予約済: 'Booked',
  施術中: 'In progress',
  完了: 'Completed',
  未確定: 'Tentative',
}
const statusTone: Record<SpikeStatus, SignalTone> = {
  予約済: 'success',
  施術中: 'warning',
  完了: 'neutral',
  未確定: 'info',
}

interface SpikeAppointment {
  id: string
  time: string
  duration: number
  customerName: string
  karuteNumber?: string
  service: string
  staffName: string
  status: SpikeStatus
  isNew?: boolean
}

const appointmentsRaw: SpikeAppointment[] = [
  { id: 'p1', time: '10:00', duration: 60, customerName: 'Yumi Takahashi', karuteNumber: '00123', service: 'Facial · Basic', staffName: 'Akari Sato', status: '完了' },
  { id: 'p2', time: '11:30', duration: 90, customerName: 'Yuko Suzuki', karuteNumber: '00116', service: 'Body Care · 90min', staffName: 'Naomi Nakamura', status: '完了' },
  { id: 'p3', time: '13:30', duration: 45, customerName: 'Reiko Saito', karuteNumber: '00112', service: 'Head Spa', staffName: 'Akari Sato', status: '完了' },
  { id: 'p4', time: '14:00', duration: 60, customerName: 'Misaki Tanaka', karuteNumber: '00120', service: 'Facial · Moisture Boost', staffName: 'Akari Sato', status: '施術中' },
  { id: 'p5', time: '15:30', duration: 75, customerName: 'Aya Kobayashi', karuteNumber: '00122', service: 'Aroma Treatment', staffName: 'Naomi Nakamura', status: '予約済', isNew: true },
  { id: 'p6', time: '16:30', duration: 60, customerName: 'Mitsuki Yamada', karuteNumber: '00110', service: 'Facial · Aging Care', staffName: 'Akari Sato', status: '予約済' },
  { id: 'p7', time: '17:30', duration: 90, customerName: 'Tomomi Watanabe', karuteNumber: '00119', service: 'Body Care · 90min', staffName: 'Naomi Nakamura', status: '予約済' },
  { id: 'p8', time: '18:45', duration: 45, customerName: 'Kana Kimura', karuteNumber: '00105', service: 'Head Spa', staffName: 'Akari Sato', status: '未確定' },
]

const appointments: AppointmentRowData[] = appointmentsRaw.map((a) => ({
  time: a.time,
  durationMinutes: a.duration,
  customerName: a.customerName,
  service: a.service,
  staffName: a.staffName,
  statusLabel: statusLabel[a.status],
  statusTone: statusTone[a.status],
  karuteNumber: a.karuteNumber,
  isNew: a.isNew,
  isActive: a.status === '施術中',
}))

const recentKarute: RecentKaruteItem[] = [
  {
    id: 'k1',
    customerName: 'Misaki Tanaka',
    karuteNumber: '00120',
    sessionDate: 'Apr 19, 2026',
    summary:
      'Cheek dryness is main concern. Worsening with pollen season — moisture boost course applied.',
    entryCount: 5,
    staffName: 'Akari Sato',
  },
  {
    id: 'k2',
    customerName: 'Yuko Suzuki',
    karuteNumber: '00116',
    sessionDate: 'Apr 18, 2026',
    summary:
      'Severe shoulder and neck tension. 90-min body care improved range of motion.',
    entryCount: 4,
    staffName: 'Naomi Nakamura',
  },
  {
    id: 'k3',
    customerName: 'Reiko Saito',
    karuteNumber: '00112',
    sessionDate: 'Apr 18, 2026',
    summary:
      'Continued head spa treatment for headache relief. Third session — symptoms stable.',
    entryCount: 3,
    staffName: 'Akari Sato',
  },
  {
    id: 'k4',
    customerName: 'Yumi Takahashi',
    karuteNumber: '00123',
    sessionDate: 'Apr 17, 2026',
    summary: 'Sensitive-skin facial. New customer — skin assessment performed.',
    entryCount: 6,
    staffName: 'Akari Sato',
  },
  {
    id: 'k5',
    customerName: 'Mitsuki Yamada',
    karuteNumber: '00110',
    sessionDate: 'Apr 15, 2026',
    summary: 'Aging care focus. Shows interest in May campaign products.',
    entryCount: 4,
    staffName: 'Akari Sato',
  },
]

// ----------------------------------------------------------------------------
// Page composition
// ----------------------------------------------------------------------------

function DashboardPage({ showOnboarding = true }: { showOnboarding?: boolean }) {
  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <DashboardHeader
        greeting={`Good afternoon, ${greeting.name}`}
        dateFormatted={greeting.dateFormatted}
        isOwner
        ownerBadgeLabel="Owner"
      />

      {showOnboarding && (
        <OnboardingBanner onStart={() => {}} onDismiss={() => {}} />
      )}

      <div className="mb-5 md:mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {aiActions.map((action) => (
          <AIActionCard key={action.id} action={action} onCta={() => {}} />
        ))}
      </div>

      <div className="mb-5 md:mb-6">
        <DashboardStatStrip stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 md:gap-5">
        <TodaysAppointments
          total={appointments.length}
          completed={appointments.filter((a) => a.statusLabel === 'Completed').length}
          onShowAll={() => {}}
        >
          {appointments.map((a, i) => (
            <AppointmentRow key={i} appointment={a} honorific="" />
          ))}
        </TodaysAppointments>
        <RecentKaruteList items={recentKarute} onShowAll={() => {}} />
      </div>
    </main>
  )
}

export const Default: Story = {
  render: () => <DashboardPage />,
}

export const WithoutOnboarding: Story = {
  render: () => <DashboardPage showOnboarding={false} />,
}

export const Loading: Story = {
  render: () => (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-64 w-full mb-6 rounded-xl" />
      <Skeleton className="h-20 w-full mb-6 rounded-lg" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5">
        <Skeleton className="h-96 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </main>
  ),
}

export const Error: Story = {
  render: () => (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <ErrorState
        title="Couldn't load the dashboard"
        error={{ message: 'Something went wrong loading the data. Please retry.' }}
        onRetry={() => {}}
      />
    </main>
  ),
}
