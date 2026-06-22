import Hero from '@/components/Hero'
import InfoStrip from '@/components/InfoStrip'
import ServicesGrid from '@/components/ServicesGrid'
import AppointmentSection from '@/components/AppointmentSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import GalleryPreview from '@/components/GalleryPreview'
import BlogPreview from '@/components/BlogPreview'
import MapSection from '@/components/MapSection'

export default function Home() {
  return (
    <>
      <Hero />
      <InfoStrip />
      <ServicesGrid limit={8} />
      <AppointmentSection />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
      <BlogPreview />
      <MapSection />
    </>
  )
}
