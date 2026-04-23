import type { Meta, StoryObj } from '@storybook/react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '../src/components/sheet'
import { Button } from '../src/components/button'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Sheet>

function Template({ side }: { side: 'bottom' | 'top' | 'left' | 'right' }) {
  return (
    <div style={{ padding: 40 }}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open {side} sheet</Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when done.</SheetDescription>
          </SheetHeader>
          <div style={{ flex: 1, padding: '16px 0', color: 'var(--color-text)' }}>Body content</div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="default">Save</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export const Bottom: Story = { render: () => <Template side="bottom" /> }
export const Top: Story = { render: () => <Template side="top" /> }
export const Left: Story = { render: () => <Template side="left" /> }
export const Right: Story = { render: () => <Template side="right" /> }
