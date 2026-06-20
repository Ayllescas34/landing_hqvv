import type { CollectionConfig } from 'payload'

export const Breakfasts: CollectionConfig = {
  slug: 'breakfasts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
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
      name: 'mainIngredients',
      type: 'array',
      label: 'Ingredientes principales',
      fields: [
        {
          name: 'ingredient',
          type: 'text',
          label: 'Ingrediente',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Fotografía',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Desayuno destacado (aparece grande)',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
    },
  ],
}
