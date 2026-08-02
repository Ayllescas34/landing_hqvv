'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2, Clock, Utensils } from 'lucide-react'

interface IncludedBreakfastContent {
  includedTitle?: string | null
  includedDescription?: string | null
  includedImage?: { url?: string; alt?: string } | null
  includedBenefits?: Array<{ benefit?: string | null }> | null
  includedSchedule?: string | null
  includedNotes?: string | null
}

const DEFAULT_BENEFITS = [
  'Incluido según el tipo de habitación',
  'Preparado con ingredientes frescos y locales',
  'Opciones tradicionales guatemaltecas',
  'Servido en nuestro restaurante con vista al jardín',
]

export function IncludedBreakfastBlock({ content }: { content?: IncludedBreakfastContent | null }) {
  const title = content?.includedTitle || 'Desayuno incluido en tu estadía'
  const description =
    content?.includedDescription ||
    'Todos nuestros huéspedes disfrutan de un desayuno incluido según el tipo de habitación, preparado cada mañana con ingredientes frescos y locales.'
  const benefits =
    content?.includedBenefits && content.includedBenefits.length > 0
      ? content.includedBenefits.map((b) => b.benefit).filter(Boolean)
      : DEFAULT_BENEFITS
  const schedule = content?.includedSchedule || '7:00 am – 10:00 am'
  const notes = content?.includedNotes

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden shadow-lg bg-beige"
        style={{ minHeight: '320px' }}
      >
        {content?.includedImage?.url ? (
          <Image
            src={content.includedImage.url}
            alt={content.includedImage.alt || title}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(160deg, #5C8C5A, #0F4D3A)', minHeight: '320px' }}
          >
            <Utensils size={64} className="text-white/20" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white text-verde-bosque text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            Incluido en tu estadía
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex flex-col gap-5"
      >
        <h3 className="font-playfair text-verde-bosque text-2xl md:text-3xl font-bold">{title}</h3>
        <p className="text-piedra text-base leading-relaxed">{description}</p>

        <ul className="flex flex-col gap-2.5">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2.5 text-piedra text-sm">
              <CheckCircle2 size={18} className="text-verde-jardin flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5 text-madera font-semibold text-sm bg-crema w-fit px-4 py-2 rounded-full">
          <Clock size={16} className="text-verde-bosque" />
          {schedule}
        </div>

        {notes && <p className="text-piedra text-sm italic leading-relaxed">{notes}</p>}
      </motion.div>
    </div>
  )
}
