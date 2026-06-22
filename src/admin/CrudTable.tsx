import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, Loader2, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export interface FieldDef {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'checkbox' | 'image'
}

interface Props {
  table: string
  title: string
  fields: FieldDef[]
  fallback: Record<string, unknown>[]
  orderBy?: string
}

/**
 * Generic CRUD table used across Doctors, Services, Gallery, Blog and
 * Testimonials admin screens. Reads/writes directly to Supabase; falls back
 * to read-only seed content (from src/data/siteContent.ts) if the table is
 * empty or Supabase isn't connected yet, so admins always see something.
 */
export default function CrudTable({ table, title, fields, fallback, orderBy }: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  const load = async () => {
    setLoading(true)
    const query = supabase.from(table).select('*')
    const { data, error } = orderBy ? await query.order(orderBy) : await query
    if (error || !data || data.length === 0) {
      setRows(fallback)
      setUsingFallback(true)
    } else {
      setRows(data)
      setUsingFallback(false)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [table])

  const handleDelete = async (id: unknown) => {
    if (!confirm('Delete this item?')) return
    await supabase.from(table).delete().eq('id', id)
    load()
  }

  const handleSave = async (values: Record<string, unknown>) => {
    if (values.id) {
      await supabase.from(table).update(values).eq('id', values.id)
    } else {
      const { id, ...rest } = values
      void id
      await supabase.from(table).insert(rest)
    }
    setEditing(null)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-(--color-ink)">{title}</h1>
        <button
          onClick={() => setEditing({})}
          className="flex items-center gap-2 rounded-full bg-(--color-teal-600) px-4 py-2 text-sm font-semibold text-white hover:bg-(--color-teal-700)"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {usingFallback && (
        <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2 text-xs text-amber-700">
          Showing seed content — connect Supabase and add rows to the "{table}" table to manage this from here.
        </p>
      )}

      <div className="mt-5 overflow-x-auto rounded-2xl border border-(--color-teal-100) bg-white shadow-[var(--shadow-card)]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-sm text-(--color-ink-soft)"><Loader2 className="animate-spin" size={18} /> Loading…</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-(--color-teal-100) text-(--color-ink-soft)">
                {fields.slice(0, 3).map((f) => <th key={f.key} className="px-4 py-3 font-medium">{f.label}</th>)}
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={(row.id as string) ?? i} className="border-b border-(--color-teal-50) last:border-0">
                  {fields.slice(0, 3).map((f) => (
                    <td key={f.key} className="max-w-xs truncate px-4 py-3 text-(--color-ink)">
                      {String(row[f.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(row)} className="mr-2 inline-grid h-8 w-8 place-items-center rounded-lg text-(--color-teal-600) hover:bg-(--color-teal-50)"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(row.id)} disabled={usingFallback} className="inline-grid h-8 w-8 place-items-center rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-30"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-(--color-ink-soft)">No items yet.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <EditModal fields={fields} initial={editing} onClose={() => setEditing(null)} onSave={handleSave} />
      )}
    </div>
  )
}

function EditModal({
  fields, initial, onClose, onSave,
}: { fields: FieldDef[]; initial: Record<string, unknown>; onClose: () => void; onSave: (v: Record<string, unknown>) => void }) {
  const [values, setValues] = useState<Record<string, unknown>>(initial)
  const [saving, setSaving] = useState(false)

  const update = (k: string, v: unknown) => setValues((s) => ({ ...s, [k]: v }))

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-(--color-ink)">{initial.id ? 'Edit' : 'Add'} Item</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-(--color-teal-50)"><X size={18} /></button>
        </div>
        <div className="mt-4 space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs font-medium text-(--color-ink-soft)">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea rows={3} value={String(values[f.key] ?? '')} onChange={(e) => update(f.key, e.target.value)} className="input resize-none" />
              ) : f.type === 'checkbox' ? (
                <input type="checkbox" checked={Boolean(values[f.key])} onChange={(e) => update(f.key, e.target.checked)} className="h-5 w-5" />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={String(values[f.key] ?? '')}
                  onChange={(e) => update(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                  className="input"
                  placeholder={f.type === 'image' ? 'Image URL (upload via Supabase Storage, paste link here)' : ''}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={async () => { setSaving(true); await onSave(values); setSaving(false) }}
          disabled={saving}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-(--color-teal-600) py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700) disabled:opacity-60"
        >
          {saving && <Loader2 className="animate-spin" size={16} />} Save
        </button>
      </div>
    </div>
  )
}
