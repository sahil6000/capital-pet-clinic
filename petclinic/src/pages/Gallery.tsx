import { useState } from 'react'
import { galleryImages } from '@/data/siteContent'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'clinic', label: 'Clinic' },
  { key: 'team', label: 'Our Team' },
  { key: 'treatments', label: 'Treatments' },
  { key: 'happy_pets', label: 'Happy Pets' },
] as const

export default function Gallery() {
  const [active, setActive] = useState<(typeof categories)[number]['key']>('all')
  const filtered = active === 'all' ? galleryImages : galleryImages.filter((g) => g.category === active)

  return (
    <>
      <section className="bg-(--color-teal-50) py-14 text-center">
        <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Our Gallery</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-(--color-ink-soft)">A glimpse into our clinic, our team, and the happy pets we care for.</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring ${
                active === c.key ? 'bg-(--color-teal-600) text-white' : 'bg-(--color-teal-50) text-(--color-ink-soft) hover:bg-(--color-teal-100)'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img) => (
            <img key={img.id} src={img.url} alt={img.caption} loading="lazy" className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-card)]" />
          ))}
        </div>
      </section>
    </>
  )
}
