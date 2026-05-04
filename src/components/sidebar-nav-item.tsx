import { forwardRef, type ComponentType, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Single nav row in the desktop AppSidebar. Pure presenter — caller
// passes `active` (resolved from its own router) and an optional
// `asLink` slot to wrap the content in a router-aware anchor.
// ------------------------------------------------------------

export interface SidebarNavItemProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  icon: ComponentType<{ className?: string }>
  label: string
  active?: boolean
  /** Render-prop wrapper around the entire row. Use it to wrap with
   *  a router-aware Link or NavLink. Without it, the row renders as
   *  a button and forwards onClick. */
  asLink?: (children: ReactNode) => ReactNode
  onClick?: () => void
}

export const SidebarNavItem = forwardRef<HTMLElement, SidebarNavItemProps>(
  ({ icon: Icon, label, active = false, asLink, onClick, className, ...props }, _ref) => {
    const inner = (
      <span
        className={cn(
          'group relative flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors',
          active
            ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-text)]',
          className,
        )}
        {...(props as HTMLAttributes<HTMLSpanElement>)}
      >
        {active && (
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-[var(--color-accent)]"
          />
        )}
        <Icon className={cn('size-4', active ? 'text-[var(--color-accent)]' : '')} />
        <span className={active ? 'font-semibold' : ''}>{label}</span>
      </span>
    )

    if (asLink) return <>{asLink(inner)}</>

    return (
      <button type="button" onClick={onClick} className="block w-full text-left">
        {inner}
      </button>
    )
  },
)
SidebarNavItem.displayName = 'SidebarNavItem'
