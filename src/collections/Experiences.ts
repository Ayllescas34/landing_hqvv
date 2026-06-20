import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
      options: [
        { label: 'Tour', value: 'tour' },
        { label: 'Lugar para visitar', value: 'lugar' },
        { label: 'Actividad', value: 'actividad' },
        { label: 'Recomendación local', value: 'recomendacion' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Fotografía',
      relationTo: 'media',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duración estimada',
    },
    {
      name: 'distance',
      type: 'text',
      label: 'Distancia desde el hotel',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
    },
  ],
}
