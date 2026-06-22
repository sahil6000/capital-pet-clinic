-- ============================================================
-- Capital Pet Clinic — Supabase Schema
-- Run this in the Supabase SQL editor (Project > SQL Editor)
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── 1. clinic_settings ───────────────────────────────────────
create table if not exists public.clinic_settings (
  id                 text primary key default 'default',
  clinic_name        text not null default 'Capital Pet Clinic',
  tagline            text not null default 'Compassionate Care For Your Best Friends',
  address            text,
  phone              text,
  whatsapp_number    text,
  email              text,
  maps_link          text,
  maps_embed_src     text,
  hours_weekday      text default 'Mon – Sat: 9:00 AM – 8:00 PM',
  hours_sunday       text default 'Sunday: 10:00 AM – 4:00 PM',
  logo_url           text,
  instagram_url      text,
  facebook_url       text,
  youtube_url        text,
  payments_enabled   boolean default true,
  updated_at         timestamptz default now()
);

-- ── 2. doctors ───────────────────────────────────────────────
create table if not exists public.doctors (
  id                 uuid primary key default uuid_generate_v4(),
  full_name          text not null,
  qualification      text,
  years_experience   integer default 0,
  specializations    text[] default '{}',
  photo_url          text,
  bio                text,
  is_published       boolean default true,
  sort_order         integer default 0,
  created_at         timestamptz default now()
);

-- ── 3. services ──────────────────────────────────────────────
create table if not exists public.services (
  id                 uuid primary key default uuid_generate_v4(),
  name               text not null,
  description        text,
  icon               text default 'Stethoscope',
  price_label        text,
  is_published       boolean default true,
  sort_order         integer default 0,
  created_at         timestamptz default now()
);

-- ── 4. appointment_slots ─────────────────────────────────────
create table if not exists public.appointment_slots (
  id                 uuid primary key default uuid_generate_v4(),
  slot_date          date not null,
  slot_time          time not null,
  is_blocked         boolean default false,
  block_reason       text,
  created_at         timestamptz default now(),
  unique(slot_date, slot_time)
);

-- ── 5. appointments ──────────────────────────────────────────
create type public.appointment_status as enum (
  'pending', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'no_show'
);

create table if not exists public.appointments (
  id                 uuid primary key default uuid_generate_v4(),
  owner_name         text not null,
  phone              text not null,
  whatsapp_number    text,
  email              text,
  pet_name           text,
  pet_type           text,
  service_id         uuid references public.services(id) on delete set null,
  preferred_date     date not null,
  preferred_time     time not null,
  message            text,
  status             public.appointment_status default 'pending',
  payment_status     text default 'unpaid',
  payment_id         text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

create index if not exists idx_appointments_date on public.appointments(preferred_date);
create index if not exists idx_appointments_status on public.appointments(status);

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists appointments_updated_at on public.appointments;
create trigger appointments_updated_at
  before update on public.appointments
  for each row execute function public.update_updated_at();

-- ── 6. inquiries ─────────────────────────────────────────────
create type public.inquiry_status as enum ('new', 'responded', 'closed');

create table if not exists public.inquiries (
  id                 uuid primary key default uuid_generate_v4(),
  full_name          text not null,
  phone              text not null,
  message            text not null,
  status             public.inquiry_status default 'new',
  created_at         timestamptz default now()
);

-- ── 7. testimonials ──────────────────────────────────────────
create table if not exists public.testimonials (
  id                 uuid primary key default uuid_generate_v4(),
  owner_name         text not null,
  pet_name           text,
  rating             integer check (rating between 1 and 5) default 5,
  message            text not null,
  photo_url          text,
  is_featured        boolean default false,
  created_at         timestamptz default now()
);

-- ── 8. gallery_images ────────────────────────────────────────
create type public.gallery_category as enum ('clinic', 'team', 'treatments', 'happy_pets');

create table if not exists public.gallery_images (
  id                 uuid primary key default uuid_generate_v4(),
  url                text not null,
  category           public.gallery_category default 'clinic',
  caption            text,
  sort_order         integer default 0,
  created_at         timestamptz default now()
);

-- ── 9. blog_posts ────────────────────────────────────────────
create table if not exists public.blog_posts (
  id                 uuid primary key default uuid_generate_v4(),
  slug               text unique not null,
  title              text not null,
  excerpt            text,
  content            text,
  cover_image_url    text,
  is_published       boolean default false,
  published_at       timestamptz,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.update_updated_at();

-- ── 10. social_links ─────────────────────────────────────────
create table if not exists public.social_links (
  id                 uuid primary key default uuid_generate_v4(),
  platform           text not null,
  url                text not null,
  is_active          boolean default true
);

-- ── 11. notification_logs ────────────────────────────────────
create type public.notification_channel as enum ('whatsapp', 'email');
create type public.notification_status  as enum ('sent', 'failed', 'pending');

create table if not exists public.notification_logs (
  id                 uuid primary key default uuid_generate_v4(),
  channel            public.notification_channel not null,
  recipient          text not null,
  template           text not null,
  payload            jsonb,
  status             public.notification_status default 'pending',
  error_message      text,
  created_at         timestamptz default now()
);

-- ── 12. payment_records ──────────────────────────────────────
create table if not exists public.payment_records (
  id                 uuid primary key default uuid_generate_v4(),
  appointment_id     uuid references public.appointments(id) on delete cascade,
  gateway            text default 'razorpay',
  gateway_order_id   text,
  gateway_payment_id text,
  amount_paise       integer not null,
  currency           text default 'INR',
  status             text default 'created',
  raw_response       jsonb,
  created_at         timestamptz default now()
);

-- ── 13. admins (metadata, linked to Supabase Auth users) ─────
create table if not exists public.admins (
  id                 uuid primary key references auth.users(id) on delete cascade,
  full_name          text,
  role               text default 'admin',
  created_at         timestamptz default now()
);

-- ══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ══════════════════════════════════════════════════════════════

alter table public.clinic_settings    enable row level security;
alter table public.doctors            enable row level security;
alter table public.services           enable row level security;
alter table public.appointment_slots  enable row level security;
alter table public.appointments       enable row level security;
alter table public.inquiries          enable row level security;
alter table public.testimonials       enable row level security;
alter table public.gallery_images     enable row level security;
alter table public.blog_posts         enable row level security;
alter table public.social_links       enable row level security;
alter table public.notification_logs  enable row level security;
alter table public.payment_records    enable row level security;
alter table public.admins             enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.admins where id = auth.uid()
  );
$$;

-- ── Public READ policies ─────────────────────────────────────
create policy "public read clinic_settings"    on public.clinic_settings    for select using (true);
create policy "public read doctors"            on public.doctors            for select using (is_published = true);
create policy "public read services"           on public.services           for select using (is_published = true);
create policy "public read testimonials"       on public.testimonials       for select using (true);
create policy "public read gallery_images"     on public.gallery_images     for select using (true);
create policy "public read blog_posts"         on public.blog_posts         for select using (is_published = true);
create policy "public read appointment_slots"  on public.appointment_slots  for select using (true);

-- ── Public INSERT policies (booking / inquiry) ───────────────
create policy "public insert appointments"     on public.appointments       for insert with check (true);
create policy "public insert inquiries"        on public.inquiries          for insert with check (true);

-- ── Admin ALL policies ───────────────────────────────────────
create policy "admin all clinic_settings"    on public.clinic_settings    for all using (public.is_admin());
create policy "admin all doctors"            on public.doctors            for all using (public.is_admin());
create policy "admin all services"           on public.services           for all using (public.is_admin());
create policy "admin all appointment_slots"  on public.appointment_slots  for all using (public.is_admin());
create policy "admin all appointments"       on public.appointments       for all using (public.is_admin());
create policy "admin all inquiries"          on public.inquiries          for all using (public.is_admin());
create policy "admin all testimonials"       on public.testimonials       for all using (public.is_admin());
create policy "admin all gallery_images"     on public.gallery_images     for all using (public.is_admin());
create policy "admin all blog_posts"         on public.blog_posts         for all using (public.is_admin());
create policy "admin all social_links"       on public.social_links       for all using (public.is_admin());
create policy "admin all notification_logs"  on public.notification_logs  for all using (public.is_admin());
create policy "admin all payment_records"    on public.payment_records    for all using (public.is_admin());
create policy "admin all admins"             on public.admins             for all using (public.is_admin());

-- ── Service-role bypass (for edge functions) ─────────────────
-- Edge functions use the service role key, which bypasses RLS automatically.

-- ══════════════════════════════════════════════════════════════
-- SEED DATA  (idempotent — safe to re-run)
-- ══════════════════════════════════════════════════════════════

insert into public.clinic_settings (id, clinic_name, tagline, address, phone, whatsapp_number, email,
  maps_link, hours_weekday, hours_sunday, instagram_url, facebook_url, youtube_url, payments_enabled)
values ('default', 'Capital Pet Clinic', 'Compassionate Care For Your Best Friends',
  'Old Argora Road, Near Bali Bagicha, Harmu, Ranchi, Jharkhand - 834002',
  '+91 97981 72415', '+91 97981 72415', 'hello@capitalpetclinic.in',
  'https://maps.app.goo.gl/capitalpetclinicranchi',
  'Mon – Sat: 9:00 AM – 8:00 PM', 'Sunday: 10:00 AM – 4:00 PM',
  'https://instagram.com/capitalpetclinic',
  'https://facebook.com/capitalpetclinic',
  'https://youtube.com/@capitalpetclinic',
  true)
on conflict (id) do nothing;

insert into public.doctors (full_name, qualification, years_experience, specializations, is_published, sort_order) values
  ('Dr. Vivek Kr. Gupta', 'BVSc & AH', 10, array['Surgery','Internal Medicine','Emergency Care'], true, 1),
  ('Dr. Ankit R. Bara', 'BVSc & AH, MVSc (Surgery)', 7, array['Dermatology','Vaccination','Diagnostics'], true, 2)
on conflict do nothing;

insert into public.services (name, description, icon, price_label, is_published, sort_order) values
  ('General Consultation','Thorough wellness checks and expert guidance for everyday pet health concerns.','Stethoscope','From ₹300',true,1),
  ('Vaccination','Complete core and lifestyle vaccination schedules to keep your pet protected.','Syringe','From ₹400',true,2),
  ('Surgery','Safe, modern surgical procedures performed with advanced equipment and monitoring.','Scissors','On consultation',true,3),
  ('Grooming','Bathing, trimming, and hygiene care to keep your pet clean, comfortable and happy.','Sparkles','From ₹500',true,4),
  ('Pet Boarding','Safe, supervised short and long-term boarding while you''re away from home.','Home','From ₹600/day',true,5),
  ('Emergency Care','24/7 emergency support for accidents, sudden illness, and urgent conditions.','Siren','Call for priority',true,6),
  ('Diagnostics','In-house lab testing, imaging and screening for faster, more accurate diagnosis.','Microscope','From ₹350',true,7),
  ('Pet Accessories','A curated range of food, collars, and care essentials for your pet.','ShoppingBag','Varies',true,8)
on conflict do nothing;

insert into public.testimonials (owner_name, pet_name, rating, message, is_featured) values
  ('Neha Sinha','Bruno',5,'Excellent care and staff. Dr. Vivek is very cooperative and explained everything clearly. Highly recommended!',true),
  ('Rohit Kumar','Misha',5,'Booked an appointment on WhatsApp in seconds and got a reminder the day before. Smooth experience end to end.',true),
  ('Pooja Verma','Leo',4,'Clean facility, friendly doctors, and they genuinely care about the animals. Our go-to clinic in Ranchi now.',true)
on conflict do nothing;

insert into public.blog_posts (slug, title, excerpt, is_published, published_at) values
  ('summer-care-tips-for-pets','Summer Care Tips for Pets','Simple steps to keep your pet cool, hydrated and safe as temperatures rise this season.',true,'2026-05-10'),
  ('importance-of-vaccination','Importance of Vaccination','Why staying on schedule with core vaccines is one of the best things you can do for your pet.',true,'2026-05-05'),
  ('signs-of-illness-in-pets','Signs of Illness in Pets','Subtle behavior changes that may signal it''s time for a vet visit, before things get serious.',true,'2026-04-28')
on conflict (slug) do nothing;

-- ══════════════════════════════════════════════════════════════
-- STORAGE BUCKETS (run separately or in Supabase dashboard)
-- ══════════════════════════════════════════════════════════════
-- insert into storage.buckets (id, name, public) values ('clinic-assets', 'clinic-assets', true) on conflict do nothing;
-- insert into storage.buckets (id, name, public) values ('doctor-photos', 'doctor-photos', true) on conflict do nothing;
-- insert into storage.buckets (id, name, public) values ('gallery',       'gallery',       true) on conflict do nothing;
-- insert into storage.buckets (id, name, public) values ('blog-covers',   'blog-covers',   true) on conflict do nothing;
-- Policies: allow public SELECT on all four, admin INSERT/UPDATE/DELETE only.
