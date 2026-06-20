'use client'

import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

const NAV_LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#habitaciones', label: 'Habitaciones' },
  { href: '#desayunos', label: 'Desayunos' },
  { href: '#galeria', label: 'Galería' },
  { href: '#experiencias', label: 'Experiencias' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const waLink = buildWhatsAppLink(WA_MESSAGES.general)
  const close = () => setMobileOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex flex-col leading-tight" onClick={close}>
            <span className={`font-cormorant text-xs tracking-[0.2em] uppercase transition-colors ${scrolled ? 'text-verde-jardin' : 'text-white/80'}`}>
              Hotel Boutique
            </span>
            <span className={`font-playfair text-lg font-semibold transition-colors ${scrolled ? 'text-verde-bosque' : 'text-white'}`}>
              Quinta Vista Verde
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-verde-jardin ${scrolled ? 'text-piedra' : 'text-white/90'}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-verde-bosque hover:bg-verde-jardin text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-300"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-colors ${
              scrolled ? 'text-verde-bosque hover:bg-verde-bosque/10' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — rendered outside <nav> so it's never clipped */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 lg:hidden"
              style={{ zIndex: 9998 }}
              onClick={close}
            />

            {/* Slide-in panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white lg:hidden flex flex-col"
              style={{ zIndex: 9999 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-beige">
                <div className="flex flex-col leading-tight">
                  <span className="font-cormorant text-xs tracking-[0.2em] uppercase text-verde-jardin">Hotel Boutique</span>
                  <span className="font-playfair text-base font-semibold text-verde-bosque">Quinta Vista Verde</span>
                </div>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-piedra hover:text-verde-bosque hover:bg-beige transition-colors"
                  onClick={close}
                  aria-label="Cerrar menú"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="flex items-center text-piedra hover:text-verde-bosque hover:bg-verde-bosque/5 font-medium py-4 px-3 rounded-xl transition-colors text-base border-b border-beige/60 last:border-0"
                    onClick={close}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* WhatsApp CTA */}
              <div className="p-5 border-t border-beige">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex items-center justify-center gap-2 bg-verde-bosque hover:bg-verde-jardin text-white py-4 rounded-2xl font-semibold text-base transition-colors w-full"
                >
                  <MessageCircle size={20} />
                  Contactar por WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
