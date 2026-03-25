import { anyone } from '@/shared/access/anyone'
import { authenticated } from '@/shared/access/authenticated'
import { CollectionGroups } from '@/shared/CollectionGroups'
import { CollectionConfig } from 'payload'

const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'companyName', 'district', 'slug', 'updatedAt'],
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
    district: true,
  },
  access: {
    read: anyone,
    update: authenticated,
    delete: authenticated,
    create: anyone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
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
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
    },
    {
      name: 'district',
      type: 'text',
      required: true,
    },
  ],
}

export default Jobs
