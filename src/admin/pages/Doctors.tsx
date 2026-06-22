import CrudTable from '../CrudTable'
import { doctors } from '@/data/siteContent'

export default function AdminDoctors() {
  return (
    <CrudTable
      table="doctors"
      title="Doctors"
      orderBy="sort_order"
      fields={[
        { key: 'full_name', label: 'Full Name' },
        { key: 'qualification', label: 'Qualification' },
        { key: 'years_experience', label: 'Years Experience', type: 'number' },
        { key: 'specializations', label: 'Specializations (comma-separated)' },
        { key: 'photo_url', label: 'Photo URL', type: 'image' },
        { key: 'bio', label: 'Bio', type: 'textarea' },
        { key: 'is_published', label: 'Published', type: 'checkbox' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
      ]}
      fallback={doctors as unknown as Record<string, unknown>[]}
    />
  )
}
