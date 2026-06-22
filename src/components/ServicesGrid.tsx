import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { services } from '@/data/siteContent'
import type { Service } from '@/types'

function ServiceIcon({ name }: { name: string }) {
  const Cmp = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Stethoscope
  return <Cmp size={26} />
}

export default function ServicesGrid({ items = services, limit }: { items?: Service[]; limit?: number }) {
  const list = limit ? items.slice(0, limit) : items
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-semibold text-(--color-ink) sm:text-4xl">Our Services</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-(--color-ink-soft)">
          Complete veterinary care under one roof —  from routine checkups to emergency support.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((s) => (
          <div
            key={s.id}
            className="group rounded-2xl border border-(--color-teal-100) bg-white p-5 text-center shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-(--color-teal-50) text-(--color-teal-600) group-hover:bg-(--color-teal-600) group-hover:text-white transition-colors">
              <ServiceIcon name={s.icon} />
            </span>
            <p className="mt-3 font-display text-sm font-semibold text-(--color-ink)">{s.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-(--color-ink-soft)">{s.description}</p>
          </div>
        ))}
      </div>
      {limit && (
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-block rounded-full bg-(--color-teal-600) px-7 py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700)"
          >
            View All Services
          </Link>
        </div>
      )}
    </section>
  )
}
