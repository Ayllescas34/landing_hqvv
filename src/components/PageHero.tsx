'use client'

import { motion } from 'framer-motion'
import { BackToHomeLink } from './BackToHomeLink'

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
  backgroundImage?: string | null
}

export function PageHero({ eyebrow, title, description, backgroundImage }: PageHeroProps) {
  return (
    <section
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {}
      }
    >
      {/* Background gradient (shows when no image) */}
      {!backgroundImage && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, #0a3528 0%, #0F4D3A 35%, #1a6b52 65%, #0d4535 100%)',
          }}
        />
      )}

      {/* Overlay for image */}
      {backgroundImage && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(15,77,58,0.6) 0%, rgba(10,53,40,0.8) 100%)' }}
        />
      )}

      <div className="absolute inset-0 opacity-10 leafy-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <BackToHomeLink variant="light" />
        </motion.div>

        <div className="text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cormorant text-lavanda text-lg md:text-xl tracking-[0.3em] uppercase mb-5"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-playfair text-white text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mb-6"
            style={{ width: 80, height: 2, background: 'linear-gradient(90deg, transparent, #B7A5D8, transparent)' }}
          />

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
