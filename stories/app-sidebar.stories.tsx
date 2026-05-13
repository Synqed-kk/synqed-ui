import type { Meta, StoryObj } from '@storybook/react'
import {
  Calendar,
  ClipboardList,
  GraduationCap,
  Home,
  Mic,
  Settings,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react'
import { AppSidebar, type AppSidebarNavItem } from '../src/components/app-sidebar'

const meta: Meta<typeof AppSidebar> = {
  title: 'Components/AppSidebar',
  component: AppSidebar,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof AppSidebar>

const items: AppSidebarNavItem[] = [
  { key: 'record', icon: Mic, label: 'Record' },
  { key: 'dashboard', icon: Home, label: 'Dashboard', active: true },
  { key: 'reservation', icon: Calendar, label: 'Reservations' },
  { key: 'customers', icon: Users, label: 'Customers' },
  { key: 'karute', icon: ClipboardList, label: 'Karute' },
  { key: 'coaching', icon: GraduationCap, label: 'Coaching' },
  { key: 'ai', icon: Sparkles, label: 'AI' },
  { key: 'import', icon: Upload, label: 'Import' },
  { key: 'settings', icon: Settings, label: 'Settings' },
]

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 600, background: 'var(--color-bg)' }}>
      <AppSidebar
        items={items}
        onItemClick={(item) => console.info('nav click', item.key)}
        userSlot={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 8px',
              fontSize: 12,
              color: 'var(--color-text-muted)',
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                background: 'var(--color-accent)',
                color: 'var(--color-accent-text)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
              }}
            >
              JC
            </span>
            <div>
              <div style={{ color: 'var(--color-text)', fontWeight: 500 }}>Jon Chan</div>
              <div>Owner</div>
            </div>
          </div>
        }
      />
      <main style={{ flex: 1, padding: 24 }}>
        <h1>Page content goes here</h1>
      </main>
    </div>
  ),
}

export const WithLinkSlot: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 600, background: 'var(--color-bg)' }}>
      <AppSidebar
        items={items}
        asItemLink={(item, children) => (
          <a
            href={`/${item.key}`}
            onClick={(e) => e.preventDefault()}
            style={{ display: 'block', textDecoration: 'none' }}
          >
            {children}
          </a>
        )}
        brandSlot={(children) => (
          <a href="/" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none' }}>
            {children}
          </a>
        )}
      />
      <main style={{ flex: 1, padding: 24 }}>
        <h1>Page content</h1>
      </main>
    </div>
  ),
}
