import { Link } from 'react-router-dom'
import { MessageCircle, CalendarCheck, Clock3, UserCheck, Building2, HeartPulse } from 'lucide-react'
import { clinicSettings, doctors } from '@/data/siteContent'

const trustIcons = [
  { icon: Clock3, label: '24/7 Appointment\nBooking' },
  { icon: UserCheck, label: 'Experienced\nDoctors' },
  { icon: Building2, label: 'Modern\nFacilities' },
  { icon: HeartPulse, label: 'Emergency\nCare' },
]

export default function Hero() {
  const doc = doctors[0]
  const waLink = `https://wa.me/${clinicSettings.whatsapp_number.replace(/[^\d]/g, '')}`

  return (
    <section className="bg-gradient-to-b from-(--color-teal-50) to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-(--color-teal-700) shadow-[var(--shadow-card)]">
            🐾 Trusted Care for Your Pets
          </span>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.1] text-(--color-ink) sm:text-5xl">
            Compassionate Care<br />
            <span className="text-(--color-teal-600)">For Your Best Friends</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-(--color-ink-soft)">
            We provide high-quality medical care, advanced treatment and lots of love to keep your pets happy and healthy — right here in Harmu, Ranchi.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/book-appointment"
              className="flex items-center gap-2 rounded-full bg-(--color-teal-600) px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-soft)] hover:bg-(--color-teal-700)"
            >
              <CalendarCheck size={18} /> Book Appointment
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-(--color-teal-600) px-6 py-3.5 text-sm font-semibold text-(--color-teal-600) hover:bg-(--color-teal-50)"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustIcons.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--color-teal-100) text-(--color-teal-600)">
                  <Icon size={17} />
                </span>
                <span className="whitespace-pre-line text-xs font-medium text-(--color-ink-soft)">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            src="https://placehold.co/900x700/2ea39e/f0faf9?text=Vet+with+Golden+Retriever&font=montserrat"
            alt="Veterinarian examining a happy golden retriever at Capital Pet Clinic"
            className="aspect-[6/5] w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
          />
          <div className="absolute -bottom-6 left-4 w-52 rounded-2xl bg-(--color-teal-700) p-4 text-white shadow-[var(--shadow-soft)] sm:left-6 sm:w-60">
            <img
              src={doc.photo_url}
              alt={doc.full_name}
              className="h-14 w-14 rounded-full border-2 border-white object-cover"
            />
            <p className="font-display mt-3 text-sm font-semibold">{doc.full_name}</p>
            <p className="text-xs text-(--color-teal-100)">{doc.qualification}</p>
            <p className="text-xs text-(--color-teal-100)">Veterinary Surgeon</p>
            <p className="mt-1 text-xs font-semibold text-(--color-gold)">{doc.years_experience}+ Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}
