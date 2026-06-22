import { Star } from 'lucide-react'
import { testimonials, stats } from '@/data/siteContent'

export default function Reviews() {
  return (
    <>
      <section className="bg-(--color-teal-50) py-14 text-center">
        <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Reviews & Ratings</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-(--color-ink-soft)">
          Real feedback from the pet parents we've had the privilege to serve.
        </p>
        <p className="mt-3 font-display text-3xl font-bold text-(--color-teal-600)">{stats[3].value} <span className="text-base font-normal text-(--color-ink-soft)">average rating</span></p>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl border border-(--color-teal-100) bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex gap-0.5 text-(--color-gold)">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" stroke="none" />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-(--color-ink-soft)">"{t.message}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={t.photo_url} alt={t.owner_name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-(--color-ink)">{t.owner_name}</p>
                  <p className="text-xs text-(--color-ink-soft)">Pet parent of {t.pet_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
