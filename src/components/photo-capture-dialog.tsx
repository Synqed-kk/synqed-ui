import { Camera, Check, Upload } from 'lucide-react'
import { useRef, useState, type ChangeEvent } from 'react'
import { cn } from '../utils/cn.js'
import { Button } from './button.js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog.js'
import {
  PhotoCategoryPicker,
  type PhotoCategory,
} from './photo-category-picker.js'

// ------------------------------------------------------------
// Capture / upload dialog. Pure presenter: file selection happens
// in-component (so we can show a preview), but the actual upload
// is the caller's responsibility — we emit a `PhotoCaptureSubmit`
// payload via `onCapture`.
// ------------------------------------------------------------

export interface PhotoCaptureSubmit {
  /** The picked file. Caller uploads to Storage. */
  file: File
  /** Selected category key. */
  categoryKey: string
  /** Trimmed caption, if any. */
  caption?: string
  /** Whether consent was confirmed at capture time. Always true when
   *  the form was submittable (consent is a required gate). */
  consent: boolean
}

export interface PhotoCaptureDialogCopy {
  title: string
  description: string
  categoryLabel: string
  chooseFile: string
  captionLabel: string
  captionPlaceholder: string
  consentLabel: string
  cancel: string
  submit: string
}

const DEFAULT_COPY: PhotoCaptureDialogCopy = {
  title: 'Add photo',
  description: 'Capture a photo to attach to this karute.',
  categoryLabel: 'Category',
  chooseFile: 'Choose file or take photo',
  captionLabel: 'Caption (optional)',
  captionPlaceholder: 'Add a brief note about this photo',
  consentLabel: 'Customer consent confirmed for this photo.',
  cancel: 'Cancel',
  submit: 'Save photo',
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Categories to choose from (already localized). */
  categories: PhotoCategory[]
  /** Called when staff submits a valid photo. Caller handles upload. */
  onCapture: (submit: PhotoCaptureSubmit) => void
  copy?: Partial<PhotoCaptureDialogCopy>
}

export function PhotoCaptureDialog({
  open,
  onOpenChange,
  categories,
  onCapture,
  copy,
}: Props) {
  const L: PhotoCaptureDialogCopy = { ...DEFAULT_COPY, ...copy }
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [categoryKey, setCategoryKey] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [consent, setConsent] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const reset = () => {
    setCategoryKey(null)
    setCaption('')
    setConsent(true)
    setFile(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) reset()
    onOpenChange(next)
  }

  const handleFilePick = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null
    if (!picked) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(picked)
    setPreviewUrl(URL.createObjectURL(picked))
  }

  const canSubmit = categoryKey != null && file != null && consent

  const handleSubmit = () => {
    if (!canSubmit || !file || !categoryKey) return
    onCapture({
      file,
      categoryKey,
      caption: caption.trim() || undefined,
      consent,
    })
    // Caller controls dialog close + reset by toggling `open`. We
    // reset locally here so reopening is fresh even if the caller
    // keeps the dialog open transiently while uploading.
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="flex items-center gap-2">
          <Camera className="size-4 text-[var(--color-accent)]" aria-hidden />
          {L.title}
        </DialogTitle>
        <DialogDescription>{L.description}</DialogDescription>

        <div className="space-y-4 py-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[var(--color-text)]">
              {L.categoryLabel}
            </label>
            <PhotoCategoryPicker
              mode="single"
              categories={categories}
              value={categoryKey}
              onChange={setCategoryKey}
            />
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFilePick}
              className="sr-only"
            />
            {previewUrl ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] ring-1 ring-[var(--color-border)]">
                <img
                  src={previewUrl}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-x-2 bottom-2 inline-flex h-8 items-center justify-center rounded-[var(--radius-sm)] bg-black/60 text-[12px] font-medium text-white backdrop-blur-[2px]"
                >
                  {L.chooseFile}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)]"
              >
                <Upload className="size-5" aria-hidden />
                <span className="text-[13px] font-medium">{L.chooseFile}</span>
              </button>
            )}
          </div>

          <div>
            <label
              htmlFor="photo-caption"
              className="mb-1.5 block text-[12px] font-medium text-[var(--color-text)]"
            >
              {L.captionLabel}
            </label>
            <input
              id="photo-caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={L.captionPlaceholder}
              className="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="sr-only"
            />
            <span
              className={cn(
                'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-2 transition-colors',
                consent
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                  : 'border-[var(--color-border-strong)] bg-[var(--color-bg-card)]',
              )}
            >
              {consent && (
                <Check
                  className="size-3 text-[var(--color-accent-text)]"
                  strokeWidth={3}
                />
              )}
            </span>
            <span className="text-[12px] leading-relaxed text-[var(--color-text)]/85">
              {L.consentLabel}
            </span>
          </label>
        </div>

        <div className="mt-2 flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {L.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {L.submit}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
