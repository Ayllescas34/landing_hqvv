'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

interface GalleryImage {
  title: string
  category: string
  image?: { url?: string; alt?: string } | null
}

const CATEGORIES = [
  { key: 'all', label: 'Todas' },
  { key: 'habitaciones', label: 'Habitaciones' },
  { key: 'jardines', label: 'Jardines' },
  { key: 'instalaciones', label: 'Instalaciones' },
  { key: 'desayunos', label: 'Desayunos' },
  { key: 'volcan', label: 'Vista al Volcán' },
]

const PLACEHOLDER_IMAGES: GalleryImage[] = [
  { title: 'Jardín principal', category: 'jardines' },
  { title: 'Habitación doble', category: 'habitaciones' },
  { title: 'Vista al Volcán de Agua', category: 'volcan' },
  { title: 'Desayuno guatemalteco', category: 'desayunos' },
  { title: 'Área común', category: 'instalaciones' },
  { title: 'Jardín trasero', category: 'jardines' },
  { title: 'Suite familiar', category: 'habitaciones' },
  { title: 'Amanecer con vista al volcán', category: 'volcan' },
  { title: 'Panqueques artesanales', category: 'desayunos' },
]

const PLACEHOLDER_COLORS = [
  '#0F4D3A', '#5C8C5A', '#B7A5D8', '#5B3A29',
  '#E8DFC9', '#0F4D3A', '#5C8C5A', '#B7A5D8', '#5B3A29',
]

export function GallerySection({ images }: { images: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const displayImages = images.length > 0 ? images : PLACEHOLDER_IMAGES

  const filtered =
    activeCategory === 'all'
      ? displayImages
      : displayImages.filter((img) => img.category === activeCategory)

  return (
    <section id="galeria" className="section-padding bg-crema">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-cormorant text-verde-jardin text-lg tracking-[0.25em] uppercase mb-3">
            Galería
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-5xl font-bold mb-4">
            Descubre cada rincón
          </h2>
          <div className="botanical-divider" />
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-verde-bosque text-white shadow-md'
                  : 'bg-white text-piedra hover:bg-beige'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={`${img.title}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                style={{ minHeight: i % 3 === 0 ? '260px' : '200px' }}
                onClick={() => setLightbox(img)}
              >
                {img.image?.url ? (
                  <Image
                    src={img.image.url}
                    alt={img.image.alt || img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
                      minHeight: i % 3 === 0 ? '260px' : '200px',
                      opacity: 0.7,
                    }}
                  />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-verde-bosque/0 group-hover:bg-verde-bosque/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={28}
                  />
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setLightbox(null)}
          >
            {/* Close button — always top-right of screen, never clipped */}
            <button
              style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10000, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '9999px', padding: '10px 18px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setLightbox(null)}
            >
              <X size={16} />
              Cerrar
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'relative', maxWidth: '56rem', width: '100%', maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.image?.url ? (
                <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', minHeight: '60vh' }}>
                  <Image
                    src={lightbox.image.url}
                    alt={lightbox.image.alt || lightbox.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div style={{ minHeight: '60vh', background: '#1a1a1a', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem', fontStyle: 'italic' }}>{lightbox.title}</p>
                </div>
              )}
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{lightbox.title}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '4px' }}>Presiona Esc o haz clic fuera para cerrar</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
