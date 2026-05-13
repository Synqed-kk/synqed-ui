import {
  Activity,
  AlertCircle,
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'

// ------------------------------------------------------------
// Customer session-history card — accordion-style list of past
// karute with an inline detail body. All data via props.
// ------------------------------------------------------------

export type SessionHistoryAiTone = 'summarized' | 'review_needed' | 'pending'
export type SessionHistoryConversion = 'active' | 'provisional' | 'declined'

export interface SessionHistoryEntries {
  concern?: string[]
  condition?: string[]
  treatment?: string[]
  product?: string[]
  next?: string[]
}

export interface SessionHistoryItem {
  id: string
  /** Display variant of the date (already localized). */
  dateDisplay: string
  weekday: string
  service: string
  duration: number
  staffName: string
  summary: string
  entryCount: number
  takeaways: string[]
  entriesByCategory: SessionHistoryEntries
  memoryExtractedCount: number
  aiStatusTone: SessionHistoryAiTone
  aiStatusLabel: string
  conversionStatus: SessionHistoryConversion
  /** "latest" badge appears on first row when true. */
  isLatest?: boolean
}

export interface SessionHistoryCopy {
  title: string
  count: (n: number) => string
  empty: string
  latest: string
  entriesSuffix: string
  memoryFooter: (n: number) => string
  memoryFooterZero: string
  memoryBadge: (n: number) => string
  takeawaysTitle: string
  openFullKarute: string
  minutesSuffix: string
  weekdaySuffix: string
  cat: {
    concern: string
    condition: string
    treatment: string
    product: string
    next: string
  }
  conversion: {
    provisional: string
    declined: string
  }
}

const DEFAULT_COPY: SessionHistoryCopy = {
  title: 'Session history',
  count: (n) => `${n} sessions`,
  empty: 'No sessions yet.',
  latest: 'latest',
  entriesSuffix: ' entries',
  memoryFooter: (n) =>
    `This session added ${n} memory item${n === 1 ? '' : 's'}. See the Memory tab.`,
  memoryFooterZero: 'No memory items were added from this session.',
  memoryBadge: (n) => `+${n} memory`,
  takeawaysTitle: 'Staff takeaways',
  openFullKarute: 'Open full karute',
  minutesSuffix: ' min',
  weekdaySuffix: '',
  cat: {
    concern: 'Concerns',
    condition: 'Observations',
    treatment: 'Treatment',
    product: 'Recommendations',
    next: 'Next visit',
  },
  conversion: {
    provisional: 'provisional',
    declined: 'declined',
  },
}

interface CustomerSessionHistoryProps extends HTMLAttributes<HTMLElement> {
  sessions: SessionHistoryItem[]
  copy?: Partial<SessionHistoryCopy>
  /** Render-prop for the per-session "open karute" CTA. Receives the session
   *  and the children. Default renders a button that fires onOpenKarute. */
  openKaruteSlot?: (session: SessionHistoryItem, children: ReactNode) => ReactNode
  onOpenKarute?: (session: SessionHistoryItem) => void
}

const CATEGORY_ICONS: Record<keyof SessionHistoryEntries, LucideIcon> = {
  concern: MessageCircle,
  condition: Stethoscope,
  treatment: Activity,
  product: Sparkles,
  next: Calendar,
}

const CATEGORY_TONES: Record<keyof SessionHistoryEntries, string> = {
  concern: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  condition: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  treatment: 'bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]',
  product: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  next: 'bg-[var(--color-bg-muted)] text-[var(--color-text)]',
}

function StatusPill({
  status,
  L,
}: {
  status: SessionHistoryConversion
  L: SessionHistoryCopy
}) {
  if (status === 'provisional') {
    return (
      <span className="inline-flex h-4 items-center gap-0.5 rounded border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-1.5 text-[9px] font-medium text-[var(--color-warning)]">
        <Clock className="size-2" aria-hidden />
        {L.conversion.provisional}
      </span>
    )
  }
  if (status === 'declined') {
    return (
      <span className="inline-flex h-4 items-center rounded bg-[var(--color-bg-muted)] px-1.5 text-[9px] font-medium text-[var(--color-text-muted)]">
        {L.conversion.declined}
      </span>
    )
  }
  return null
}

function AIStatusBadge({
  tone,
  label,
}: {
  tone: SessionHistoryAiTone
  label: string
}) {
  const className =
    tone === 'summarized'
      ? 'text-[var(--color-success)]'
      : tone === 'review_needed'
        ? 'text-[var(--color-warning)]'
        : 'text-[var(--color-text-muted)]'
  const Icon: LucideIcon = tone === 'review_needed' ? AlertCircle : CheckCircle2
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      <Icon className="size-2.5" aria-hidden />
      {label}
    </span>
  )
}

export function CustomerSessionHistory({
  sessions,
  copy,
  openKaruteSlot,
  onOpenKarute,
  className,
  ...props
}: CustomerSessionHistoryProps) {
  const L: SessionHistoryCopy = { ...DEFAULT_COPY, ...copy }
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (sessions.length === 0) {
    return (
      <section
        className={cn(
          'rounded-[var(--radius-lg)] bg-[var(--color-bg-card)] p-5 ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
          className,
        )}
        {...props}
      >
        <div className="py-6 text-center">
          <ClipboardList
            className="mx-auto mb-1.5 size-6 text-[var(--color-border-strong)]"
            aria-hidden
          />
          <p className="text-sm text-[var(--color-text-muted)]">{L.empty}</p>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        'overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-card)] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3 md:px-5">
        <ClipboardList className="size-4 text-[var(--color-accent)]" aria-hidden />
        <h2 className="text-sm font-semibold text-[var(--color-text)]">{L.title}</h2>
        <span className="ml-auto text-[11px] tabular-nums text-[var(--color-text-muted)]">
          {L.count(sessions.length)}
        </span>
      </div>

      <ol className="divide-y divide-[var(--color-border)]">
        {sessions.map((session) => {
          const isExpanded = expandedId === session.id
          const cta = (
            <button
              type="button"
              onClick={() => onOpenKarute?.(session)}
              className="inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 text-xs font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              {L.openFullKarute}
              <ArrowRight className="size-3.5" aria-hidden />
            </button>
          )
          return (
            <li key={session.id}>
              <button
                type="button"
                onClick={() => setExpandedId((cur) => (cur === session.id ? null : session.id))}
                aria-expanded={isExpanded}
                aria-controls={`session-${session.id}-detail`}
                className="group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-bg-card-hover)] md:px-5"
              >
                <div className="w-[72px] shrink-0 text-[11px] tabular-nums md:w-[92px]">
                  <div className="font-semibold text-[var(--color-text)]">
                    {session.dateDisplay}
                  </div>
                  <div className="mt-0.5 text-[var(--color-text-muted)]">
                    {session.weekday}
                    {L.weekdaySuffix}
                    {session.isLatest && (
                      <span className="ml-1 text-[9px] font-medium text-[var(--color-accent)]">
                        {L.latest}
                      </span>
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <span className="truncate text-[13px] font-medium text-[var(--color-text)]">
                      {session.service}
                    </span>
                    <span className="text-[11px] tabular-nums text-[var(--color-text-muted)]">
                      {session.duration}
                      {L.minutesSuffix}
                    </span>
                    <StatusPill status={session.conversionStatus} L={L} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                    {session.summary}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]">
                    <span>{session.staffName}</span>
                    <span className="text-[var(--color-border-strong)]">·</span>
                    <span className="tabular-nums">
                      {session.entryCount}
                      {L.entriesSuffix}
                    </span>
                    <span className="text-[var(--color-border-strong)]">·</span>
                    <AIStatusBadge tone={session.aiStatusTone} label={session.aiStatusLabel} />
                    {session.memoryExtractedCount > 0 && (
                      <>
                        <span className="text-[var(--color-border-strong)]">·</span>
                        <span className="inline-flex items-center gap-0.5 text-[var(--color-accent)]">
                          <Brain className="size-2.5" aria-hidden />
                          {L.memoryBadge(session.memoryExtractedCount)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'mt-1 size-4 shrink-0 transition-all',
                    isExpanded
                      ? 'rotate-180 text-[var(--color-accent)]'
                      : 'text-[var(--color-border-strong)] group-hover:text-[var(--color-accent)]',
                  )}
                  aria-hidden
                />
              </button>

              {isExpanded && (
                <div
                  id={`session-${session.id}-detail`}
                  className="border-t border-[var(--color-border)] bg-[var(--color-bg-muted)]/40 px-4 pb-4 pt-1 md:px-5"
                >
                  <div className="mt-2 space-y-3">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {(Object.keys(L.cat) as Array<keyof SessionHistoryEntries>).map((key) => {
                        const items = session.entriesByCategory[key]
                        if (!items || items.length === 0) return null
                        const Icon = CATEGORY_ICONS[key]
                        return (
                          <div
                            key={key}
                            className="rounded-[var(--radius-sm)] bg-[var(--color-bg-muted)] p-3"
                          >
                            <div className="mb-1.5 flex items-center gap-1.5">
                              <span
                                className={cn(
                                  'inline-flex size-5 items-center justify-center rounded',
                                  CATEGORY_TONES[key],
                                )}
                              >
                                <Icon className="size-3" aria-hidden />
                              </span>
                              <span className="flex-1 text-[11px] font-semibold tracking-tight text-[var(--color-text)]">
                                {L.cat[key]}
                              </span>
                              <span className="text-[10px] tabular-nums text-[var(--color-text-muted)]">
                                {items.length}
                              </span>
                            </div>
                            <ul className="space-y-1">
                              {items.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-1.5 text-xs leading-relaxed text-[var(--color-text)]/85"
                                >
                                  <span className="mt-0.5 shrink-0 text-[var(--color-border-strong)]">
                                    •
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                    {session.takeaways.length > 0 && (
                      <div className="rounded-[var(--radius-sm)] border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 p-3">
                        <div className="mb-1.5 flex items-center gap-1.5">
                          <Lightbulb
                            className="size-3.5 text-[var(--color-warning)]"
                            aria-hidden
                          />
                          <span className="text-[11px] font-semibold tracking-tight text-[var(--color-warning)]">
                            {L.takeawaysTitle}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {session.takeaways.map((t, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-xs leading-relaxed text-[var(--color-text)]/85"
                            >
                              <span className="mt-0.5 shrink-0 text-[var(--color-warning)]/70">
                                ✦
                              </span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="text-[11px] text-[var(--color-text-muted)]">
                        {session.memoryExtractedCount > 0
                          ? L.memoryFooter(session.memoryExtractedCount)
                          : L.memoryFooterZero}
                      </div>
                      {openKaruteSlot ? openKaruteSlot(session, cta) : cta}
                    </div>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
