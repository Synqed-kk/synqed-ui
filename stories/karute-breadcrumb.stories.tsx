import type { Meta, StoryObj } from '@storybook/react'
import { KaruteBreadcrumb } from '../src/components/karute-breadcrumb'

const meta: Meta<typeof KaruteBreadcrumb> = {
  title: 'Components/KaruteBreadcrumb',
  component: KaruteBreadcrumb,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof KaruteBreadcrumb>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <KaruteBreadcrumb
        customerName="Misaki Tanaka"
        sessionDate="2026-04-22"
        karuteNumber="0142"
        onPdfExport={() => console.info('pdf')}
        onShare={() => console.info('share')}
      />
    </div>
  ),
}

export const WithLinkSlots: Story = {
  render: () => (
    <div style={{ maxWidth: 1100 }}>
      <KaruteBreadcrumb
        customerName="Misaki Tanaka"
        sessionDate="2026-04-22"
        karuteNumber="0142"
        customersHrefSlot={(c) => (
          <a href="#customers" style={{ textDecoration: 'none' }}>
            {c}
          </a>
        )}
        customerHrefSlot={(c) => (
          <a href="#customer-1" style={{ textDecoration: 'none' }}>
            {c}
          </a>
        )}
        onPdfExport={() => console.info('pdf')}
      />
    </div>
  ),
}
