import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site',
  },
  fields: [
    {
      name: 'metaTitleEn',
      label: 'Meta Title (EN)',
      type: 'text',
    },
    {
      name: 'metaTitleEs',
      label: 'Meta Title (ES)',
      type: 'text',
    },
    {
      name: 'metaDescriptionEn',
      label: 'Meta Description (EN)',
      type: 'textarea',
    },
    {
      name: 'metaDescriptionEs',
      label: 'Meta Description (ES)',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'github',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'yp@yeblanca.com',
    },
    {
      name: 'availableForProjects',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show "Available for projects" badge on About page',
      },
    },
  ],
}
