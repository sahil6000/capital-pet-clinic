// supabase/functions/send-inquiry-notification/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TWILIO_SID     = Deno.env.get('TWILIO_ACCOUNT_SID')!
const TWILIO_TOKEN   = Deno.env.get('TWILIO_AUTH_TOKEN')!
const TWILIO_WA_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM')!
const ADMIN_WA       = Deno.env.get('ADMIN_WHATSAPP_NUMBER')! // clinic owner's WhatsApp

interface InquiryPayload {
  full_name: string
  phone: string
  message: string
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { full_name, phone, message }: InquiryPayload = await req.json()

  const body =
    `📩 *New Inquiry — Capital Pet Clinic*\n\n` +
    `Name: ${full_name}\nPhone: ${phone}\n\nMessage: ${message}`

  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: TWILIO_WA_FROM, To: `whatsapp:${ADMIN_WA}`, Body: body }),
    }
  )

  const ok = resp.ok

  await supabase.from('notification_logs').insert({
    channel: 'whatsapp',
    recipient: ADMIN_WA,
    template: 'new_inquiry_admin',
    payload: { full_name, phone, message },
    status: ok ? 'sent' : 'failed',
  })

  return new Response(JSON.stringify({ ok }), { headers: { 'Content-Type': 'application/json' } })
})
