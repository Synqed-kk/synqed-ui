import { ChevronDown, User, Users, Check } from 'lucide-react'
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Avatar } from './avatar.js'

export type ViewMode = 'self' | 'all' | 'specific'

export interface ViewModeStaff {
  id: string
  name: string
  initials: string
}

export interface ViewModeCopy {
  self: string
  all: string
  byStaff: string
}

const DEFAULT_COPY: ViewModeCopy = {
  self: 'Mine',
  all: 'All staff',
  byStaff: 'By staff',
}

interface ViewModeSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  mode: ViewMode
  specificStaffId: string | null
  onChange: (mode: ViewMode, specificStaffId?: string) => void
  staff: ViewModeStaff[]
  /** Staff count ≤ this renders inline chips. Above it, a dropdown picker. */
  inlineChipThreshold?: number
  /** Optional sibling rendered before the segmented toggle, in the same flex-wrap row. */
  prependSlot?: ReactNode
  /** Optional accent color per staff (e.g. avatar background). */
  staffColorFor?: (staff: ViewModeStaff) => string | undefined
  copy?: Partial<ViewModeCopy>
}

export function ViewModeSelector({
  mode,
  specificStaffId,
  onChange,
  staff,
  inlineChipThreshold = 3,
  prependSlot,
  staffColorFor,
  copy,
  className,
  ...props
}: ViewModeSelectorProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const L: ViewModeCopy = { ...DEFAULT_COPY, ...copy }

  const useInlineChips = staff.length <= inlineChipThreshold
  const activeStaff = specificStaffId ? staff.find((s) => s.id === specificStaffId) : null

  const segmentedActive =
    'bg-[var(--color-bg-card)] text-[var(--color-text)] shadow-sm border border-[var(--color-border)]'
  const segmentedIdle =
    'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} {...props}>
      {prependSlot}
      <div className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-0.5">
        <button
          type="button"
          onClick={() => onChange('self')}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-[13px] font-medium transition-colors',
            mode === 'self' ? segmentedActive : segmentedIdle,
          )}
        >
          <User className="size-3.5" />
          {L.self}
        </button>
        <button
          type="button"
          onClick={() => onChange('all')}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-[13px] font-medium transition-colors',
            mode === 'all' ? segmentedActive : segmentedIdle,
          )}
        >
          <Users className="size-3.5" />
          {L.all}
        </button>
      </div>

      {useInlineChips ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {staff.map((s) => {
            const active = mode === 'specific' && specificStaffId === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange('specific', s.id)}
                className={cn(
                  'inline-flex h-8 items-center gap-1.5 rounded-full pl-1 pr-2.5 text-[13px] font-medium transition-colors',
                  active
                    ? 'border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                    : 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-card-hover)]',
                )}
              >
                <Avatar
                  initials={s.initials}
                  size="sm"
                  color={staffColorFor?.(s)}
                  className="size-6 text-[10px]"
                />
                <span className="max-w-[7.5rem] truncate">{s.name}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setPickerOpen((v) => !v)}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-full pl-1.5 pr-2.5 text-[13px] font-medium transition-colors',
              mode === 'specific'
                ? 'border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                : 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-card-hover)]',
            )}
          >
            {activeStaff ? (
              <>
                <Avatar
                  initials={activeStaff.initials}
                  size="sm"
                  color={staffColorFor?.(activeStaff)}
                  className="size-6 text-[10px]"
                />
                <span className="max-w-[7.5rem] truncate">{activeStaff.name}</span>
              </>
            ) : (
              <>
                <User className="ml-1 size-3.5" />
                <span>{L.byStaff}</span>
              </>
            )}
            <ChevronDown
              className={cn(
                'size-3.5 text-[var(--color-text-muted)] transition-transform',
                pickerOpen && 'rotate-180',
              )}
            />
          </button>
          {pickerOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setPickerOpen(false)} />
              <div className="absolute left-0 z-20 mt-1.5 w-56 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)] py-1 shadow-xl">
                {staff.map((s) => {
                  const active = specificStaffId === s.id
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        onChange('specific', s.id)
                        setPickerOpen(false)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors hover:bg-[var(--color-bg-card-hover)]"
                    >
                      <Avatar
                        initials={s.initials}
                        size="sm"
                        color={staffColorFor?.(s)}
                        className="size-6 text-[10px]"
                      />
                      <span className="flex-1 truncate text-[var(--color-text)]">{s.name}</span>
                      <Check
                        className={cn(
                          'size-3.5',
                          active ? 'text-[var(--color-accent)]' : 'text-transparent',
                        )}
                      />
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
