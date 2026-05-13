import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BookingActionSheet } from '../src/components/booking-action-sheet'
import { Button } from '../src/components/button'

const meta: Meta = {
  title: 'Components/BookingActionSheet',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const ReturningCustomerDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <BookingActionSheet
          open={open}
          onOpenChange={setOpen}
          customerName="Misaki Tanaka"
          karuteNumber="0142"
          hasExistingKarute
          isFirstTimeVisit={false}
          onViewKarute={() => console.info('view karute')}
          onNewKarute={() => console.info('new karute')}
          onStartRecording={() => console.info('start recording')}
        />
      </div>
    )
  },
}

export const FirstTimeMobile: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open mobile sheet</Button>
        <BookingActionSheet
          open={open}
          onOpenChange={setOpen}
          customerName="Aya Kobayashi"
          hasExistingKarute={false}
          isFirstTimeVisit
          isMobile
          onNewKarute={() => console.info('new karute')}
          onStartRecording={() => console.info('start recording')}
        />
      </div>
    )
  },
}
