import type { Meta, StoryObj } from '@storybook/react'

// Karute/Dashboard — recomposes karute's current dashboard page using lifted
// synqed-ui components.
//
// Mirrors src/components/dashboard/NewDashboard.tsx in karute:
//   - Welcome header (greeting + my-view/all-staff toggle)
//   - Quick actions row (Start recording / Add customer / View karute)
//   - 3 stat cards (recordings this week, customers today, karute generated)
//   - AI Recommended Actions section
//   - 2-column grid: Today's Appointments | Recent Karute
//
// Spike/Dashboard differs: spike has rich AI action cards, an onboarding banner
// at the top, and a 4-card stat strip with trends. Karute today has a simpler
// 3-card colored gradient strip and no onboarding banner.

import { AppointmentRow, type AppointmentRowData } from '../../src/components/appointment-row'
import { Button } from '../../src/components/button'
import { RecentKaruteList, type RecentKaruteItem } from '../../src/components/recent-karute-list'
import { TodaysAppointments } from '../../src/components/todays-appointments'
import type { SignalTone } from '../../src/components/signal-chip'

const meta: Meta = {
  title: 'Karute/Dashboard',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Mock data — shaped after karute's NewDashboardProps
// ----------------------------------------------------------------------------

const staffName = 'Jon Chan'

const stats = {
  recordingsThisWeek: 12,
  customersToday: 8,
  karuteGenerated: 24,
}

interface KaruteAppointment {
  id: string
  time: string
  duration: number
  customerName: string
  staffName: string
}

const todayAppointments: KaruteAppointment[] = [
  { id: 'p1', time: '10:00', duration: 60, customerName: 'Yumi Takahashi', staffName: 'Akari Sato' },
  { id: 'p2', time: '11:30', duration: 90, customerName: 'Yuko Suzuki', staffName: 'Naomi Nakamura' },
  { id: 'p3', time: '13:30', duration: 45, customerName: 'Reiko Saito', staffName: 'Akari Sato' },
  { id: 'p4', time: '14:00', duration: 60, customerName: 'Misaki Tanaka', staffName: 'Akari Sato' },
  { id: 'p5', time: '15:30', duration: 75, customerName: 'Aya Kobayashi', staffName: 'Naomi Nakamura' },
  { id: 'p6', time: '16:30', duration: 60, customerName: 'Mitsuki Yamada', staffName: 'Akari Sato' },
]

// Karute's appointment row is much sparser than the spike's: just time / name /
// staff · duration with a small mic CTA. We use synqed-ui's AppointmentRow but
// pass a neutral "Booked" status since karute doesn't model status here.
const appointmentRows: AppointmentRowData[] = todayAppointments.map((a) => ({
  time: a.time,
  durationMinutes: a.duration,
  customerName: a.customerName,
  service: '',
  staffName: a.staffName,
  statusLabel: 'Booked',
  statusTone: 'neutral' as SignalTone,
}))

const recentKarute: RecentKaruteItem[] = [
  {
    id: 'k1',
    customerName: 'Misaki Tanaka',
    karuteNumber: '00120',
    sessionDate: 'Apr 19, 2026',
    summary: 'Cheek dryness is main concern. Worsening with pollen season.',
    entryCount: 5,
    staffName: 'Akari Sato',
  },
  {
    id: 'k2',
    customerName: 'Yuko Suzuki',
    karuteNumber: '00116',
    sessionDate: 'Apr 18, 2026',
    summary: '90-min body care improved range of motion.',
    entryCount: 4,
    staffName: 'Naomi Nakamura',
  },
  {
    id: 'k3',
    customerName: 'Reiko Saito',
    karuteNumber: '00112',
    sessionDate: 'Apr 18, 2026',
    summary: 'Continued head spa for headache relief. Third session.',
    entryCount: 3,
    staffName: 'Akari Sato',
  },
  {
    id: 'k4',
    customerName: 'Yumi Takahashi',
    karuteNumber: '00123',
    sessionDate: 'Apr 17, 2026',
    summary: 'Sensitive-skin facial. New customer assessment performed.',
    entryCount: 6,
    staffName: 'Akari Sato',
  },
  {
    id: 'k5',
    customerName: 'Mitsuki Yamada',
    karuteNumber: '00110',
    sessionDate: 'Apr 15, 2026',
    summary: 'Aging care focus. Interest in May campaign products.',
    entryCount: 4,
    staffName: 'Akari Sato',
  },
]

// ----------------------------------------------------------------------------
// Page composition — matches NewDashboard.tsx layout/density
// ----------------------------------------------------------------------------

function MicIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}
function UsersIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function FileTextIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function KaruteDashboardPage() {
  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="space-y-6">
        {/* Welcome + my-view / all-staff toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back, {staffName}</p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            All staff
          </button>
        </div>

        {/* Quick Actions — karute has 3 colored CTAs (start recording is bright red) */}
        {/* Karute uses raw <Link> + Tailwind here. synqed-ui has no equivalent
            "quick action button" component yet; using the Button primitive plus
            inline color matches karute's current density. */}
        <div className="flex flex-wrap gap-3">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl gap-2 text-sm font-semibold"
          >
            <MicIcon />
            Start recording
          </Button>
          <Button
            variant="ghost"
            className="border border-border px-5 py-3 rounded-xl gap-2 text-sm font-medium hover:bg-muted/50"
          >
            <UsersIcon />
            Add customer
          </Button>
          <Button
            variant="ghost"
            className="border border-border px-5 py-3 rounded-xl gap-2 text-sm font-medium hover:bg-muted/50"
          >
            <FileTextIcon />
            View karute
          </Button>
        </div>

        {/* Stats — karute has 3 colored gradient cards (no synqed-ui equivalent
            for these gradient stat tiles; spike's DashboardStatStrip uses flat
            cards. Inlined to match karute's actual look.) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/20 p-5">
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
              {stats.recordingsThisWeek}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Recordings this week</div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-5">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.customersToday}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Customers today</div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-5">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.karuteGenerated}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Karute generated</div>
          </div>
        </div>

        {/* AI Recommended Actions — karute has its own AIRecommendedActions component
            that fetches from AI endpoint. No synqed-ui equivalent yet (spike has
            AIActionCard rendered in a 3-card grid, which is similar but doesn't
            match karute's collapsible/dismissible style). Stubbed with a single
            placeholder card. */}
        <div className="rounded-2xl border border-border/30 bg-card/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">AI Recommended Actions</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Karute renders &lt;AIRecommendedActions /&gt; here — a list of dismissible
            recommendations fetched live. No synqed-ui equivalent yet; spike uses
            AIActionCard which is shaped differently.
          </p>
        </div>

        {/* Two column grid — Today's Appointments | Recent Karute */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TodaysAppointments
            total={appointmentRows.length}
            completed={0}
            onShowAll={() => {}}
          >
            {appointmentRows.map((a, i) => (
              <AppointmentRow key={i} appointment={a} honorific="" />
            ))}
          </TodaysAppointments>
          <RecentKaruteList items={recentKarute} onShowAll={() => {}} />
        </div>
      </div>
    </main>
  )
}

export const Default: Story = {
  render: () => <KaruteDashboardPage />,
}
