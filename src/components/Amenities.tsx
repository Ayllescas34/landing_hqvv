'use client'

import { motion } from 'framer-motion'

const AMENITIES = [
  { emoji: '🍳', title: 'Desayuno a la carta', desc: 'Cinco opciones deliciosas incluidas cada mañana' },
  { emoji: '🌿', title: 'Amplio jardín', desc: 'Espacios verdes para relajarse en armonía con la naturaleza' },
  { emoji: '🛏', title: 'Habitaciones confortables', desc: 'Decoradas con calidez y atención al detalle' },
  { emoji: '⭐', title: 'Atención personalizada', desc: 'Equipo dedicado a hacer tu estadía inolvidable' },
  { emoji: '🧹', title: 'Limpieza impecable', desc: 'Estándares de higiene y orden en cada rincón' },
  { emoji: '🚭', title: 'Ambientes libres de humo', desc: 'Espacios frescos y saludables para todos los huéspedes' },
  { emoji: '🗺', title: 'Asesoría turística', desc: 'Recomendaciones locales y apoyo en la organización de tours' },
  { emoji: '📶', title: 'WiFi gratuito', desc: 'Conexión de alta velocidad en todas las áreas' },
  { emoji: '🚗', title: 'Parqueo disponible', desc: 'Estacionamiento seguro para tu vehículo' },
  { emoji: '🌋', title: 'Vista al Volcán de Agua', desc: 'Disfruta de una de las vistas más icónicas de Antigua' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Amenities() {
  return (
    <section className="section-padding bg-white">
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
            Beneficios incluidos
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            ¿Qué incluye tu estadía?
          </h2>
          <div className="botanical-divider mb-5" />
          <p className="text-piedra text-base md:text-lg max-w-2xl mx-auto">
            Una experiencia que va más allá de una simple habitación. Cada detalle está pensado
            para tu bienestar y comodidad.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {AMENITIES.map((amenity) => (
            <motion.div
              key={amenity.title}
              variants={item}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-crema hover:bg-verde-bosque transition-all duration-300 cursor-default card-hover"
            >
              <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {amenity.emoji}
              </div>
              <h3 className="font-playfair text-verde-bosque group-hover:text-white text-sm font-semibold mb-1.5 transition-colors leading-snug">
                {amenity.title}
              </h3>
              <p className="text-piedra group-hover:text-white/75 text-xs leading-relaxed transition-colors">
                {amenity.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
