'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '@/lib/whatsapp'

interface WhatsAppCTABandProps {
  eyebrow: string
  title: string
  description: string
  message: string
  buttonLabel: string
}

export function WhatsAppCTABand({ eyebrow, title, description, message, buttonLabel }: WhatsAppCTABandProps) {
  const waLink = buildWhatsAppLink(message)

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a3528 0%, #0F4D3A 50%, #1a6b52 100%)' }}
    >
      <div className="absolute inset-0 opacity-10 leafy-bg" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-verde-jardin/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-lavanda/15 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cormorant text-lavanda text-lg tracking-[0.25em] uppercase mb-4">{eyebrow}</p>
          <h2 className="font-playfair text-white text-3xl md:text-4xl font-bold mb-5 leading-tight">{title}</h2>
          <div
            className="mx-auto mb-6"
            style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, #B7A5D8, transparent)' }}
          />
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10">{description}</p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-verde-bosque hover:bg-crema font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <MessageCircle size={22} />
            {buttonLabel}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
