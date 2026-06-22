import CrudTable from '../CrudTable'
import { blogPosts } from '@/data/siteContent'

export default function AdminBlog() {
  return (
    <CrudTable
      table="blog_posts"
      title="Blog Posts"
      orderBy="published_at"
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
        { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { key: 'content', label: 'Content (Markdown/HTML)', type: 'textarea' },
        { key: 'cover_image_url', label: 'Cover Image URL', type: 'image' },
        { key: 'is_published', label: 'Published', type: 'checkbox' },
      ]}
      fallback={blogPosts as unknown as Record<string, unknown>[]}
    />
  )
}
