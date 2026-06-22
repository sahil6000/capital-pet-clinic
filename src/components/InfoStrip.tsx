import { MapPin, Clock3, Phone, MessageCircle } from 'lucide-react'
import { clinicSettings } from '@/data/siteContent'

const items = [
  { icon: MapPin, title: 'Our Location', body: clinicSettings.address },
  { icon: Clock3, title: 'Working Hours', body: `${clinicSettings.hours_weekday}\n${clinicSettings.hours_sunday}` },
  { icon: Phone, title: 'Call Us', body: clinicSettings.phone },
  { icon: MessageCircle, title: 'WhatsApp', body: 'Chat with us for a quick response' },
]

export default function InfoStrip() {
  return (
    <section className="bg-(--color-ink)">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-(--color-teal-200)">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="whitespace-pre-line text-xs leading-relaxed text-(--color-teal-100)/80">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
