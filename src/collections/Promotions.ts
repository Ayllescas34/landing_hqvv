import type { CollectionConfig } from 'payload'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  labels: {
    singular: 'Promoción',
    plural: 'Promociones',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'active', 'startDate', 'endDate', 'order'],
    group: 'Contenido',
    description:
      'Banner promocional que aparece al entrar al sitio. Si hay varias promociones activas y vigentes a la vez, se muestra la de menor "Orden".',
  },
  fields: [
    {
      name: 'active',
      type: 'checkbox',
      label: 'Activo',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen principal',
      relationTo: 'media',
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Color de fondo (código hex)',
      defaultValue: '#0F4D3A',
      admin: {
        placeholder: '#0F4D3A',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Texto del botón principal',
      defaultValue: 'Ver Habitaciones',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'URL del botón principal',
      defaultValue: '#habitaciones',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      label: 'Texto del botón secundario (opcional)',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
      label: 'URL del botón secundario (opcional)',
    },
    {
      name: 'displayMode',
      type: 'select',
      label: 'Modo de visualización',
      defaultValue: 'always',
      options: [
        { label: 'Mostrar siempre', value: 'always' },
        { label: 'Mostrar solo una vez por visitante', value: 'once' },
        { label: 'No mostrar automáticamente', value: 'manual' },
      ],
      admin: {
        description:
          '"Siempre": aparece en cada visita/recarga, sin usar el navegador para recordar cierres. "Solo una vez": usa el navegador del visitante para no repetirse tras cerrarlo. "No mostrar automáticamente": la promoción queda activa pero el banner nunca se abre solo.',
      },
    },
    // Reemplazados por `displayMode` (arriba). Se dejan ocultos en vez de eliminarse
    // para no forzar un drop de columna con pérdida de datos en el push de Drizzle.
    {
      name: 'showAutomatically',
      type: 'checkbox',
      label: 'Mostrar automáticamente al entrar al sitio',
      defaultValue: true,
      admin: { hidden: true },
    },
    {
      name: 'showOncePerVisitor',
      type: 'checkbox',
      label: 'Mostrar solo una vez por visitante',
      defaultValue: true,
      admin: { hidden: true },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Fecha inicio',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Fecha fin',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden (desempate si hay varias vigentes)',
      defaultValue: 0,
    },
  ],
}
