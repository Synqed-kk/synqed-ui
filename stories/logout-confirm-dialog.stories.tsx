import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../src/components/button'
import { LogoutConfirmDialog } from '../src/components/logout-confirm-dialog'

const meta: Meta<typeof LogoutConfirmDialog> = {
  title: 'Components/LogoutConfirmDialog',
  component: LogoutConfirmDialog,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof LogoutConfirmDialog>

function Demo({ copy }: { copy?: Parameters<typeof LogoutConfirmDialog>[0]['copy'] }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Log out</Button>
      <LogoutConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => console.info('logout confirmed')}
        copy={copy}
      />
    </>
  )
}

export const Default: Story = {
  render: () => <Demo />,
}

export const Japanese: Story = {
  render: () => (
    <Demo
      copy={{
        title: 'ログアウトしますか？',
        body: 'ログイン画面に戻ります。未保存の下書きは破棄されます。',
        cancel: 'キャンセル',
        confirm: 'ログアウト',
      }}
    />
  ),
}
