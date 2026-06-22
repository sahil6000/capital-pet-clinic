import BookingForm from './BookingForm'
import InquiryForm from './InquiryForm'

export default function AppointmentSection() {
  return (
    <section id="book" className="bg-(--color-teal-50)/60 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <h3 className="font-display text-xl font-semibold text-(--color-ink)">Book an Appointment</h3>
          <p className="mt-1 text-sm text-(--color-ink-soft)">24/7 online booking — we'll confirm on WhatsApp.</p>
          <div className="mt-5">
            <BookingForm />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <h3 className="font-display text-xl font-semibold text-(--color-ink)">Have a Question?</h3>
          <p className="mt-1 text-sm text-(--color-ink-soft)">Send us your inquiry and we will get back to you.</p>
          <div className="mt-5">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
