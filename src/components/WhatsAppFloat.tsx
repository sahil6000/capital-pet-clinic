import { MessageCircle } from 'lucide-react'
import { clinicSettings } from '@/data/siteContent'

export default function WhatsAppFloat() {
  const waLink = `https://wa.me/${clinicSettings.whatsapp_number.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
    `Hi ${clinicSettings.clinic_name}, I'd like to ask about an appointment.`
  )}`
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-soft)] transition-transform hover:scale-105 focus-ring"
    >
      <MessageCircle size={26} />
    </a>
  )
}
