import {
  Activity,
  Brain,
  ChevronDown,
  ChevronRight,
  FileText,
  Heart,
  Leaf,
  MessageCircle,
  Pencil,
  Pin,
  PinOff,
  Plus,
  Sparkles,
  Target,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Customer memory card — talking points + grouped category
// sections + add affordance. Pure: caller wires the mutations
// (togglePin / edit / remove / add).
// ------------------------------------------------------------

export type MemoryCategory = 'personal' | 'body' | 'preference' | 'goal' | 'lifestyle'
export type MemoryItemSource = 'intake_form' | 'staff' | 'ai_extraction'

export interface MemoryItem {
  id: string
  category: MemoryCategory
  label: string
  detail?: string
  source: MemoryItemSource
  /** 0–1 — only used for ai_extraction to surface a "review" badge. */
  confidence: number
  pinned: boolean
  /** When set, the item appears in the "talking points" block. */
  suggestTalkingPoint?: boolean
  sourceSessionDate?: string
}

export interface MemoryIntake {
  firstVisitDate?: string
  occupation?: string
  goalLabel?: string
  heardFromLabel?: string
}

export interface CustomerMemoryData {
  customerId: string
  items: MemoryItem[]
  intake: MemoryIntake
  updatedThisVisit: number
  lastUpdatedDisplay: string
}

export interface CustomerMemoryCopy {
  title: string
  subtitle: (name: string) => string
  updatedBadge: (n: number) => string
  talkingPointsHeader: string
  emptyTitle: string
  emptyBody: string
  lastUpdatedLabel: string
  addAction: string
  addPausedTitle: string
  pinTitle: string
  unpinTitle: string
  editTitle: string
  removeTitle: string
  lowConfidenceBadge: string
  lowConfidenceTitle: string
  pinnedAria: string
  sourceLabel: (source: MemoryItemSource) => string
  category: Record<MemoryCategory, string>
}

const DEFAULT_COPY: CustomerMemoryCopy = {
  title: 'Customer Memory',
  subtitle: (name) => `AI-curated profile of everything ${name} has shared.`,
  updatedBadge: (n) => (n === 1 ? '1 new from today' : `${n} new from today`),
  talkingPointsHeader: 'Talking points for today',
  emptyTitle: 'Memory not built up yet',
  emptyBody: 'As sessions happen, AI extracts details from what the customer shares.',
  lastUpdatedLabel: 'Last updated',
  addAction: 'Add manually',
  addPausedTitle: 'Paused — customer is scheduled for deletion',
  pinTitle: 'Pin this item',
  unpinTitle: 'Unpin',
  editTitle: 'Edit',
  removeTitle: 'Remove',
  lowConfidenceBadge: 'Review',
  lowConfidenceTitle: 'AI confidence is low — worth a quick staff review.',
  pinnedAria: 'Pinned',
  sourceLabel: (s) =>
    s === 'intake_form' ? 'from intake form' : s === 'staff' ? 'staff note' : 'AI-extracted',
  category: {
    personal: 'Personal',
    body: 'Body & health',
    preference: 'Preferences',
    goal: 'Goals',
    lifestyle: 'Lifestyle',
  },
}

const PRESENTATION: Record<
  MemoryCategory,
  { Icon: LucideIcon; accent: string; tint: string }
> = {
  personal: {
    Icon: Heart,
    accent: 'text-[var(--color-destructive)]',
    tint: 'bg-[var(--color-destructive)]/10 border-[var(--color-destructive)]/20',
  },
  body: {
    Icon: Activity,
    accent: 'text-[var(--color-accent)]',
    tint: 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20',
  },
  preference: {
    Icon: Sparkles,
    accent: 'text-[var(--color-accent)]',
    tint: 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20',
  },
  goal: {
    Icon: Target,
    accent: 'text-[var(--color-warning)]',
    tint: 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30',
  },
  lifestyle: {
    Icon: Leaf,
    accent: 'text-[var(--color-success)]',
    tint: 'bg-[var(--color-success)]/10 border-[var(--color-success)]/20',
  },
}

function groupByCategory(items: MemoryItem[]): Record<MemoryCategory, MemoryItem[]> {
  const out: Record<MemoryCategory, MemoryItem[]> = {
    personal: [],
    body: [],
    preference: [],
    goal: [],
    lifestyle: [],
  }
  for (const item of items) {
    out[item.category].push(item)
  }
  ;(Object.keys(out) as MemoryCategory[]).forEach((k) => {
    out[k].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      const ad = a.sourceSessionDate ?? ''
      const bd = b.sourceSessionDate ?? ''
      return bd.localeCompare(ad)
    })
  })
  return out
}

interface CustomerMemoryCardProps extends HTMLAttributes<HTMLElement> {
  memory: CustomerMemoryData
  customerName: string
  copy?: Partial<CustomerMemoryCopy>
  /** Disable the add affordance (e.g. customer pending deletion). */
  addDisabled?: boolean
  addDisabledTooltip?: string
  onAdd?: () => void
  onTogglePin?: (item: MemoryItem) => void
  onEdit?: (item: MemoryItem) => void
  onRemove?: (item: MemoryItem) => void
  /** Optional intake summary slot — allows callers to render a custom line. */
  intakeSummarySlot?: ReactNode
}

function MemoryItemRow({
  item,
  L,
  onTogglePin,
  onEdit,
  onRemove,
}: {
  item: MemoryItem
  L: CustomerMemoryCopy
  onTogglePin?: (item: MemoryItem) => void
  onEdit?: (item: MemoryItem) => void
  onRemove?: (item: MemoryItem) => void
}) {
  return (
    <li className="group text-sm leading-relaxed text-[var(--color-text)]/90">
      <div className="flex items-start gap-2">
        <span aria-hidden className="mt-0.5 shrink-0 text-[var(--color-border-strong)]">
          •
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="font-medium">{item.label}</span>
            {item.pinned && (
              <Pin
                className="size-2.5 shrink-0 text-[var(--color-warning)]"
                aria-label={L.pinnedAria}
              />
            )}
            {item.source === 'ai_extraction' && item.confidence < 0.75 && (
              <span
                className="shrink-0 text-[9px] uppercase tracking-wider text-[var(--color-warning)]"
                title={L.lowConfidenceTitle}
              >
                {L.lowConfidenceBadge}
              </span>
            )}
          </div>
          {item.detail && (
            <div className="mt-0.5 text-xs text-[var(--color-text-muted)]">{item.detail}</div>
          )}
          <div className="mt-0.5 flex items-center gap-2 text-[10px] tabular-nums text-[var(--color-text-muted)]">
            <span>{L.sourceLabel(item.source)}</span>
            {item.sourceSessionDate && (
              <>
                <span aria-hidden className="text-[var(--color-border-strong)]">
                  ·
                </span>
                <span>{item.sourceSessionDate}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          {onTogglePin && (
            <button
              type="button"
              title={item.pinned ? L.unpinTitle : L.pinTitle}
              aria-label={item.pinned ? L.unpinTitle : L.pinTitle}
              onClick={() => onTogglePin(item)}
              className="inline-flex size-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-muted)]"
            >
              {item.pinned ? <PinOff className="size-3" /> : <Pin className="size-3" />}
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              title={L.editTitle}
              aria-label={L.editTitle}
              onClick={() => onEdit(item)}
              className="inline-flex size-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-muted)]"
            >
              <Pencil className="size-3" />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              title={L.removeTitle}
              aria-label={L.removeTitle}
              onClick={() => onRemove(item)}
              className="inline-flex size-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-destructive)]/10 hover:text-[var(--color-destructive)]"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

function CategorySection({
  category,
  items,
  L,
  onTogglePin,
  onEdit,
  onRemove,
}: {
  category: MemoryCategory
  items: MemoryItem[]
  L: CustomerMemoryCopy
  onTogglePin?: (item: MemoryItem) => void
  onEdit?: (item: MemoryItem) => void
  onRemove?: (item: MemoryItem) => void
}) {
  const defaultOpen = category === 'personal' || category === 'body'
  const [open, setOpen] = useState(defaultOpen)
  const pres = PRESENTATION[category]
  const Icon = pres.Icon
  return (
    <div className="mt-3 border-t border-[var(--color-border)] pt-3 first:mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-1 py-0.5 text-left transition-colors hover:bg-[var(--color-bg-muted)]"
      >
        <span
          className={cn(
            'inline-flex size-5 shrink-0 items-center justify-center rounded-full border',
            pres.tint,
          )}
          aria-hidden
        >
          <Icon className={cn('size-3', pres.accent)} />
        </span>
        <span className="flex-1 text-xs font-semibold text-[var(--color-text)]">
          {L.category[category]}
        </span>
        <span className="text-[10px] tabular-nums text-[var(--color-text-muted)]">
          {items.length}
        </span>
        {open ? (
          <ChevronDown className="size-3.5 text-[var(--color-text-muted)]" aria-hidden />
        ) : (
          <ChevronRight className="size-3.5 text-[var(--color-text-muted)]" aria-hidden />
        )}
      </button>
      {open && (
        <ul className="ml-7 mt-2 space-y-1.5">
          {items.map((item) => (
            <MemoryItemRow
              key={item.id}
              item={item}
              L={L}
              onTogglePin={onTogglePin}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export function CustomerMemoryCard({
  memory,
  customerName,
  copy,
  addDisabled,
  addDisabledTooltip,
  onAdd,
  onTogglePin,
  onEdit,
  onRemove,
  intakeSummarySlot,
  className,
  ...props
}: CustomerMemoryCardProps) {
  const L: CustomerMemoryCopy = { ...DEFAULT_COPY, ...copy }
  const isEmpty = memory.items.length === 0
  const talkingPoints = memory.items.filter((i) => i.suggestTalkingPoint && !!i.label)
  const byCategory = groupByCategory(memory.items)

  const intakeLine = intakeSummarySlot ?? (() => {
    const parts: string[] = []
    if (memory.intake.firstVisitDate) parts.push(memory.intake.firstVisitDate)
    if (memory.intake.occupation) parts.push(memory.intake.occupation)
    if (memory.intake.goalLabel) parts.push(memory.intake.goalLabel)
    if (memory.intake.heardFromLabel) parts.push(memory.intake.heardFromLabel)
    if (parts.length === 0) return null
    return (
      <div className="text-[11px] leading-relaxed text-[var(--color-text-muted)]">
        {parts.join(' · ')}
      </div>
    )
  })()

  return (
    <section
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 md:p-5',
        className,
      )}
      aria-labelledby="customer-memory-heading"
      {...props}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)]">
            <Brain className="size-3.5" aria-hidden />
          </div>
          <div className="min-w-0">
            <h3
              id="customer-memory-heading"
              className="text-sm font-semibold text-[var(--color-text)]"
            >
              {L.title}
            </h3>
            <p className="mt-0.5 truncate text-[11px] text-[var(--color-text-muted)]">
              {L.subtitle(customerName)}
            </p>
          </div>
        </div>
        {memory.updatedThisVisit > 0 && (
          <span className="inline-flex h-5 shrink-0 items-center gap-1 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-2 text-[10px] font-medium tabular-nums text-[var(--color-accent)]">
            <Sparkles className="size-2.5" aria-hidden />
            {L.updatedBadge(memory.updatedThisVisit)}
          </span>
        )}
      </div>

      {intakeLine}

      {isEmpty && (
        <div className="mt-3 rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-muted)] px-4 py-6 text-center">
          <FileText
            className="mx-auto mb-1.5 size-5 text-[var(--color-border-strong)]"
            aria-hidden
          />
          <div className="text-sm font-medium text-[var(--color-text)]">{L.emptyTitle}</div>
          <p className="mx-auto mt-1 max-w-sm text-[11px] leading-relaxed text-[var(--color-text-muted)]">
            {L.emptyBody}
          </p>
        </div>
      )}

      {!isEmpty && talkingPoints.length > 0 && (
        <div className="mt-3 rounded-[var(--radius-sm)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 p-3">
          <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            <MessageCircle className="size-3" aria-hidden />
            {L.talkingPointsHeader}
          </div>
          <ul className="space-y-1.5">
            {talkingPoints.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text)]/90"
              >
                <span aria-hidden className="mt-0.5 shrink-0 text-[var(--color-accent)]">
                  •
                </span>
                <span className="min-w-0">
                  <span className="font-medium">{item.label}</span>
                  {item.detail && (
                    <span className="text-[var(--color-text-muted)]"> — {item.detail}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isEmpty &&
        (Object.keys(L.category) as MemoryCategory[]).map((cat) => {
          const items = byCategory[cat] ?? []
          if (items.length === 0) return null
          return (
            <CategorySection
              key={cat}
              category={cat}
              items={items}
              L={L}
              onTogglePin={onTogglePin}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          )
        })}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] pt-3">
        <button
          type="button"
          disabled={addDisabled}
          title={addDisabled ? addDisabledTooltip ?? L.addPausedTitle : undefined}
          onClick={() => !addDisabled && onAdd?.()}
          className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 text-xs font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-muted)]"
        >
          <Plus className="size-3.5" aria-hidden />
          {L.addAction}
        </button>
        <span className="text-[10px] tabular-nums text-[var(--color-text-muted)]">
          {L.lastUpdatedLabel}: {memory.lastUpdatedDisplay}
        </span>
      </div>
    </section>
  )
}
