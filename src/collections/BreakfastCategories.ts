import type { CollectionConfig } from 'payload'

export const BreakfastCategories: CollectionConfig = {
  slug: 'breakfast-categories',
  labels: {
    singular: 'Categoría de Desayuno',
    plural: 'Categorías de Desayunos',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    group: 'Desayunos',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre de la categoría',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
    },
  ],
}
