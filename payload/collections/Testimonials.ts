import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'textEn',
      label: 'Text (EN)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'textEs',
      label: 'Text (ES)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'projectRef',
      label: 'Related Project',
      type: 'relationship',
      relationTo: 'projects',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
