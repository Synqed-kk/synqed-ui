import type { Meta, StoryObj } from '@storybook/react'
import { GraduationCap, Home, LogOut, Mic, Settings, Sparkles, Upload } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import {
  MobileMenuPage,
  type MobileMenuPageItem,
} from '../src/components/mobile-menu-page'

const meta: Meta<typeof MobileMenuPage> = {
  title: 'Components/MobileMenuPage',
  component: MobileMenuPage,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile1' } },
}
export default meta
type Story = StoryObj<typeof MobileMenuPage>

const items: MobileMenuPageItem[] = [
  { key: 'dashboard', icon: Home, label: 'Dashboard', tone: 'accent' },
  { key: 'record', icon: Mic, label: 'Record', tone: 'destructive', active: true },
  { key: 'coaching', icon: GraduationCap, label: 'Coaching', tone: 'accent' },
  { key: 'ai', icon: Sparkles, label: 'AI', tone: 'success' },
  { key: 'import', icon: Upload, label: 'Import', tone: 'warning' },
  { key: 'settings', icon: Settings, label: 'Settings', tone: 'neutral' },
]

export const Default: Story = {
  render: () => {
    function Stateful() {
      const [open, setOpen] = useState(true)
      return (
        <div style={{ minHeight: 600, background: 'var(--color-bg)' }}>
          <Button onClick={() => setOpen(true)} style={{ margin: 16 }}>
            Open menu
          </Button>
          <MobileMenuPage
            open={open}
            onOpenChange={setOpen}
            items={items}
            account={{
              name: 'Jon Chan',
              initials: 'JC',
              roleLabel: 'Owner',
            }}
            onItemClick={(item) => console.info('item click', item.key)}
            footerSlot={
              <button
                type="button"
                onClick={() => console.info('logout')}
                className="inline-flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[15px] text-[var(--color-destructive)] active:opacity-80"
              >
                <LogOut className="size-[18px] shrink-0" aria-hidden />
                Log out
              </button>
            }
          />
        </div>
      )
    }
    return <Stateful />
  },
}
