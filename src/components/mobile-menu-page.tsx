import { ChevronRight, X } from 'lucide-react'
import { forwardRef, type ComponentType, type ReactNode } from 'react'
import { Avatar } from './avatar.js'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Full-screen mobile menu — covers the page (but not the bottom tab
// bar). Slides up from below. Caller controls open state and supplies
// the menu items + an optional account-card slot + footer slot.
// ------------------------------------------------------------

export interface MobileMenuPageItem {
  key: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  /** Tone preset — picks tile background + icon color from CSS tokens. */
  tone?: 'accent' | 'success' | 'warning' | 'destructive' | 'neutral'
  active?: boolean
}

export interface MobileMenuPageCopy {
  brand: string
  brandSubtitle?: string
  closeLabel: string
  sectionLabel: string
}

const DEFAULT_COPY: MobileMenuPageCopy = {
  brand: 'SYNQED',
  brandSubtitle: 'Karute',
  closeLabel: 'Close',
  sectionLabel: 'More',
}

interface AccountInfo {
  name: string
  initials: string
  roleLabel: string
}

interface MobileMenuPageProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: MobileMenuPageItem[]
  /** Top "account card" data; renders a tappable row above the grid. */
  account?: AccountInfo
  /** Wrap the account card in a router-aware link. */
  accountSlot?: (children: ReactNode) => ReactNode
  /** Wrap each menu tile in a router-aware link. */
  asItemLink?: (item: MobileMenuPageItem, children: ReactNode) => ReactNode
  /** Footer content (e.g. logout button). */
  footerSlot?: ReactNode
  onItemClick?: (item: MobileMenuPageItem) => void
  copy?: Partial<MobileMenuPageCopy>
}

const TONE_TILE: Record<NonNullable<MobileMenuPageItem['tone']>, { bg: string; icon: string }> = {
  accent: { bg: 'bg-[var(--color-accent)]/15', icon: 'text-[var(--color-accent)]' },
  success: { bg: 'bg-[var(--color-success)]/15', icon: 'text-[var(--color-success)]' },
  warning: { bg: 'bg-[var(--color-warning)]/15', icon: 'text-[var(--color-warning)]' },
  destructive: {
    bg: 'bg-[var(--color-destructive)]/15',
    icon: 'text-[var(--color-destructive)]',
  },
  neutral: { bg: 'bg-[var(--color-bg-muted)]', icon: 'text-[var(--color-text-muted)]' },
}

const TAB_BAR_RESERVED = 'calc(62px + env(safe-area-inset-bottom))'

export const MobileMenuPage = forwardRef<HTMLDivElement, MobileMenuPageProps>(
  (
    {
      open,
      onOpenChange,
      items,
      account,
      accountSlot,
      asItemLink,
      footerSlot,
      onItemClick,
      copy,
    },
    ref,
  ) => {
    const L: MobileMenuPageCopy = { ...DEFAULT_COPY, ...copy }

    const accountRow = account ? (
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 transition-colors active:bg-[var(--color-bg-card-hover)]">
        <Avatar initials={account.initials} size="md" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold leading-tight text-[var(--color-text)]">
            {account.name}
          </div>
          <div className="mt-0.5 text-[12px] leading-tight text-[var(--color-text-muted)]">
            {account.roleLabel}
          </div>
        </div>
        <ChevronRight className="size-4 text-[var(--color-text-muted)]" aria-hidden />
      </div>
    ) : null

    return (
      <>
        <div
          aria-hidden
          onClick={() => onOpenChange(false)}
          style={{ bottom: TAB_BAR_RESERVED }}
          data-mobile-chrome="true"
          className={cn(
            'fixed inset-x-0 top-0 z-40 bg-black/20 transition-opacity duration-200 md:hidden',
            open ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        />

        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={L.brand}
          data-mobile-chrome="true"
          style={{ bottom: TAB_BAR_RESERVED }}
          className={cn(
            'fixed inset-x-0 top-0 z-40 flex transform-gpu flex-col bg-[var(--color-bg)] text-[var(--color-text)] shadow-2xl shadow-black/20 transition-transform duration-300 md:hidden',
            open ? 'translate-y-0' : 'pointer-events-none translate-y-full',
          )}
        >
          <header className="flex items-center justify-between border-b border-[var(--color-border)] px-5 pb-3 pt-[max(env(safe-area-inset-top),1rem)]">
            <div>
              <div className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
                {L.brand}
              </div>
              {L.brandSubtitle && (
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {L.brandSubtitle}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={L.closeLabel}
              className="inline-flex size-11 items-center justify-center rounded-full text-[var(--color-text)] transition-colors active:bg-[var(--color-bg-muted)]"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>

          <div className="ios-scroll flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {accountRow && (accountSlot ? accountSlot(accountRow) : accountRow)}

            <div className="px-1 text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
              {L.sectionLabel}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {items.map((item) => {
                const Icon = item.icon
                const tone = TONE_TILE[item.tone ?? 'accent']
                const tile = (
                  <span
                    className={cn(
                      'group relative flex flex-col items-start gap-3 rounded-2xl border bg-[var(--color-bg-card)] p-4 transition-all active:scale-[0.98]',
                      item.active
                        ? 'border-[var(--color-accent)]/40 shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                        : 'border-[var(--color-border)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
                    )}
                  >
                    <div
                      className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-xl',
                        tone.bg,
                      )}
                    >
                      <Icon className={cn('size-5', tone.icon)} strokeWidth={2} />
                    </div>
                    <div className="text-[15px] font-semibold leading-tight text-[var(--color-text)]">
                      {item.label}
                    </div>
                    {item.active && (
                      <span
                        aria-hidden
                        className="absolute right-3 top-3 size-2 rounded-full bg-[var(--color-accent)]"
                      />
                    )}
                  </span>
                )

                const wrapped = asItemLink ? asItemLink(item, tile) : tile
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                    className="block text-left"
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {wrapped}
                  </button>
                )
              })}
            </div>

            {footerSlot && <div className="space-y-1 pt-2">{footerSlot}</div>}
          </div>
        </div>
      </>
    )
  },
)
MobileMenuPage.displayName = 'MobileMenuPage'
