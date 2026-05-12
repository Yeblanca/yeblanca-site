import type { CollectionConfig } from 'payload'

export const Methodology: CollectionConfig = {
  slug: 'methodology',
  admin: {
    useAsTitle: 'titleEn',
  },
  fields: [
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
      type: 'textarea',
      required: true,
    },
    {
      name: 'descriptionEs',
      label: 'Description (ES)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'phase',
      label: 'Phase Number',
      type: 'select',
      required: true,
      options: [
        { label: 'Phase 01', value: '01' },
        { label: 'Phase 02', value: '02' },
        { label: 'Phase 03', value: '03' },
        { label: 'Phase 04', value: '04' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
  ],
}