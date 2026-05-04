import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

// Karute/Settings — recomposes karute's /[locale]/(app)/settings/page.tsx using
// lifted synqed-ui components.
//
// Mirrors components/settings/SettingsTabs.tsx in karute:
//   - Page title "Settings"
//   - 6 tabs with emoji icons: Organization (🏢), Theme (🎨), AI (🧠),
//     Recording (🎙️), Staff (👥), Booking sync (🔄)
//   - Each tab is a stack of SettingRow-style fields (label/description on the
//     left, control on the right)
//
// synqed-ui has SettingRow (used here) but no equivalent for karute's emoji
// tab list. Spike's settings is composed entirely of SettingRow + horizontal
// tabs. The shape here mirrors karute closely.

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../src/components/tabs'
import { SettingRow } from '../../src/components/setting-row'
import { Input } from '../../src/components/input'
import { Button } from '../../src/components/button'

const meta: Meta = {
  title: 'Karute/Settings',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

const BUSINESS_TYPES = [
  'Hair Salon', 'Esthetic Salon', 'Chiropractic', 'Beauty Bodywork',
  'Beauty Clinic', 'Medical Clinic', 'Dental', 'Gym / PT', 'Nail Salon',
  'Eye Salon', 'Yoga / Pilates', 'Pet Salon', 'Other',
]

const TABS = [
  { id: 'organization', label: 'Organization', icon: '🏢' },
  { id: 'theme', label: 'Theme', icon: '🎨' },
  { id: 'ai', label: 'AI', icon: '🧠' },
  { id: 'recording', label: 'Recording', icon: '🎙️' },
  { id: 'staff', label: 'Staff', icon: '👥' },
  { id: 'sync', label: 'Booking sync', icon: '🔄' },
] as const

function OrganizationTab() {
  return (
    <div className="rounded-xl border bg-card px-6">
      <SettingRow label="Salon name" description="Shown to your customers and on PDFs">
        <Input defaultValue="Grace Esthetic Salon" style={{ maxWidth: 320 }} />
      </SettingRow>
      <SettingRow label="Business type" description="Used to tune AI prompts and karute templates">
        <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
          {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </SettingRow>
      <SettingRow
        orientation="vertical"
        label="Operating hours"
        description="Opening / closing per weekday — used for booking sync windows"
      >
        <div className="space-y-1.5">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="flex items-center gap-2">
              <span className="w-10 text-xs text-muted-foreground">{d}</span>
              <Input type="time" defaultValue="10:00" style={{ width: 110 }} />
              <span className="text-muted-foreground">–</span>
              <Input type="time" defaultValue="20:00" style={{ width: 110 }} />
            </div>
          ))}
        </div>
      </SettingRow>
      <SettingRow label="Webhook URL" description="POSTs to this URL whenever a karute is created">
        <Input placeholder="https://..." style={{ maxWidth: 320, fontFamily: 'monospace' }} />
      </SettingRow>
    </div>
  )
}

function ThemeTab() {
  // Karute has a custom theme-color picker grid here. No synqed-ui equivalent.
  // synqed-ui has ThemeSwitcher — a different model (named themes, not custom
  // hex). Stubbing with a placeholder.
  return (
    <div className="rounded-xl border bg-card px-6">
      <SettingRow
        orientation="vertical"
        label="Brand colors"
        description="Customize the color palette used across karute"
      >
        <div className="flex gap-2 flex-wrap">
          {['#c8873e', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'].map((c) => (
            <span
              key={c}
              className="inline-block w-9 h-9 rounded-lg border border-border"
              style={{ background: c }}
            />
          ))}
        </div>
      </SettingRow>
      <SettingRow label="Karute uses a custom HSL picker — not synqed-ui's ThemeSwitcher" description="Stubbed; gap from spike">
        <span className="text-xs text-muted-foreground italic">no-op</span>
      </SettingRow>
    </div>
  )
}

function AITab() {
  return (
    <div className="rounded-xl border bg-card px-6">
      <SettingRow label="AI model" description="Choose between speed and quality">
        <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
          <option>gpt-4o-mini (Fast)</option>
          <option>gpt-4o (Best)</option>
        </select>
      </SettingRow>
      <SettingRow label="Confidence threshold" description="Hide AI entries below this score">
        <Input type="number" defaultValue="0.7" step="0.05" min="0" max="1" style={{ width: 120 }} />
      </SettingRow>
    </div>
  )
}

function RecordingTab() {
  return (
    <div className="rounded-xl border bg-card px-6">
      <SettingRow label="Audio quality" description="Higher quality uses more storage">
        <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
          <option>Low</option>
          <option>Standard</option>
          <option>High</option>
        </select>
      </SettingRow>
      <SettingRow label="Auto-stop" description="Automatically stop after this many minutes">
        <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
          <option>15 min</option>
          <option>30 min</option>
          <option>45 min</option>
          <option>60 min</option>
          <option>Off</option>
        </select>
      </SettingRow>
    </div>
  )
}

function StaffTab() {
  // Karute's StaffList is a custom CRUD list. No synqed-ui equivalent.
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Staff members</h3>
        <Button size="sm">Add staff</Button>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Akari Sato', role: 'Owner', initials: 'AS' },
          { name: 'Naomi Nakamura', role: 'Therapist', initials: 'NN' },
        ].map((s) => (
          <div key={s.name} className="flex items-center gap-3 rounded-lg border border-border/30 px-3 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {s.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.role}</p>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SyncTab() {
  return (
    <div className="rounded-xl border bg-card px-6">
      <SettingRow label="External booking sync" description="Pull bookings from your booking provider">
        <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
          <option>Disabled</option>
          <option>Hot Pepper Beauty</option>
          <option>Beauty Park</option>
          <option>Square</option>
        </select>
      </SettingRow>
      <SettingRow label="API key" description="Required for sync to run">
        <Input type="password" placeholder="••••••••" style={{ maxWidth: 320, fontFamily: 'monospace' }} />
      </SettingRow>
    </div>
  )
}

function KaruteSettingsPage() {
  const [tab, setTab] = useState<typeof TABS[number]['id']>('organization')

  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof TABS[number]['id'])}>
          <TabsList className="flex flex-wrap h-auto">
            {TABS.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="gap-1.5">
                <span aria-hidden>{t.icon}</span>
                <span>{t.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="organization" className="mt-4"><OrganizationTab /></TabsContent>
          <TabsContent value="theme" className="mt-4"><ThemeTab /></TabsContent>
          <TabsContent value="ai" className="mt-4"><AITab /></TabsContent>
          <TabsContent value="recording" className="mt-4"><RecordingTab /></TabsContent>
          <TabsContent value="staff" className="mt-4"><StaffTab /></TabsContent>
          <TabsContent value="sync" className="mt-4"><SyncTab /></TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export const Default: Story = { render: () => <KaruteSettingsPage /> }
