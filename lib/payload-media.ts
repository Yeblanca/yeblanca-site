import type { Media } from '@/payload-types'

/**
 * Resolve a Payload Media relationship to a working URL.
 *
 * Payload's local `/api/media/file/...` route returns 403/501 here because
 * `cloudStoragePlugin` is configured with `disableLocalStorage: true`, so
 * `media.url` may point to a dead local path. When that happens we
 * reconstruct the public Cloudinary URL from the stored filename.
 *
 * Accepts a populated Media doc (depth >= 1), an ID string, or null/undefined.
 */
export function getMediaUrl(media: Media | string | null | undefined): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return undefined

  if (media.url && media.url.includes('res.cloudinary.com')) return media.url

  if (media.filename && process.env.CLOUDINARY_CLOUD_NAME) {
    const ext = media.filename.match(/\.[^/.]+$/)?.[0] || ''
    const publicId = `yeblanca/${media.filename.replace(/\.[^/.]+$/, '')}`
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}${ext}`
  }

  return undefined
}
