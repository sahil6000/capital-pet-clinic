import { CheckCircle, Star } from 'lucide-react'
import { whyChooseUs, stats, testimonials } from '@/data/siteContent'

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-(--color-teal-100) bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-display text-lg font-semibold text-(--color-ink)">Why Choose Us?</h3>
          <ul className="mt-4 space-y-3">
            {whyChooseUs.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-(--color-ink-soft)">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-(--color-teal-600)" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-(--color-teal-100) bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-display text-lg font-semibold text-(--color-ink)">Happy Pets, Happy Parents</h3>
          <div className="mt-5 grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-(--color-teal-600)">{s.value}</p>
                <p className="text-xs text-(--color-ink-soft)">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <TestimonialCard />
      </div>
    </section>
  )
}

function TestimonialCard() {
  const t = testimonials[0]
  return (
    <div className="rounded-2xl border border-(--color-teal-100) bg-white p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-display text-lg font-semibold text-(--color-ink)">What Pet Parents Say</h3>
      <div className="mt-4 flex gap-0.5 text-(--color-gold)">
        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" stroke="none" />)}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-(--color-ink-soft)">"{t.message}"</p>
      <div className="mt-4 flex items-center gap-3">
        <img src={t.photo_url} alt={t.owner_name} className="h-9 w-9 rounded-full object-cover" />
        <p className="text-sm font-semibold text-(--color-ink)">{t.owner_name}</p>
      </div>
    </div>
  )
}
