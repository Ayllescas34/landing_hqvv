import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título / Descripción',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Fotografía',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
      required: true,
      options: [
        { label: 'Habitaciones', value: 'habitaciones' },
        { label: 'Jardines', value: 'jardines' },
        { label: 'Instalaciones', value: 'instalaciones' },
        { label: 'Desayunos', value: 'desayunos' },
        { label: 'Vista al Volcán', value: 'volcan' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
    },
  ],
}
