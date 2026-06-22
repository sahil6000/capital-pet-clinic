import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { services } from '@/data/siteContent'
import type { Appointment, AppointmentStatus } from '@/types'

const statuses: AppointmentStatus[] = ['pending', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'no_show']

const statusColor: Record<AppointmentStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-(--color-teal-100) text-(--color-teal-700)',
  rescheduled: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  no_show: 'bg-zinc-200 text-zinc-700',
}

const sampleAppointments: Appointment[] = [
  { id: 'a1', owner_name: 'Neha Sinha', phone: '+919800000001', whatsapp_number: '+919800000001', email: '', pet_name: 'Bruno', pet_type: 'Dog', service_id: 'svc-2', preferred_date: '2026-06-25', preferred_time: '11:00', message: 'Annual vaccination due', status: 'pending', created_at: new Date().toISOString() },
  { id: 'a2', owner_name: 'Rohit Kumar', phone: '+919800000002', whatsapp_number: '+919800000002', email: '', pet_name: 'Misha', pet_type: 'Cat', service_id: 'svc-1', preferred_date: '2026-06-23', preferred_time: '16:30', message: '', status: 'confirmed', created_at: new Date().toISOString() },
]

export default function AdminAppointments() {
  const [rows, setRows] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [filter, setFilter] = useState<'all' | AppointmentStatus>('all')

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('appointments').select('*').order('preferred_date')
    if (error || !data || data.length === 0) {
      setRows(sampleAppointments)
      setUsingFallback(true)
    } else {
      setRows(data as Appointment[])
      setUsingFallback(false)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: AppointmentStatus) => {
    setRows((r) => r.map((a) => (a.id === id ? { ...a, status } : a)))
    if (!usingFallback) {
      await supabase.from('appointments').update({ status }).eq('id', id)
      // Edge function sends WhatsApp update when status flips to confirmed/cancelled/rescheduled
      supabase.functions.invoke('send-status-update', { body: { id, status } }).catch(() => {})
    }
  }

  const visible = filter === 'all' ? rows : rows.filter((r) => r.status === filter)
  const serviceName = (id: string) => services.find((s) => s.id === id)?.name ?? id

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-(--color-ink)">Appointments</h1>
      {usingFallback && (
        <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2 text-xs text-amber-700">
          Showing sample data — connect Supabase to manage real bookings here.
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {(['all', ...statuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${filter === s ? 'bg-(--color-teal-600) text-white' : 'bg-white text-(--color-ink-soft) border border-(--color-teal-100)'}`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-(--color-teal-100) bg-white shadow-[var(--shadow-card)]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-sm text-(--color-ink-soft)"><Loader2 className="animate-spin" size={18} /> Loading…</div>
        ) : (
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-(--color-teal-100) text-(--color-ink-soft)">
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Pet</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date / Time</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((a) => (
                <tr key={a.id} className="border-b border-(--color-teal-50) last:border-0">
                  <td className="px-4 py-3 font-medium text-(--color-ink)">{a.owner_name}</td>
                  <td className="px-4 py-3 text-(--color-ink-soft)">{a.pet_name} ({a.pet_type})</td>
                  <td className="px-4 py-3 text-(--color-ink-soft)">{serviceName(a.service_id)}</td>
                  <td className="px-4 py-3 text-(--color-ink-soft)">{a.preferred_date} · {a.preferred_time}</td>
                  <td className="px-4 py-3 text-(--color-ink-soft)">{a.phone}</td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value as AppointmentStatus)}
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold capitalize ${statusColor[a.status]}`}
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-(--color-ink-soft)">No appointments in this status.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
