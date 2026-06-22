// supabase/functions/send-status-update/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TWILIO_SID     = Deno.env.get('TWILIO_ACCOUNT_SID')!
const TWILIO_TOKEN   = Deno.env.get('TWILIO_AUTH_TOKEN')!
const TWILIO_WA_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM')!
const CLINIC_PHONE   = '+91 97981 72415'
const CLINIC_NAME    = 'Capital Pet Clinic'

const STATUS_MESSAGES: Record<string, string> = {
  confirmed:   '✅ Your appointment has been *confirmed*! We look forward to seeing your pet.',
  cancelled:   '❌ We are sorry, your appointment has been *cancelled*. Please call us to reschedule.',
  rescheduled: '🔄 Your appointment has been *rescheduled*. Please check with the clinic for the new time.',
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { id, status }: { id: string; status: string } = await req.json()
  const msg = STATUS_MESSAGES[status]
  if (!msg) return new Response(JSON.stringify({ ok: true, skipped: true }), { headers: { 'Content-Type': 'application/json' } })

  const { data: appt } = await supabase
    .from('appointments')
    .select('owner_name, whatsapp_number, preferred_date, preferred_time')
    .eq('id', id)
    .single()

  if (!appt) return new Response(JSON.stringify({ ok: false, error: 'Not found' }), { status: 404 })

  const body =
    `🐾 *${CLINIC_NAME}*\n\nHi ${appt.owner_name}!\n\n${msg}\n\n` +
    `📅 ${appt.preferred_date} at ${appt.preferred_time}\n\nQuestions? Call: ${CLINIC_PHONE}`

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
        To: `whatsapp:${appt.whatsapp_number}`,
        Body: body,
      }),
    }
  )

  const ok = resp.ok
  await supabase.from('notification_logs').insert({
    channel: 'whatsapp',
    recipient: appt.whatsapp_number,
    template: `status_update_${status}`,
    payload: { appointment_id: id, status },
    status: ok ? 'sent' : 'failed',
  })

  return new Response(JSON.stringify({ ok }), { headers: { 'Content-Type': 'application/json' } })
})
