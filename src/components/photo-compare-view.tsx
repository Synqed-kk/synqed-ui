import { useState } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Side-by-side and overlay comparison of two photos. The overlay
// mode blends the second image over the first via an opacity
// slider — useful for tracking progress over time when both
// photos share the same pose / category.
// Pure presenter — no data fetching.
// ------------------------------------------------------------

export interface PhotoCompareRecord {
  /** Full-resolution image URL. Caller resolves signed URLs. */
  storageUrl: string
  caption?: string
  categoryLabel: string
  capturedAtLabel: string
}

export interface PhotoCompareViewCopy {
  sideBySide: string
  overlay: string
  opacity: string
}

const DEFAULT_COPY: PhotoCompareViewCopy = {
  sideBySide: 'Side by side',
  overlay: 'Overlay',
  opacity: 'Opacity',
}

interface Props {
  a: PhotoCompareRecord
  b: PhotoCompareRecord
  copy?: Partial<PhotoCompareViewCopy>
  className?: string
}

type CompareMode = 'side' | 'overlay'

export function PhotoCompareView({ a, b, copy, className }: Props) {
  const L: PhotoCompareViewCopy = { ...DEFAULT_COPY, ...copy }
  const [mode, setMode] = useState<CompareMode>('side')
  const [overlayOpacity, setOverlayOpacity] = useState(0.5)

  return (
    <div className={cn('space-y-3', className)}>
      <div className="inline-flex items-center rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] p-0.5 ring-1 ring-[var(--color-border)]">
        <ModeChip
          active={mode === 'side'}
          onClick={() => setMode('side')}
          label={L.sideBySide}
        />
        <ModeChip
          active={mode === 'overlay'}
          onClick={() => setMode('overlay')}
          label={L.overlay}
        />
      </div>

      {mode === 'side' ? (
        <div className="grid grid-cols-2 gap-2">
          <SidePanel photo={a} />
          <SidePanel photo={b} />
        </div>
      ) : (
        <OverlayPanel
          a={a}
          b={b}
          opacity={overlayOpacity}
          onOpacityChange={setOverlayOpacity}
          opacityLabel={L.opacity}
        />
      )}
    </div>
  )
}

function ModeChip({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-7 items-center rounded-[var(--radius-sm)] px-3 text-[12px] font-medium transition-colors',
        active
          ? 'bg-[var(--color-bg-card)] text-[var(--color-text)] shadow-sm ring-1 ring-[var(--color-border)]'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
      )}
    >
      {label}
    </button>
  )
}

function SidePanel({ photo }: { photo: PhotoCompareRecord }) {
  return (
    <div className="space-y-1.5">
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] ring-1 ring-[var(--color-border)]">
        <img
          src={photo.storageUrl}
          alt={photo.caption ?? photo.categoryLabel}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[11px] text-[var(--color-text-muted)]">
          {photo.categoryLabel}
        </span>
        <span className="shrink-0 text-[11px] font-medium text-[var(--color-text)] tabular-nums">
          {photo.capturedAtLabel}
        </span>
      </div>
    </div>
  )
}

function OverlayPanel({
  a,
  b,
  opacity,
  onOpacityChange,
  opacityLabel,
}: {
  a: PhotoCompareRecord
  b: PhotoCompareRecord
  opacity: number
  onOpacityChange: (next: number) => void
  opacityLabel: string
}) {
  return (
    <div className="space-y-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] ring-1 ring-[var(--color-border)]">
        <img
          src={a.storageUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <img
          src={b.storageUrl}
          alt=""
          loading="lazy"
          style={{ opacity }}
          className="absolute inset-0 size-full object-cover transition-opacity"
        />
        <span className="absolute left-2 top-2 inline-flex h-5 items-center rounded-full bg-black/55 px-2 text-[10px] font-medium text-white backdrop-blur-[2px] tabular-nums">
          {a.capturedAtLabel}
        </span>
        <span className="absolute right-2 top-2 inline-flex h-5 items-center rounded-full bg-[var(--color-accent)]/85 px-2 text-[10px] font-medium text-[var(--color-accent-text)] backdrop-blur-[2px] tabular-nums">
          {b.capturedAtLabel}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 shrink-0 text-[11px] text-[var(--color-text-muted)]">
          {opacityLabel}
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={opacity}
          onChange={(e) => onOpacityChange(Number(e.target.value))}
          className="h-1.5 flex-1 accent-[var(--color-accent)]"
          aria-label={opacityLabel}
        />
        <span className="w-10 text-right text-[11px] font-medium text-[var(--color-text)] tabular-nums">
          {Math.round(opacity * 100)}%
        </span>
      </div>
    </div>
  )
}
