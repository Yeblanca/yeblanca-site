/**
 * Upload images to Payload CMS Media collection
 * Run: tsx --env-file=.env --require ./scripts/patch-next-env.cjs scripts/upload-images.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'

const images = [
  { filename: 'yebconfondo.png', alt: 'Yeblanca background' },
  { filename: 'yebhozconfondo.png', alt: 'Yeblanca horizontal background' },
  { filename: 'yebconfondo (1).png', alt: 'Yeblanca background variant' },
  { filename: 'yebhozconfondo (1).png', alt: 'Yeblanca horizontal background variant' },
]

async function uploadImages() {
  const payload = await getPayload({ config })

  console.log('\n📸 Uploading images to Payload CMS...\n')

  for (const img of images) {
    const filePath = path.join(process.cwd(), img.filename)

    if (!fs.existsSync(filePath)) {
      console.log(`  ⏭  Skipped (not found): ${img.filename}`)
      continue
    }

    // Check if already exists
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: img.filename } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Skipped (exists): ${img.filename}`)
      continue
    }

    const buffer = fs.readFileSync(filePath)
    const filename = img.filename

    try {
      const result = await payload.create({
        collection: 'media',
        data: {
          alt: img.alt,
        } as any,
        file: {
          buffer,
          filename,
          mimetype: 'image/png',
          size: buffer.length,
        },
      })
      console.log(`  ✅ Uploaded: ${img.filename} (ID: ${result.id})`)
    } catch (err) {
      console.error(`  ❌ Failed: ${img.filename}`, err)
    }
  }

  console.log('\n✨ Upload complete.\n')
}

uploadImages().catch((err) => {
  console.error('Upload failed:', err)
  process.exit(1)
})