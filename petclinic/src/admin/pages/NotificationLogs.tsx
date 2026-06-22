import { useEffect, useState } from 'react'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface LogRow {
  id: string
  channel: 'whatsapp' | 'email'
  recipient: string
  template: string
  status: 'sent' | 'failed'
  created_at: string
}

const sample: LogRow[] = [
  { id: 'l1', channel: 'whatsapp', recipient: '+919800000001', template: 'booking_confirmation', status: 'sent', created_at: new Date().toISOString() },
  { id: 'l2', channel: 'whatsapp', recipient: '+919800000002', template: 'appointment_reminder', status: 'failed', created_at: new Date().toISOString() },
]

export default function AdminNotificationLogs() {
  const [rows, setRows] = useState<LogRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('notification_logs').select('*').order('created_at', { ascending: false }).limit(100).then(({ data, error }) => {
      setRows(!error && data && data.length > 0 ? (data as LogRow[]) : sample)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-(--color-ink)">Notification Logs</h1>
      <p className="mt-1 text-sm text-(--color-ink-soft)">WhatsApp & email delivery history from booking automations.</p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-(--color-teal-100) bg-white shadow-[var(--shadow-card)]">
        {loading ? (
          <div className="flex items-center gap-2 p-10 text-sm text-(--color-ink-soft)"><Loader2 className="animate-spin" size={18} /> Loading…</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-(--color-teal-100) text-(--color-ink-soft)">
                <th className="px-4 py-3 font-medium">Channel</th>
                <th className="px-4 py-3 font-medium">Recipient</th>
                <th className="px-4 py-3 font-medium">Template</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Sent</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="border-b border-(--color-teal-50) last:border-0">
                  <td className="px-4 py-3 capitalize text-(--color-ink)">{l.channel}</td>
                  <td className="px-4 py-3 text-(--color-ink-soft)">{l.recipient}</td>
                  <td className="px-4 py-3 text-(--color-ink-soft)">{l.template}</td>
                  <td className="px-4 py-3">
                    {l.status === 'sent' ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600"><CheckCircle2 size={14} /> Sent</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-red-600"><XCircle size={14} /> Failed</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-(--color-ink-soft)">{new Date(l.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
