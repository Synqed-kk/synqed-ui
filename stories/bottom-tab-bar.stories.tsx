import type { Meta, StoryObj } from '@storybook/react'
import { Calendar, ClipboardList, Menu, Mic, Users } from 'lucide-react'
import { useState } from 'react'
import { BottomTabBar, type BottomTabBarItem } from '../src/components/bottom-tab-bar'

const meta: Meta<typeof BottomTabBar> = {
  title: 'Components/BottomTabBar',
  component: BottomTabBar,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile1' } },
}
export default meta
type Story = StoryObj<typeof BottomTabBar>

function CenterFab() {
  return (
    <button
      type="button"
      className="relative flex h-full w-full flex-col items-center justify-center gap-1 active:scale-[0.96] transition-transform"
      aria-label="Record"
    >
      <span
        className="relative flex items-center justify-center rounded-full"
        style={{
          marginTop: -12,
          width: 44,
          height: 44,
          background: 'var(--color-chrome)',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          border: '2px solid white',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 999,
            background: 'var(--color-recording, #ef4444)',
          }}
        >
          <Mic size={14} />
        </span>
      </span>
      <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--color-text)' }}>Record</span>
    </button>
  )
}

export const Default: Story = {
  render: () => {
    function StatefulBar() {
      const [activeKey, setActiveKey] = useState('reservation')
      const [menuOpen, setMenuOpen] = useState(false)
      const left: BottomTabBarItem[] = [
        { key: 'reservation', icon: Calendar, label: 'Bookings', active: activeKey === 'reservation' && !menuOpen },
        { key: 'karute', icon: ClipboardList, label: 'Karute', active: activeKey === 'karute' && !menuOpen },
      ]
      const right: BottomTabBarItem[] = [
        { key: 'customers', icon: Users, label: 'Customers', active: activeKey === 'customers' && !menuOpen },
        { key: 'menu', icon: Menu, label: 'Menu', active: menuOpen, ariaPressed: menuOpen },
      ]
      return (
        <div style={{ minHeight: 600, background: 'var(--color-bg)', position: 'relative' }}>
          <main style={{ padding: 16, color: 'var(--color-text)' }}>
            <p>Active: {menuOpen ? 'menu' : activeKey}</p>
          </main>
          <BottomTabBar
            leftTabs={left}
            rightTabs={right}
            centerSlot={<CenterFab />}
            onTabClick={(tab) => {
              if (tab.key === 'menu') setMenuOpen((v) => !v)
              else {
                setMenuOpen(false)
                setActiveKey(tab.key)
              }
            }}
          />
        </div>
      )
    }
    return <StatefulBar />
  },
}
