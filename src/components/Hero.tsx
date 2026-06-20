'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ChevronDown } from 'lucide-react'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

interface HeroData {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  ctaLabel?: string | null
  backgroundImage?: { url?: string } | null
}

interface HeroProps {
  data?: HeroData | null
}

export function Hero({ data }: HeroProps) {
  const title = data?.title || 'Hotel Boutique Quinta Vista Verde'
  const subtitle = data?.subtitle || 'Tu refugio ideal en Antigua Guatemala'
  const description =
    data?.description ||
    'Donde la comodidad, la naturaleza y la atención personalizada se encuentran en cada detalle.'
  const ctaLabel = data?.ctaLabel || 'Consultar por WhatsApp'
  const bgImage = data?.backgroundImage?.url

  const waLink = buildWhatsAppLink(WA_MESSAGES.general)

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={
        bgImage
          ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {}
      }
    >
      {/* Background gradient (shows when no image) */}
      {!bgImage && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #0a3528 0%, #0F4D3A 35%, #1a6b52 65%, #0d4535 100%)',
          }}
        />
      )}

      {/* Overlay for image */}
      {bgImage && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(15,77,58,0.55) 0%, rgba(10,53,40,0.75) 100%)' }}
        />
      )}

      {/* Botanical subtle pattern */}
      <div className="absolute inset-0 opacity-10 leafy-bg" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-verde-jardin/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-lavanda/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cormorant text-lavanda text-lg md:text-xl tracking-[0.3em] uppercase mb-6"
        >
          Antigua Guatemala
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-playfair text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mb-6"
          style={{ width: 80, height: 2, background: 'linear-gradient(90deg, transparent, #B7A5D8, transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-cormorant text-white/90 text-2xl md:text-3xl italic mb-4"
        >
          {subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-white/75 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white text-verde-bosque hover:bg-crema font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
            {ctaLabel}
          </a>
          <a
            href="#habitaciones"
            className="text-white/80 hover:text-white text-sm font-medium tracking-wide border-b border-white/30 hover:border-white/80 pb-0.5 transition-colors"
          >
            Ver habitaciones
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase">Descubre</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
