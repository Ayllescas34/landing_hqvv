'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone, Clock } from 'lucide-react'

interface LocationProps {
  settings?: {
    address?: string | null
    phone?: string | null
    googleMapsUrl?: string | null
    wazeUrl?: string | null
    mapEmbedUrl?: string | null
  } | null
}

const DEFAULT_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30795.07!2d-90.7355!3d14.5586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858940f9b94b9e0b%3A0x8e33456e2ac5ee8!2sAntigua%20Guatemala!5e0!3m2!1ses!2sgt!4v1000000000000!5m2!1ses!2sgt'

export function LocationSection({ settings }: LocationProps) {
  const address = settings?.address || 'Antigua Guatemala, Sacatepéquez, Guatemala'
  const phone = settings?.phone || '+502 7867-7627'
  const googleMapsUrl =
    settings?.googleMapsUrl ||
    'https://maps.google.com/?q=Antigua+Guatemala'
  const wazeUrl =
    settings?.wazeUrl || 'https://waze.com/ul?q=Antigua+Guatemala'
  const mapEmbed = settings?.mapEmbedUrl || DEFAULT_MAP_EMBED

  return (
    <section id="ubicacion" className="section-padding bg-white">
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
            Cómo llegarnos
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            Encuéntranos en Antigua
          </h2>
          <div className="botanical-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-xl"
            style={{ height: '420px' }}
          >
            <iframe
              src={mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Hotel Quinta Vista Verde"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-playfair text-verde-bosque text-2xl font-bold mb-4">
                Hotel Boutique Quinta Vista Verde
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-verde-bosque/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} className="text-verde-bosque" />
                  </div>
                  <div>
                    <p className="font-semibold text-madera text-sm mb-0.5">Dirección</p>
                    <p className="text-piedra text-sm">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-verde-bosque/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-verde-bosque" />
                  </div>
                  <div>
                    <p className="font-semibold text-madera text-sm mb-0.5">Teléfono</p>
                    <a
                      href={`tel:${phone.replace(/\s|-/g, '')}`}
                      className="text-verde-jardin hover:text-verde-bosque text-sm transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-verde-bosque/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-verde-bosque" />
                  </div>
                  <div>
                    <p className="font-semibold text-madera text-sm mb-0.5">Check-in / Check-out</p>
                    <p className="text-piedra text-sm">Check-in: 14:00 hrs</p>
                    <p className="text-piedra text-sm">Check-out: 12:00 hrs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direction buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-verde-bosque hover:bg-verde-jardin text-white font-medium text-sm px-6 py-3 rounded-full transition-colors duration-300 flex-1"
              >
                <Navigation size={16} />
                Google Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#05C8F8] hover:bg-[#04b4e0] text-white font-medium text-sm px-6 py-3 rounded-full transition-colors duration-300 flex-1"
              >
                <Navigation size={16} />
                Waze
              </a>
            </div>

            {/* Note */}
            <p className="text-piedra text-sm bg-crema rounded-2xl p-4 leading-relaxed">
              📍 Nos encontramos en Antigua Guatemala, a pocos minutos a pie del Parque Central.
              Si tienes dificultades para encontrarnos, escríbenos por WhatsApp y te guiamos
              personalmente.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
