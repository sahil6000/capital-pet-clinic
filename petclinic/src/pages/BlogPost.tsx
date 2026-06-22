import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '@/data/siteContent'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-(--color-ink)">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-sm font-semibold text-(--color-teal-600)">Back to blog</Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <Link to="/blog" className="text-sm font-semibold text-(--color-teal-600)">← Back to blog</Link>
      <h1 className="font-display mt-4 text-3xl font-semibold text-(--color-ink)">{post.title}</h1>
      <p className="mt-2 text-sm text-(--color-ink-soft)">
        {new Date(post.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
      </p>
      <img src={post.cover_image_url} alt={post.title} className="mt-6 aspect-video w-full rounded-2xl object-cover" />
      <p className="mt-6 text-base leading-relaxed text-(--color-ink-soft)">{post.excerpt}</p>
      <p className="mt-4 text-sm text-(--color-ink-soft)">
        Full article content is managed from Admin → Blog and will appear here once published.
      </p>
    </article>
  )
}
