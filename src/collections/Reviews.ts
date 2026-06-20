import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'platform', 'rating', 'updatedAt'],
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      label: 'Nombre del huésped',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'País / Ciudad de origen',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Calificación (1-5)',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'comment',
      type: 'textarea',
      label: 'Comentario',
      required: true,
    },
    {
      name: 'platform',
      type: 'select',
      label: 'Plataforma',
      options: [
        { label: 'Booking.com', value: 'booking' },
        { label: 'Google', value: 'google' },
        { label: 'TripAdvisor', value: 'tripadvisor' },
        { label: 'Airbnb', value: 'airbnb' },
        { label: 'Directo', value: 'directo' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      label: 'Fecha de la reseña',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacada',
      defaultValue: false,
    },
  ],
}
