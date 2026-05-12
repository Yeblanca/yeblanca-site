import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'titleEn',
    defaultColumns: ['titleEn', 'client', 'year', 'serviceType', 'featured', 'status'],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
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
      name: 'taglineEn',
      label: 'Tagline (EN)',
      type: 'text',
    },
    {
      name: 'taglineEs',
      label: 'Tagline (ES)',
      type: 'text',
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
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Web', value: 'web' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Custom System', value: 'system' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'stack',
      type: 'array',
      fields: [
        {
          name: 'tech',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'live',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Archived', value: 'archived' },
        { label: 'WIP', value: 'wip' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'liveUrl',
      label: 'Live URL',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'complexity',
      type: 'number',
      min: 1,
      max: 10,
      admin: {
        description: 'Internal complexity score (1–10). Not shown publicly.',
        position: 'sidebar',
      },
    },
  ],
}
