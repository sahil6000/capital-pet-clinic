import {
  services,
  doctors,
  galleryImages,
  testimonials,
  blogPosts,
} from '@/data/siteContent'

export function useSiteContent() {
  return {
    services,
    doctors,
    galleryImages,
    testimonials,
    blogPosts,
    clinicSettings: {
      clinic_name: 'Capital Pet Clinic',
      tagline: 'Compassionate Care For Your Best Friends',
      address: 'Harmu, Ranchi',
      phone: '+91 9798172415',
      phone_secondary: '+91 8340338945', 
      whatsapp_number: '+91 9798172415',
      email: 'capitalpetclinic@gmail.com',
    },
  }
}