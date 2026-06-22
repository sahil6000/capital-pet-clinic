import { Link } from 'react-router-dom'
import { Heart, ShieldCheck, Clock3 } from 'lucide-react'
import { clinicSettings } from '@/data/siteContent'

const values = [
  { icon: Heart, title: 'Compassion First', body: 'Every pet is treated with the gentleness and patience we\u2019d want for our own.' },
  { icon: ShieldCheck, title: 'Trusted Expertise', body: 'A decade of combined veterinary experience across surgery, diagnostics and care.' },
  { icon: Clock3, title: 'Always Available', body: 'Emergency support and flexible scheduling so help is never far away.' },
]

export default function About() {
  return (
    <>
      <section className="bg-(--color-teal-50) py-14">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-display text-4xl font-semibold text-(--color-ink)">About {clinicSettings.clinic_name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-(--color-ink-soft)">
            For over a decade, we've been Ranchi's trusted partner in pet health — combining modern veterinary medicine with the kind of care that puts anxious pets and worried owners at ease.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8">
        <img src="https://placehold.co/900x650/0b5e5d/f0faf9?text=Our+Clinic&font=montserrat" alt="Inside Capital Pet Clinic" className="rounded-3xl object-cover shadow-[var(--shadow-soft)]" />
        <div>
          <h2 className="font-display text-2xl font-semibold text-(--color-ink)">Our Story</h2>
          <p className="mt-4 text-sm leading-relaxed text-(--color-ink-soft)">
            Capital Pet Clinic was founded with a simple goal: give pets in Harmu and across Ranchi access to the kind of medical care that's usually reserved for humans — accurate diagnostics, modern surgical facilities, and doctors who actually listen.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-(--color-ink-soft)">
            Today, our team has treated thousands of dogs, cats and other companion animals, building long-term relationships with families who trust us through every stage of their pet's life.
          </p>
          <Link to="/doctors" className="mt-6 inline-block rounded-full bg-(--color-teal-600) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700)">
            Meet Our Doctors
          </Link>
        </div>
      </section>

      <section className="bg-(--color-teal-50)/60 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-display text-2xl font-semibold text-(--color-ink)">What We Stand For</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-6 text-center shadow-[var(--shadow-card)]">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-(--color-teal-100) text-(--color-teal-600)"><Icon size={22} /></span>
                <h3 className="font-display mt-4 text-base font-semibold text-(--color-ink)">{title}</h3>
                <p className="mt-2 text-sm text-(--color-ink-soft)">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
