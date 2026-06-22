import CrudTable from '../CrudTable'
import { testimonials } from '@/data/siteContent'

export default function AdminTestimonials() {
  return (
    <CrudTable
      table="testimonials"
      title="Testimonials"
      fields={[
        { key: 'owner_name', label: 'Owner Name' },
        { key: 'pet_name', label: 'Pet Name' },
        { key: 'rating', label: 'Rating (1-5)', type: 'number' },
        { key: 'message', label: 'Message', type: 'textarea' },
        { key: 'photo_url', label: 'Photo URL', type: 'image' },
        { key: 'is_featured', label: 'Featured on Homepage', type: 'checkbox' },
      ]}
      fallback={testimonials as unknown as Record<string, unknown>[]}
    />
  )
}
