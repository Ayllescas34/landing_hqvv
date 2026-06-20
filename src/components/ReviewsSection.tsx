'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Review {
  author: string
  location?: string | null
  rating?: number | null
  comment: string
  platform?: string | null
}

interface ReviewsProps {
  reviews: Review[]
  settings?: { bookingScore?: string | null } | null
}

const FALLBACK_REVIEWS: Review[] = [
  {
    author: 'María G.',
    location: 'Ciudad de México, México',
    rating: 5,
    comment:
      'Quedamos encantados con el hotel. El jardín es precioso, el desayuno delicioso y el trato del personal es excelente. Sin duda, volveremos a Antigua y nos quedaremos aquí.',
    platform: 'booking',
  },
  {
    author: 'James & Sarah T.',
    location: 'Londres, Reino Unido',
    rating: 5,
    comment:
      'A wonderful boutique hotel with stunning views of Agua Volcano. The family atmosphere makes it feel like a home away from home. Breakfast was exceptional!',
    platform: 'google',
  },
  {
    author: 'Rodrigo M.',
    location: 'Bogotá, Colombia',
    rating: 5,
    comment:
      'Hotel de encantos coloniales con jardines hermosos. La atención fue impecable desde el primer momento. La ubicación es perfecta para explorar Antigua a pie.',
    platform: 'tripadvisor',
  },
  {
    author: 'Ana & Carlos V.',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    comment:
      'Una joya escondida en Antigua. Las habitaciones son acogedoras, la limpieza impecable y el desayuno guatemalteco una experiencia cultural en sí misma.',
    platform: 'booking',
  },
  {
    author: 'Pierre L.',
    location: 'París, Francia',
    rating: 5,
    comment:
      "Très bel hôtel avec un jardin magnifique. La vue sur le volcan est époustouflante. Personnel très accueillant et petit-déjeuner excellent. Je recommande vivement!",
    platform: 'google',
  },
  {
    author: 'Familia Reyes',
    location: 'Guatemala',
    rating: 5,
    comment:
      'Nos quedamos en familia y fue una experiencia hermosa. Los niños disfrutaron el jardín y nosotros la tranquilidad. El servicio siempre atento y amable.',
    platform: 'directo',
  },
]

const PLATFORM_LABELS: Record<string, string> = {
  booking: 'Booking.com',
  google: 'Google',
  tripadvisor: 'TripAdvisor',
  airbnb: 'Airbnb',
  directo: 'Visita directa',
}

function StarRating({ rating = 5 }: { rating?: number | null }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < (rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
        />
      ))}
    </div>
  )
}

export function ReviewsSection({ reviews, settings }: ReviewsProps) {
  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS
  const bookingScore = settings?.bookingScore || '9.4'

  return (
    <section className="section-padding bg-crema leafy-bg">
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
            Lo que dicen nuestros huéspedes
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            Experiencias reales
          </h2>
          <div className="botanical-divider mb-5" />

          {/* Booking score badge */}
          <div className="inline-flex items-center gap-3 bg-verde-bosque text-white px-6 py-3 rounded-full shadow-lg">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-playfair text-xl font-bold">{bookingScore}</span>
            <span className="text-sm text-white/80">/ 10 en Booking.com</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={28} className="text-lavanda mb-3 flex-shrink-0" />

              {/* Comment */}
              <p className="font-cormorant text-madera text-lg italic leading-relaxed flex-1 mb-4">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Footer */}
              <div className="border-t border-beige pt-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-verde-bosque text-sm">{review.author}</p>
                    {review.location && (
                      <p className="text-piedra text-xs mt-0.5">{review.location}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StarRating rating={review.rating} />
                    {review.platform && (
                      <span className="text-xs text-piedra">
                        {PLATFORM_LABELS[review.platform] || review.platform}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
