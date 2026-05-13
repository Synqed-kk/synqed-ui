import { MessageSquare, Pencil, Send } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'

// ------------------------------------------------------------
// AI-drafted outreach message preview with Edit + Send actions.
// Pure presentation: callers wire the channel send + audit row.
// ------------------------------------------------------------

export interface AIOutreachCopy {
  recommendedHeader: string
  editLabel: string
  approveSendLabel: string
}

const DEFAULT_COPY: AIOutreachCopy = {
  recommendedHeader: 'AI recommended message',
  editLabel: 'Edit',
  approveSendLabel: 'Approve & send',
}

interface AIOutreachCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Channel label e.g. "LINE", "SMS", "Email" */
  channel: string
  /** Subscript line such as "Misaki Tanaka · scheduled via LINE" */
  subscript: string
  preview: string
  copy?: Partial<AIOutreachCopy>
  onEdit?: (preview: string) => void
  onSend?: (preview: string) => void
}

export const AIOutreachCard = forwardRef<HTMLDivElement, AIOutreachCardProps>(
  ({ channel: _channel, subscript, preview, copy, onEdit, onSend, className, ...props }, ref) => {
    const L: AIOutreachCopy = { ...DEFAULT_COPY, ...copy }
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-md)] border border-[var(--color-accent)]/20 bg-[var(--color-bg-card)] p-5',
          className,
        )}
        {...props}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)]">
              <MessageSquare className="size-3.5" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              {L.recommendedHeader}
            </span>
          </div>
          <span className="truncate text-[11px] text-[var(--color-text-muted)]">{subscript}</span>
        </div>
        <div className="mb-4 rounded-[var(--radius-sm)] bg-[var(--color-bg-muted)] p-3.5">
          <p className="text-[14px] leading-relaxed text-[var(--color-text)]">{preview}</p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(preview)}
            className="h-10 flex-1 gap-1.5"
          >
            <Pencil className="size-3.5" />
            {L.editLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => onSend?.(preview)}
            className="h-10 flex-1 gap-1.5"
          >
            <Send className="size-3.5" />
            {L.approveSendLabel}
          </Button>
        </div>
      </div>
    )
  },
)
AIOutreachCard.displayName = 'AIOutreachCard'
