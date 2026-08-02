'use client'

import { motion } from 'framer-motion'
import { Clock, Info } from 'lucide-react'

interface CheckInOutProps {
  settings?: {
    checkInOut?: {
      checkInTime?: string | null
      checkOutTime?: string | null
      policiesText?: string | null
      earlyCheckInText?: string | null
      lateCheckOutText?: string | null
      additionalInfo?: string | null
    } | null
  } | null
}

export function CheckInOutInfo({ settings }: CheckInOutProps) {
  const checkInTime = settings?.checkInOut?.checkInTime || '14:00 hrs'
  const checkOutTime = settings?.checkInOut?.checkOutTime || '12:00 hrs'
  const notes = [
    settings?.checkInOut?.policiesText,
    settings?.checkInOut?.earlyCheckInText,
    settings?.checkInOut?.lateCheckOutText,
    settings?.checkInOut?.additionalInfo,
  ].filter(Boolean)

  return (
    <section className="section-padding bg-crema">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-cormorant text-verde-jardin text-lg tracking-[0.25em] uppercase mb-3">
            Información para tu estadía
          </p>
          <h2 className="font-playfair text-verde-bosque text-3xl md:text-4xl font-bold mb-4">
            Check-in, Check-out y Políticas
          </h2>
          <div className="botanical-divider" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-verde-bosque/10 flex items-center justify-center flex-shrink-0">
              <Clock size={22} className="text-verde-bosque" />
            </div>
            <div>
              <p className="text-madera text-sm font-semibold">Check-In</p>
              <p className="text-verde-bosque text-xl font-playfair font-bold">{checkInTime}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-verde-bosque/10 flex items-center justify-center flex-shrink-0">
              <Clock size={22} className="text-verde-bosque" />
            </div>
            <div>
              <p className="text-madera text-sm font-semibold">Check-Out</p>
              <p className="text-verde-bosque text-xl font-playfair font-bold">{checkOutTime}</p>
            </div>
          </motion.div>
        </div>

        {notes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} className="text-verde-jardin" />
              <p className="font-playfair text-verde-bosque text-lg font-bold">Políticas</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {notes.map((text, i) => (
                <p key={i} className="text-piedra text-sm leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
