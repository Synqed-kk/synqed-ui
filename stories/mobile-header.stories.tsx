import type { Meta, StoryObj } from '@storybook/react'
import { MobileHeader } from '../src/components/mobile-header'

const meta: Meta<typeof MobileHeader> = {
  title: 'Components/MobileHeader',
  component: MobileHeader,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile1' } },
}
export default meta
type Story = StoryObj<typeof MobileHeader>

export const Default: Story = {
  render: () => <MobileHeader title="Karute" />,
}

export const WithBack: Story = {
  render: () => (
    <MobileHeader
      title="Customer Profile"
      showBack
      onBack={() => console.info('back')}
    />
  ),
}

export const WithUnreadBadge: Story = {
  render: () => (
    <MobileHeader
      title="Dashboard"
      unreadCount={5}
      onNotifications={() => console.info('open notifications')}
    />
  ),
}

export const WithUnreadOverflow: Story = {
  render: () => <MobileHeader title="Dashboard" unreadCount={42} />,
}

export const StopRecording: Story = {
  render: () => (
    <MobileHeader
      title="Karute"
      rightVariant="stopRecording"
      recordingElapsed="03:12"
      onStopRecording={() => console.info('stop')}
    />
  ),
}
