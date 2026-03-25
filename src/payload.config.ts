import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import Companies from './collections/Companies'
import Jobs from './collections/Jobs'
import { Users } from './collections/Users'
export const locales = ['de', 'en'];


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const websiteName = 'Ingenious Companies'

export const collections: CollectionConfig[] = [
  // Content Collections
  Companies,
  Jobs,

  // System Collections
  Users,
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ` - ${websiteName} CMS`,
    },
    components: {
      views: {
        dashboard: {
          Component: '/components/views/DashboardView#DashboardView',
        },
      },
    },
  },
  localization: {
    locales: [{ code: 'de', label: 'German' }, { code: 'en', label: 'English' }],
    defaultLocale: 'en',
    fallback: true,
  },
  globals: [],
  collections: collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: ["http://localhost:5173", "https://cms.companies.ingeniousclan.com", "https://cms.ingeniousclan.com", "https://react.ingeniousclan.com"],
  csrf: ["http://localhost:5173", "https://cms.companies.ingeniousclan.com", "https://cms.ingeniousclan.com", "https://react.ingeniousclan.com"],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI!,
  }),
  email: resendAdapter({
    defaultFromAddress: 'cms@your-website.com',
    defaultFromName: `${websiteName} CMS`,
    apiKey: process.env.RESEND_API_KEY!,
  }),
  // Uncomment the following line to seed the CMS with default data
  // onInit: async (payload) => {
  //  await seedCMS(payload)
  //},
})
