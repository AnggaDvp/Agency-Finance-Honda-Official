-- ======================================================================
-- NSC Finance — FULL DATABASE INIT (0003_full_init.sql)
-- SINGLE EXECUTION MIGRATION — Cukup paste 1x ke SQL Editor → RUN.
-- Idempotent: Aman dijalankan BERKALI-KALI, tidak error jika sudah ada.
-- ======================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helper functions
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role in ('admin','supervisor')
  );
$$;

create or replace function public.touch_conversation_last_message()
returns trigger language plpgsql as $$
begin
  update public.conversations
     set last_message_at = now(), updated_at = now()
   where id = new.conversation_id;
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    'customer'
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- TABLES (SEMUA CREATE MENGGUNAKAN IF NOT EXISTS)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  phone text not null,
  address text not null default '',
  city text not null default '',
  wilayah text,
  kecamatan text,
  kelurahan text,
  kode_pos text,
  nama_jalan text,
  role text not null default 'customer' check (role in ('customer','admin','supervisor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.motorcycles (
  id uuid primary key default gen_random_uuid(),
  brand text not null, model text not null, variant text not null default '',
  category text not null check (category in ('matic','cub','sport','ev')),
  year integer not null, otr_price numeric not null,
  description text not null default '', image_url text,
  stock integer not null default 0,
  status text not null default 'active' check (status in ('active','inactive')),
  slug text not null unique,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.motorcycle_rates (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references public.motorcycles(id) on delete cascade,
  dp numeric not null, dp_amount numeric, dp_cukup_bayar numeric,
  tenor integer not null, tenor_months integer,
  installment numeric not null, installment_amount numeric,
  interest_rate numeric,
  otr_price numeric not null, period text not null default '2026-Q3',
  area text not null default 'Nasional',
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.bpkb_products (
  id uuid primary key default gen_random_uuid(),
  name text not null, description text not null default '',
  vehicle_brands text[] not null default '{}', max_vehicle_age integer not null default 10,
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.bpkb_rates (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.bpkb_products(id) on delete cascade,
  scheme text not null, disbursement_amount numeric not null,
  tenor integer not null, installment numeric not null,
  period text not null default '2026-Q3', area text not null default 'Nasional',
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.applications_counters (
  date date primary key, count integer not null default 0
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  application_code text unique not null,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  application_type text not null default 'new_motorcycle' check (application_type in ('new_motorcycle','bpkb_financing','BPKB_FINANCING')),
  motorcycle_id uuid references public.motorcycles(id) on delete set null,
  bpkb_product_id uuid references public.bpkb_products(id) on delete set null,
  vehicle_type text, vehicle_year integer, vehicle_plate text,
  requested_amount numeric, selected_dp numeric, selected_tenor numeric,
  estimated_installment numeric,
  payment_method text check (payment_method in ('cash','credit')),
  status text not null default 'submitted' check (status in ('submitted','verification','follow_up','survey','processing','completed','cancelled','PENGAJUAN_TERKIRIM','FOLLOW_UP','PROSES','SELESAI','DIBATALKAN')),
  survey_number text, voucher_name text, source text not null default 'website',
  follow_up_status text not null default 'pending' check (follow_up_status in ('pending','in_progress','done')),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete set null,
  application_id uuid references public.applications(id) on delete set null,
  assigned_admin_id uuid,
  status text not null default 'open' check (status in ('open','closed','BOT_ACTIVE','ADMIN_ACTIVE')),
  mode text not null default 'bot' check (mode in ('bot','admin','waiting_admin','BOT_ACTIVE','ADMIN_ACTIVE')),
  guest_name text, guest_phone text,
  last_message_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_type text not null check (sender_type in ('customer','bot','admin')),
  sender_id uuid,
  message text not null, metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.chatbot_intents (
  id uuid primary key default gen_random_uuid(),
  intent_key text unique not null, category text not null,
  description text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_responses (
  id uuid primary key default gen_random_uuid(),
  intent_id uuid not null references public.chatbot_intents(id) on delete cascade,
  trigger_examples text[] not null default '{}',
  response_text text not null, priority integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  scheduled_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending','in_progress','done')),
  notes text not null default '', result text, created_by uuid,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade,
  channel text not null check (channel in ('whatsapp','email','in_app')),
  recipient text not null,
  status text not null default 'pending' check (status in ('pending','sent','failed')),
  error_message text, payload jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- TRIGGERS updated_at
-- ---------------------------------------------------------------------------
do $$ begin
  drop trigger if exists trg_profiles_updated_at on public.profiles;
  create trigger trg_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
  drop trigger if exists trg_motorcycles_updated_at on public.motorcycles;
  create trigger trg_motorcycles_updated_at before update on public.motorcycles for each row execute function public.set_updated_at();
  drop trigger if exists trg_motorcycle_rates_updated_at on public.motorcycle_rates;
  create trigger trg_motorcycle_rates_updated_at before update on public.motorcycle_rates for each row execute function public.set_updated_at();
  drop trigger if exists trg_bpkb_products_updated_at on public.bpkb_products;
  create trigger trg_bpkb_products_updated_at before update on public.bpkb_products for each row execute function public.set_updated_at();
  drop trigger if exists trg_bpkb_rates_updated_at on public.bpkb_rates;
  create trigger trg_bpkb_rates_updated_at before update on public.bpkb_rates for each row execute function public.set_updated_at();
  drop trigger if exists trg_applications_updated_at on public.applications;
  create trigger trg_applications_updated_at before update on public.applications for each row execute function public.set_updated_at();
  drop trigger if exists trg_conversations_updated_at on public.conversations;
  create trigger trg_conversations_updated_at before update on public.conversations for each row execute function public.set_updated_at();
  drop trigger if exists trg_chatbot_intents_updated_at on public.chatbot_intents;
  create trigger trg_chatbot_intents_updated_at before update on public.chatbot_intents for each row execute function public.set_updated_at();
  drop trigger if exists trg_chatbot_responses_updated_at on public.chatbot_responses;
  create trigger trg_chatbot_responses_updated_at before update on public.chatbot_responses for each row execute function public.set_updated_at();
  drop trigger if exists trg_follow_ups_updated_at on public.follow_ups;
  create trigger trg_follow_ups_updated_at before update on public.follow_ups for each row execute function public.set_updated_at();
  drop trigger if exists trg_messages_touch_convo on public.messages;
  create trigger trg_messages_touch_convo after insert on public.messages for each row execute function public.touch_conversation_last_message();
  drop trigger if exists on_auth_user_created on auth.users;
  create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
end $$;

-- ---------------------------------------------------------------------------
-- RLS ENABLE + POLICIES (DROP IF EXISTS + CREATE ULANG — IDEMPOTENT)
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.motorcycles enable row level security;
alter table public.motorcycle_rates enable row level security;
alter table public.bpkb_products enable row level security;
alter table public.bpkb_rates enable row level security;
alter table public.applications enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.chatbot_intents enable row level security;
alter table public.chatbot_responses enable row level security;
alter table public.follow_ups enable row level security;
alter table public.notifications enable row level security;
alter table public.applications_counters enable row level security;

do $$ begin
  drop policy if exists "profiles_staff_all" on public.profiles;
  create policy "profiles_staff_all" on public.profiles for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "motorcycles_staff_all" on public.motorcycles;
  create policy "motorcycles_staff_all" on public.motorcycles for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "motorcycle_rates_staff_all" on public.motorcycle_rates;
  create policy "motorcycle_rates_staff_all" on public.motorcycle_rates for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "bpkb_products_staff_all" on public.bpkb_products;
  create policy "bpkb_products_staff_all" on public.bpkb_products for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "bpkb_rates_staff_all" on public.bpkb_rates;
  create policy "bpkb_rates_staff_all" on public.bpkb_rates for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "applications_staff_all" on public.applications;
  create policy "applications_staff_all" on public.applications for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "conversations_staff_all" on public.conversations;
  create policy "conversations_staff_all" on public.conversations for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "messages_staff_all" on public.messages;
  create policy "messages_staff_all" on public.messages for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "chatbot_intents_staff_all" on public.chatbot_intents;
  create policy "chatbot_intents_staff_all" on public.chatbot_intents for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "chatbot_responses_staff_all" on public.chatbot_responses;
  create policy "chatbot_responses_staff_all" on public.chatbot_responses for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "follow_ups_staff_all" on public.follow_ups;
  create policy "follow_ups_staff_all" on public.follow_ups for all using (public.is_staff()) with check (public.is_staff());
  drop policy if exists "notifications_staff_all" on public.notifications;
  create policy "notifications_staff_all" on public.notifications for all using (public.is_staff()) with check (public.is_staff());

  -- Public read policies
  drop policy if exists "public_read_motorcycles" on public.motorcycles;
  create policy "public_read_motorcycles" on public.motorcycles for select using (true);
  drop policy if exists "public_read_motorcycle_rates" on public.motorcycle_rates;
  create policy "public_read_motorcycle_rates" on public.motorcycle_rates for select using (true);
  drop policy if exists "public_read_bpkb_products" on public.bpkb_products;
  create policy "public_read_bpkb_products" on public.bpkb_products for select using (true);
  drop policy if exists "public_read_bpkb_rates" on public.bpkb_rates;
  create policy "public_read_bpkb_rates" on public.bpkb_rates for select using (true);
  drop policy if exists "public_read_chatbot_intents" on public.chatbot_intents;
  create policy "public_read_chatbot_intents" on public.chatbot_intents for select using (true);
  drop policy if exists "public_read_chatbot_responses" on public.chatbot_responses;
  create policy "public_read_chatbot_responses" on public.chatbot_responses for select using (true);

  -- Customer self policies
  drop policy if exists "customer_self_profile" on public.profiles;
  create policy "customer_self_profile" on public.profiles for insert with check (role = 'customer');
  drop policy if exists "customer_self_applications" on public.applications;
  create policy "customer_self_applications" on public.applications for insert with check (true);
  drop policy if exists "customer_self_conversations" on public.conversations;
  create policy "customer_self_conversations" on public.conversations for insert with check (true);
  drop policy if exists "customer_self_messages" on public.messages;
  create policy "customer_self_messages" on public.messages for insert with check (true);
end $$;

-- ---------------------------------------------------------------------------
-- INDEXES (IF NOT EXISTS)
-- ---------------------------------------------------------------------------
create index if not exists idx_profiles_phone on public.profiles(phone);
create index if not exists idx_applications_customer_status on public.applications(customer_id, status);
create index if not exists idx_applications_created_at on public.applications(created_at desc);
create index if not exists idx_motorcycle_rates_motorcycle on public.motorcycle_rates(motorcycle_id);
create index if not exists idx_messages_conversation_created on public.messages(conversation_id, created_at asc);
create index if not exists idx_conversations_guest_phone on public.conversations(guest_phone);
create index if not exists idx_conversations_last_message on public.conversations(last_message_at desc);
create index if not exists idx_follow_ups_app_date on public.follow_ups(application_id, scheduled_at);

-- ---------------------------------------------------------------------------
-- REALTIME PUBLICATION
-- ---------------------------------------------------------------------------
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime for table public.messages, public.conversations;
commit;

-- ---------------------------------------------------------------------------
-- SEED DATA — DEMO DATA (10 customer + 1 admin placeholder + 10 motor + rates)
-- (on conflict do nothing = IDEMPOTEN, tidak ganda jika sudah ada)
-- ---------------------------------------------------------------------------
insert into public.profiles (id, full_name, phone, address, city, role) values
  ('11111111-1111-1111-1111-111111111001', 'Rani Wahyuni', '081200000001', 'Jl. Melati No. 12', 'Jakarta Timur', 'customer'),
  ('11111111-1111-1111-1111-111111111002', 'Budi Pratama',    '081200000002', 'Jl. Kenanga No. 8', 'Bandung',        'customer'),
  ('11111111-1111-1111-1111-111111111003', 'Sinta Dewi',      '081200000003', 'Jl. Mawar No. 21',  'Surabaya',       'customer'),
  ('11111111-1111-1111-1111-111111111004', 'Andi Saputra',    '081200000004', 'Jl. Anggrek No. 5', 'Bekasi',         'customer'),
  ('11111111-1111-1111-1111-111111111005', 'Maya Lestari',    '081200000005', 'Jl. Flamboyan No. 3','Depok',          'customer'),
  ('11111111-1111-1111-1111-111111111006', 'Dedi Kurniawan',  '081200000006', 'Jl. Dahlia No. 17', 'Tangerang',      'customer'),
  ('11111111-1111-1111-1111-111111111007', 'Fitri Anjani',    '081200000007', 'Jl. Cempaka No. 9', 'Semarang',       'customer'),
  ('11111111-1111-1111-1111-111111111008', 'Hendra Wijaya',   '081200000008', 'Jl. Teratai No. 4', 'Medan',          'customer'),
  ('11111111-1111-1111-1111-111111111009', 'Lina Kusuma',     '081200000009', 'Jl. Sakura No. 11', 'Yogyakarta',     'customer'),
  ('11111111-1111-1111-1111-111111111010', 'Rizky Maulana',   '081200000010', 'Jl. Lotus No. 6',   'Malang',         'customer'),
  ('11111111-1111-1111-1111-111111111099', 'Admin NSC Finance','081299999999','Kantor NSC',        'Jakarta',        'admin')
on conflict (id) do nothing;

insert into public.motorcycles (id, brand, model, variant, category, year, otr_price, description, stock, status, slug) values
  ('22222222-2222-2222-2222-222222222001', 'Honda', 'PCX 160',       'ABS',       'matic', 2025, 32670000, 'Skuter premium 160cc. DEMO DATA.', 8, 'active', 'honda-pcx-160'),
  ('22222222-2222-2222-2222-222222222002', 'Honda', 'ADV 160',       'ABS',       'matic', 2025, 36200000, 'Adventure scooter. DEMO DATA.',     5, 'active', 'honda-adv-160'),
  ('22222222-2222-2222-2222-222222222003', 'Honda', 'Vario 160',     'CBS',       'matic', 2025, 27350000, 'Matic harian 160cc. DEMO DATA.',   12, 'active', 'honda-vario-160'),
  ('22222222-2222-2222-2222-222222222004', 'Honda', 'Beat',          'Deluxe',    'matic', 2025, 18500000, 'Matic entry. DEMO DATA.',           20, 'active', 'honda-beat'),
  ('22222222-2222-2222-2222-222222222005', 'Honda', 'Scoopy',        'Prestige',  'matic', 2025, 22500000, 'Stylish scooter. DEMO DATA.',       10, 'active', 'honda-scoopy'),
  ('22222222-2222-2222-2222-222222222006', 'Yamaha','NMAX',          'Connected', 'matic', 2025, 31800000, 'Skuter Yamaha. DEMO DATA.',          7, 'active', 'yamaha-nmax'),
  ('22222222-2222-2222-2222-222222222007', 'Yamaha','Aerox',         'S',         'matic', 2025, 28900000, 'Sporty matic. DEMO DATA.',          6, 'active', 'yamaha-aerox'),
  ('22222222-2222-2222-2222-222222222008', 'Honda', 'Supra X 125',   'FI',        'cub',   2025, 19900000, 'Bebek 125cc. DEMO DATA.',           9, 'active', 'honda-supra-x-125'),
  ('22222222-2222-2222-2222-222222222009', 'Honda', 'CBR 150R',      'ABS',       'sport', 2025, 38500000, 'Sport 150cc. DEMO DATA.',           4, 'active', 'honda-cbr-150r'),
  ('22222222-2222-2222-2222-222222222010', 'Honda', 'EM1 e',         'Standard',  'ev',    2025, 24500000, 'Motor listrik. DEMO DATA.',         3, 'active', 'honda-em1-e')
on conflict (id) do nothing;

insert into public.motorcycle_rates (motorcycle_id, dp, tenor, installment, otr_price, period, area) values
  ('22222222-2222-2222-2222-222222222001', 3000000, 12, 2850000, 32670000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222001', 3000000, 24, 1550000, 32670000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222001', 3000000, 35, 1185000, 32670000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222001', 3200000, 36, 1285000, 32670000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222002', 3500000, 24, 1720000, 36200000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222002', 3500000, 36, 1420000, 36200000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222003', 2500000, 24, 1380000, 27350000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222003', 2500000, 36, 1075000, 27350000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222004', 1500000, 24, 920000, 18500000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222004', 1500000, 36, 710000, 18500000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222005', 2000000, 36, 850000, 22500000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222006', 3000000, 36, 1210000, 31800000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222007', 2800000, 36, 1100000, 28900000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222008', 1800000, 36, 760000, 19900000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222009', 4000000, 36, 1490000, 38500000, '2026-Q3', 'Nasional'),
  ('22222222-2222-2222-2222-222222222010', 2500000, 36, 930000, 24500000, '2026-Q3', 'Nasional');

insert into public.bpkb_products (id, name, description, vehicle_brands, max_vehicle_age, status) values
  ('bpkb-001', 'Dana Tunai BPKB Honda',  'Pencairan dana cepat dengan jaminan BPKB motor Honda.',   ARRAY['Honda'],  8, 'active'),
  ('bpkb-002', 'Dana Tunai BPKB Semua Brand', 'Pencairan dana dengan jaminan BPKB semua merek motor.',ARRAY['Honda','Yamaha','Suzuki','Kawasaki','Lainnya'], 10, 'active')
on conflict (id) do nothing;

insert into public.bpkb_rates (product_id, scheme, disbursement_amount, tenor, installment, period, area) values
  ('bpkb-001', 'Cepat Cair 12',  5000000,  12, 525000,  '2026-Q3', 'Nasional'),
  ('bpkb-001', 'Cepat Cair 24',  10000000, 24, 505000,  '2026-Q3', 'Nasional'),
  ('bpkb-001', 'Cepat Cair 36',  15000000, 36, 485000,  '2026-Q3', 'Nasional'),
  ('bpkb-002', 'Plafon Maksimal 24', 20000000, 24, 980000,'2026-Q3', 'Nasional'),
  ('bpkb-002', 'Plafon Maksimal 36', 25000000, 36, 820000,'2026-Q3', 'Nasional');

-- ======================================================================
-- DONE! — Tampilkan ringkasan
-- ======================================================================
select
  '✅ 0003_full_init.sql SUKSES!' as status,
  (select count(*) from public.profiles)     as total_profiles,
  (select count(*) from public.motorcycles)  as total_motorcycles,
  (select count(*) from public.motorcycle_rates) as total_rates,
  (select count(*) from public.bpkb_products)   as total_bpkb_products,
  (select count(*) from public.applications)    as total_applications;
