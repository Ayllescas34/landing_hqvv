'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, Instagram, Facebook } from 'lucide-react'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

interface ContactProps {
  settings?: {
    whatsappNumber?: string | null
    phone?: string | null
    instagram?: string | null
    facebook?: string | null
  } | null
}

export function ContactSection({ settings }: ContactProps) {
  const waNumber = settings?.whatsappNumber || '50244480395'
  const phone = settings?.phone || '+502 7867-7627'
  const instagram = settings?.instagram || 'hotel_quintavistaverde'
  const facebook = settings?.facebook || 'hotel_quintavistaverde'

  const waLink = buildWhatsAppLink(WA_MESSAGES.contact, waNumber)

  return (
    <section
      id="contacto"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a3528 0%, #0F4D3A 50%, #1a6b52 100%)' }}
    >
      {/* Decorative */}
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
          <p className="font-cormorant text-lavanda text-lg tracking-[0.25em] uppercase mb-4">
            Estamos para ayudarte
          </p>
          <h2 className="font-playfair text-white text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Inicia tu conversación con nosotros
          </h2>
          <div
            className="mx-auto mb-6"
            style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, #B7A5D8, transparent)' }}
          />
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10">
            Resolvemos todas tus dudas, te ayudamos a planificar tu estadía y te brindamos
            información sobre disponibilidad. Sin necesidad de reservas en línea.
          </p>

          {/* Main CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-verde-bosque hover:bg-crema font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 mb-10"
          >
            <MessageCircle size={22} />
            Contactar por WhatsApp
          </a>

          {/* Contact info */}
          <div className="grid sm:grid-cols-3 gap-6">
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-5 transition-all duration-300"
            >
              <MessageCircle size={24} className="text-lavanda group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">WhatsApp</span>
              <span className="text-white/60 text-xs">+502 4448-0395</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s|-/g, '')}`}
              className="group flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-5 transition-all duration-300"
            >
              <Phone size={24} className="text-lavanda group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">Teléfono</span>
              <span className="text-white/60 text-xs">{phone}</span>
            </a>

            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-5 transition-all duration-300"
            >
              <Instagram size={24} className="text-lavanda group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">Instagram</span>
              <span className="text-white/60 text-xs">@{instagram}</span>
            </a>
          </div>

          {/* Facebook */}
          <div className="mt-6">
            <a
              href={`https://facebook.com/${facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-lavanda text-sm transition-colors"
            >
              <Facebook size={16} />
              {facebook}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
