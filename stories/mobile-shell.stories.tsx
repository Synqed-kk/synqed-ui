import type { Meta, StoryObj } from '@storybook/react'
import { Calendar, ClipboardList, Menu, Mic, Users } from 'lucide-react'
import { BottomTabBar, type BottomTabBarItem } from '../src/components/bottom-tab-bar'
import { MobileShell } from '../src/components/mobile-shell'

const meta: Meta<typeof MobileShell> = {
  title: 'Components/MobileShell',
  component: MobileShell,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile1' } },
}
export default meta
type Story = StoryObj<typeof MobileShell>

const left: BottomTabBarItem[] = [
  { key: 'reservation', icon: Calendar, label: 'Bookings' },
  { key: 'karute', icon: ClipboardList, label: 'Karute', active: true },
]
const right: BottomTabBarItem[] = [
  { key: 'customers', icon: Users, label: 'Customers' },
  { key: 'menu', icon: Menu, label: 'Menu' },
]

function FakeHeader() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg-card)',
        borderBottom: '1px solid var(--color-border)',
        fontWeight: 600,
        color: 'var(--color-text)',
      }}
    >
      Karute
    </header>
  )
}

function CenterFab() {
  return (
    <button
      type="button"
      className="relative flex h-full w-full flex-col items-center justify-center gap-1"
      aria-label="Record"
    >
      <span
        style={{
          marginTop: -12,
          width: 44,
          height: 44,
          borderRadius: 999,
          background: 'var(--color-chrome)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid white',
        }}
      >
        <Mic size={16} />
      </span>
      <span style={{ fontSize: 10, color: 'var(--color-text)' }}>Record</span>
    </button>
  )
}

export const Default: Story = {
  render: () => (
    <MobileShell
      header={<FakeHeader />}
      bottomBar={
        <BottomTabBar leftTabs={left} rightTabs={right} centerSlot={<CenterFab />} />
      }
    >
      <div style={{ padding: 16 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: 16,
              marginBottom: 12,
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              color: 'var(--color-text)',
            }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </MobileShell>
  ),
}
