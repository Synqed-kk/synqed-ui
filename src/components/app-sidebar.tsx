import { forwardRef, type ComponentType, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { SidebarNavItem } from './sidebar-nav-item.js'

// ------------------------------------------------------------
// Desktop sidebar shell — fixed left-rail with brand, nav list,
// and a footer slot (UserMenu in app code). Pure presentational;
// caller supplies the nav items + a render-prop that wraps each
// row in a router-aware Link, plus an optional `userSlot` and
// `brandSlot`.
// ------------------------------------------------------------

export interface AppSidebarNavItem {
  key: string
  icon: ComponentType<{ className?: string }>
  label: string
  active?: boolean
}

export interface AppSidebarCopy {
  brand: string
  brandSubtitle?: string
}

const DEFAULT_COPY: AppSidebarCopy = {
  brand: 'SYNQED',
  brandSubtitle: 'Karute',
}

interface AppSidebarProps extends HTMLAttributes<HTMLElement> {
  items: AppSidebarNavItem[]
  copy?: Partial<AppSidebarCopy>
  /** Render-prop wrapper around each nav row (e.g. router Link). */
  asItemLink?: (item: AppSidebarNavItem, children: ReactNode) => ReactNode
  /** Wrapper for the brand block (e.g. router Link to home). */
  brandSlot?: (children: ReactNode) => ReactNode
  /** Footer content (e.g. UserMenu). */
  userSlot?: ReactNode
  onItemClick?: (item: AppSidebarNavItem) => void
}

export const AppSidebar = forwardRef<HTMLElement, AppSidebarProps>(
  (
    { items, copy, asItemLink, brandSlot, userSlot, onItemClick, className, ...props },
    ref,
  ) => {
    const L: AppSidebarCopy = { ...DEFAULT_COPY, ...copy }

    const brandInner = (
      <div className="block px-6 pt-6 pb-5">
        <span className="block text-xl font-semibold tracking-tight text-[var(--color-text)]">
          {L.brand}
        </span>
        {L.brandSubtitle && (
          <span className="mt-0.5 block text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {L.brandSubtitle}
          </span>
        )}
      </div>
    )

    return (
      <aside
        ref={ref}
        data-desktop-chrome="true"
        className={cn(
          'sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] md:flex',
          className,
        )}
        {...props}
      >
        <div className="border-b border-[var(--color-border)]">
          {brandSlot ? brandSlot(brandInner) : brandInner}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {items.map((item) => {
            const row = (
              <SidebarNavItem
                icon={item.icon}
                label={item.label}
                active={item.active}
                onClick={onItemClick ? () => onItemClick(item) : undefined}
                asLink={asItemLink ? (children) => asItemLink(item, children) : undefined}
              />
            )
            return <div key={item.key}>{row}</div>
          })}
        </nav>

        {userSlot && (
          <div className="border-t border-[var(--color-border)] p-3">{userSlot}</div>
        )}
      </aside>
    )
  },
)
AppSidebar.displayName = 'AppSidebar'
