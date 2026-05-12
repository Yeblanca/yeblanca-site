/**
 * One-time migration: SQLite (dev.db) → Neon Postgres
 *
 * Run with:
 *   DATABASE_URI=file:./dev.db tsx --require ./scripts/patch-next-env.cjs scripts/migrate-to-postgres.ts
 *
 * What it does:
 *  1. Boots Payload against the local SQLite file to read every record
 *  2. Re-boots Payload against the Neon Postgres URL
 *  3. Inserts every record into Postgres, preserving IDs where possible
 */

import path from 'path'
import { randomUUID } from 'crypto'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from '../payload/collections/Users'
import { Projects } from '../payload/collections/Projects'
import { Services } from '../payload/collections/Services'
import { Testimonials } from '../payload/collections/Testimonials'
import { Media } from '../payload/collections/Media'
import { SiteSettings } from '../payload/globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(dirname, '..')

const COLLECTIONS = ['users', 'media', 'services', 'projects', 'testimonials'] as const
const GLOBALS = ['site-settings'] as const

/**
 * Lexical blocks need a `_uuid` field when stored in Postgres.
 * SQLite serialises them without it, so we inject one before re-inserting.
 */
function injectUuids(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(injectUuids)
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    // A Lexical block node has a blockType but may lack _uuid
    if (obj.blockType && !obj._uuid) obj._uuid = randomUUID()
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, injectUuids(v)]))
  }
  return value
}

const sharedConfig = {
  admin: { user: 'users', importMap: { baseDir: rootDir } },
  collections: [Users, Projects, Services, Testimonials, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: { outputFile: path.resolve(rootDir, 'payload-types.ts') },
}

async function main() {
  const postgresUrl = process.env.POSTGRES_URL
  if (!postgresUrl) {
    throw new Error('Set POSTGRES_URL to the Neon connection string before running this script.')
  }

  console.log('→ Connecting to SQLite source …')
  const sqlitePayload = await getPayload({
    config: buildConfig({
      ...sharedConfig,
      db: sqliteAdapter({ client: { url: 'file:./dev.db' } }),
    }),
  })

  // ── Read everything from SQLite ──────────────────────────────────────────────
  const data: Record<string, any[]> = {}
  for (const slug of COLLECTIONS) {
    const result = await sqlitePayload.find({
      collection: slug as any,
      limit: 10_000,
      depth: 0,
    })
    data[slug] = result.docs
    console.log(`  SQLite ${slug}: ${result.docs.length} records`)
  }

  const globalData: Record<string, any> = {}
  for (const slug of GLOBALS) {
    globalData[slug] = await sqlitePayload.findGlobal({ slug: slug as any })
    console.log(`  SQLite global ${slug}: fetched`)
  }

  await sqlitePayload.db!.destroy()

  // ── Write everything to Postgres ─────────────────────────────────────────────
  console.log('\n→ Connecting to Neon Postgres target …')
  const pgPayload = await getPayload({
    config: buildConfig({
      ...sharedConfig,
      db: postgresAdapter({ pool: { connectionString: postgresUrl } }),
    }),
  })

  // Tables already created via `pnpm payload migrate` — skip db.migrate() here
  // to avoid cross-adapter state conflicts when two Payload instances share a process

  for (const slug of COLLECTIONS) {
    const rows = data[slug]
    if (!rows.length) continue
    console.log(`  Inserting ${rows.length} ${slug} records …`)
    for (const row of rows) {
      const { id, createdAt, updatedAt, ...rest } = row
      try {
        await pgPayload.create({
          collection: slug as any,
          data: injectUuids(rest) as any,
          overrideAccess: true,
        })
      } catch (err: any) {
        console.warn(`    ⚠ ${slug} id=${id}: ${err.message}`)
      }
    }
  }

  for (const slug of GLOBALS) {
    console.log(`  Updating global ${slug} …`)
    const { id, createdAt, updatedAt, globalType, ...rest } = globalData[slug]
    try {
      await pgPayload.updateGlobal({
        slug: slug as any,
        data: injectUuids(rest) as any,
        overrideAccess: true,
      })
    } catch (err: any) {
      console.warn(`    ⚠ global ${slug}: ${err.message}`)
    }
  }

  console.log('\n✓ Migration complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
