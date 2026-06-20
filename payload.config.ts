import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Rooms } from './src/collections/Rooms'
import { Breakfasts } from './src/collections/Breakfasts'
import { Gallery } from './src/collections/Gallery'
import { Experiences } from './src/collections/Experiences'
import { Reviews } from './src/collections/Reviews'
import { SiteSettings } from './src/globals/SiteSettings'
import { HeroContent } from './src/globals/HeroContent'
import { AboutContent } from './src/globals/AboutContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret) throw new Error('PAYLOAD_SECRET environment variable is required')

const isPostgres = process.env.DATABASE_URI?.startsWith('postgres')

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Hotel Quinta Vista Verde',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Rooms, Breakfasts, Gallery, Experiences, Reviews],
  globals: [SiteSettings, HeroContent, AboutContent],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI!,
          max: 3,
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./hotel.db',
        },
      }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // In production with PostgreSQL, Payload does NOT auto-migrate.
  // We replicate pushDevSchema's logic here (without the interactive prompts)
  // so tables are created on first deploy and kept in sync on schema changes.
  onInit: async (payload) => {
    if (!isPostgres) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adapter = payload.db as any
      const { pushSchema } = adapter.requireDrizzleKit()
      const { apply, warnings } = await pushSchema(
        adapter.schema,
        adapter.drizzle,
        adapter.schemaName ? [adapter.schemaName] : undefined,
        adapter.tablesFilter ?? undefined,
        adapter.extensions?.postgis ? ['postgis'] : undefined,
      )
      if (warnings?.length) {
        payload.logger.warn({ msg: 'Schema push warnings (auto-accepted)', warnings })
      }
      await apply()
    } catch (err) {
      payload.logger.warn({ err, msg: 'Schema push skipped — run payload migrate if tables are missing' })
    }
  },
})
