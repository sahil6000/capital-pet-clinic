import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/siteContent'

export default function BlogPreview() {
  return (
    <section className="bg-(--color-teal-50)/60 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-(--color-ink) sm:text-4xl">Pet Care Tips & Blog</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-(--color-ink-soft)">Practical advice to keep your pets healthy, happy, and safe.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
              <img src={post.cover_image_url} alt={post.title} className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105" />
              <div className="p-5">
                <p className="text-xs text-(--color-ink-soft)">{new Date(post.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <h3 className="font-display mt-1 text-base font-semibold text-(--color-ink) group-hover:text-(--color-teal-600)">{post.title}</h3>
                <p className="mt-2 text-sm text-(--color-ink-soft)">{post.excerpt}</p>
                <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-(--color-teal-600)">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
