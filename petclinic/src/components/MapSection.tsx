import { MapPin, Navigation } from 'lucide-react'
import { clinicSettings } from '@/data/siteContent'

export default function MapSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-semibold text-(--color-ink) sm:text-4xl">Find Us</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-(--color-ink-soft)">Conveniently located on Old Argora Road, Harmu — easy to find, easy to reach.</p>
      </div>
      <div className="mt-10 overflow-hidden rounded-3xl border border-(--color-teal-100) shadow-[var(--shadow-card)] lg:grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <iframe
            title="Capital Pet Clinic location"
            src={clinicSettings.maps_embed_src}
            className="h-72 w-full lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 bg-white p-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 shrink-0 text-(--color-teal-600)" size={20} />
            <div>
              <p className="font-display text-sm font-semibold text-(--color-ink)">{clinicSettings.clinic_name}</p>
              <p className="text-sm text-(--color-ink-soft)">{clinicSettings.address}</p>
            </div>
          </div>
          <a
            href={clinicSettings.maps_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-(--color-teal-600) py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700)"
          >
            <Navigation size={16} /> Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}
