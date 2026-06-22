import CrudTable from '../CrudTable'
import { services } from '@/data/siteContent'

export default function AdminServices() {
  return (
    <CrudTable
      table="services"
      title="Services"
      orderBy="sort_order"
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'price_label', label: 'Price Label' },
        { key: 'icon', label: 'Icon (lucide-react name e.g. Stethoscope)' },
        { key: 'is_published', label: 'Published', type: 'checkbox' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
      ]}
      fallback={services as unknown as Record<string, unknown>[]}
    />
  )
}
