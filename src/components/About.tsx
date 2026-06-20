'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Leaf, Heart, Star } from 'lucide-react'

interface AboutData {
  title?: string | null
  body?: string | null
  secondParagraph?: string | null
  images?: Array<{ image?: { url?: string; alt?: string } | null }> | null
  highlights?: Array<{ text?: string | null }> | null
}

const FALLBACK_HIGHLIGHTS = [
  'Ambiente familiar y acogedor',
  'Jardines exuberantes',
  'Vista privilegiada al Volcán de Agua',
  'Atención personalizada',
]

export function About({ data }: { data?: AboutData | null }) {
  const title = data?.title || 'Un refugio de tranquilidad en el corazón de Antigua'
  const body =
    data?.body ||
    'Somos un hotel boutique familiar ubicado en Antigua Guatemala, rodeado de jardines exuberantes y con una vista privilegiada al Volcán de Agua. Cada detalle de nuestra hospitalidad ha sido pensado para que tu estadía sea una experiencia que va más allá de una simple noche de descanso.'
  const second =
    data?.secondParagraph ||
    'Nuestro equipo brinda atención personalizada y asesoría turística para que descubras lo mejor de Antigua Guatemala. Despierta cada mañana con un desayuno a la carta y el canto de los pájaros en nuestro jardín.'
  const highlights =
    data?.highlights?.map((h) => h.text).filter(Boolean) || FALLBACK_HIGHLIGHTS
  const images = data?.images?.slice(0, 4) || []

  return (
    <section id="nosotros" className="section-padding bg-crema leafy-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cormorant text-verde-jardin text-lg tracking-[0.25em] uppercase mb-3">
            Nuestra historia
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto mb-5">
            {title}
          </h2>
          <div className="botanical-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {images.length >= 4 ? (
              images.map((item, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden shadow-lg ${
                    i === 0 ? 'row-span-2' : ''
                  }`}
                  style={{ minHeight: i === 0 ? '380px' : '180px' }}
                >
                  {item.image?.url && (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || 'Hotel Quinta Vista Verde'}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              ))
            ) : (
              /* Placeholder grid when no CMS images */
              <>
                <div
                  className="row-span-2 rounded-2xl shadow-lg overflow-hidden"
                  style={{ minHeight: '380px', background: 'linear-gradient(160deg, #0F4D3A, #5C8C5A)' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Leaf className="text-white/30" size={64} />
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl shadow-lg overflow-hidden"
                    style={{
                      minHeight: '180px',
                      background: i === 1 ? '#E8DFC9' : i === 2 ? '#B7A5D8' : '#5B3A29',
                      opacity: 0.6,
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-piedra text-lg leading-relaxed">{body}</p>
            <p className="text-piedra text-base leading-relaxed">{second}</p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-verde-jardin/15 flex items-center justify-center flex-shrink-0">
                    {i % 3 === 0 ? (
                      <Leaf size={14} className="text-verde-jardin" />
                    ) : i % 3 === 1 ? (
                      <Heart size={14} className="text-verde-jardin" />
                    ) : (
                      <Star size={14} className="text-verde-jardin" />
                    )}
                  </div>
                  <span className="text-madera text-sm font-medium">{h}</span>
                </div>
              ))}
            </div>

            {/* Decorative badge */}
            <div className="mt-4 inline-flex items-center gap-3 bg-verde-bosque/8 border border-verde-bosque/20 rounded-2xl px-5 py-4 self-start">
              <div className="text-center">
                <span className="font-playfair text-verde-bosque text-2xl font-bold">9.4</span>
                <span className="text-verde-bosque text-xs"> / 10</span>
              </div>
              <div className="text-left">
                <p className="text-verde-bosque text-xs font-semibold">Calificación</p>
                <p className="text-piedra text-xs">Booking.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
