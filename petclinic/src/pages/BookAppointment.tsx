import BookingForm from '@/components/BookingForm'
import { clinicSettings } from '@/data/siteContent'
import { ShieldCheck, CalendarClock, MessageCircle } from 'lucide-react'

export default function BookAppointment() {
  return (
    <section className="bg-(--color-teal-50)/60 py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Book an Appointment</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-(--color-ink-soft)">
            Tell us about your pet and pick a time that works for you. We confirm every booking on WhatsApp within minutes during clinic hours.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: CalendarClock, label: 'Available 24/7 online' },
            { icon: MessageCircle, label: 'Instant WhatsApp confirmation' },
            { icon: ShieldCheck, label: 'Your data stays private & secure' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--color-teal-50) text-(--color-teal-600)"><Icon size={18} /></span>
              <p className="text-sm font-medium text-(--color-ink-soft)">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] sm:p-10">
          <BookingForm />
          {clinicSettings.payments_enabled && (
            <p className="mt-5 text-center text-xs text-(--color-ink-soft)">
              💳 Online consultation fee payment is available after your appointment is confirmed — you'll receive a secure payment link on WhatsApp/email.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
