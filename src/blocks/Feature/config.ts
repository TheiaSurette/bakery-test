import type { Block } from 'payload'

export const Feature: Block = {
  slug: 'feature',
  labels: {
    singular: 'Feature',
    plural: 'Features',
  },
  imageURL: '/blocks/feature.png',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name (e.g. "zap", "shield", "layers")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Alternating', value: 'alternating' },
      ],
    },
  ],
}
