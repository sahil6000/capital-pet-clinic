import { Link } from 'react-router-dom'
import { blogPosts } from '@/data/siteContent'

export default function Blog() {
  return (
    <>
      <section className="bg-(--color-teal-50) py-14 text-center">
        <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Pet Care Tips & Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-(--color-ink-soft)">Practical, vet-approved advice for keeping your pets healthy and happy.</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
              <img src={post.cover_image_url} alt={post.title} className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105" />
              <div className="p-5">
                <p className="text-xs text-(--color-ink-soft)">{new Date(post.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <h2 className="font-display mt-1 text-base font-semibold text-(--color-ink) group-hover:text-(--color-teal-600)">{post.title}</h2>
                <p className="mt-2 text-sm text-(--color-ink-soft)">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
