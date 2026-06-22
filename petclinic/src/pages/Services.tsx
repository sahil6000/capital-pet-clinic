import ServicesGrid from '@/components/ServicesGrid'
import AppointmentSection from '@/components/AppointmentSection'

export default function Services() {
  return (
    <>
      <section className="bg-(--color-teal-50) py-14 text-center">
        <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Our Services</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-(--color-ink-soft)">
          From routine wellness visits to emergency surgery, every service is delivered with care, modern equipment, and clear communication.
        </p>
      </section>
      <ServicesGrid />
      <AppointmentSection />
    </>
  )
}
