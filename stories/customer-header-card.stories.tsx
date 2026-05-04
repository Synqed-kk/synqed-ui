import type { Meta, StoryObj } from '@storybook/react'
import { CustomerHeaderCard } from '../src/components/customer-header-card'

const meta: Meta<typeof CustomerHeaderCard> = {
  title: 'Components/CustomerHeaderCard',
  component: CustomerHeaderCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CustomerHeaderCard>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 920, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <CustomerHeaderCard
        name="Misaki Tanaka"
        initials="MT"
        age={32}
        gender="Female"
        visitCount={12}
        lastVisitDate="2026-04-08"
        lastVisitDaysAgo={14}
        staffName="Akari Sato"
        service="Color · Touch-up"
        sessionDate="2026-04-22"
        karuteNumber="0142"
        phone="090-1234-5678"
        email="misaki@example.com"
        conversionStatus="active"
        onEdit={() => console.info('edit')}
      />
    </div>
  ),
}

export const Provisional: Story = {
  render: () => (
    <div style={{ maxWidth: 920, border: '1px solid var(--color-border)', borderRadius: 12 }}>
      <CustomerHeaderCard
        name="Misaki Tanaka"
        initials="MT"
        age={32}
        gender="Female"
        visitCount={1}
        lastVisitDate="—"
        lastVisitDaysAgo={0}
        staffName="Akari Sato"
        service="First-time consult"
        sessionDate="2026-04-22"
        conversionStatus="provisional"
        onChangeStatus={() => console.info('change status')}
      />
    </div>
  ),
}
