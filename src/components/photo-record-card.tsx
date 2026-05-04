import { Camera, Eye, Images, Plus } from 'lucide-react'
import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn.js'
import {
  PhotoThumbnail,
  type PhotoThumbnailRecord,
} from './photo-thumbnail.js'

// ------------------------------------------------------------
// "Photos" section on the karute detail page. Shows a strip of
// recent thumbnails plus two entry points: "add" (opens capture
// dialog) and "show customer" (opens gallery sheet). Pure
// presenter — caller wires both flows.
// ------------------------------------------------------------

export interface PhotoRecordCardCopy {
  title: string
  subtitle: string
  showCustomerAction: string
  emptyTitle: string
  emptyBody: string
  addAction: string
  seeAllAction: string
  addPausedTooltip: string
}

const DEFAULT_COPY: PhotoRecordCardCopy = {
  title: 'Photos',
  subtitle: 'Customer-safe gallery for tracking progress.',
  showCustomerAction: 'Show customer',
  emptyTitle: 'No photos yet',
  emptyBody: 'Capture photos during sessions to build a visual history.',
  addAction: 'Add photo',
  seeAllAction: 'See all',
  addPausedTooltip: 'Paused — customer is scheduled for deletion.',
}

interface Props extends HTMLAttributes<HTMLElement> {
  /** Recent thumbnails to render in the strip (caller slices). */
  recentPhotos: PhotoThumbnailRecord[]
  /** Total photo count for the "see all (N)" affordance. */
  totalPhotoCount: number
  /** Hide the upload button (e.g. customer pending deletion). */
  addDisabled?: boolean
  addDisabledTooltip?: string
  copy?: Partial<PhotoRecordCardCopy>
  onAdd?: () => void
  onShowGallery?: () => void
  /** Called when staff taps an individual thumbnail. */
  onPhotoClick?: (photoId: string) => void
}

export function PhotoRecordCard({
  recentPhotos,
  totalPhotoCount,
  addDisabled,
  addDisabledTooltip,
  copy,
  onAdd,
  onShowGallery,
  onPhotoClick,
  className,
  ...props
}: Props) {
  const L: PhotoRecordCardCopy = { ...DEFAULT_COPY, ...copy }
  const hasPhotos = recentPhotos.length > 0

  return (
    <section
      className={cn(
        'border-b border-[var(--color-border)] bg-[var(--color-bg-card)] p-4',
        'md:rounded-[var(--radius-lg)] md:border md:border-[var(--color-border)] md:p-5',
        className,
      )}
      {...props}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Images
            className="size-4 shrink-0 text-[var(--color-accent)]"
            aria-hidden
          />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">
              {L.title}
            </h3>
            <p className="mt-0.5 truncate text-[11px] text-[var(--color-text-muted)]">
              {L.subtitle}
            </p>
          </div>
        </div>
        {hasPhotos && onShowGallery && (
          <button
            type="button"
            onClick={onShowGallery}
            className="inline-flex h-8 shrink-0 items-center gap-1 rounded-[var(--radius-sm)] px-2.5 text-[12px] font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/10"
          >
            <Eye className="size-3.5" aria-hidden />
            {L.showCustomerAction}
          </button>
        )}
      </div>

      {hasPhotos ? (
        <div className="grid grid-cols-4 gap-2">
          {recentPhotos.map((photo) => (
            <PhotoThumbnail
              key={photo.id}
              photo={photo}
              onClick={
                onPhotoClick
                  ? () => onPhotoClick(photo.id)
                  : onShowGallery
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-muted)] px-4 py-6 text-center">
          <Camera
            className="mx-auto mb-1.5 size-5 text-[var(--color-text-muted)]"
            aria-hidden
          />
          <div className="text-[13px] font-medium text-[var(--color-text)]">
            {L.emptyTitle}
          </div>
          <p className="mx-auto mt-1 max-w-sm text-[11px] leading-relaxed text-[var(--color-text-muted)]">
            {L.emptyBody}
          </p>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          disabled={addDisabled}
          title={
            addDisabled ? addDisabledTooltip ?? L.addPausedTooltip : undefined
          }
          onClick={() => !addDisabled && onAdd?.()}
          className={cn(
            'inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-[13px] font-medium transition-colors',
            'bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)]',
            'disabled:cursor-not-allowed disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-muted)]',
          )}
        >
          <Plus className="size-3.5" aria-hidden />
          {L.addAction}
        </button>
        {hasPhotos && onShowGallery && (
          <button
            type="button"
            onClick={onShowGallery}
            className="text-[12px] font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {L.seeAllAction} ({totalPhotoCount})
          </button>
        )}
      </div>
    </section>
  )
}
