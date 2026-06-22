// supabase/functions/create-razorpay-order/index.ts
// Creates a Razorpay order using the secret key (never exposed to the browser).

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const RAZORPAY_KEY_ID     = Deno.env.get('RAZORPAY_KEY_ID')!
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')!

serve(async (req) => {
  const { amount_inr }: { appointment_id: string; amount_inr: number } = await req.json()

  const amountPaise = amount_inr * 100  // Razorpay uses paise

  const resp = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: 'INR',
      receipt: `cpc_${Date.now()}`,
    }),
  })

  if (!resp.ok) {
    return new Response(JSON.stringify({ error: 'Razorpay order creation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const order = await resp.json()
  return new Response(JSON.stringify({ order_id: order.id, amount: order.amount }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
