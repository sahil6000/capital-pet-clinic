// supabase/functions/send-booking-confirmation/index.ts
// Triggered by the public site after a new appointment is inserted.
// Uses Twilio WhatsApp API; falls back to Resend email if WhatsApp fails.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TWILIO_SID    = Deno.env.get('TWILIO_ACCOUNT_SID')!
const TWILIO_TOKEN  = Deno.env.get('TWILIO_AUTH_TOKEN')!
const TWILIO_WA_FROM= Deno.env.get('TWILIO_WHATSAPP_FROM')! // e.g. whatsapp:+14155238886
const RESEND_KEY    = Deno.env.get('RESEND_API_KEY')!
const CLINIC_NAME   = 'Capital Pet Clinic'
const CLINIC_PHONE  = '+91 97981 72415'

interface BookingPayload {
  owner_name: string
  whatsapp_number: string
  email?: string
  pet_name: string
  pet_type: string
  preferred_date: string
  preferred_time: string
}

async function sendWhatsApp(to: string, body: string): Promise<boolean> {
  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: TWILIO_WA_FROM,
        To: `whatsapp:${to.replace(/\s/g, '')}`,
        Body: body,
      }),
    }
  )
  const json = await resp.json()
  return resp.ok && json.sid
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `${CLINIC_NAME} <noreply@capitalpetclinic.in>`,
      to: [to],
      subject,
      html,
    }),
  })
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const payload: BookingPayload = await req.json()
  const { owner_name, whatsapp_number, email, pet_name, pet_type, preferred_date, preferred_time } = payload

  const waMessage =
    `🐾 *${CLINIC_NAME}*\n\nHi ${owner_name}! Your appointment has been received.\n\n` +
    `📅 Date: ${preferred_date}\n⏰ Time: ${preferred_time}\n` +
    `🐶 Pet: ${pet_name} (${pet_type})\n\n` +
    `We'll confirm your slot shortly. For urgent needs, call us: ${CLINIC_PHONE}`

  let channel: 'whatsapp' | 'email' = 'whatsapp'
  let status: 'sent' | 'failed' = 'sent'
  let errorMsg = ''

  const waSent = await sendWhatsApp(whatsapp_number, waMessage)

  if (!waSent) {
    status = 'failed'
    errorMsg = 'Twilio WhatsApp delivery failed'
    // Email fallback
    if (email) {
      channel = 'email'
      try {
        await sendEmail(email, `Appointment Received — ${CLINIC_NAME}`,
          `<h2>Hi ${owner_name}!</h2><p>Your appointment on <strong>${preferred_date} at ${preferred_time}</strong> for <strong>${pet_name}</strong> has been received. We'll confirm shortly.</p><p>Call us: ${CLINIC_PHONE}</p>`)
        status = 'sent'
        errorMsg = ''
      } catch {
        status = 'failed'
      }
    }
  }

  // Log the notification
  await supabase.from('notification_logs').insert({
    channel,
    recipient: channel === 'whatsapp' ? whatsapp_number : (email ?? whatsapp_number),
    template: 'booking_confirmation',
    payload,
    status,
    error_message: errorMsg || null,
  })

  return new Response(JSON.stringify({ ok: status === 'sent' }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
