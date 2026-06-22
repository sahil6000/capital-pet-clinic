import { Phone, Mail, MapPin, Clock3 } from 'lucide-react'
import InquiryForm from '@/components/InquiryForm'
import MapSection from '@/components/MapSection'
import { useSiteContent } from '@/content/siteContentContext'

export default function Contact() {
  const { clinicSettings } = useSiteContent()

  return (
    <>
      <section className="bg-(--color-teal-50) py-14 text-center">
        <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-(--color-ink-soft)">
          We&apos;d love to hear from you - reach out by phone, WhatsApp, or the form below.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: 'Address', body: clinicSettings.address },
            { icon: Phone, title: 'Phone', body: clinicSettings.phone },
            { icon: Mail, title: 'Email', body: clinicSettings.email },
            {
              icon: Clock3,
              title: 'Hours',
              body: `${clinicSettings.hours_weekday}\n${clinicSettings.hours_sunday}`,
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-(--color-teal-100) bg-white p-5 shadow-[var(--shadow-card)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-(--color-teal-50) text-(--color-teal-600)">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-(--color-ink)">{title}</p>
                <p className="whitespace-pre-line text-sm text-(--color-ink-soft)">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <h2 className="font-display text-xl font-semibold text-(--color-ink)">Send Us a Message</h2>
          <div className="mt-5">
            <InquiryForm />
          </div>
        </div>
      </section>
      <MapSection />
    </>
  )
}
