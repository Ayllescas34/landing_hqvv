'use client'

import { motion } from 'framer-motion'
import { IncludedBreakfastBlock } from './IncludedBreakfastBlock'
import { ALaCarteMenu } from './ALaCarteMenu'
import type { ALaCarteBreakfast } from './BreakfastDetailModal'

interface BreakfastsContentData {
  header?: {
    sectionEyebrow?: string | null
    sectionTitle?: string | null
    sectionDescription?: string | null
  } | null
  included?: {
    includedTitle?: string | null
    includedDescription?: string | null
    includedImage?: { url?: string; alt?: string } | null
    includedBenefits?: Array<{ benefit?: string | null }> | null
    includedSchedule?: string | null
    includedNotes?: string | null
  } | null
  alaCarte?: {
    alaCarteTitle?: string | null
    alaCarteDescription?: string | null
    alaCarteGuestNote?: string | null
  } | null
}

interface BreakfastCategory {
  id: string | number
  name: string
}

interface BreakfastItem extends ALaCarteBreakfast {
  available?: boolean | null
  featured?: boolean | null
}

export function BreakfastsSection({
  content,
  breakfasts,
  categories,
}: {
  content?: BreakfastsContentData | null
  breakfasts: BreakfastItem[]
  categories: BreakfastCategory[]
}) {
  const eyebrow = content?.header?.sectionEyebrow || 'Carta de desayunos'
  const title = content?.header?.sectionTitle || 'Despierta con el mejor sabor'
  const description =
    content?.header?.sectionDescription ||
    'Nuestros huéspedes disfrutan de un desayuno incluido en su estadía, y cualquier visitante puede además disfrutar de nuestra carta de desayunos en el restaurante.'

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
            {eyebrow}
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          <div className="botanical-divider mb-5" />
          <p className="text-piedra text-base md:text-lg max-w-xl mx-auto">{description}</p>
        </motion.div>

        <IncludedBreakfastBlock content={content?.included} />

        <div className="botanical-divider mb-14" />

        <ALaCarteMenu breakfasts={breakfasts} categories={categories} content={content?.alaCarte} />
      </div>
    </section>
  )
}
