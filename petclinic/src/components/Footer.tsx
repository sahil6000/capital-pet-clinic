import { Link } from 'react-router-dom'
import { MessageCircle, PawPrint, Phone, Mail, MapPin } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons'
import { clinicSettings, services } from '@/data/siteContent'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="bg-(--color-ink) text-(--color-teal-100)">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Col 1 - Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-(--color-teal-500) text-white">
              <PawPrint size={18} />
            </span>
            <span className="font-display text-lg font-semibold text-white">{clinicSettings.clinic_name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-(--color-teal-100)/80">
            Dedicated to providing the best medical care and compassionate service for your pets.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a href={`tel:${clinicSettings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white">
              <Phone size={15} /> {clinicSettings.phone}
            </a>
            <a href={`mailto:${clinicSettings.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail size={15} /> {clinicSettings.email}
            </a>
          </div>
        </div>

        {/* Col 2 - Quick Links */}
        <div>
          <h4 className="font-display text-base font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'],
              ['/doctors', 'Our Doctors'], ['/gallery', 'Gallery'],
              ['/blog', 'Blog'], ['/reviews', 'Reviews'],
              ['/book-appointment', 'Book Appointment'], ['/contact', 'Contact Us'],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 3 - Services */}
        <div>
          <h4 className="font-display text-base font-semibold text-white">Our Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}><Link to="/services" className="hover:text-white">{s.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 4 - Newsletter & Hours */}
        <div>
          <h4 className="font-display text-base font-semibold text-white">Subscribe Newsletter</h4>
          <p className="mt-3 text-sm text-(--color-teal-100)/80">Get pet care tips and clinic updates.</p>
          <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-(--color-teal-400)"
            />
            <button className="shrink-0 rounded-full bg-(--color-teal-500) px-4 py-2 text-sm font-semibold text-white hover:bg-(--color-teal-400)">
              {submitted ? '✓' : 'Subscribe'}
            </button>
          </form>

          <h4 className="font-display mt-5 text-base font-semibold text-white">Clinic Timings</h4>
          <p className="mt-2 whitespace-pre-line text-sm text-(--color-teal-100)/80">
            {clinicSettings.hours_weekday}{'\n'}{clinicSettings.hours_sunday}
          </p>

          <div className="mt-5 flex gap-3">
            <a href={clinicSettings.facebook_url} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white">
              <FacebookIcon size={16} />
            </a>
            <a href={clinicSettings.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white">
              <InstagramIcon size={16} />
            </a>
            <a href={clinicSettings.youtube_url} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white">
              <YoutubeIcon size={16} />
            </a>
            <a href={`https://wa.me/${clinicSettings.whatsapp_number.replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white">
              <WhatsAppIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-(--color-teal-100)/60">
        © {new Date().getFullYear()} {clinicSettings.clinic_name}. All rights reserved. &nbsp;·&nbsp; Designed with ❤️ for Pets
      </div>
    </footer>
  )
}
