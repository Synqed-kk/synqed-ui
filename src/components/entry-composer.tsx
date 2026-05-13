import { Plus, Sparkles } from 'lucide-react'
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'
import { Input } from './input.js'

// ------------------------------------------------------------
// Karute entry composer — text input + AI category preview +
// in-flight added entries list. Pure: caller passes a
// `categorize` function that infers a category from the text.
// ------------------------------------------------------------

export interface EntryComposerCopy {
  placeholder: string
  addButton: string
  hint: string
  aiCategoryLabel: string
  aiCategoryConfidenceLabel: string
}

const DEFAULT_COPY: EntryComposerCopy = {
  placeholder: 'Add a note…',
  addButton: 'Add',
  hint: 'AI auto-detects the category from your entry.',
  aiCategoryLabel: 'Category:',
  aiCategoryConfidenceLabel: 'confidence ',
}

export interface EntryComposerInferred {
  category: string
  /** 0–1 confidence. */
  confidence: number
}

export interface EntryComposerEntry {
  id: string
  category: string
  time: string
  content: string
  confidence: number
}

interface EntryComposerProps extends HTMLAttributes<HTMLDivElement> {
  copy?: Partial<EntryComposerCopy>
  /** Returns null when the input is too short to classify. */
  categorize: (text: string) => EntryComposerInferred | null
  /** Called whenever a new entry is committed. */
  onAdd?: (entry: EntryComposerEntry) => void
  /** Optional banner rendered above the composer (e.g. business profile hint). */
  topSlot?: ReactNode
}

export function EntryComposer({
  copy,
  categorize,
  onAdd,
  topSlot,
  className,
  ...props
}: EntryComposerProps) {
  const L: EntryComposerCopy = { ...DEFAULT_COPY, ...copy }
  const [value, setValue] = useState('')
  const [added, setAdded] = useState<EntryComposerEntry[]>([])
  const inferred = categorize(value)

  const handleAdd = () => {
    if (!value.trim() || !inferred) return
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const entry: EntryComposerEntry = {
      id: `e-${Date.now()}`,
      category: inferred.category,
      time,
      content: value,
      confidence: inferred.confidence,
    }
    setAdded((prev) => [...prev, entry])
    setValue('')
    onAdd?.(entry)
  }

  return (
    <div
      className={cn(
        'border-t border-[var(--color-border)] px-3 pb-4 pt-4 md:pb-0',
        className,
      )}
      {...props}
    >
      {topSlot && <div className="mb-2">{topSlot}</div>}
      {added.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {added.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-3 py-2"
            >
              <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-[var(--color-accent)]/20 px-2 text-[11px] font-medium text-[var(--color-accent)]">
                {entry.category}
              </span>
              <span className="w-11 shrink-0 pt-0.5 text-xs tabular-nums text-[var(--color-text-muted)]">
                {entry.time}
              </span>
              <p className="flex-1 text-sm leading-relaxed text-[var(--color-text)]/90">
                {entry.content}
              </p>
              <span className="shrink-0 text-[10px] font-medium tabular-nums text-[var(--color-accent)]">
                {Math.round(entry.confidence * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={L.placeholder}
          className="h-9 text-sm"
        />
        <Button
          onClick={handleAdd}
          disabled={!value.trim() || !inferred}
          size="sm"
          className="h-9 shrink-0 gap-1.5"
        >
          <Plus className="size-3.5" />
          {L.addButton}
        </Button>
      </div>
      <div className="mt-2 flex min-h-[18px] items-center gap-1.5 text-xs">
        {inferred ? (
          <>
            <Sparkles className="size-3 text-[var(--color-accent)]" />
            <span className="text-[var(--color-text-muted)]">{L.aiCategoryLabel}</span>
            <span className="font-medium text-[var(--color-accent)]">{inferred.category}</span>
            <span className="tabular-nums text-[var(--color-text-muted)]">
              ({L.aiCategoryConfidenceLabel}
              {Math.round(inferred.confidence * 100)}%)
            </span>
          </>
        ) : (
          <span className="text-[var(--color-text-muted)]/60">{L.hint}</span>
        )}
      </div>
    </div>
  )
}
