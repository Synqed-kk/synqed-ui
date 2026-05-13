import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Chip-style category picker — used inside the photo capture
// dialog (single-select) and as the gallery filter row (filter
// with an "All" sentinel). Pure presenter; caller wires state.
// ------------------------------------------------------------

export type PhotoCategoryColor =
  | 'blue'
  | 'amber'
  | 'green'
  | 'indigo'
  | 'rose'
  | 'slate'

export interface PhotoCategory {
  /** Stable identifier stored on photos. */
  key: string
  /** Display label. Caller localizes upstream. */
  label: string
  /** Semantic color token. */
  color: PhotoCategoryColor
}

interface BaseProps {
  categories: PhotoCategory[]
  className?: string
}

interface SingleProps extends BaseProps {
  mode: 'single'
  value: string | null
  onChange: (key: string) => void
}

interface FilterProps extends BaseProps {
  mode: 'filter'
  /** null = "All" sentinel selected. */
  value: string | null
  onChange: (key: string | null) => void
  allLabel: string
}

type Props = SingleProps | FilterProps

// Color → chip classes. Semantic tones for blue→accent and the rest
// reuse the warning/success/destructive tokens. Slate falls back to
// the muted bg + foreground text.
const chipActive: Record<PhotoCategoryColor, string> = {
  blue: 'bg-[var(--color-accent)] text-[var(--color-accent-text)] ring-1 ring-[var(--color-accent)]',
  amber: 'bg-[var(--color-warning)] text-[var(--color-text-inverse)] ring-1 ring-[var(--color-warning)]',
  green: 'bg-[var(--color-success)] text-[var(--color-text-inverse)] ring-1 ring-[var(--color-success)]',
  indigo: 'bg-[var(--color-accent)] text-[var(--color-accent-text)] ring-1 ring-[var(--color-accent)]',
  rose: 'bg-[var(--color-destructive)] text-[var(--color-destructive-text)] ring-1 ring-[var(--color-destructive)]',
  slate: 'bg-[var(--color-text)] text-[var(--color-bg-card)] ring-1 ring-[var(--color-text)]',
}

const chipIdle =
  'bg-[var(--color-bg-card)] text-[var(--color-text)]/80 ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)]'

export function PhotoCategoryPicker(props: Props) {
  const { categories, className } = props

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {props.mode === 'filter' && (
        <button
          type="button"
          onClick={() => props.onChange(null)}
          className={cn(
            'inline-flex h-7 items-center rounded-full px-3 text-[12px] font-medium transition-colors',
            props.value === null ? chipActive.slate : chipIdle,
          )}
        >
          {props.allLabel}
        </button>
      )}
      {categories.map((c) => {
        const active = props.value === c.key
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => {
              if (props.mode === 'single') props.onChange(c.key)
              else props.onChange(active ? null : c.key)
            }}
            aria-pressed={active}
            className={cn(
              'inline-flex h-7 items-center whitespace-nowrap rounded-full px-3 text-[12px] font-medium transition-colors',
              active ? chipActive[c.color] : chipIdle,
            )}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
