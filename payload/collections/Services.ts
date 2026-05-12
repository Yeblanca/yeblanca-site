import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'titleEn',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'titleEn',
      label: 'Title (EN)',
      type: 'text',
      required: true,
    },
    {
      name: 'titleEs',
      label: 'Title (ES)',
      type: 'text',
      required: true,
    },
    {
      name: 'descriptionEn',
      label: 'Description (EN)',
      type: 'richText',
    },
    {
      name: 'descriptionEs',
      label: 'Description (ES)',
      type: 'richText',
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name (e.g. "Globe", "ShoppingCart")',
      },
    },
    {
      name: 'featuresEn',
      label: 'Features (EN)',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featuresEs',
      label: 'Features (ES)',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'startingPrice',
      type: 'number',
      admin: {
        description: 'Starting price in USD (optional)',
      },
    },
  ],
}
