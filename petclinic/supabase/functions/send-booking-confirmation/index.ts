// supabase/functions/send-booking-confirmation/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const TWILIO_SID = Deno.env.get('TWILIO_ACCOUNT_SID') || ''
const TWILIO_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN') || ''
const TWILIO_WA_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM') || ''
const RESEND_KEY = Deno.env.get('RESEND_API_KEY') || ''

const CLINIC_NAME = 'Capital Pet Clinic'
const CLINIC_PHONE = '+91 97981 72415'

interface BookingPayload {
  owner_name: string
  whatsapp_number: string
  email?: string
  pet_name: string
  pet_type: string
  preferred_date: string
  preferred_time: string
}

async function sendWhatsApp(
  to: string,
  body: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' +
            btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: TWILIO_WA_FROM,
          To: `whatsapp:${to.replace(/\s/g, '')}`,
          Body: body,
        }),
      }
    )

    const data = await response.json()

    return response.ok && !!data.sid
  } catch (error) {
    console.error('WhatsApp Error:', error)
    return false
  }
}

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  try {
    const response = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:
            'Capital Pet Clinic <noreply@capitalpetclinic.in>',
          to: [to],
          subject,
          html,
        }),
      }
    )

    return response.ok
  } catch (error) {
    console.error('Email Error:', error)
    return false
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    })
  }

  try {
    const payload: BookingPayload = await req.json()

    const {
      owner_name,
      whatsapp_number,
      email,
      pet_name,
      pet_type,
      preferred_date,
      preferred_time,
    } = payload

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const waMessage =
      `🐾 ${CLINIC_NAME}\n\n` +
      `Hi ${owner_name}, your appointment request has been received.\n\n` +
      `📅 Date: ${preferred_date}\n` +
      `⏰ Time: ${preferred_time}\n` +
      `🐶 Pet: ${pet_name} (${pet_type})\n\n` +
      `We will confirm shortly.\n\n` +
      `☎ ${CLINIC_PHONE}`

    let channel = 'whatsapp'
    let status = 'sent'
    let errorMessage = ''

    const whatsappSent = await sendWhatsApp(
      whatsapp_number,
      waMessage
    )

    if (!whatsappSent) {
      status = 'failed'
      errorMessage = 'WhatsApp delivery failed'

      if (email) {
        channel = 'email'

        const emailSent = await sendEmail(
          email,
          `Appointment Received - ${CLINIC_NAME}`,
          `
          <h2>Hello ${owner_name}</h2>
          <p>Your appointment request has been received.</p>

          <ul>
            <li>Date: ${preferred_date}</li>
            <li>Time: ${preferred_time}</li>
            <li>Pet: ${pet_name}</li>
            <li>Type: ${pet_type}</li>
          </ul>

          <p>We will confirm shortly.</p>

          <p>Call us: ${CLINIC_PHONE}</p>
          `
        )

        if (emailSent) {
          status = 'sent'
          errorMessage = ''
        }
      }
    }

    try {
      await supabase
        .from('notification_logs')
        .insert({
          channel,
          recipient:
            channel === 'whatsapp'
              ? whatsapp_number
              : email || whatsapp_number,
          template: 'booking_confirmation',
          payload,
        })
    } catch (e) {
      console.error('Log Insert Error:', e)
    }

    return new Response(
      JSON.stringify({
        success: true,
        channel,
        status,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error(error)

    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})