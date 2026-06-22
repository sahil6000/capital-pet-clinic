export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'rescheduled'
  | 'completed'
  | 'cancelled'
  | 'no_show'

export interface ClinicSettings {
  id: string
  clinic_name: string
  tagline: string
  address: string
  phone: string
  whatsapp_number: string
  email: string
  maps_link: string
  maps_embed_src: string
  hours_weekday: string
  hours_sunday: string
  logo_url: string
  instagram_url: string
  facebook_url: string
  youtube_url: string
  payments_enabled: boolean
}

export interface Doctor {
  id: string
  full_name: string
  qualification: string
  years_experience: number
  specializations: string[]
  photo_url: string
  bio: string
  is_published: boolean
  sort_order: number
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  price_label: string
  is_published: boolean
  sort_order: number
}

export interface GalleryImage {
  id: string
  url: string
  category: 'clinic' | 'team' | 'treatments' | 'happy_pets'
  caption: string
  sort_order: number
}

export interface Testimonial {
  id: string
  owner_name: string
  pet_name: string
  rating: number
  message: string
  photo_url: string
  is_featured: boolean
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image_url: string
  published_at: string
  is_published: boolean
}

export interface Appointment {
  id: string
  owner_name: string
  phone: string
  whatsapp_number: string
  email: string
  pet_name: string
  pet_type: string
  service_id: string
  preferred_date: string
  preferred_time: string
  message: string
  status: AppointmentStatus
  created_at: string
}

export interface Inquiry {
  id: string
  full_name: string
  phone: string
  message: string
  status: 'new' | 'responded' | 'closed'
  created_at: string
}
