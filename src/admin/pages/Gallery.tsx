import CrudTable from '../CrudTable'
import { galleryImages } from '@/data/siteContent'

export default function AdminGallery() {
  return (
    <CrudTable
      table="gallery_images"
      title="Gallery"
      orderBy="sort_order"
      fields={[
        { key: 'url', label: 'Image URL', type: 'image' },
        { key: 'category', label: 'Category (clinic / team / treatments / happy_pets)' },
        { key: 'caption', label: 'Caption' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
      ]}
      fallback={galleryImages as unknown as Record<string, unknown>[]}
    />
  )
}
