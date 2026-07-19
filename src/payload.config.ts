import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import crypto from 'node:crypto'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { seed } from './seed'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
// [SHIPKIT:BLOG]
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
// [/SHIPKIT:BLOG]
// [SHIPKIT:EVENTS]
import { Events } from './collections/Events'
// [/SHIPKIT:EVENTS]

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  onInit: async (payload) => {
    try {
      await seed(payload)
    } catch (err) {
      payload.logger.error('Seed failed — run again after tables are created')
    }
  },
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Pages,
    Media,
    Users,
    // [SHIPKIT:BLOG]
    Posts,
    Categories,
    // [/SHIPKIT:BLOG]
    // [SHIPKIT:EVENTS]
    Events,
    // [/SHIPKIT:EVENTS]
  ],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ inlineBlocks: [] }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || crypto.randomBytes(32).toString('hex'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
    },
    push: true,
    migrationDir: path.resolve(dirname, 'migrations'),
    idType: 'uuid',
  }),
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN?.startsWith('vercel_blob_')
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
    seoPlugin({
      collections: ['pages'],
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        `${(doc as Record<string, unknown>).title ?? ''} | {{siteName}}`,
      generateDescription: ({ doc }) =>
        (doc as Record<string, unknown>).excerpt as string ?? '',
    }),
    redirectsPlugin({
      collections: ['pages'],
    }),
    // [SHIPKIT:BLOG]
    nestedDocsPlugin({
      collections: ['categories'],
    }),
    // [/SHIPKIT:BLOG]
  ],
  sharp,
})
