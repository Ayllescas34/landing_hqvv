/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Metadata } from 'next'

// Same reasoning as the Home page: Payload initializes the DB on first call,
// which can exceed the static generation timeout, so this route always renders fresh.
export const dynamic = 'force-dynamic'
export const maxDuration = 60

import { getPayload, type SanitizedConfig } from 'payload'
import configPromise from '@payload-config'
import { PageHero } from '@/components/PageHero'
import { RoomsSection } from '@/components/RoomsSection'
import { Amenities } from '@/components/Amenities'
import { CheckInOutInfo } from '@/components/CheckInOutInfo'
import { WhatsAppCTABand } from '@/components/WhatsAppCTABand'
import { BackToHomeLink } from '@/components/BackToHomeLink'
import { WA_MESSAGES } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Habitaciones',
  description:
    'Conoce todas las habitaciones de Hotel Boutique Quinta Vista Verde en Antigua Guatemala: confort, decoración colonial y vista al Volcán de Agua.',
  alternates: {
    canonical: '/habitaciones',
  },
  openGraph: {
    title: 'Habitaciones — Hotel Quinta Vista Verde',
    description:
      'Conoce todas las habitaciones de Hotel Boutique Quinta Vista Verde en Antigua Guatemala: confort, decoración colonial y vista al Volcán de Agua.',
    url: '/habitaciones',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Habitaciones — Hotel Quinta Vista Verde',
      },
    ],
  },
}

async function getRoomsPageData() {
  try {
    const payload = await getPayload({
      config: configPromise as unknown as Promise<SanitizedConfig>,
    })
    const [rooms, siteSettings] = await Promise.all([
      payload.find({ collection: 'rooms', limit: 30, sort: 'order' }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])
    return {
      rooms: rooms.docs as any[],
      siteSettings: siteSettings as any,
    }
  } catch {
    return null
  }
}

function buildRoomsJsonLd(rooms: any[]) {
  if (rooms.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: rooms.map((room, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'HotelRoom',
        name: room.name,
        description: room.description,
        image: room.images?.[0]?.image?.url || undefined,
        ...(room.capacity != null
          ? { occupancy: { '@type': 'QuantitativeValue', maxValue: room.capacity } }
          : {}),
      },
    })),
  }
}

export default async function HabitacionesPage() {
  const data = await getRoomsPageData()
  const roomsJsonLd = buildRoomsJsonLd(data?.rooms ?? [])

  return (
    <main>
      {roomsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(roomsJsonLd) }}
        />
      )}
      <PageHero
        eyebrow="Hotel Boutique Quinta Vista Verde"
        title="Nuestras Habitaciones"
        description="Cada habitación combina confort, decoración colonial guatemalteca y detalles pensados para tu descanso, dentro de un entorno rodeado de jardines."
      />
      <RoomsSection rooms={data?.rooms ?? []} mode="full" />
      <Amenities />
      <CheckInOutInfo settings={data?.siteSettings} />
      <WhatsAppCTABand
        eyebrow="Reserva tu estadía"
        title="Consulta disponibilidad y tarifas"
        description="Escríbenos por WhatsApp y con gusto te ayudamos a elegir la habitación ideal para tu visita a Antigua Guatemala."
        message={WA_MESSAGES.roomsInquiry}
        buttonLabel="Consultar por WhatsApp"
      />
      <div className="bg-white py-10 text-center">
        <BackToHomeLink variant="dark" />
      </div>
    </main>
  )
}
