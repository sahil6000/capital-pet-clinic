import { useState } from 'react'
import { CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { services } from '@/data/siteContent'

const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other']

type FormState = {
  owner_name: string
  phone: string
  whatsapp_number: string
  email: string
  pet_name: string
  pet_type: string
  service_id: string
  preferred_date: string
  preferred_time: string
  message: string
}

const initial: FormState = {
  owner_name: '', phone: '', whatsapp_number: '', email: '',
  pet_name: '', pet_type: '', service_id: '', preferred_date: '', preferred_time: '', message: '',
}

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      // Double-booking guard: same date+time pair already pending/confirmed
      const { data: clashing, error: clashErr } = await supabase
        .from('appointments')
        .select('id')
        .eq('preferred_date', form.preferred_date)
        .eq('preferred_time', form.preferred_time)
        .in('status', ['pending', 'confirmed'])
        .limit(1)

      if (clashErr) throw clashErr
      if (clashing && clashing.length > 0) {
        setStatus('error')
        setErrorMsg('That time slot was just taken. Please choose a different time.')
        return
      }

      const { error: insertErr } = await supabase.from('appointments').insert({
        ...form,
        whatsapp_number: form.whatsapp_number || form.phone,
        status: 'pending',
      })
      if (insertErr) throw insertErr

      // Fire-and-forget: trigger WhatsApp confirmation edge function
      supabase.functions.invoke('send-booking-confirmation', { body: form }).catch(() => {})

      setStatus('success')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setErrorMsg('Something went wrong saving your booking. Please call us or try again.')
      console.error(err)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-(--color-teal-50) p-8 text-center">
        <CheckCircle2 className="mx-auto text-(--color-teal-600)" size={48} />
        <h3 className="font-display mt-4 text-xl font-semibold text-(--color-ink)">Appointment Requested!</h3>
        <p className="mt-2 text-sm text-(--color-ink-soft)">
          We've received your booking and will confirm it shortly on WhatsApp. You can also call us if it's urgent.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 rounded-full bg-(--color-teal-600) px-6 py-2.5 text-sm font-semibold text-white hover:bg-(--color-teal-700)"
        >
          Book Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Full Name" value={form.owner_name} onChange={(e) => update('owner_name', e.target.value)} className="input" />
        <input required placeholder="Phone Number" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input placeholder="Pet Name" value={form.pet_name} onChange={(e) => update('pet_name', e.target.value)} className="input" />
        <select required value={form.pet_type} onChange={(e) => update('pet_type', e.target.value)} className="input">
          <option value="">Select Pet Type</option>
          {petTypes.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select required value={form.service_id} onChange={(e) => update('service_id', e.target.value)} className="input">
          <option value="">Select Service</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => update('email', e.target.value)} className="input" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required type="date" value={form.preferred_date} min={new Date().toISOString().split('T')[0]} onChange={(e) => update('preferred_date', e.target.value)} className="input" />
        <input required type="time" value={form.preferred_time} onChange={(e) => update('preferred_time', e.target.value)} className="input" />
      </div>
      <textarea
        placeholder="Message / symptoms (optional)"
        value={form.message}
        onChange={(e) => update('message', e.target.value)}
        rows={3}
        className="input resize-none"
      />
      {status === 'error' && <p className="text-sm font-medium text-red-600">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-(--color-teal-600) py-3.5 text-sm font-semibold text-white hover:bg-(--color-teal-700) disabled:opacity-60"
      >
        {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <CalendarCheck size={18} />}
        {status === 'loading' ? 'Booking...' : 'Book Now'}
      </button>
      <p className="text-center text-xs text-(--color-ink-soft)">You will receive a confirmation on WhatsApp.</p>
    </form>
  )
}
