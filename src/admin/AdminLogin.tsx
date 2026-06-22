import { useState } from 'react'
import { PawPrint, Loader2 } from 'lucide-react'
import { useAdminAuth } from './AdminAuth'

export default function AdminLogin() {
  const { signIn } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) setError(error)
  }

  return (
    <div className="grid min-h-screen place-items-center bg-(--color-teal-50) px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-center gap-2">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-(--color-teal-600) text-white"><PawPrint size={22} /></span>
        </div>
        <h1 className="font-display mt-4 text-center text-xl font-semibold text-(--color-ink)">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-(--color-ink-soft)">Capital Pet Clinic CMS</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-(--color-teal-600) py-3 text-sm font-semibold text-white hover:bg-(--color-teal-700) disabled:opacity-60">
            {loading && <Loader2 className="animate-spin" size={16} />} Sign In
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-(--color-ink-soft)">
          Admin accounts are created in Supabase Auth — see README for setup.
        </p>
      </div>
    </div>
  )
}
