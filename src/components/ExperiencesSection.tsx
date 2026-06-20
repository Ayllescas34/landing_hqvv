'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Clock, MessageCircle, Compass, Map, Bike, Star } from 'lucide-react'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

interface Experience {
  name: string
  description: string
  category?: string
  duration?: string | null
  distance?: string | null
  image?: { url?: string; alt?: string } | null
}

const FALLBACK_EXPERIENCES: Experience[] = [
  {
    name: 'Centro Histórico de Antigua',
    description:
      'Pasea por las calles empedradas y admira la arquitectura colonial barroca, las ruinas de iglesias y conventos del siglo XVII.',
    category: 'lugar',
    distance: '10 minutos a pie',
    duration: '2-4 horas',
  },
  {
    name: 'Tour Volcán Pacaya',
    description:
      'Excursión de senderismo al volcán activo más accesible de Guatemala. Vista increíble y experiencia única.',
    category: 'tour',
    distance: '1.5 horas en bus',
    duration: 'Día completo',
  },
  {
    name: 'Mercado de Artesanías',
    description:
      'Descubre los textiles mayas, joyería de jade y artesanías únicas de Antigua en el tradicional mercado local.',
    category: 'recomendacion',
    distance: '15 minutos a pie',
    duration: '1-2 horas',
  },
  {
    name: 'Clases de Español',
    description:
      'Antigua es reconocida mundialmente por sus escuelas de español de alta calidad. Aprende mientras vives la cultura.',
    category: 'actividad',
    duration: 'A tu ritmo',
  },
  {
    name: 'Tour del Café',
    description:
      'Visita plantaciones de café de altura y aprende el proceso desde la semilla hasta tu taza. Guatemala produce el mejor café del mundo.',
    category: 'tour',
    distance: '30 minutos',
    duration: '3-4 horas',
  },
  {
    name: 'Lago de Atitlán',
    description:
      'Uno de los lagos más bellos del mundo, rodeado de tres volcanes. Una excursión imperdible desde Antigua.',
    category: 'lugar',
    distance: '2 horas',
    duration: 'Día completo',
  },
]

const CATEGORY_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  tour: { label: 'Tour', icon: Compass, color: '#0F4D3A' },
  lugar: { label: 'Lugar', icon: Map, color: '#5C8C5A' },
  actividad: { label: 'Actividad', icon: Bike, color: '#5B3A29' },
  recomendacion: { label: 'Recomendación', icon: Star, color: '#B7A5D8' },
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const catConfig = CATEGORY_CONFIG[exp.category || ''] || CATEGORY_CONFIG.tour
  const CatIcon = catConfig.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-beige" style={{ height: '200px' }}>
        {exp.image?.url ? (
          <Image
            src={exp.image.url}
            alt={exp.image.alt || exp.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `${catConfig.color}22` }}
          >
            <CatIcon size={44} style={{ color: catConfig.color, opacity: 0.4 }} />
          </div>
        )}
        <span
          className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white"
          style={{ background: catConfig.color }}
        >
          {catConfig.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-playfair text-verde-bosque text-lg font-bold mb-2">{exp.name}</h3>
        <p className="text-piedra text-sm leading-relaxed flex-1 mb-4">{exp.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4">
          {exp.distance && (
            <div className="flex items-center gap-1.5 text-xs text-piedra">
              <MapPin size={12} className="text-verde-jardin" />
              {exp.distance}
            </div>
          )}
          {exp.duration && (
            <div className="flex items-center gap-1.5 text-xs text-piedra">
              <Clock size={12} className="text-verde-jardin" />
              {exp.duration}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function ExperiencesSection({ experiences }: { experiences: Experience[] }) {
  const displayExperiences = experiences.length > 0 ? experiences : FALLBACK_EXPERIENCES
  const waLink = buildWhatsAppLink(WA_MESSAGES.experiences)

  return (
    <section id="experiencias" className="section-padding bg-white">
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
            Turismo y experiencias
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            Descubre Antigua Guatemala
          </h2>
          <div className="botanical-divider mb-5" />
          <p className="text-piedra text-base md:text-lg max-w-xl mx-auto">
            Nuestro equipo te brinda asesoría personalizada para aprovechar al máximo tu
            visita a esta ciudad patrimonio de la humanidad.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayExperiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-verde-bosque hover:bg-verde-jardin text-white font-semibold text-base px-8 py-4 rounded-full transition-colors duration-300 shadow-lg"
          >
            <MessageCircle size={20} />
            Solicitar información turística
          </a>
        </motion.div>
      </div>
    </section>
  )
}
