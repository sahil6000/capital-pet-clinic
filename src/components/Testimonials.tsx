import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/data/siteContent'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length)

  return (
    <section className="bg-(--color-teal-700) py-16">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <Quote className="mx-auto text-(--color-teal-400)" size={32} />
        <div className="mt-4 flex justify-center gap-1 text-(--color-gold)">
          {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={20} fill="currentColor" stroke="none" />)}
        </div>
        <p className="font-display mt-5 text-xl font-medium leading-relaxed text-white sm:text-2xl">
          "{t.message}"
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <img src={t.photo_url} alt={t.owner_name} className="h-12 w-12 rounded-full border-2 border-white/30 object-cover" />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{t.owner_name}</p>
            <p className="text-xs text-(--color-teal-100)/70">Pet parent of {t.pet_name}</p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous review" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
