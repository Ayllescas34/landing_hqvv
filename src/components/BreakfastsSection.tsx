'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle, Utensils } from 'lucide-react'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

interface Breakfast {
  name: string
  description: string
  mainIngredients?: Array<{ ingredient?: string | null }>
  image?: { url?: string; alt?: string } | null
  featured?: boolean
}

const FALLBACK_BREAKFASTS: Breakfast[] = [
  {
    name: 'Desayuno Guatemalteco',
    description:
      'Lo más auténtico de nuestra cocina. Frijoles volteados, huevos al gusto, plátano maduro, crema, queso y tortillas recién hechas.',
    mainIngredients: [
      { ingredient: 'Frijoles volteados' },
      { ingredient: 'Huevos al gusto' },
      { ingredient: 'Plátano maduro' },
      { ingredient: 'Tortillas' },
    ],
    featured: true,
  },
  {
    name: 'Desayuno Americano',
    description: 'Huevos, tocino o salchicha, pan tostado con mermelada, fruta fresca y jugo natural.',
    mainIngredients: [
      { ingredient: 'Huevos revueltos' },
      { ingredient: 'Tocino' },
      { ingredient: 'Pan tostado' },
    ],
  },
  {
    name: 'Omelette Especial',
    description:
      'Omelette esponjoso relleno de queso, vegetales frescos y hierbas aromáticas. Servido con ensalada y pan.',
    mainIngredients: [
      { ingredient: 'Huevos' },
      { ingredient: 'Queso' },
      { ingredient: 'Vegetales frescos' },
    ],
  },
  {
    name: 'Desayuno Light',
    description:
      'Fruta fresca de temporada, yogur natural con granola, jugo de naranja y café o té. Nutritivo y liviano.',
    mainIngredients: [
      { ingredient: 'Fruta fresca' },
      { ingredient: 'Yogur' },
      { ingredient: 'Granola' },
    ],
  },
  {
    name: 'Panqueques Artesanales',
    description:
      'Esponjosos panqueques servidos con miel de abeja, fruta fresca y crema. Una delicia para empezar el día.',
    mainIngredients: [
      { ingredient: 'Panqueques' },
      { ingredient: 'Miel de abeja' },
      { ingredient: 'Fruta fresca' },
    ],
  },
]

function BreakfastCard({
  breakfast,
  featured = false,
}: {
  breakfast: Breakfast
  featured?: boolean
}) {
  const waLink = buildWhatsAppLink(WA_MESSAGES.breakfast(breakfast.name))

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="group relative rounded-3xl overflow-hidden shadow-lg bg-white flex flex-col lg:row-span-2"
      >
        <div className="relative flex-1 overflow-hidden bg-beige" style={{ minHeight: '320px' }}>
          {breakfast.image?.url ? (
            <Image
              src={breakfast.image.url}
              alt={breakfast.image.alt || breakfast.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(160deg, #5B3A29, #0F4D3A)', minHeight: '320px' }}
            >
              <Utensils size={64} className="text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-lavanda text-white text-xs font-semibold px-3 py-1 rounded-full">
              Destacado
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-playfair text-white text-2xl font-bold mb-2">{breakfast.name}</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{breakfast.description}</p>
            {breakfast.mainIngredients && breakfast.mainIngredients.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {breakfast.mainIngredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                  >
                    {ing.ingredient}
                  </span>
                ))}
              </div>
            )}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-verde-bosque hover:bg-crema text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <MessageCircle size={14} />
              Consultar desayuno
            </a>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-row md:flex-col"
    >
      <div
        className="relative overflow-hidden bg-beige flex-shrink-0"
        style={{ width: '120px', minHeight: '120px' }}
      >
        <div className="md:hidden w-full h-full">
          {breakfast.image?.url ? (
            <Image
              src={breakfast.image.url}
              alt={breakfast.image.alt || breakfast.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #E8DFC9, #B7A5D8)' }}
            >
              <Utensils size={28} className="text-madera/40" />
            </div>
          )}
        </div>
      </div>
      <div
        className="relative hidden md:block overflow-hidden bg-beige"
        style={{ height: '160px' }}
      >
        {breakfast.image?.url ? (
          <Image
            src={breakfast.image.url}
            alt={breakfast.image.alt || breakfast.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #E8DFC9, #B7A5D8)' }}
          >
            <Utensils size={32} className="text-madera/40" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-playfair text-verde-bosque text-base font-bold mb-1.5">{breakfast.name}</h3>
        <p className="text-piedra text-xs leading-relaxed mb-3 flex-1 line-clamp-3">{breakfast.description}</p>
        {breakfast.mainIngredients && breakfast.mainIngredients.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-1.5 mb-3">
            {breakfast.mainIngredients.slice(0, 3).map((ing, i) => (
              <span key={i} className="text-xs bg-crema text-verde-bosque px-2 py-0.5 rounded-full">
                {ing.ingredient}
              </span>
            ))}
          </div>
        )}
        <a
          href={buildWhatsAppLink(WA_MESSAGES.breakfast(breakfast.name))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-verde-bosque hover:text-verde-jardin text-xs font-semibold transition-colors group"
        >
          <MessageCircle size={12} />
          Consultar
        </a>
      </div>
    </motion.div>
  )
}

export function BreakfastsSection({ breakfasts }: { breakfasts: Breakfast[] }) {
  const displayBreakfasts = breakfasts.length > 0 ? breakfasts : FALLBACK_BREAKFASTS
  const featured = displayBreakfasts.find((b) => b.featured) || displayBreakfasts[0]
  const rest = displayBreakfasts.filter((b) => b !== featured).slice(0, 4)

  return (
    <section id="desayunos" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-cormorant text-verde-jardin text-lg tracking-[0.25em] uppercase mb-3">
            Carta de desayunos
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            Despierta con el mejor sabor
          </h2>
          <div className="botanical-divider mb-5" />
          <p className="text-piedra text-base md:text-lg max-w-xl mx-auto">
            Cinco opciones de desayuno a la carta, preparadas con ingredientes frescos,
            incluidas en tu estadía.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Featured breakfast */}
          <BreakfastCard breakfast={featured} featured />

          {/* Rest */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {rest.map((b, i) => (
              <BreakfastCard key={i} breakfast={b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
