import type { CollectionConfig } from 'payload'

export const ALaCarteBreakfasts: CollectionConfig = {
  slug: 'a-la-carte-breakfasts',
  labels: {
    singular: 'Desayuno a la Carta',
    plural: 'Desayunos a la Carta',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'available', 'order'],
    group: 'Desayunos',
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
      name: 'category',
      type: 'relationship',
      label: 'Categoría',
      relationTo: 'breakfast-categories',
      hasMany: false,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Precio',
    },
    {
      name: 'showPrice',
      type: 'checkbox',
      label: 'Mostrar precio en el sitio',
      defaultValue: true,
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
