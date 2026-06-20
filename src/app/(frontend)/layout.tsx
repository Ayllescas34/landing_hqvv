import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import '../globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const siteTitle = 'Hotel Quinta Vista Verde — Antigua Guatemala'
const siteDescription =
  'Descubre nuestro hotel familiar en Antigua Guatemala. Habitaciones confortables, desayunos a la carta, jardines exuberantes y vista al Volcán de Agua.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Hotel Quinta Vista Verde',
  },
  description: siteDescription,
  keywords: [
    'hotel Antigua Guatemala',
    'hospedaje Antigua Guatemala',
    'hotel familiar Guatemala',
    'Quinta Vista Verde',
    'volcán de agua Antigua',
    'hotel jardines Antigua',
  ],
  authors: [{ name: 'Hotel Quinta Vista Verde' }],
  creator: 'Hotel Quinta Vista Verde',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_GT',
    url: siteUrl,
    siteName: 'Hotel Quinta Vista Verde',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel Quinta Vista Verde — Antigua Guatemala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/media/logo.jpg',
    apple: '/media/logo.jpg',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="bg-crema text-gray-800 font-inter">
        <Navigation />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
