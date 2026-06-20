import type { GlobalConfig } from 'payload'

export const AboutContent: GlobalConfig = {
  slug: 'about-content',
  label: 'Sobre Nosotros',
  admin: {
    group: 'Contenido',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      defaultValue: 'Un refugio de tranquilidad en el corazón de Antigua',
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Texto principal',
      defaultValue:
        'Somos un hotel boutique familiar ubicado en Antigua Guatemala, rodeado de jardines exuberantes y con una vista privilegiada al Volcán de Agua. Cada detalle de nuestra hospitalidad ha sido pensado para que tu estadía sea una experiencia que va más allá de una simple noche de descanso.',
    },
    {
      name: 'secondParagraph',
      type: 'textarea',
      label: 'Segundo párrafo',
      defaultValue:
        'Nuestro equipo brinda atención personalizada y asesoría turística para que descubras lo mejor de Antigua Guatemala. Despierta cada mañana con un desayuno a la carta y el canto de los pájaros en nuestro jardín.',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Fotografías (máximo 4)',
      maxRows: 4,
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
      name: 'highlights',
      type: 'array',
      label: 'Puntos destacados',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto',
        },
      ],
    },
  ],
}
