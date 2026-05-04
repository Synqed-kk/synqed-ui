import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '../utils/cn.js'
import {
  PhotoCategoryPicker,
  type PhotoCategory,
} from './photo-category-picker.js'
import { PhotoCompareView } from './photo-compare-view.js'
import { PhotoThumbnail } from './photo-thumbnail.js'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './sheet.js'

// ------------------------------------------------------------
// Customer-safe photo gallery sheet. PRIVACY CONTRACT: this sheet
// must only render photo data. Do not add AI, coaching, or staff-
// private content here — the gallery is the only karute surface
// that is safe to hand to a customer.
//
// Three internal modes: grid (default), detail, compare. Pure
// presenter — caller passes the full photo set and any localized
// labels.
// ------------------------------------------------------------

import type { PhotoCategoryColor } from './photo-category-picker.js'

export interface GalleryPhoto {
  id: string
  /** Full-resolution URL. Caller resolves signed URLs upstream. */
  storageUrl: string
  thumbnailUrl: string
  /** Caller-localized category label. */
  categoryLabel: string
  categoryKey: string
  categoryColor?: PhotoCategoryColor
  /** Optional free-form caption. */
  caption?: string
  /** Display date (already formatted by caller). */
  capturedAtLabel: string
  /** Display name of the staff member who captured. */
  capturedByStaffName: string
}

export interface PhotoGallerySheetCopy {
  galleryTitle: string
  filterAllLabel: string
  comparePickHint: string
  compareToggle: string
  compareExit: string
  compareSideBySide: string
  compareOverlay: string
  compareOpacity: string
  noCaption: string
  takenByPrefix: string
  closeLabel: string
  backLabel: string
}

const DEFAULT_COPY: PhotoGallerySheetCopy = {
  galleryTitle: 'Photos',
  filterAllLabel: 'All',
  comparePickHint: 'Pick two photos to compare.',
  compareToggle: 'Compare two photos',
  compareExit: 'Exit compare',
  compareSideBySide: 'Side by side',
  compareOverlay: 'Overlay',
  compareOpacity: 'Opacity',
  noCaption: 'No caption',
  takenByPrefix: 'Taken by ',
  closeLabel: 'Close',
  backLabel: 'Back',
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  photos: GalleryPhoto[]
  /** Categories used to render the filter chips. Pass the same set
   *  available in the org. The component shows only categories that
   *  actually appear in `photos`. */
  categories: PhotoCategory[]
  /** Optional title prefix (e.g. customer name). Rendered as
   *  `${title} · ${galleryTitle}`. */
  title?: string
  copy?: Partial<PhotoGallerySheetCopy>
}

type SheetMode =
  | { kind: 'grid' }
  | { kind: 'detail'; photoId: string }
  | { kind: 'compare'; pickedIds: string[] }

export function PhotoGallerySheet({
  open,
  onOpenChange,
  photos,
  categories,
  title,
  copy,
}: Props) {
  const L: PhotoGallerySheetCopy = { ...DEFAULT_COPY, ...copy }

  const [filterKey, setFilterKey] = useState<string | null>(null)
  const [mode, setMode] = useState<SheetMode>({ kind: 'grid' })

  const categoriesWithPhotos = useMemo(() => {
    const keysInUse = new Set(photos.map((p) => p.categoryKey))
    return categories.filter((c) => keysInUse.has(c.key))
  }, [categories, photos])

  const visible = useMemo(
    () =>
      filterKey == null
        ? photos
        : photos.filter((p) => p.categoryKey === filterKey),
    [photos, filterKey],
  )

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setMode({ kind: 'grid' })
      setFilterKey(null)
    }
    onOpenChange(next)
  }

  const pickedInCompare = mode.kind === 'compare' ? mode.pickedIds : []

  const handleThumbTap = (photo: GalleryPhoto) => {
    if (mode.kind === 'compare') {
      const already = pickedInCompare.includes(photo.id)
      let next: string[]
      if (already) next = pickedInCompare.filter((id) => id !== photo.id)
      else if (pickedInCompare.length < 2) next = [...pickedInCompare, photo.id]
      else next = [pickedInCompare[1]!, photo.id]
      setMode({ kind: 'compare', pickedIds: next })
      return
    }
    setMode({ kind: 'detail', photoId: photo.id })
  }

  const detailPhoto =
    mode.kind === 'detail'
      ? photos.find((p) => p.id === mode.photoId) ?? null
      : null

  const comparePhotos =
    mode.kind === 'compare' && pickedInCompare.length === 2
      ? pickedInCompare
          .map((id) => photos.find((p) => p.id === id))
          .filter((x): x is GalleryPhoto => !!x)
      : null

  const headerTitle = title
    ? `${title} · ${L.galleryTitle}`
    : L.galleryTitle

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        closeLabel={L.closeLabel}
        className="flex h-[92vh] flex-col p-0 md:mx-auto md:h-[88vh] md:max-w-3xl md:rounded-t-[var(--radius-xl)]"
      >
        <SheetHeader
          className={cn(
            'flex-row items-center gap-2 space-y-0 border-b border-[var(--color-border)] px-4 py-3 md:px-5',
          )}
        >
          {mode.kind === 'detail' && (
            <button
              type="button"
              onClick={() => setMode({ kind: 'grid' })}
              aria-label={L.backLabel}
              className="inline-flex size-8 items-center justify-center rounded-full text-[var(--color-text)]/70 transition-colors hover:bg-[var(--color-bg-card-hover)]"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <SheetTitle className="truncate text-[15px] font-semibold">
              {headerTitle}
            </SheetTitle>
            {mode.kind === 'compare' && (
              <p className="mt-0.5 truncate text-[11px] text-[var(--color-text-muted)]">
                {L.comparePickHint}
              </p>
            )}
          </div>
        </SheetHeader>

        <div className="ios-scroll min-h-0 flex-1 overflow-y-auto">
          {mode.kind === 'grid' && (
            <div className="space-y-4 px-4 py-4 md:px-5">
              {categoriesWithPhotos.length > 1 && (
                <PhotoCategoryPicker
                  mode="filter"
                  categories={categoriesWithPhotos}
                  value={filterKey}
                  onChange={setFilterKey}
                  allLabel={L.filterAllLabel}
                />
              )}
              <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                {visible.map((photo) => (
                  <PhotoThumbnail
                    key={photo.id}
                    photo={{
                      id: photo.id,
                      thumbnailUrl: photo.thumbnailUrl,
                      caption: photo.caption,
                      categoryLabel: photo.categoryLabel,
                      categoryColor: photo.categoryColor,
                      capturedAtLabel: photo.capturedAtLabel,
                    }}
                    onClick={() => handleThumbTap(photo)}
                  />
                ))}
              </div>
            </div>
          )}

          {mode.kind === 'detail' && detailPhoto && (
            <DetailView photo={detailPhoto} L={L} />
          )}

          {mode.kind === 'compare' && (
            <div className="space-y-4 px-4 py-4 md:px-5">
              {comparePhotos ? (
                <PhotoCompareView
                  a={{
                    storageUrl: comparePhotos[0]!.storageUrl,
                    caption: comparePhotos[0]!.caption,
                    categoryLabel: comparePhotos[0]!.categoryLabel,
                    capturedAtLabel: comparePhotos[0]!.capturedAtLabel,
                  }}
                  b={{
                    storageUrl: comparePhotos[1]!.storageUrl,
                    caption: comparePhotos[1]!.caption,
                    categoryLabel: comparePhotos[1]!.categoryLabel,
                    capturedAtLabel: comparePhotos[1]!.capturedAtLabel,
                  }}
                  copy={{
                    sideBySide: L.compareSideBySide,
                    overlay: L.compareOverlay,
                    opacity: L.compareOpacity,
                  }}
                />
              ) : (
                <div className="rounded-[var(--radius-sm)] bg-[var(--color-accent)]/10 px-4 py-3 text-[12px] text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20">
                  {L.comparePickHint}
                </div>
              )}
              <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                {visible.map((photo) => (
                  <PhotoThumbnail
                    key={photo.id}
                    photo={{
                      id: photo.id,
                      thumbnailUrl: photo.thumbnailUrl,
                      caption: photo.caption,
                      categoryLabel: photo.categoryLabel,
                      categoryColor: photo.categoryColor,
                      capturedAtLabel: photo.capturedAtLabel,
                    }}
                    onClick={() => handleThumbTap(photo)}
                    selected={pickedInCompare.includes(photo.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {mode.kind !== 'detail' && photos.length >= 2 && (
          <div className="flex justify-center border-t border-[var(--color-border)] px-4 py-3 md:px-5">
            {mode.kind === 'grid' ? (
              <button
                type="button"
                onClick={() => setMode({ kind: 'compare', pickedIds: [] })}
                className="inline-flex h-9 items-center rounded-[var(--radius-sm)] bg-[var(--color-bg-card)] px-4 text-[13px] font-medium text-[var(--color-text)] ring-1 ring-[var(--color-border)] transition-colors hover:ring-[var(--color-border-strong)]"
              >
                {L.compareToggle}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode({ kind: 'grid' })}
                className="inline-flex h-9 items-center rounded-[var(--radius-sm)] bg-[var(--color-bg-card)] px-4 text-[13px] font-medium text-[var(--color-text)] ring-1 ring-[var(--color-border)] transition-colors hover:ring-[var(--color-border-strong)]"
              >
                {L.compareExit}
              </button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function DetailView({
  photo,
  L,
}: {
  photo: GalleryPhoto
  L: PhotoGallerySheetCopy
}) {
  return (
    <div className="space-y-3 px-4 py-4 md:px-5">
      <div className="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] ring-1 ring-[var(--color-border)]">
        <img
          src={photo.storageUrl}
          alt={photo.caption ?? photo.categoryLabel}
          loading="lazy"
          className="h-auto max-h-[60vh] w-full object-contain"
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-accent)]/10 px-2 text-[11px] font-medium text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20">
            {photo.categoryLabel}
          </span>
          <span className="text-[12px] text-[var(--color-text-muted)] tabular-nums">
            {photo.capturedAtLabel}
          </span>
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--color-text)]/90">
          {photo.caption ?? (
            <span className="italic text-[var(--color-text-muted)]">
              {L.noCaption}
            </span>
          )}
        </p>
        <p className="text-[11px] text-[var(--color-text-muted)]">
          {L.takenByPrefix}
          {photo.capturedByStaffName}
        </p>
      </div>
    </div>
  )
}
