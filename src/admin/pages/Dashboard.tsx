import { useEffect, useState } from 'react'
import { CalendarCheck, Inbox, Star, Newspaper, Clock3 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface Counts {
  appointments: number
  pendingAppointments: number
  inquiries: number
  testimonials: number
  blogPosts: number
}

const fallbackCounts: Counts = {
  appointments: 2,
  pendingAppointments: 1,
  inquiries: 1,
  testimonials: 3,
  blogPosts: 3,
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>(fallbackCounts)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    (async () => {
      const [appts, pending, inquiries, testimonials, posts] = await Promise.all([
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      ])
      if (appts.error) return // stay on fallback if not connected
      setCounts({
        appointments: appts.count ?? 0,
        pendingAppointments: pending.count ?? 0,
        inquiries: inquiries.count ?? 0,
        testimonials: testimonials.count ?? 0,
        blogPosts: posts.count ?? 0,
      })
      setUsingFallback(false)
    })()
  }, [])

  const cards = [
    { label: 'Total Appointments', value: counts.appointments, icon: CalendarCheck, color: 'bg-(--color-teal-50) text-(--color-teal-600)' },
    { label: 'Pending Confirmation', value: counts.pendingAppointments, icon: Clock3, color: 'bg-amber-50 text-amber-600' },
    { label: 'New Inquiries', value: counts.inquiries, icon: Inbox, color: 'bg-blue-50 text-blue-600' },
    { label: 'Testimonials', value: counts.testimonials, icon: Star, color: 'bg-(--color-gold)/10 text-(--color-gold)' },
    { label: 'Blog Posts', value: counts.blogPosts, icon: Newspaper, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-(--color-ink)">Dashboard</h1>
      <p className="mt-1 text-sm text-(--color-ink-soft)">Quick overview of clinic activity.</p>
      {usingFallback && (
        <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2 text-xs text-amber-700">
          Showing sample numbers — connect Supabase to see live stats here.
        </p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-(--color-teal-100) bg-white p-5 shadow-[var(--shadow-card)]">
            <span className={`grid h-10 w-10 place-items-center rounded-full ${color}`}><Icon size={18} /></span>
            <p className="font-display mt-3 text-2xl font-bold text-(--color-ink)">{value}</p>
            <p className="text-xs text-(--color-ink-soft)">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-(--color-teal-100) bg-white p-6 shadow-[var(--shadow-card)]">
        <h2 className="font-display text-base font-semibold text-(--color-ink)">Getting Started</h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-(--color-ink-soft)">
          <li>Connect your Supabase project in <code>.env</code> (see README).</li>
          <li>Run <code>supabase/schema.sql</code> to create all tables and security policies.</li>
          <li>Update Clinic Settings with your real contact details.</li>
          <li>Replace placeholder doctor, gallery and blog images from their respective tabs.</li>
          <li>Connect Twilio for WhatsApp automation (see <code>supabase/functions</code>).</li>
        </ol>
      </div>
    </div>
  )
}
