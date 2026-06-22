// src/lib/useRazorpay.ts
// Usage: after an appointment is confirmed, call initiatePayment() to open
// the Razorpay checkout. On success, we record the payment in Supabase.

import { useCallback } from 'react'
import { supabase } from './supabaseClient'

declare global {
  interface Window {
    // Razorpay is loaded from CDN via <script> in index.html at runtime
    Razorpay: new (options: RazorpayOptions) => { open(): void }
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill?: { name?: string; contact?: string; email?: string }
  theme?: { color?: string }
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

interface PaymentParams {
  appointmentId: string
  amountINR: number          // e.g. 300  (the component shows ₹300)
  ownerName: string
  phone: string
  email?: string
  description: string
}

export function useRazorpay() {
  const initiatePayment = useCallback(
    async ({ appointmentId, amountINR, ownerName, phone, email, description }: PaymentParams) => {
      // 1. Create a Razorpay order via a Supabase Edge Function that holds the secret key
      const { data, error } = await supabase.functions.invoke<{ order_id: string; amount: number }>(
        'create-razorpay-order',
        { body: { appointment_id: appointmentId, amount_inr: amountINR } }
      )

      if (error || !data) {
        alert('Could not initiate payment. Please try again or pay at the clinic.')
        return
      }

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,           // in paise (returned by edge function)
        currency: 'INR',
        name: 'Capital Pet Clinic',
        description,
        order_id: data.order_id,
        handler: async (response: RazorpayResponse) => {
          // 2. Record success in DB
          await supabase.from('payment_records').insert({
            appointment_id: appointmentId,
            gateway: 'razorpay',
            gateway_order_id: data.order_id,
            gateway_payment_id: response.razorpay_payment_id,
            amount_paise: data.amount,
            currency: 'INR',
            status: 'paid',
            raw_response: response,
          })

          // 3. Mark appointment as paid
          await supabase
            .from('appointments')
            .update({ payment_status: 'paid', payment_id: response.razorpay_payment_id })
            .eq('id', appointmentId)

          alert('Payment successful! ✅ We look forward to seeing your pet.')
        },
        prefill: { name: ownerName, contact: phone, email },
        theme: { color: '#0e7c7b' },
      }

      if (!window.Razorpay) {
        // Lazy-load Razorpay SDK if not already present
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script')
          s.src = 'https://checkout.razorpay.com/v1/checkout.js'
          s.onload = () => resolve()
          s.onerror = () => reject()
          document.head.appendChild(s)
        })
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    },
    []
  )

  return { initiatePayment }
}
