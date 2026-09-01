'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UtensilsCrossed } from 'lucide-react'
import { BreakfastDetailModal } from './BreakfastDetailModal'
import { BreakfastCard, type BreakfastCardItem } from './BreakfastCard'

type BreakfastItem = BreakfastCardItem

interface BreakfastCategory {
  id: string | number
  name: string
}

interface ALaCarteContent {
  alaCarteTitle?: string | null
  alaCarteDescription?: string | null
  alaCarteGuestNote?: string | null
}

function categoryKey(category: BreakfastItem['category']): string | number | null {
  if (category == null) return null
  if (typeof category === 'object') return category.id ?? null
  return category
}

export function ALaCarteMenu({
  breakfasts,
  categories,
  content,
}: {
  breakfasts: BreakfastItem[]
  categories: BreakfastCategory[]
  content?: ALaCarteContent | null
}) {
  const [activeCategory, setActiveCategory] = useState<string | number>('all')
  const [selected, setSelected] = useState<BreakfastItem | null>(null)

  const available = useMemo(() => breakfasts.filter((b) => b.available !== false), [breakfasts])

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return available
    return available.filter((b) => categoryKey(b.category) === activeCategory)
  }, [available, activeCategory])

  const title = content?.alaCarteTitle || 'Desayunos a la Carta'
  const description =
    content?.alaCarteDescription ||
    'No es necesario hospedarte para disfrutar de nuestra carta de desayunos. Cualquier persona puede visitar nuestro restaurante y elegir entre nuestras opciones, preparadas al momento.'
  const guestNote =
    content?.alaCarteGuestNote ||
    'Si eres huésped y deseas un desayuno diferente al incluido en tu estadía, puedes solicitar cualquier desayuno de nuestra carta pagando únicamente el valor adicional correspondiente.'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-crema rounded-[2rem] p-6 sm:p-10 lg:p-14"
    >
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 font-cormorant text-verde-jardin text-sm tracking-[0.25em] uppercase mb-3">
          <UtensilsCrossed size={16} />
          Abierto a huéspedes y visitantes
        </span>
        <h3 className="font-playfair text-verde-bosque text-2xl md:text-3xl font-bold mb-3">{title}</h3>
        <p className="text-piedra text-base max-w-2xl mx-auto mb-4">{description}</p>
        <p className="text-verde-jardin text-sm bg-white inline-block px-5 py-2.5 rounded-2xl max-w-2xl leading-relaxed shadow-sm">
          {guestNote}
        </p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-verde-bosque text-white shadow-md'
                : 'bg-white text-piedra hover:bg-beige'
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-verde-bosque text-white shadow-md'
                  : 'bg-white text-piedra hover:bg-beige'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="flex flex-wrap justify-center gap-6">
        <AnimatePresence>
          {filtered.map((breakfast) => (
            <BreakfastCard
              key={breakfast.id}
              breakfast={breakfast}
              variant="menu"
              onClick={() => setSelected(breakfast)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-piedra text-sm py-10">
          No hay desayunos disponibles en esta categoría por el momento.
        </p>
      )}

      <BreakfastDetailModal breakfast={selected} onClose={() => setSelected(null)} />
    </motion.div>
  )
}
