import { Instagram, Facebook, MessageCircle, Phone, MapPin } from 'lucide-react'
import { buildWhatsAppLink, WA_MESSAGES } from '@/lib/whatsapp'

export function Footer() {
  const waLink = buildWhatsAppLink(WA_MESSAGES.general)

  return (
    <footer
      className="text-white"
      style={{ background: '#071f18' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-cormorant text-verde-jardin text-sm tracking-[0.2em] uppercase mb-1">
              Hotel Boutique
            </p>
            <h3 className="font-playfair text-white text-2xl font-bold mb-4">
              Quinta Vista Verde
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Una noche es más que un descanso, es una experiencia donde la comodidad y calidad
              de nuestro servicio se encuentran a cada paso.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-verde-bosque hover:bg-verde-jardin text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              <MessageCircle size={15} />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-5">Contacto</h4>
            <div className="flex flex-col gap-3.5">
              <a
                href="https://wa.me/50244480395"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                <MessageCircle size={14} className="text-verde-jardin flex-shrink-0" />
                +502 4448-0395
              </a>
              <a
                href="tel:+50278677627"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} className="text-verde-jardin flex-shrink-0" />
                +502 7867-7627
              </a>
              <div className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin size={14} className="text-verde-jardin flex-shrink-0 mt-0.5" />
                <span>Antigua Guatemala, Sacatepéquez</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-5">Síguenos</h4>
            <div className="flex flex-col gap-3.5">
              <a
                href="https://instagram.com/hotel_quintavistaverde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                <Instagram size={14} className="text-lavanda flex-shrink-0" />
                @hotel_quintavistaverde
              </a>
              <a
                href="https://facebook.com/hotel_quintavistaverde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                <Facebook size={14} className="text-lavanda flex-shrink-0" />
                hotel_quintavistaverde
              </a>
            </div>

            {/* Sections */}
            <div className="mt-8">
              <h4 className="font-playfair text-white text-lg font-semibold mb-4">El Hotel</h4>
              <div className="flex flex-col gap-2">
                {[
                  ['#nosotros', 'Sobre nosotros'],
                  ['#habitaciones', 'Habitaciones'],
                  ['#desayunos', 'Desayunos'],
                  ['#galeria', 'Galería'],
                  ['#experiencias', 'Experiencias'],
                  ['#ubicacion', 'Ubicación'],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Hotel Boutique Quinta Vista Verde. Todos los derechos reservados.</p>
          <p>Antigua Guatemala, Guatemala</p>
        </div>
      </div>
    </footer>
  )
}
