import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Mobile chrome wrapper — owns the bottom-padding math so a fixed
// BottomTabBar (and its elevated center button) doesn't occlude the
// last content card. Pure presentational; the caller mounts the
// header + tab bar + menu overlay themselves.
// ------------------------------------------------------------

interface MobileShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Renders above the content (e.g. MobileHeader). Mobile-only. */
  header?: ReactNode
  /** Renders below the content (e.g. BottomTabBar). Mobile-only. */
  bottomBar?: ReactNode
  /** Optional fullscreen overlay (e.g. MobileMenuPage). */
  overlay?: ReactNode
  children: ReactNode
}

export const MobileShell = forwardRef<HTMLDivElement, MobileShellProps>(
  ({ header, bottomBar, overlay, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {header}
        {/* Bottom padding: nav min-h-58 + elevated center button (~12px lift)
         * + breathing room. Totals 96px + safe-area-inset. */}
        <div className="pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </div>
        {bottomBar}
        {overlay}
      </div>
    )
  },
)
MobileShell.displayName = 'MobileShell'
