import { doctors } from '@/data/siteContent'

export default function Doctors() {
  return (
    <>
      <section className="bg-(--color-teal-50) py-14 text-center">
        <h1 className="font-display text-4xl font-semibold text-(--color-ink)">Our Doctors</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-(--color-ink-soft)">
          Experienced, compassionate veterinarians dedicated to your pet's wellbeing.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {doctors.map((d) => (
            <div key={d.id} className="overflow-hidden rounded-3xl border border-(--color-teal-100) bg-white shadow-[var(--shadow-card)]">
              <img src={d.photo_url} alt={d.full_name} className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-(--color-ink)">{d.full_name}</h3>
                <p className="text-sm font-medium text-(--color-teal-600)">{d.qualification}</p>
                <p className="mt-1 text-sm text-(--color-ink-soft)">{d.years_experience}+ years experience</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.specializations.map((s) => (
                    <span key={s} className="rounded-full bg-(--color-teal-50) px-3 py-1 text-xs font-medium text-(--color-teal-700)">{s}</span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-(--color-ink-soft)">{d.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
