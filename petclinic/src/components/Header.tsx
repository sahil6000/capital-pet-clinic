import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone, MessageCircle, Menu, X, PawPrint } from 'lucide-react'
import { clinicSettings } from '@/data/siteContent'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/doctors', label: 'Our Doctors' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waLink = `https://wa.me/${clinicSettings.whatsapp_number.replace(/[^\d]/g, '')}`

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-[var(--shadow-soft)]' : ''
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-(--color-teal-600) text-white">
            <PawPrint size={20} />
          </span>
          <span className="font-display text-lg font-semibold leading-tight text-(--color-ink)">
            Capital<br className="hidden sm:block" /> Pet Clinic
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-(--color-teal-600) ${
                  isActive ? 'text-(--color-teal-600)' : 'text-(--color-ink-soft)'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${clinicSettings.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-sm font-medium text-(--color-ink-soft) hover:text-(--color-teal-600)"
          >
            <Phone size={16} /> Call
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-(--color-teal-600) px-4 py-2 text-sm font-semibold text-(--color-teal-600) transition-colors hover:bg-(--color-teal-50)"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <Link
            to="/book-appointment"
            className="rounded-full bg-(--color-teal-600) px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition-colors hover:bg-(--color-teal-700)"
          >
            Book Appointment
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-(--color-ink) lg:hidden focus-ring"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-(--color-teal-100) bg-white px-4 pb-5 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-(--color-teal-50) text-(--color-teal-600)' : 'text-(--color-ink-soft)'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 flex gap-2">
            <a
              href={`tel:${clinicSettings.phone.replace(/\s/g, '')}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-(--color-teal-200) py-2.5 text-sm font-semibold text-(--color-teal-700)"
            >
              <Phone size={16} /> Call
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-(--color-teal-600) py-2.5 text-sm font-semibold text-(--color-teal-600)"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <Link
            to="/book-appointment"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-(--color-teal-600) py-3 text-center text-sm font-semibold text-white"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  )
}
