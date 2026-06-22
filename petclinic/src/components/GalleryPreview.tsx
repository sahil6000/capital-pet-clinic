import { Link } from 'react-router-dom'
import { galleryImages } from '@/data/siteContent'

export default function GalleryPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-semibold text-(--color-ink) sm:text-4xl">Our Gallery</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-(--color-ink-soft)">A look inside our clinic and the pets we care for.</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {galleryImages.slice(0, 8).map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.caption}
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-card)] transition-transform hover:scale-[1.02]"
          />
        ))}
      </div>
      <div className="mt-9 text-center">
        <Link to="/gallery" className="inline-block rounded-full bg-(--color-teal-600) px-7 py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700)">
          View Full Gallery
        </Link>
      </div>
    </section>
  )
}
