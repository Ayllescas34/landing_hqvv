'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Clock, MessageCircle, Utensils } from 'lucide-react'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

export interface ALaCarteBreakfast {
  id: string | number
  name: string
  description: string
  image?: { url?: string; alt?: string } | null
  category?: { id?: string | number; name?: string | null } | string | number | null
  price?: number | null
  showPrice?: boolean | null
  ingredients?: Array<{ ingredient?: string | null }> | null
  tags?: Array<{ tag?: string | null }> | null
  estimatedTime?: string | null
}

export function BreakfastDetailModal({
  breakfast,
  onClose,
}: {
  breakfast: ALaCarteBreakfast | null
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const categoryName =
    breakfast && typeof breakfast.category === 'object' ? breakfast.category?.name : undefined

  return (
    <AnimatePresence>
      {breakfast && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white rounded-full px-3.5 py-2 text-xs font-semibold hover:bg-black/45 transition-colors"
            >
              <X size={14} />
              Cerrar
            </button>

            <div className="relative w-full bg-beige" style={{ height: '280px' }}>
              {breakfast.image?.url ? (
                <Image
                  src={breakfast.image.url}
                  alt={breakfast.image.alt || breakfast.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(160deg, #5B3A29, #0F4D3A)' }}
                >
                  <Utensils size={56} className="text-white/20" />
                </div>
              )}
              {categoryName && (
                <span className="absolute top-4 left-4 bg-white text-verde-bosque text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  {categoryName}
                </span>
              )}
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-playfair text-verde-bosque text-2xl font-bold">{breakfast.name}</h3>
                {breakfast.showPrice !== false && breakfast.price != null && (
                  <span className="font-playfair text-verde-bosque text-xl font-bold whitespace-nowrap">
                    Q{breakfast.price}
                  </span>
                )}
              </div>

              <p className="text-piedra text-sm md:text-base leading-relaxed">{breakfast.description}</p>

              {breakfast.ingredients && breakfast.ingredients.length > 0 && (
                <div>
                  <p className="text-madera font-semibold text-xs uppercase tracking-wide mb-2">Ingredientes</p>
                  <div className="flex flex-wrap gap-2">
                    {breakfast.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs bg-crema text-verde-bosque px-3 py-1 rounded-full">
                        {ing.ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {breakfast.tags && breakfast.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {breakfast.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs border border-verde-jardin/40 text-verde-jardin px-3 py-1 rounded-full"
                    >
                      #{t.tag}
                    </span>
                  ))}
                </div>
              )}

              {breakfast.estimatedTime && (
                <div className="flex items-center gap-2 text-piedra text-sm">
                  <Clock size={16} className="text-verde-bosque" />
                  Tiempo estimado: {breakfast.estimatedTime}
                </div>
              )}

              <a
                href={buildWhatsAppLink(WA_MESSAGES.breakfast(breakfast.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-verde-bosque hover:bg-verde-jardin text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
