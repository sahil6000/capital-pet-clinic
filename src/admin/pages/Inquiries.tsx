import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import type { Inquiry } from '@/types'

const sample: Inquiry[] = [
  { id: 'i1', full_name: 'Sanjay Oraon', phone: '+919800000003', message: 'Do you offer home visits for vaccination?', status: 'new', created_at: new Date().toISOString() },
]

export default function AdminInquiries() {
  const [rows, setRows] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      setRows(!error && data && data.length > 0 ? (data as Inquiry[]) : sample)
      setLoading(false)
    })
  }, [])

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)))
    await supabase.from('inquiries').update({ status }).eq('id', id)
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-(--color-ink)">Inquiries</h1>
      <div className="mt-5 space-y-3">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-(--color-ink-soft)"><Loader2 className="animate-spin" size={18} /> Loading…</div>
        ) : rows.map((i) => (
          <div key={i.id} className="rounded-2xl border border-(--color-teal-100) bg-white p-5 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-sm font-semibold text-(--color-ink)">{i.full_name} · {i.phone}</p>
              <select value={i.status} onChange={(e) => updateStatus(i.id, e.target.value as Inquiry['status'])} className="rounded-full border border-(--color-teal-100) px-3 py-1 text-xs font-medium">
                <option value="new">New</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <p className="mt-2 text-sm text-(--color-ink-soft)">{i.message}</p>
          </div>
        ))}
        {!loading && rows.length === 0 && <p className="text-sm text-(--color-ink-soft)">No inquiries yet.</p>}
      </div>
    </div>
  )
}
