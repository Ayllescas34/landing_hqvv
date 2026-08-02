'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BackToHomeLink({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark'
  className?: string
}) {
  const colorClasses =
    variant === 'light'
      ? 'text-white/80 hover:text-white border-white/30 hover:border-white/70'
      : 'text-verde-bosque hover:text-verde-jardin border-verde-bosque/30 hover:border-verde-jardin'

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-sm font-medium tracking-wide border-b pb-0.5 transition-colors ${colorClasses} ${className}`}
    >
      <ArrowLeft size={15} />
      Volver al inicio
    </Link>
  )
}
