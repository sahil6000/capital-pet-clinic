import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, CalendarCheck, Stethoscope, UsersRound, Images,
  Newspaper, Star, Inbox, Bell, Settings as SettingsIcon, LogOut, PawPrint,
} from 'lucide-react'
import { useAdminAuth } from './AdminAuth'
import AdminLogin from './AdminLogin'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/admin/services', label: 'Services', icon: UsersRound },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/blog', label: 'Blog', icon: Newspaper },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { to: '/admin/notifications', label: 'Notification Logs', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
]

export default function AdminLayout() {
  const { session, loading, signOut } = useAdminAuth()

  if (loading) return <div className="grid min-h-screen place-items-center text-sm text-(--color-ink-soft)">Loading…</div>
  if (!session) return <AdminLogin />

  return (
    <div className="flex min-h-screen bg-(--color-teal-50)/40">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-(--color-teal-100) bg-white p-5 lg:flex">
        <div className="flex items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-(--color-teal-600) text-white"><PawPrint size={18} /></span>
          <span className="font-display text-sm font-semibold text-(--color-ink)">Capital Pet Clinic<br /><span className="font-sans text-xs font-normal text-(--color-ink-soft)">Admin CMS</span></span>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-(--color-teal-600) text-white' : 'text-(--color-ink-soft) hover:bg-(--color-teal-50)'
                }`
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={signOut} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-(--color-ink-soft) hover:bg-(--color-teal-50)">
          <LogOut size={17} /> Sign Out
        </button>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-(--color-teal-100) bg-white px-5 py-4 lg:hidden">
          <span className="font-display text-sm font-semibold text-(--color-ink)">Admin CMS</span>
          <button onClick={signOut} className="text-sm font-medium text-(--color-teal-600)">Sign Out</button>
        </header>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
