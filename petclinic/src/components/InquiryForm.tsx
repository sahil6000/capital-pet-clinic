import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function InquiryForm() {
  const [form, setForm] = useState({ full_name: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('inquiries').insert({ ...form, status: 'new' })
    if (error) {
      setStatus('error')
      console.error(error)
      return
    }
    supabase.functions.invoke('send-inquiry-notification', { body: form }).catch(() => {})
    setStatus('success')
    setForm({ full_name: '', phone: '', message: '' })
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-(--color-teal-50) p-6 text-center">
        <CheckCircle2 className="mx-auto text-(--color-teal-600)" size={36} />
        <p className="mt-3 text-sm font-medium text-(--color-ink)">Thanks! We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Full Name" value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} className="input" />
        <input required placeholder="Phone Number" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="input" />
      </div>
      <textarea required placeholder="Your Message" rows={4} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="input resize-none" />
      {status === 'error' && <p className="text-sm font-medium text-red-600">Couldn't send your message. Please try again.</p>}
      <button
        disabled={status === 'loading'}
        className="flex items-center gap-2 rounded-full bg-(--color-teal-600) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700) disabled:opacity-60"
      >
        {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
        Send Inquiry
      </button>
    </form>
  )
}
