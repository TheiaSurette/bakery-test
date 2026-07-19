import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { publishedOnly } from '../access/publishedOnly'
import { revalidateCollection } from '../hooks/revalidateCollection'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { blocks } from '../blocks'

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

const generateSlug: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.title && !data.slug) {
    data.slug = slugify(data.title)
  }
  return data
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [generateSlug],
    beforeChange: [populatePublishedAt],
    afterChange: [
      revalidateCollection(
        (doc) => `/${doc.slug === 'home' ? '' : doc.slug}`,
        (doc) => ['pages', `page-${doc.slug}`],
      ),
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated from title',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
