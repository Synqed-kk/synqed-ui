import { forwardRef, type ComponentType, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Mobile bottom-tab bar — 5 slots; the center slot is reserved for
// an elevated record button (or any FAB) supplied by the caller via
// `centerSlot`. Other slots route via `asTabLink` or onClick.
// ------------------------------------------------------------

export interface BottomTabBarItem {
  key: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  active?: boolean
  ariaPressed?: boolean
}

interface BottomTabBarProps extends HTMLAttributes<HTMLElement> {
  /** Two tabs left of the center slot. */
  leftTabs: BottomTabBarItem[]
  /** Two tabs right of the center slot. */
  rightTabs: BottomTabBarItem[]
  /** Elevated center action (e.g. record FAB). */
  centerSlot: ReactNode
  /** Wrap a tab in a router-aware link. Without it, the tab renders as a button and forwards onTabClick. */
  asTabLink?: (item: BottomTabBarItem, children: ReactNode) => ReactNode
  onTabClick?: (item: BottomTabBarItem) => void
}

export const BottomTabBar = forwardRef<HTMLElement, BottomTabBarProps>(
  (
    { leftTabs, rightTabs, centerSlot, asTabLink, onTabClick, className, ...props },
    ref,
  ) => {
    const renderTab = (tab: BottomTabBarItem) => {
      const Icon = tab.icon
      const inner = (
        <span
          className={cn(
            'flex flex-col items-center justify-center gap-1 rounded-full px-3 py-1.5 transition-colors',
            tab.active && 'bg-[var(--color-accent)]/10',
          )}
        >
          <Icon
            className={cn(
              'size-[22px]',
              tab.active ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]',
            )}
            strokeWidth={tab.active ? 2.25 : 2}
          />
          <span
            className={cn(
              'text-[10px] font-medium leading-none',
              tab.active ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]',
            )}
          >
            {tab.label}
          </span>
        </span>
      )

      const wrapperClass =
        'flex w-full min-h-[58px] flex-col items-center justify-center transition-opacity active:opacity-70'

      const button = (
        <button
          type="button"
          onClick={onTabClick ? () => onTabClick(tab) : undefined}
          className={wrapperClass}
          aria-label={tab.label}
          aria-pressed={tab.ariaPressed}
        >
          {inner}
        </button>
      )

      const linked = asTabLink ? (
        <span className={wrapperClass} aria-current={tab.active ? 'page' : undefined}>
          {asTabLink(tab, inner)}
        </span>
      ) : (
        button
      )

      return <li key={tab.key}>{linked}</li>
    }

    return (
      <nav
        ref={ref}
        aria-label="Primary"
        data-mobile-chrome="true"
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-bg-card)]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden',
          className,
        )}
        {...props}
      >
        <ul className="grid grid-cols-5">
          {leftTabs.map(renderTab)}
          <li className="flex items-stretch justify-center">{centerSlot}</li>
          {rightTabs.map(renderTab)}
        </ul>
      </nav>
    )
  },
)
BottomTabBar.displayName = 'BottomTabBar'
