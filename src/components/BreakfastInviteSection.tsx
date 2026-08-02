'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Utensils } from 'lucide-react'
import { isExternalUrl, resolveInternalLink } from '@/lib/links'

interface TeaserContent {
  teaserActive?: boolean | null
  teaserImage?: { url?: string; alt?: string } | null
  teaserTitle?: string | null
  teaserDescription?: string | null
  teaserButtonText?: string | null
  teaserButtonUrl?: string | null
}

export function BreakfastInviteSection({ content }: { content?: TeaserContent | null }) {
  if (content?.teaserActive === false) return null

  const title = content?.teaserTitle || 'Ven a conocer nuestros desayunos'
  const description =
    content?.teaserDescription ||
    'Desde platillos tradicionales guatemaltecos hasta opciones saludables. Descubre toda nuestra carta de desayunos, abierta para huéspedes y visitantes.'
  const buttonText = content?.teaserButtonText || 'Ver carta de desayunos'
  const buttonUrl = resolveInternalLink(content?.teaserButtonUrl || '/desayunos')
  const isExternal = isExternalUrl(buttonUrl)

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-3xl overflow-hidden bg-white shadow-lg"
        >
          <div className="relative min-h-[260px] lg:min-h-[380px] bg-beige">
            {content?.teaserImage?.url ? (
              <Image
                src={content.teaserImage.url}
                alt={content.teaserImage.alt || title}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(160deg, #5B3A29, #0F4D3A)' }}
              >
                <Utensils size={64} className="text-white/20" />
              </div>
            )}
          </div>

          <div className="p-8 lg:p-4 lg:pr-14 flex flex-col gap-5">
            <p className="font-cormorant text-verde-jardin text-lg tracking-[0.25em] uppercase">
              Desayunos
            </p>
            <h2 className="font-playfair text-verde-bosque text-3xl md:text-4xl font-bold leading-tight">
              {title}
            </h2>
            <p className="text-piedra text-base leading-relaxed">{description}</p>
            {isExternal ? (
              <a
                href={buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit bg-verde-bosque hover:bg-verde-jardin text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                <MessageCircle size={18} />
                {buttonText}
              </a>
            ) : (
              <Link
                href={buttonUrl}
                className="inline-flex items-center gap-2 w-fit bg-verde-bosque hover:bg-verde-jardin text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                <MessageCircle size={18} />
                {buttonText}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
