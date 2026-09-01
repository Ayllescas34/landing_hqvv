/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Metadata } from 'next'

// Same reasoning as the Home page: Payload initializes the DB on first call,
// which can exceed the static generation timeout, so this route always renders fresh.
export const dynamic = 'force-dynamic'
export const maxDuration = 60

import { getPayload, type SanitizedConfig } from 'payload'
import configPromise from '@payload-config'
import { PageHero } from '@/components/PageHero'
import { BreakfastsSection } from '@/components/BreakfastsSection'
import { WhatsAppCTABand } from '@/components/WhatsAppCTABand'
import { BackToHomeLink } from '@/components/BackToHomeLink'
import { WA_MESSAGES } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Desayunos',
  description:
    'Carta de desayunos de Hotel Boutique Quinta Vista Verde en Antigua Guatemala. Abierta a huéspedes y visitantes, con opciones tradicionales guatemaltecas.',
  alternates: {
    canonical: '/desayunos',
  },
  openGraph: {
    title: 'Desayunos — Hotel Quinta Vista Verde',
    description:
      'Carta de desayunos de Hotel Boutique Quinta Vista Verde en Antigua Guatemala. Abierta a huéspedes y visitantes, con opciones tradicionales guatemaltecas.',
    url: '/desayunos',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Desayunos — Hotel Quinta Vista Verde',
      },
    ],
  },
}

async function getBreakfastsPageData() {
  try {
    const payload = await getPayload({
      config: configPromise as unknown as Promise<SanitizedConfig>,
    })
    const [includedBreakfasts, alaCarteBreakfasts, breakfastCategories, breakfastsContent] =
      await Promise.all([
        payload.find({ collection: 'included-breakfasts', limit: 50, sort: 'order' }),
        payload.find({ collection: 'a-la-carte-breakfasts', limit: 50, sort: 'order' }),
        payload.find({ collection: 'breakfast-categories', limit: 20, sort: 'order' }),
        payload.findGlobal({ slug: 'breakfasts-content' }),
      ])
    return {
      includedBreakfasts: includedBreakfasts.docs as any[],
      alaCarteBreakfasts: alaCarteBreakfasts.docs as any[],
      breakfastCategories: breakfastCategories.docs as any[],
      breakfastsContent: breakfastsContent as any,
    }
  } catch {
    return null
  }
}

function buildBreakfastMenuJsonLd(breakfasts: any[]) {
  const available = breakfasts.filter((b) => b.available !== false)
  if (available.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Desayunos a la Carta — Hotel Quinta Vista Verde',
    hasMenuSection: {
      '@type': 'MenuSection',
      name: 'Desayunos a la Carta',
      hasMenuItem: available.map((b) => ({
        '@type': 'MenuItem',
        name: b.name,
        description: b.description,
        image: b.image?.url || undefined,
        ...(b.showPrice !== false && b.price != null
          ? {
              offers: {
                '@type': 'Offer',
                price: b.price,
                priceCurrency: 'GTQ',
              },
            }
          : {}),
      })),
    },
  }
}

export default async function DesayunosPage() {
  const data = await getBreakfastsPageData()
  const menuJsonLd = buildBreakfastMenuJsonLd(data?.alaCarteBreakfasts ?? [])

  return (
    <main>
      {menuJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
        />
      )}
      <PageHero
        eyebrow="Restaurante"
        title="Nuestros Desayunos"
        description="Desde el desayuno incluido en tu estadía hasta nuestra carta a la carta, abierta también a visitantes que quieran conocer los sabores de Antigua Guatemala."
      />
      <BreakfastsSection
        content={data?.breakfastsContent}
        includedBreakfasts={data?.includedBreakfasts ?? []}
        breakfasts={data?.alaCarteBreakfasts ?? []}
        categories={data?.breakfastCategories ?? []}
      />
      <WhatsAppCTABand
        eyebrow="¿Tienes dudas?"
        title="Consulta nuestra disponibilidad"
        description="Escríbenos por WhatsApp para reservar mesa, consultar precios o resolver cualquier duda sobre nuestra carta de desayunos."
        message={WA_MESSAGES.breakfastsInquiry}
        buttonLabel="Consultar por WhatsApp"
      />
      <div className="bg-white py-10 text-center">
        <BackToHomeLink variant="dark" />
      </div>
    </main>
  )
}
