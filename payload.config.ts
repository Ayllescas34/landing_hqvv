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
import { BreakfastCategories } from './src/collections/BreakfastCategories'
import { ALaCarteBreakfasts } from './src/collections/ALaCarteBreakfasts'
import { Promotions } from './src/collections/Promotions'
import { Gallery } from './src/collections/Gallery'
import { Experiences } from './src/collections/Experiences'
import { Reviews } from './src/collections/Reviews'
import { SiteSettings } from './src/globals/SiteSettings'
import { HeroContent } from './src/globals/HeroContent'
import { AboutContent } from './src/globals/AboutContent'
import { BreakfastsContent } from './src/globals/BreakfastsContent'

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
  collections: [
    Users,
    Media,
    Rooms,
    Breakfasts,
    BreakfastCategories,
    ALaCarteBreakfasts,
    Promotions,
    Gallery,
    Experiences,
    Reviews,
  ],
  globals: [SiteSettings, HeroContent, AboutContent, BreakfastsContent],
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
})
