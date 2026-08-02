import type { GlobalConfig } from 'payload'

export const BreakfastsContent: GlobalConfig = {
  slug: 'breakfasts-content',
  label: 'Sección de Desayunos',
  admin: {
    group: 'Contenido',
  },
  fields: [
    {
      type: 'group',
      name: 'header',
      label: 'Encabezado de la sección',
      fields: [
        {
          name: 'sectionEyebrow',
          type: 'text',
          label: 'Texto pequeño superior',
          defaultValue: 'Carta de desayunos',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Título',
          defaultValue: 'Despierta con el mejor sabor',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: 'Descripción',
          defaultValue:
            'Nuestros huéspedes disfrutan de un desayuno incluido en su estadía, y cualquier visitante puede además disfrutar de nuestra carta de desayunos en el restaurante.',
        },
      ],
    },
    {
      type: 'group',
      name: 'included',
      label: 'Desayuno Incluido',
      fields: [
        {
          name: 'includedTitle',
          type: 'text',
          label: 'Título',
          defaultValue: 'Desayuno incluido en tu estadía',
        },
        {
          name: 'includedDescription',
          type: 'textarea',
          label: 'Descripción',
          defaultValue:
            'Todos nuestros huéspedes disfrutan de un desayuno incluido según el tipo de habitación, preparado cada mañana con ingredientes frescos y locales.',
        },
        {
          name: 'includedImage',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
        },
        {
          name: 'includedBenefits',
          type: 'array',
          label: 'Lista de beneficios',
          fields: [
            {
              name: 'benefit',
              type: 'text',
              label: 'Beneficio',
            },
          ],
        },
        {
          name: 'includedSchedule',
          type: 'text',
          label: 'Horario',
          defaultValue: '7:00 am – 10:00 am',
        },
        {
          name: 'includedNotes',
          type: 'textarea',
          label: 'Notas',
        },
      ],
    },
    {
      type: 'group',
      name: 'alaCarte',
      label: 'Desayuno a la Carta (introducción)',
      fields: [
        {
          name: 'alaCarteTitle',
          type: 'text',
          label: 'Título',
          defaultValue: 'Desayunos a la Carta',
        },
        {
          name: 'alaCarteDescription',
          type: 'textarea',
          label: 'Descripción',
          defaultValue:
            'No es necesario hospedarte para disfrutar de nuestra carta de desayunos. Cualquier persona puede visitar nuestro restaurante y elegir entre nuestras opciones, preparadas al momento.',
        },
        {
          name: 'alaCarteGuestNote',
          type: 'textarea',
          label: 'Nota para huéspedes',
          defaultValue:
            'Si eres huésped y deseas un desayuno diferente al incluido en tu estadía, puedes solicitar cualquier desayuno de nuestra carta pagando únicamente el valor adicional correspondiente.',
        },
      ],
    },
    {
      type: 'group',
      name: 'teaser',
      label: 'Invitación en Home (antes del footer)',
      fields: [
        {
          name: 'teaserActive',
          type: 'checkbox',
          label: 'Activo',
          defaultValue: true,
        },
        {
          name: 'teaserImage',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
        },
        {
          name: 'teaserTitle',
          type: 'text',
          label: 'Título',
          defaultValue: 'Ven a conocer nuestros desayunos',
        },
        {
          name: 'teaserDescription',
          type: 'textarea',
          label: 'Descripción',
          defaultValue:
            'Desde platillos tradicionales guatemaltecos hasta opciones saludables. Descubre toda nuestra carta de desayunos, abierta para huéspedes y visitantes.',
        },
        {
          name: 'teaserButtonText',
          type: 'text',
          label: 'Texto del botón',
          defaultValue: 'Ver carta de desayunos',
        },
        {
          name: 'teaserButtonUrl',
          type: 'text',
          label: 'URL del botón',
          defaultValue: '#desayunos',
        },
      ],
    },
  ],
}
