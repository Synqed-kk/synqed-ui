import type { Meta, StoryObj } from '@storybook/react'
import { Calendar, ClipboardList, Home, Mic, Settings, Users } from 'lucide-react'
import { SidebarNavItem } from '../src/components/sidebar-nav-item'

const meta: Meta<typeof SidebarNavItem> = {
  title: 'Components/SidebarNavItem',
  component: SidebarNavItem,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof SidebarNavItem>

const items = [
  { icon: Mic, label: 'Record' },
  { icon: Home, label: 'Dashboard' },
  { icon: Calendar, label: 'Reservations' },
  { icon: Users, label: 'Customers' },
  { icon: ClipboardList, label: 'Karute' },
  { icon: Settings, label: 'Settings' },
]

export const Default: Story = {
  render: () => (
    <nav
      style={{
        width: 220,
        padding: 12,
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
      }}
    >
      {items.map((item, i) => (
        <SidebarNavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          active={i === 1}
          onClick={() => console.info('nav click', item.label)}
        />
      ))}
    </nav>
  ),
}

export const WithLinkSlot: Story = {
  render: () => (
    <nav
      style={{
        width: 220,
        padding: 12,
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
      }}
    >
      {items.map((item, i) => (
        <SidebarNavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          active={i === 2}
          asLink={(children) => (
            <a
              href={`/${item.label.toLowerCase()}`}
              onClick={(e) => e.preventDefault()}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              {children}
            </a>
          )}
        />
      ))}
    </nav>
  ),
}
