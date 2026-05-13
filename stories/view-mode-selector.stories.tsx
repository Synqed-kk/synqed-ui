import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  ViewModeSelector,
  type ViewMode,
  type ViewModeStaff,
} from '../src/components/view-mode-selector'

const meta: Meta<typeof ViewModeSelector> = {
  title: 'Components/ViewModeSelector',
  component: ViewModeSelector,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ViewModeSelector>

const smallStaff: ViewModeStaff[] = [
  { id: 'yui', name: 'Yui Tanaka', initials: 'YT' },
  { id: 'ren', name: 'Ren Sato', initials: 'RS' },
  { id: 'aoi', name: 'Aoi Kim', initials: 'AK' },
]

const largeStaff: ViewModeStaff[] = [
  ...smallStaff,
  { id: 'mio', name: 'Mio Watanabe', initials: 'MW' },
  { id: 'haru', name: 'Haru Ito', initials: 'HI' },
  { id: 'sana', name: 'Sana Mori', initials: 'SM' },
]

const palette = ['#5a7a5a', '#c8873e', '#6366f1', '#ef4444', '#f59e0b', '#22c55e']
const colorFor = (staff: ViewModeStaff) =>
  palette[
    Math.abs([...staff.id].reduce((a, c) => a + c.charCodeAt(0), 0)) % palette.length
  ]

export const InlineChips: Story = {
  render: () => {
    const [mode, setMode] = useState<ViewMode>('self')
    const [specific, setSpecific] = useState<string | null>(null)
    return (
      <ViewModeSelector
        mode={mode}
        specificStaffId={specific}
        onChange={(m, id) => {
          setMode(m)
          setSpecific(id ?? null)
        }}
        staff={smallStaff}
        staffColorFor={colorFor}
      />
    )
  },
}

export const Dropdown: Story = {
  render: () => {
    const [mode, setMode] = useState<ViewMode>('all')
    const [specific, setSpecific] = useState<string | null>(null)
    return (
      <ViewModeSelector
        mode={mode}
        specificStaffId={specific}
        onChange={(m, id) => {
          setMode(m)
          setSpecific(id ?? null)
        }}
        staff={largeStaff}
        staffColorFor={colorFor}
      />
    )
  },
}
