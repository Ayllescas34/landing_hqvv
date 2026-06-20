'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, MessageCircle, BedDouble } from 'lucide-react'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

interface Room {
  name: string
  type?: string
  description: string
  capacity?: number
  images?: Array<{ image?: { url?: string; alt?: string } | null }>
  amenities?: Array<{ amenity?: string | null }>
}

const FALLBACK_ROOMS: Room[] = [
  {
    name: 'Habitación Doble Estándar',
    type: 'double',
    description:
      'Acogedora habitación con cama doble, decorada con detalles coloniales y vista al jardín. Perfecta para parejas o viajeros que buscan tranquilidad.',
    capacity: 2,
    amenities: [
      { amenity: 'Baño privado' },
      { amenity: 'Agua caliente' },
      { amenity: 'WiFi' },
      { amenity: 'Closet' },
    ],
  },
  {
    name: 'Suite Familiar',
    type: 'family',
    description:
      'Amplia suite ideal para familias, con espacio suficiente para descansar cómodamente. Incluye zona de estar y acceso directo al jardín.',
    capacity: 4,
    amenities: [
      { amenity: 'Baño privado' },
      { amenity: 'Zona de estar' },
      { amenity: 'WiFi' },
      { amenity: 'Vista al jardín' },
    ],
  },
  {
    name: 'Junior Suite Vista Volcán',
    type: 'junior-suite',
    description:
      'Nuestra habitación más especial, con vistas privilegiadas al majestuoso Volcán de Agua. Decoración elegante con detalles artesanales guatemaltecos.',
    capacity: 2,
    amenities: [
      { amenity: 'Vista al volcán' },
      { amenity: 'Baño de lujo' },
      { amenity: 'WiFi' },
      { amenity: 'Terraza privada' },
    ],
  },
]

const TYPE_LABELS: Record<string, string> = {
  single: 'Individual',
  double: 'Doble',
  suite: 'Suite',
  family: 'Familiar',
  'junior-suite': 'Junior Suite',
}

function RoomCard({ room }: { room: Room }) {
  const imgUrl = room.images?.[0]?.image?.url
  const imgAlt = room.images?.[0]?.image?.alt || room.name
  const waLink = buildWhatsAppLink(WA_MESSAGES.room(room.name))

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-beige">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0F4D3A22 0%, #5C8C5A22 100%)' }}
          >
            <BedDouble size={52} className="text-verde-bosque/30" />
          </div>
        )}
        {room.type && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-verde-bosque text-xs font-semibold px-3 py-1 rounded-full">
            {TYPE_LABELS[room.type] || room.type}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-playfair text-verde-bosque text-xl font-bold mb-2">{room.name}</h3>
        <p className="text-piedra text-sm leading-relaxed mb-4 flex-1">{room.description}</p>

        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {room.amenities.slice(0, 4).map((a, i) => (
              <span
                key={i}
                className="text-xs bg-crema text-verde-bosque px-3 py-1 rounded-full font-medium"
              >
                {a.amenity}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-beige">
          {room.capacity && (
            <div className="flex items-center gap-1.5 text-piedra text-sm">
              <Users size={14} />
              <span>Hasta {room.capacity} personas</span>
            </div>
          )}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-verde-bosque hover:bg-verde-jardin text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-300"
          >
            <MessageCircle size={14} />
            Solicitar info
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function RoomsSection({ rooms }: { rooms: Room[] }) {
  const displayRooms = rooms.length > 0 ? rooms : FALLBACK_ROOMS

  return (
    <section id="habitaciones" className="section-padding bg-crema leafy-bg">
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
            Nuestras habitaciones
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            Confort y elegancia colonial
          </h2>
          <div className="botanical-divider mb-5" />
          <p className="text-piedra text-base md:text-lg max-w-xl mx-auto">
            Cada habitación ha sido diseñada para ofrecerte un descanso pleno, con
            decoración cálida y todos los servicios que necesitas.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayRooms.map((room, i) => (
            <RoomCard key={i} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}
