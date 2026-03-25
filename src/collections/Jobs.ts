import { anyone } from '@/shared/access/anyone'
import { authenticated } from '@/shared/access/authenticated'
import { CollectionGroups } from '@/shared/CollectionGroups'
import { CollectionConfig } from 'payload'

const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'companyName', 'location', 'slug', 'updatedAt'],
    group: CollectionGroups.ContentCollections,
  },
  versions: {
    drafts: true,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    applyLink: true,
    description: true,
    companyName: true,
    role: true,
    experience: true,
    location: true,
    salary: true,
  },
  access: {
    read: anyone,
    update: anyone,
    delete: anyone,
    create: anyone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'ui',
      name: 'divider1',
      admin: {
        components: {
          Field: '@/components/Divider#Divider',
        },
      },
    },
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'experience',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'salary',
      type: 'text',
    },
    {
      type: 'ui',
      name: 'divider2',
      admin: {
        components: {
          Field: '@/components/Divider#Divider',
        },
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (data?.name) {
                return data.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '')
              }
            }
          },
        ],
      },
    },
    {
      name: 'applyLink',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Jobs
