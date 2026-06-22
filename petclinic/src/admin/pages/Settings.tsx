import { useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { clinicSettings as defaults } from '@/data/siteContent'

const fields: { key: keyof typeof defaults; label: string }[] = [
  { key: 'clinic_name', label: 'Clinic Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'address', label: 'Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'whatsapp_number', label: 'WhatsApp Number' },
  { key: 'email', label: 'Email' },
  { key: 'maps_link', label: 'Google Maps Link' },
  { key: 'hours_weekday', label: 'Working Hours (Mon–Sat)' },
  { key: 'hours_sunday', label: 'Working Hours (Sunday)' },
  { key: 'instagram_url', label: 'Instagram URL' },
  { key: 'facebook_url', label: 'Facebook URL' },
  { key: 'youtube_url', label: 'YouTube URL' },
]

export default function AdminSettings() {
  const [values, setValues] = useState<typeof defaults>(defaults)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await supabase.from('clinic_settings').upsert({ ...values, id: 'default' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-(--color-ink)">Clinic Settings</h1>
      <p className="mt-1 text-sm text-(--color-ink-soft)">These fields power the header, footer, contact page and map across the whole site.</p>
      <div className="mt-6 space-y-3 rounded-2xl border border-(--color-teal-100) bg-white p-6 shadow-[var(--shadow-card)]">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-xs font-medium text-(--color-ink-soft)">{f.label}</label>
            <input
              className="input"
              value={String(values[f.key] ?? '')}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            />
          </div>
        ))}
        <label className="flex items-center gap-2 pt-2 text-sm text-(--color-ink)">
          <input type="checkbox" checked={values.payments_enabled} onChange={(e) => setValues((v) => ({ ...v, payments_enabled: e.target.checked }))} className="h-4 w-4" />
          Online payment integration enabled
        </label>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-2 flex items-center gap-2 rounded-full bg-(--color-teal-600) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700) disabled:opacity-60"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
