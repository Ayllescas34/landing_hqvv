import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del Sitio',
  admin: {
    group: 'Configuración',
  },
  fields: [
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'Número WhatsApp (sin + ni espacios)',
      defaultValue: '50244480395',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
      defaultValue: '+502 7867-7627',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Usuario Instagram',
      defaultValue: 'hotel_quintavistaverde',
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Página Facebook',
      defaultValue: 'hotel_quintavistaverde',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Dirección',
      defaultValue: 'Antigua Guatemala, Sacatepéquez, Guatemala',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      label: 'URL Google Maps',
    },
    {
      name: 'wazeUrl',
      type: 'text',
      label: 'URL Waze',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'URL Embed Google Maps (iframe)',
    },
    {
      name: 'bookingScore',
      type: 'text',
      label: 'Puntuación Booking.com',
      defaultValue: '9.4',
    },
    {
      type: 'group',
      name: 'checkInOut',
      label: 'Check-in / Check-out',
      fields: [
        {
          name: 'checkInTime',
          type: 'text',
          label: 'Hora Check-In',
          defaultValue: '14:00 hrs',
        },
        {
          name: 'checkOutTime',
          type: 'text',
          label: 'Hora Check-Out',
          defaultValue: '12:00 hrs',
        },
        {
          name: 'policiesText',
          type: 'textarea',
          label: 'Texto de políticas',
        },
        {
          name: 'earlyCheckInText',
          type: 'textarea',
          label: 'Texto de ingreso temprano',
        },
        {
          name: 'lateCheckOutText',
          type: 'textarea',
          label: 'Texto de salida tardía',
        },
        {
          name: 'additionalInfo',
          type: 'textarea',
          label: 'Información adicional',
        },
      ],
    },
  ],
}
