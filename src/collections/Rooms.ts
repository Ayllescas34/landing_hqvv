import type { CollectionConfig } from 'payload'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'capacity', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre de la habitación',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Tipo',
      options: [
        { label: 'Individual', value: 'single' },
        { label: 'Doble', value: 'double' },
        { label: 'Suite', value: 'suite' },
        { label: 'Familiar', value: 'family' },
        { label: 'Junior Suite', value: 'junior-suite' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      required: true,
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacidad (personas)',
      defaultValue: 2,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Fotografías',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'amenities',
      type: 'array',
      label: 'Amenidades',
      fields: [
        {
          name: 'amenity',
          type: 'text',
          label: 'Amenidad',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacada',
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
