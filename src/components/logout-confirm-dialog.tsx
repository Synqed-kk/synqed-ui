import { LogOut } from 'lucide-react'
import { Button } from './button.js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog.js'

// ------------------------------------------------------------
// Shared logout-confirm dialog — same instance used from the desktop
// user menu, the mobile menu page, and the profile page. Pure
// presenter; the caller wires the actual session-teardown action via
// `onConfirm`. Optional `onLogoutComplete` lets parent sheets close
// themselves after the action runs.
// ------------------------------------------------------------

export interface LogoutConfirmDialogCopy {
  title: string
  body: string
  cancel: string
  confirm: string
}

const DEFAULT_COPY: LogoutConfirmDialogCopy = {
  title: 'Log out?',
  body: 'You will be returned to the login screen. Any unsaved drafts will be discarded.',
  cancel: 'Cancel',
  confirm: 'Log out',
}

interface LogoutConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Wire this to your session teardown (e.g. supabase.auth.signOut + redirect). */
  onConfirm: () => void | Promise<void>
  /** Fired after onConfirm — useful for parent sheets that need to close themselves. */
  onLogoutComplete?: () => void
  copy?: Partial<LogoutConfirmDialogCopy>
}

export function LogoutConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onLogoutComplete,
  copy,
}: LogoutConfirmDialogProps) {
  const L: LogoutConfirmDialogCopy = { ...DEFAULT_COPY, ...copy }

  const handleConfirm = async () => {
    onOpenChange(false)
    await onConfirm()
    if (onLogoutComplete) onLogoutComplete()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogTitle className="flex items-center gap-2">
          <LogOut className="size-4 text-[var(--color-destructive)]" aria-hidden />
          {L.title}
        </DialogTitle>
        <DialogDescription className="leading-relaxed">{L.body}</DialogDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {L.cancel}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            <LogOut className="size-3.5" aria-hidden />
            {L.confirm}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
