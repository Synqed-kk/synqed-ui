import { cn } from '../utils/cn.js'
import type { PhotoCategoryColor } from './photo-category-picker.js'

// ------------------------------------------------------------
// Photo thumbnail leaf. Square tile with image, category badge,
// capture date, and optional selection / dimmed visual states.
// Pure presenter; caller wires onClick.
// ------------------------------------------------------------

export interface PhotoThumbnailRecord {
  id: string
  /** Thumbnail image URL. Caller resolves signed URLs upstream. */
  thumbnailUrl: string
  /** Caption used for alt text, if available. */
  caption?: string
  /** Display label for the category (already localized). */
  categoryLabel: string
  /** Color of the category badge. Defaults to slate. */
  categoryColor?: PhotoCategoryColor
  /** Display date for the bottom label. */
  capturedAtLabel: string
}

interface Props {
  photo: PhotoThumbnailRecord
  onClick?: () => void
  selected?: boolean
  dimmed?: boolean
  className?: string
}

const badgeBg: Record<PhotoCategoryColor, string> = {
  blue: 'bg-[var(--color-accent)]/90 text-[var(--color-accent-text)]',
  amber: 'bg-[var(--color-warning)]/90 text-[var(--color-text-inverse)]',
  green: 'bg-[var(--color-success)]/90 text-[var(--color-text-inverse)]',
  indigo: 'bg-[var(--color-accent)]/90 text-[var(--color-accent-text)]',
  rose: 'bg-[var(--color-destructive)]/90 text-[var(--color-destructive-text)]',
  slate: 'bg-[var(--color-text)]/80 text-[var(--color-bg-card)]',
}

export function PhotoThumbnail({
  photo,
  onClick,
  selected = false,
  dimmed = false,
  className,
}: Props) {
  const interactive = typeof onClick === 'function'
  const color = photo.categoryColor ?? 'slate'
  const ariaLabel = interactive
    ? `${photo.categoryLabel} · ${photo.capturedAtLabel}`
    : undefined

  const classes = cn(
    'group relative block aspect-square w-full overflow-hidden rounded-[var(--radius-md)]',
    'bg-[var(--color-bg-muted)] ring-1 ring-[var(--color-border)] transition-all',
    selected && 'ring-2 ring-[var(--color-accent)] shadow-lg',
    dimmed && 'opacity-40',
    interactive && 'cursor-pointer active:scale-[0.98]',
    className,
  )

  const inner = (
    <>
      <img
        src={photo.thumbnailUrl}
        alt={photo.caption ?? photo.categoryLabel}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
      />
      <span
        className={cn(
          'absolute left-1.5 top-1.5 inline-flex h-5 items-center rounded-full px-1.5 text-[10px] font-medium backdrop-blur-[2px]',
          badgeBg[color],
        )}
      >
        {photo.categoryLabel}
      </span>
      <span className="absolute inset-x-1.5 bottom-1.5 text-[10px] font-medium leading-none text-white tabular-nums">
        {photo.capturedAtLabel}
      </span>
      {selected && (
        <span className="absolute right-1.5 top-1.5 inline-flex size-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[11px] font-semibold text-[var(--color-accent-text)]">
          ✓
        </span>
      )}
    </>
  )

  if (interactive) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
        {inner}
      </button>
    )
  }
  return <div className={classes}>{inner}</div>
}
