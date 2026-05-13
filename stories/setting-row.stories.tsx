import type { Meta, StoryObj } from '@storybook/react'
import { SettingRow } from '../src/components/setting-row'
import { Input } from '../src/components/input'

const meta: Meta<typeof SettingRow> = {
  title: 'Components/SettingRow',
  component: SettingRow,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof SettingRow>

export const Horizontal: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 720,
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        padding: '0 24px',
      }}
    >
      <SettingRow label="Business name" description="Shown to your customers">
        <Input defaultValue="Grace Esthetic Salon" style={{ maxWidth: 320 }} />
      </SettingRow>
      <SettingRow label="Timezone" description="Used for date/time display across bookings and karute">
        <Input defaultValue="Asia/Tokyo (JST)" style={{ maxWidth: 320 }} />
      </SettingRow>
      <SettingRow label="Webhook URL" description="POSTs to this URL whenever a karute is created">
        <Input placeholder="https://..." style={{ maxWidth: 320, fontFamily: 'monospace' }} />
      </SettingRow>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 720,
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        padding: '0 24px',
      }}
    >
      <SettingRow
        orientation="vertical"
        label="Business hours"
        description="Set opening and closing times for each day"
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Input type="time" defaultValue="10:00" style={{ width: 120 }} />
          <span style={{ alignSelf: 'center', color: 'var(--color-text-muted)' }}>–</span>
          <Input type="time" defaultValue="20:00" style={{ width: 120 }} />
        </div>
      </SettingRow>
      <SettingRow
        orientation="vertical"
        label="Brand colors"
        description="Reserved for future custom palettes"
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {['#c8873e', '#22c55e', '#f59e0b', '#ef4444'].map((c) => (
            <span
              key={c}
              style={{
                display: 'inline-block',
                width: 32,
                height: 32,
                borderRadius: 8,
                background: c,
                border: '1px solid var(--color-border)',
              }}
            />
          ))}
        </div>
      </SettingRow>
    </div>
  ),
}
