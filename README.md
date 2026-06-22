# Capital Pet Clinic — Full-Stack Website & Admin CMS

> React 18 + TypeScript + Vite + Tailwind CSS v4 | Supabase | Twilio WhatsApp | Razorpay Payments

---

## What Is Built

| Layer | Details |
|---|---|
| Public Website | Home, About, Services, Doctors, Gallery, Blog, Reviews, Contact, Book Appointment (10 pages) |
| Admin CMS | Dashboard, Appointments, Doctors, Services, Gallery, Blog, Testimonials, Inquiries, Notification Logs, Settings |
| Database | 13 Supabase/Postgres tables with RLS policies, indexes, triggers, and seed data |
| WhatsApp Automation | Booking confirmation, status update notification, inquiry alert (3 Edge Functions) |
| Payments | Razorpay checkout with server-side order creation |
| SEO | Schema.org, OG tags, sitemap.xml, robots.txt, canonical URLs |

---

## 1. Local Setup

```bash
npm install
cp .env.example .env        # Fill in your credentials
npm run dev                 # http://localhost:5173
```

---

## 2. Environment Variables (.env)

```env
# Supabase (get from Supabase > Settings > API)
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here

# Razorpay (public key only — safe in frontend)
VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
```

Secret keys (Twilio, Razorpay secret) go in Supabase Edge Function secrets ONLY — never in .env.

---

## 3. Supabase Setup

1. Create project at https://supabase.com (pick ap-south-1 region for India)
2. Copy Project URL + anon key into .env
3. In SQL Editor: open and run `supabase/schema.sql`
4. Create 4 storage buckets (all public): clinic-assets, doctor-photos, gallery, blog-covers
5. For each bucket add policies: SELECT for public, INSERT/UPDATE/DELETE for authenticated

### Create Admin Account
1. Supabase > Authentication > Users > Invite User (your email)
2. Click invite link, set password
3. In SQL Editor run:
   ```sql
   insert into public.admins (id, full_name)
   values ((select id from auth.users where email = 'you@example.com'), 'Your Name');
   ```
4. Login at /admin

---

## 4. Twilio WhatsApp Setup

1. Sign up at https://www.twilio.com
2. Messaging > Try WhatsApp (sandbox) or apply for WhatsApp Business Number
3. In Supabase > Edge Functions > Secrets, add:
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - TWILIO_WHATSAPP_FROM  (format: whatsapp:+14155238886)
   - ADMIN_WHATSAPP_NUMBER (+919798172415)
   - RESEND_API_KEY        (from resend.com — free email fallback)

---

## 5. Deploy Edge Functions

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR-REF
supabase functions deploy send-booking-confirmation
supabase functions deploy send-inquiry-notification
supabase functions deploy send-status-update
supabase functions deploy create-razorpay-order
```

---

## 6. Razorpay Setup

1. Sign up at https://razorpay.com
2. Settings > API Keys > Generate key pair
3. Add Key ID to .env as VITE_RAZORPAY_KEY_ID
4. Add to Supabase Edge Function secrets:
   - RAZORPAY_KEY_ID
   - RAZORPAY_KEY_SECRET

---

## 7. Google Maps

1. console.cloud.google.com > enable Maps Embed API
2. Create API key, restrict to your domain
3. Admin > Settings > paste the embed URL:
   https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=Capital+Pet+Clinic+Ranchi

---

## 8. Deploy to Vercel

```bash
npm run build               # Verify build passes
npm install -g vercel
vercel --prod
```

Add the same .env variables in Vercel > Project > Settings > Environment Variables.
For custom domain: Vercel > Domains > add capitalpetclinic.in > update DNS.

---

## Launch Checklist

### Must-do before going live
- [ ] schema.sql run in Supabase (all 13 tables exist)
- [ ] Admin account created and tested
- [ ] .env has real Supabase URL + anon key
- [ ] All placeholder images replaced (hero, doctors, gallery) from Admin
- [ ] Clinic name, address, phone updated in Admin > Settings
- [ ] Google Maps embed URL updated with real location + API key
- [ ] Edge Functions deployed with all secrets set
- [ ] WhatsApp tested: book a test appointment, verify message received
- [ ] Razorpay tested in test mode: complete a payment
- [ ] npm run build passes cleanly
- [ ] Site deployed and live on custom domain
- [ ] HTTPS working (automatic on Vercel)
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] Sitemap submitted to Google Search Console
- [ ] All forms tested on mobile (booking, inquiry, newsletter)

### After launch
- [ ] Set up Uptime Robot (free) to monitor site uptime
- [ ] Enable Supabase DB backups
- [ ] Add Google Analytics or Plausible for traffic stats
- [ ] Create Google Business Profile and link to website
- [ ] Schedule appointment reminder cron (Supabase pg_cron or external)

---

## Post-Launch Content Management (First 6 Months)

| Task | Frequency | Where |
|---|---|---|
| Respond to inquiries | Daily | Admin > Inquiries |
| Confirm/update appointments | Daily | Admin > Appointments |
| Publish blog post | Monthly | Admin > Blog |
| Add gallery photos | Monthly | Admin > Gallery |
| Update hours or services | As needed | Admin > Settings / Services |
| Check notification logs | Weekly | Admin > Notification Logs |

---

## Project Structure

```
petclinic/
├── public/                    # favicon.svg, robots.txt, sitemap.xml
├── src/
│   ├── admin/                 # Auth context, layout, 10 CMS pages, reusable CRUD table
│   ├── components/            # Header, Footer, Hero, InfoStrip, forms, gallery, map...
│   ├── data/siteContent.ts    # Seed content (fallback if Supabase is empty)
│   ├── lib/                   # supabaseClient.ts, useRazorpay.ts
│   ├── pages/                 # 10 public pages (lazy-loaded)
│   ├── types/index.ts         # Shared TS types matching DB schema
│   └── index.css              # Tailwind v4 + design tokens (teal/cream palette)
├── supabase/
│   ├── schema.sql             # Run once in Supabase SQL Editor
│   └── functions/
│       ├── send-booking-confirmation/
│       ├── send-inquiry-notification/
│       ├── send-status-update/
│       └── create-razorpay-order/
├── .env.example
├── vite.config.ts
└── README.md
```

---

## Tech Stack

| | |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS v4 |
| Routing | React Router v6 with lazy-loaded code splitting |
| Backend | Supabase (PostgreSQL + Auth + Storage + Edge Functions / Deno) |
| WhatsApp | Twilio WhatsApp API |
| Email fallback | Resend (free tier: 3,000 emails/month) |
| Payments | Razorpay (INR, no setup fee) |
| Maps | Google Maps Embed API |
| Fonts | Fraunces + Inter via Google Fonts |
| Icons | lucide-react + custom inline SVG brand icons |
| Deployment | Vercel (recommended) |

Built with love for Capital Pet Clinic, Ranchi.
