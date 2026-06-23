import type { ClinicSettings, Doctor, Service, GalleryImage, Testimonial, BlogPost } from '@/types'

// ---------------------------------------------------------------------------
// DEFAULT / FALLBACK CONTENT
// This file is the site's content of last resort. Every value here mirrors a
// row that should eventually live in Supabase (see supabase/schema.sql).
// Components fetch from Supabase first and fall back to this file if the
// database is empty or unreachable, so the site never breaks and is always
// editable from the admin dashboard once it's connected.
// All images are placeholders — replace them from Admin > Gallery / Doctors.
// ---------------------------------------------------------------------------

const ph = (label: string, w = 1200, h = 800) =>
  `https://placehold.co/${w}x${h}/0e7c7b/f0faf9?text=${encodeURIComponent(label)}&font=montserrat`

export const clinicSettings: ClinicSettings = {
  id: 'default',
  clinic_name: 'Capital Pet Clinic',
  tagline: 'Compassionate Care For Your Best Friends',
  address: 'Old Argora Road, Near Bali Bagicha, Harmu, Ranchi, Jharkhand - 834002',
  phone: '+91 97981 72415',
  whatsapp_number: '+91 97981 72415',
  email: 'hello@capitalpetclinic.in',
  maps_link: 'https://maps.app.goo.gl/capitalpetclinicranchi',
  maps_embed_src:
    'https://www.google.com/maps?q=Old+Argora+Road+Near+Bali+Bagicha+Harmu+Ranchi+Jharkhand+834002&output=embed',
  hours_weekday: 'Mon – Sat: 9:00 AM – 8:00 PM',
  hours_sunday: 'Sunday: 10:00 AM – 4:00 PM',
  logo_url: ph('Logo', 200, 200),
  instagram_url: 'https://instagram.com/capitalpetclinic',
  facebook_url: 'https://facebook.com/capitalpetclinic',
  youtube_url: 'https://youtube.com/@capitalpetclinic',
  payments_enabled: true,
}

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    full_name: 'Dr. Vivek Kr. Gupta',
    qualification: 'BVSc & AH',
    years_experience: 10,
    specializations: ['Surgery', 'Internal Medicine', 'Emergency Care'],
    photo_url: ph('Dr. Vivek Gupta'),
    bio: 'Dr. Vivek has spent over a decade caring for Ranchi\u2019s pets, from routine wellness checks to complex surgical procedures. Pet parents trust his calm, thorough approach during stressful moments.',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 'doc-2',
    full_name: 'Dr. Ankit R. Bara',
    qualification: 'BVSc & AH, MVSc (Surgery)',
    years_experience: 7,
    specializations: ['Dermatology', 'Vaccination', 'Diagnostics'],
    photo_url: ph('Dr. Ankit R. Bara'),
    bio: 'Dr. Ankit leads our diagnostics and preventive care programs, with a special interest in skin conditions and early-detection health screening for dogs and cats.',
    is_published: true,
    sort_order: 2,
  },
]

export const services: Service[] = [
  {
    id: 'de13e87e-dce1-41d0-9b81-909d112e9567',
    name: 'General Consultation',
    description: 'Thorough wellness checks and expert guidance for everyday pet health concerns.',
    icon: 'Stethoscope',
    price_label: 'From ₹300',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 'e5ccf25f-7515-426c-9980-1fcc764d0982',
    name: 'Vaccination',
    description: 'Complete core and lifestyle vaccination schedules to keep your pet protected.',
    icon: 'Syringe',
    price_label: 'From ₹400',
    is_published: true,
    sort_order: 2,
  },
  {
    id: '330ca895-8b45-435f-b819-46910da1d9e6',
    name: 'Surgery',
    description: 'Safe, modern surgical procedures performed with advanced equipment and monitoring.',
    icon: 'Scissors',
    price_label: 'On consultation',
    is_published: true,
    sort_order: 3,
  },
  {
    id: 'f736e9be-53af-4e06-a052-23aedb6443c0',
    name: 'Grooming',
    description: 'Bathing, trimming, and hygiene care to keep your pet clean, comfortable and happy.',
    icon: 'Sparkles',
    price_label: 'From ₹500',
    is_published: true,
    sort_order: 4,
  },
  {
    id: '348af232-5d1c-47bc-8a6b-60991faefb00',
    name: 'Pet Boarding',
    description: 'Safe, supervised short and long-term boarding while you’re away from home.',
    icon: 'Home',
    price_label: 'From ₹600/day',
    is_published: true,
    sort_order: 5,
  },
  {
    id: '21507468-a62f-4acb-a442-809d25e76a59',
    name: 'Emergency Care',
    description: '24/7 emergency support for accidents, sudden illness, and urgent conditions.',
    icon: 'Siren',
    price_label: 'Call for priority',
    is_published: true,
    sort_order: 6,
  },
  {
    id: '7e0b9d0b-8336-4751-818a-48b382980ae7',
    name: 'Diagnostics',
    description: 'In-house lab testing, imaging and screening for faster, more accurate diagnosis.',
    icon: 'Microscope',
    price_label: 'From ₹350',
    is_published: true,
    sort_order: 7,
  },
  {
    id: 'df6c26c4-c971-46e9-bab3-c3e1b6fd15d3',
    name: 'Pet Accessories',
    description: 'A curated range of food, collars, and care essentials for your pet.',
    icon: 'ShoppingBag',
    price_label: 'Varies',
    is_published: true,
    sort_order: 8,
  },
]

export const galleryImages: GalleryImage[] = [
  { id: 'g1', url: ph('Clinic Exterior'), category: 'clinic', caption: 'Our clinic entrance on Old Argora Road', sort_order: 1 },
  { id: 'g2', url: ph('Reception Area'), category: 'clinic', caption: 'Comfortable, calm reception area', sort_order: 2 },
  { id: 'g3', url: ph('Treatment Room'), category: 'treatments', caption: 'Fully equipped treatment room', sort_order: 3 },
  { id: 'g4', url: ph('Pharmacy & Supplies'), category: 'clinic', caption: 'In-house pharmacy and supplies', sort_order: 4 },
  { id: 'g5', url: ph('Surgery Suite'), category: 'treatments', caption: 'Sterile, modern surgery suite', sort_order: 5 },
  { id: 'g6', url: ph('Our Care Team'), category: 'team', caption: 'Our dedicated veterinary team', sort_order: 6 },
  { id: 'g7', url: ph('Happy Patient'), category: 'happy_pets', caption: 'Another happy, healthy patient', sort_order: 7 },
  { id: 'g8', url: ph('Vaccination Day'), category: 'treatments', caption: 'Routine vaccination visit', sort_order: 8 },
]

export const testimonials: Testimonial[] = [
  { id: 't1', owner_name: 'Neha Sinha', pet_name: 'Bruno', rating: 5, message: 'Excellent care and staff. Dr. Vivek is very cooperative and explained everything clearly. Highly recommended!', photo_url: ph('NS', 100, 100), is_featured: true },
  { id: 't2', owner_name: 'Rohit Kumar', pet_name: 'Misha', rating: 5, message: 'Booked an appointment on WhatsApp in seconds and got a reminder the day before. Smooth experience end to end.', photo_url: ph('RK', 100, 100), is_featured: true },
  { id: 't3', owner_name: 'Pooja Verma', pet_name: 'Leo', rating: 4, message: 'Clean facility, friendly doctors, and they genuinely care about the animals. Our go-to clinic in Ranchi now.', photo_url: ph('PV', 100, 100), is_featured: true },
]

export const blogPosts: BlogPost[] = [
  { id: 'b1', slug: 'summer-care-tips-for-pets', title: 'Summer Care Tips for Pets', excerpt: 'Simple steps to keep your pet cool, hydrated and safe as temperatures rise this season.', content: '', cover_image_url: ph('Summer Care'), published_at: '2026-05-10', is_published: true },
  { id: 'b2', slug: 'importance-of-vaccination', title: 'Importance of Vaccination', excerpt: 'Why staying on schedule with core vaccines is one of the best things you can do for your pet.', content: '', cover_image_url: ph('Vaccination'), published_at: '2026-05-05', is_published: true },
  { id: 'b3', slug: 'signs-of-illness-in-pets', title: 'Signs of Illness in Pets', excerpt: 'Subtle behavior changes that may signal it\u2019s time for a vet visit, before things get serious.', content: '', cover_image_url: ph('Signs of Illness'), published_at: '2026-04-28', is_published: true },
]

export const stats = [
  { label: 'Happy Pets', value: '1500+' },
  { label: 'Years Experience', value: '10+' },
  { label: 'Successful Treatments', value: '500+' },
  { label: 'Customer Rating', value: '4.9/5' },
]

export const whyChooseUs = [
  'Experienced & caring doctors',
  'Modern equipment & facilities',
  'Hygienic & safe environment',
  'Personalized pet care plans',
  'Emergency care available',
  'Affordable & transparent pricing',
]
