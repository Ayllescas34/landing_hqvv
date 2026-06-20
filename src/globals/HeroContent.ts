import type { GlobalConfig } from 'payload'

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  label: 'Contenido Hero Principal',
  admin: {
    group: 'Contenido',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      defaultValue: 'Hotel Boutique Quinta Vista Verde',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
      defaultValue: 'Tu refugio ideal en Antigua Guatemala',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      defaultValue:
        'Donde la comodidad, la naturaleza y la atención personalizada se encuentran en cada detalle.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Fotografía de Fondo',
      relationTo: 'media',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Texto del Botón',
      defaultValue: 'Consultar por WhatsApp',
    },
  ],
}
