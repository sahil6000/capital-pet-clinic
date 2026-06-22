import { useSiteContent } from '@/content/siteContentContext'

export default function Doctors() {
  const { doctors } = useSiteContent()

  return (
    <>
      <section className="bg-(--color-teal-50) py-14 text-center">
        <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Our Doctors</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-(--color-ink-soft)">
          Experienced, compassionate veterinarians dedicated to your pet&apos;s wellbeing.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="overflow-hidden rounded-3xl border border-(--color-teal-100) bg-white shadow-[var(--shadow-card)]"
            >
              <img
                src={doctor.photo_url}
                alt={doctor.full_name}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-(--color-ink)">
                  {doctor.full_name}
                </h3>
                <p className="text-sm font-medium text-(--color-teal-600)">
                  {doctor.qualification}
                </p>
                <p className="mt-1 text-sm text-(--color-ink-soft)">
                  {doctor.years_experience}+ years experience
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {doctor.specializations.map((specialization) => (
                    <span
                      key={specialization}
                      className="rounded-full bg-(--color-teal-50) px-3 py-1 text-xs font-medium text-(--color-teal-700)"
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-(--color-ink-soft)">
                  {doctor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
