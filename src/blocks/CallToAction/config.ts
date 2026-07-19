import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  imageURL: '/blocks/cta.png',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'links',
      type: 'array',
      maxRows: 4,
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
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'banner',
      options: [
        { label: 'Banner', value: 'banner' },
        { label: 'Inline', value: 'inline' },
      ],
    },
  ],
}
