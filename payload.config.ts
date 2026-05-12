import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { resendAdapter } from '@payloadcms/email-resend'
import { v2 as cloudinary } from 'cloudinary'
import cloudinaryAdapter from './plugins/cloudinaryAdapter'
import { Users } from './payload/collections/Users'
import { Projects } from './payload/collections/Projects'
import { Services } from './payload/collections/Services'
import { Testimonials } from './payload/collections/Testimonials'
import { Methodology } from './payload/collections/Methodology'
import { Clients } from './payload/collections/Clients'
import { Media } from './payload/collections/Media'
import { SiteSettings } from './payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Projects, Services, Testimonials, Methodology, Clients, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
        },
      },
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  email: resendAdapter({
    fromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@yeblanca.com',
    fromName: 'Ye Blanca',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
})
