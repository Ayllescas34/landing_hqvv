import type { CollectionConfig } from 'payload'

export const IncludedBreakfasts: CollectionConfig = {
  slug: 'included-breakfasts',
  labels: {
    singular: 'Desayuno Incluido',
    plural: 'Desayunos Incluidos',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'available', 'featured', 'order'],
    group: 'Desayunos',
    description:
      'Desayunos incluidos en la estadía (según el tipo de habitación). Se muestran en /desayunos, dentro de "Desayuno incluido en tu estadía". El texto introductorio de esa sección (título, descripción, horario) se administra aparte, en el global "Sección de Desayunos".',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre del desayuno',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
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
      name: 'ingredients',
      type: 'array',
      label: 'Ingredientes',
      fields: [
        {
          name: 'ingredient',
          type: 'text',
          label: 'Ingrediente',
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiquetas',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Etiqueta',
        },
      ],
    },
    {
      name: 'estimatedTime',
      type: 'text',
      label: 'Tiempo estimado',
      admin: {
        placeholder: 'Ej: 15 min',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacado (aparece más grande)',
      defaultValue: false,
    },
    {
      name: 'available',
      type: 'checkbox',
      label: 'Disponible',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
    },
  ],
}
