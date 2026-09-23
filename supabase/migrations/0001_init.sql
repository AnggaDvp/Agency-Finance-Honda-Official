-- NSC Finance schema
-- DEMO-ready PostgreSQL for Supabase

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.user_id = auth.uid()
      and p.role in ('admin', 'supervisor')
  );
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users (id) on delete set null,
  full_name text not null,
  phone text not null,
  address text not null default '',
  city text not null default '',
  role text not null default 'customer' check (role in ('customer', 'admin', 'supervisor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.motorcycles (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  variant text not null default '',
  category text not null check (category in ('matic', 'cub', 'sport', 'ev')),
  year integer not null,
  otr_price numeric not null,
  description text not null default '',
  image_url text,
  stock integer not null default 0,
  status text not null default 'active' check (status in ('active', 'inactive')),
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.motorcycle_rates (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references public.motorcycles (id) on delete cascade,
  dp numeric not null,
  tenor integer not null,
  installment numeric not null,
  otr_price numeric not null,
  period text not null default '2026-Q3',
  area text not null default 'Nasional',
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bpkb_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vehicle_brands text[] not null default array['Honda', 'Yamaha', 'Kawasaki'],
  max_vehicle_age integer not null default 10,
  description text not null default '',
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bpkb_rates (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.bpkb_products (id) on delete cascade,
  scheme text not null default 'multiguna',
  disbursement_amount numeric not null,
  tenor integer not null,
  installment numeric not null,
  period text not null default '2026-Q3',
  area text not null default 'Nasional',
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.application_counters (
  prefix text not null,
  year integer not null,
  last_number integer not null default 0,
  primary key (prefix, year)
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  application_code text not null unique,
  customer_id uuid not null references public.profiles (id) on delete restrict,
  application_type text not null check (application_type in ('new_motorcycle', 'bpkb_financing')),
  motorcycle_id uuid references public.motorcycles (id) on delete set null,
  bpkb_product_id uuid references public.bpkb_products (id) on delete set null,
  vehicle_type text,
  vehicle_year integer,
  vehicle_plate text,
  requested_amount numeric,
  selected_dp numeric,
  selected_tenor integer,
  estimated_installment numeric,
  payment_method text check (payment_method in ('cash', 'credit')),
  status text not null default 'submitted' check (
    status in ('submitted', 'verification', 'follow_up', 'survey', 'processing', 'completed', 'cancelled')
  ),
  survey_number text,
  voucher_name text,
  source text not null default 'website',
  follow_up_status text not null default 'pending' check (follow_up_status in ('pending', 'in_progress', 'done')),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles (id) on delete set null,
  assigned_admin_id uuid references public.profiles (id) on delete set null,
  status text not null default 'open' check (status in ('open', 'closed')),
  mode text not null default 'bot' check (mode in ('bot', 'admin', 'waiting_admin')),
  guest_name text,
  guest_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_type text not null check (sender_type in ('customer', 'bot', 'admin')),
  sender_id uuid,
  message text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.chatbot_intents (
  id uuid primary key default gen_random_uuid(),
  intent_key text not null unique,
  category text not null,
  description text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_responses (
  id uuid primary key default gen_random_uuid(),
  intent_id uuid not null references public.chatbot_intents (id) on delete cascade,
  trigger_examples text[] not null default '{}',
  response_text text not null,
  priority integer not null default 100,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  admin_id uuid references public.profiles (id) on delete set null,
  note text not null,
  follow_up_date date not null,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type text not null,
  title text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Application code: NEW/26/000001 and M2W/26/000001
-- ---------------------------------------------------------------------------
create or replace function public.generate_application_code(p_type text)
returns text
language plpgsql
as $$
declare
  v_prefix text;
  v_year integer;
  v_next integer;
begin
  v_prefix := case when p_type = 'bpkb_financing' then 'M2W' else 'NEW' end;
  v_year := extract(year from now())::integer % 100;

  insert into public.application_counters (prefix, year, last_number)
  values (v_prefix, v_year, 1)
  on conflict (prefix, year)
  do update set last_number = public.application_counters.last_number + 1
  returning last_number into v_next;

  return v_prefix || '/' || lpad(v_year::text, 2, '0') || '/' || lpad(v_next::text, 6, '0');
end;
$$;

create or replace function public.set_application_code()
returns trigger
language plpgsql
as $$
begin
  if new.application_code is null or new.application_code = '' then
    new.application_code := public.generate_application_code(new.application_type);
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

create trigger motorcycles_updated_at before update on public.motorcycles
for each row execute function public.set_updated_at();

create trigger motorcycle_rates_updated_at before update on public.motorcycle_rates
for each row execute function public.set_updated_at();

create trigger bpkb_products_updated_at before update on public.bpkb_products
for each row execute function public.set_updated_at();

create trigger bpkb_rates_updated_at before update on public.bpkb_rates
for each row execute function public.set_updated_at();

create trigger applications_updated_at before update on public.applications
for each row execute function public.set_updated_at();

create trigger applications_set_code before insert on public.applications
for each row execute function public.set_application_code();

create trigger conversations_updated_at before update on public.conversations
for each row execute function public.set_updated_at();

create trigger chatbot_intents_updated_at before update on public.chatbot_intents
for each row execute function public.set_updated_at();

create trigger chatbot_responses_updated_at before update on public.chatbot_responses
for each row execute function public.set_updated_at();

create trigger follow_ups_updated_at before update on public.follow_ups
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists applications_customer_idx on public.applications (customer_id);
create index if not exists applications_status_idx on public.applications (status);
create index if not exists applications_created_idx on public.applications (created_at desc);
create index if not exists messages_conversation_idx on public.messages (conversation_id, created_at);
create index if not exists motorcycle_rates_lookup_idx on public.motorcycle_rates (motorcycle_id, dp, tenor, status);
create index if not exists bpkb_rates_lookup_idx on public.bpkb_rates (product_id, disbursement_amount, tenor, status);

-- ---------------------------------------------------------------------------
-- Row Level Security
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
alter table public.application_counters enable row level security;

-- profiles
create policy profiles_select_own on public.profiles
  for select using (user_id = auth.uid() or public.is_staff());
create policy profiles_update_own on public.profiles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid() and role = 'customer');
create policy profiles_staff_all on public.profiles
  for all using (public.is_staff()) with check (public.is_staff());

-- catalog (public read of active records)
create policy motorcycles_public_read on public.motorcycles
  for select using (status = 'active' or public.is_staff());
create policy motorcycles_staff_write on public.motorcycles
  for all using (public.is_staff()) with check (public.is_staff());

create policy motorcycle_rates_public_read on public.motorcycle_rates
  for select using (status = 'active' or public.is_staff());
create policy motorcycle_rates_staff_write on public.motorcycle_rates
  for all using (public.is_staff()) with check (public.is_staff());

create policy bpkb_products_public_read on public.bpkb_products
  for select using (status = 'active' or public.is_staff());
create policy bpkb_products_staff_write on public.bpkb_products
  for all using (public.is_staff()) with check (public.is_staff());

create policy bpkb_rates_public_read on public.bpkb_rates
  for select using (status = 'active' or public.is_staff());
create policy bpkb_rates_staff_write on public.bpkb_rates
  for all using (public.is_staff()) with check (public.is_staff());

-- applications
create policy applications_select_own on public.applications
  for select using (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
  );
create policy applications_insert_own on public.applications
  for insert with check (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
  );
create policy applications_staff_update on public.applications
  for update using (public.is_staff()) with check (public.is_staff());

-- conversations / messages
create policy conversations_select on public.conversations
  for select using (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
  );
create policy conversations_insert on public.conversations
  for insert with check (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
    or customer_id is null
  );
create policy conversations_staff_update on public.conversations
  for update using (public.is_staff()) with check (public.is_staff());

create policy messages_select on public.messages
  for select using (
    public.is_staff()
    or conversation_id in (
      select id from public.conversations
      where customer_id in (select id from public.profiles where user_id = auth.uid())
    )
  );
create policy messages_insert_customer on public.messages
  for insert with check (
    public.is_staff()
    or (
      sender_type = 'customer'
      and conversation_id in (
        select id from public.conversations
        where customer_id in (select id from public.profiles where user_id = auth.uid())
      )
    )
  );

-- knowledge base public read
create policy chatbot_intents_read on public.chatbot_intents
  for select using (active = true or public.is_staff());
create policy chatbot_intents_staff on public.chatbot_intents
  for all using (public.is_staff()) with check (public.is_staff());

create policy chatbot_responses_read on public.chatbot_responses
  for select using (active = true or public.is_staff());
create policy chatbot_responses_staff on public.chatbot_responses
  for all using (public.is_staff()) with check (public.is_staff());

create policy follow_ups_staff on public.follow_ups
  for all using (public.is_staff()) with check (public.is_staff());

create policy notifications_own on public.notifications
  for select using (user_id = auth.uid() or public.is_staff());
create policy notifications_staff_insert on public.notifications
  for insert with check (public.is_staff());
create policy notifications_own_update on public.notifications
  for update using (user_id = auth.uid() or public.is_staff());

create policy counters_staff on public.application_counters
  for all using (public.is_staff()) with check (public.is_staff());

-- Realtime
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
