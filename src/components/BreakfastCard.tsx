'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, Utensils } from 'lucide-react'
import type { ALaCarteBreakfast } from './BreakfastDetailModal'

export interface BreakfastCardItem extends ALaCarteBreakfast {
  available?: boolean | null
  featured?: boolean | null
  order?: number | null
}

export function BreakfastCard({
  breakfast,
  variant = 'menu',
  onClick,
}: {
  breakfast: BreakfastCardItem
  variant?: 'menu' | 'included'
  onClick: () => void
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group text-left bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-[300px]"
    >
      <div className="relative overflow-hidden bg-beige" style={{ height: '180px' }}>
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
        {variant === 'included' ? (
          <span className="absolute top-3 left-3 bg-verde-bosque text-white text-xs font-semibold px-3 py-1 rounded-full">
            {breakfast.featured ? 'Incluido · Destacado' : 'Incluido'}
          </span>
        ) : (
          breakfast.featured && (
            <span className="absolute top-3 left-3 bg-lavanda text-white text-xs font-semibold px-3 py-1 rounded-full">
              Destacado
            </span>
          )
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-playfair text-verde-bosque text-base font-bold">{breakfast.name}</h4>
          {variant === 'menu' && breakfast.showPrice !== false && breakfast.price != null && (
            <span className="font-semibold text-verde-bosque text-sm whitespace-nowrap">
              Q{breakfast.price}
            </span>
          )}
        </div>
        <p className="text-piedra text-xs leading-relaxed line-clamp-2">{breakfast.description}</p>
        {breakfast.estimatedTime && (
          <div className="flex items-center gap-1.5 text-piedra/70 text-xs mt-1">
            <Clock size={12} />
            {breakfast.estimatedTime}
          </div>
        )}
      </div>
    </motion.button>
  )
}
