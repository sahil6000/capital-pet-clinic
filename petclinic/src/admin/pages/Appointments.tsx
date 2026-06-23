import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { services } from '@/data/siteContent'
import type { Appointment, AppointmentStatus } from '@/types'

const statuses: AppointmentStatus[] = [
  'pending',
  'confirmed',
  'rescheduled',
  'completed',
  'cancelled',
  'no_show',
]

const statusColor: Record<AppointmentStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  rescheduled: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  no_show: 'bg-zinc-200 text-zinc-700',
}

export default function AdminAppointments() {
  const [rows, setRows] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | AppointmentStatus>('all')

  const load = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('APPOINTMENTS DATA:', data)
      console.log('APPOINTMENTS ERROR:', error)

      if (error) {
        console.error('Supabase Error:', error)
        return
      }

      setRows((data || []) as Appointment[])
    } catch (err) {
      console.error('Load Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (
    id: string,
    status: AppointmentStatus
  ) => {
    setRows((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    )

    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error(error)
    }
  }

  const visible =
    filter === 'all'
      ? rows
      : rows.filter((r) => r.status === filter)

  const serviceName = (id: string) =>
    services.find((s) => s.id === id)?.name || id

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">
        Appointments
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {(['all', ...statuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
              filter === s
                ? 'bg-teal-600 text-white'
                : 'border bg-white'
            }`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10">
            <Loader2 className="animate-spin" size={18} />
            Loading...
          </div>
        ) : (
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Pet</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date / Time</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {visible.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3">
                    {a.owner_name}
                  </td>

                  <td className="px-4 py-3">
                    {a.pet_name} ({a.pet_type})
                  </td>

                  <td className="px-4 py-3">
                    {serviceName(a.service_id)}
                  </td>

                  <td className="px-4 py-3">
                    {a.preferred_date} | {a.preferred_time}
                  </td>

                  <td className="px-4 py-3">
                    {a.phone}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) =>
                        updateStatus(
                          a.id,
                          e.target.value as AppointmentStatus
                        )
                      }
                      className={`rounded-full px-3 py-1 text-xs ${
                        statusColor[a.status]
                      }`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center"
                  >
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}