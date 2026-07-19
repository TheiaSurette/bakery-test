import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { publishedOnly } from '../access/publishedOnly'
import { revalidateCollection } from '../hooks/revalidateCollection'

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

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'status', 'featured'],
    group: 'Content',
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [generateSlug],
    afterChange: [
      revalidateCollection(
        (doc) => `/events/${doc.slug}`,
        (doc) => ['events', `event-${doc.slug}`],
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
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this event on the homepage',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Optional end date for multi-day events',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'venueName',
          type: 'text',
        },
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'eventLinks',
      type: 'array',
      admin: {
        description: 'Links shown on the event detail page (tickets, RSVP, etc.)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Ticket', value: 'ticket' },
            { label: 'External Link', value: 'external-link' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Map Pin', value: 'map-pin' },
          ],
        },
      ],
    },
  ],
}
