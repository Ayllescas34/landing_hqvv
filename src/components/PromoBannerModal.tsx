'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Sparkles } from 'lucide-react'
import { isExternalUrl, resolveInternalLink } from '@/lib/links'

interface Promotion {
  id: string | number
  title: string
  subtitle?: string | null
  description?: string | null
  image?: { url?: string; alt?: string } | null
  backgroundColor?: string | null
  buttonText?: string | null
  buttonUrl?: string | null
  secondaryButtonText?: string | null
  secondaryButtonUrl?: string | null
  displayMode?: 'always' | 'once' | 'manual' | null
}

export function PromoBannerModal({ promotion }: { promotion?: Promotion | null }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!promotion) return
    // "manual" promotions never auto-open — getActivePromotion already filters
    // these out, this guard just protects against future callers passing one directly.
    if (promotion.displayMode === 'manual') return

    const key = `hqvv_promo_seen_${promotion.id}`
    if (promotion.displayMode === 'once' && window.localStorage.getItem(key)) return

    // The localStorage write happens only when the banner actually opens (inside
    // the timer callback), not eagerly here. React Strict Mode double-invokes
    // this effect in dev (mount → cleanup → mount again); if the write happened
    // here, the phantom first mount would permanently mark the promo "seen"
    // before its timer — cancelled by the phantom cleanup — ever fires, and the
    // real mount would then find the key already set and never open the banner.
    const timer = setTimeout(() => {
      if (promotion.displayMode === 'once') {
        window.localStorage.setItem(key, '1')
      }
      setOpen(true)
    }, 700)
    return () => clearTimeout(timer)
  }, [promotion])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!promotion) return null

  const close = () => setOpen(false)
  const bg = promotion.backgroundColor || '#0F4D3A'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Cerrar promoción"
              className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full px-3.5 py-2 text-xs font-semibold hover:bg-white/25 transition-colors"
            >
              <X size={14} />
              Cerrar
            </button>

            {/* Content panel */}
            <div
              className="order-2 md:order-1 p-8 md:p-10 flex flex-col justify-center gap-4"
              style={{ backgroundColor: bg }}
            >
              <span className="inline-flex items-center gap-2 text-white/80 font-cormorant text-sm tracking-[0.25em] uppercase">
                <Sparkles size={16} />
                Promoción especial
              </span>
              <h2 className="font-playfair text-white text-2xl md:text-4xl font-bold leading-tight">
                {promotion.title}
              </h2>
              {promotion.subtitle && (
                <p className="font-cormorant italic text-white/85 text-lg md:text-xl">
                  {promotion.subtitle}
                </p>
              )}
              {promotion.description && (
                <p className="text-white/85 text-sm md:text-base leading-relaxed">
                  {promotion.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                {promotion.buttonText && promotion.buttonUrl && (() => {
                  const href = resolveInternalLink(promotion.buttonUrl)
                  return isExternalUrl(href) ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="inline-flex items-center justify-center bg-white text-verde-bosque hover:bg-crema font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                    >
                      {promotion.buttonText}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={close}
                      className="inline-flex items-center justify-center bg-white text-verde-bosque hover:bg-crema font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                    >
                      {promotion.buttonText}
                    </Link>
                  )
                })()}
                {promotion.secondaryButtonText && promotion.secondaryButtonUrl && (() => {
                  const href = resolveInternalLink(promotion.secondaryButtonUrl)
                  return isExternalUrl(href) ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="inline-flex items-center justify-center border border-white/50 text-white hover:bg-white/10 font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                    >
                      {promotion.secondaryButtonText}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={close}
                      className="inline-flex items-center justify-center border border-white/50 text-white hover:bg-white/10 font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                    >
                      {promotion.secondaryButtonText}
                    </Link>
                  )
                })()}
              </div>
            </div>

            {/* Image panel */}
            <div className="order-1 md:order-2 relative min-h-[220px] md:min-h-full bg-beige">
              {promotion.image?.url ? (
                <Image
                  src={promotion.image.url}
                  alt={promotion.image.alt || promotion.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full min-h-[220px]"
                  style={{ background: `linear-gradient(160deg, ${bg}, #0F4D3A)` }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
