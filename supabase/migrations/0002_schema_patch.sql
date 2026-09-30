-- NSC Finance Schema Patch 0002
-- Perbaikan kolom dan table yang kurang dari 0001_init.sql
-- Dijalankan di SQL Editor Supabase (project: hrkkpdbbfelnzpmazqcb)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. Tabel profiles: tambah kolom alamat 7-field (backward compatible)
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists wilayah text null,
  add column if not exists kecamatan text null,
  add column if not exists kelurahan text null,
  add column if not exists kode_pos text null,
  add column if not exists nama_jalan text null;

-- Pastikan kolom lama tetap ada (default empty string utk backward compat)
alter table public.profiles
  alter column address set default '',
  alter column city set default '';

-- ---------------------------------------------------------------------------
-- 2. Tabel motorcycle_rates: tambah field alias bisnis (nullable)
-- ---------------------------------------------------------------------------
alter table public.motorcycle_rates
  add column if not exists dp_amount numeric null,
  add column if not exists dp_cukup_bayar numeric null,
  add column if not exists tenor_months integer null,
  add column if not exists installment_amount numeric null;

-- ---------------------------------------------------------------------------
-- 3. Tabel applications: tambah status enum workflow bisnis (PENGAJUAN_TERKIRIM dst)
--    & application_type BPKB_FINANCING uppercase
-- ---------------------------------------------------------------------------
alter table public.applications
  drop constraint if exists applications_status_check;

alter table public.applications
  add constraint applications_status_check check (
    status in (
      'submitted','verification','follow_up','survey','processing','completed','cancelled',
      'PENGAJUAN_TERKIRIM','FOLLOW_UP','PROSES','SELESAI','DIBATALKAN'
    )
  );

alter table public.applications
  drop constraint if exists applications_application_type_check;

alter table public.applications
  add constraint applications_application_type_check check (
    application_type in ('new_motorcycle','bpkb_financing','BPKB_FINANCING')
  );

-- ---------------------------------------------------------------------------
-- 4. Tabel conversations: tambah kolom application_id, last_message_at
--    & tambah enum status/mode workflow BOT_ACTIVE / ADMIN_ACTIVE
-- ---------------------------------------------------------------------------
alter table public.conversations
  add column if not exists application_id uuid null references public.applications (id) on delete set null,
  add column if not exists last_message_at timestamptz null;

alter table public.conversations
  drop constraint if exists conversations_status_check;

alter table public.conversations
  add constraint conversations_status_check check (
    status in ('open','closed','BOT_ACTIVE','ADMIN_ACTIVE')
  );

alter table public.conversations
  drop constraint if exists conversations_mode_check;

alter table public.conversations
  add constraint conversations_mode_check check (
    mode in ('bot','admin','waiting_admin','BOT_ACTIVE','ADMIN_ACTIVE')
  );

-- ---------------------------------------------------------------------------
-- 5. Index tambahan
-- ---------------------------------------------------------------------------
create index if not exists idx_profiles_phone on public.profiles (phone);
create index if not exists idx_conversations_customer_phone on public.conversations (guest_phone);
create index if not exists idx_conversations_last_message on public.conversations (last_message_at desc);
create index if not exists idx_follow_ups_application on public.follow_ups (application_id, follow_up_date desc);

-- ---------------------------------------------------------------------------
-- 6. Trigger updated_at (re-apply jika hilang)
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists motorcycles_updated_at on public.motorcycles;
create trigger motorcycles_updated_at before update on public.motorcycles
  for each row execute function public.set_updated_at();

drop trigger if exists motorcycle_rates_updated_at on public.motorcycle_rates;
create trigger motorcycle_rates_updated_at before update on public.motorcycle_rates
  for each row execute function public.set_updated_at();

drop trigger if exists bpkb_products_updated_at on public.bpkb_products;
create trigger bpkb_products_updated_at before update on public.bpkb_products
  for each row execute function public.set_updated_at();

drop trigger if exists bpkb_rates_updated_at on public.bpkb_rates;
create trigger bpkb_rates_updated_at before update on public.bpkb_rates
  for each row execute function public.set_updated_at();

drop trigger if exists applications_updated_at on public.applications;
create trigger applications_updated_at before update on public.applications
  for each row execute function public.set_updated_at();

drop trigger if exists conversations_updated_at on public.conversations;
create trigger conversations_updated_at before update on public.conversations
  for each row execute function public.set_updated_at();

drop trigger if exists chatbot_intents_updated_at on public.chatbot_intents;
create trigger chatbot_intents_updated_at before update on public.chatbot_intents
  for each row execute function public.set_updated_at();

drop trigger if exists chatbot_responses_updated_at on public.chatbot_responses;
create trigger chatbot_responses_updated_at before update on public.chatbot_responses
  for each row execute function public.set_updated_at();

drop trigger if exists follow_ups_updated_at on public.follow_ups;
create trigger follow_ups_updated_at before update on public.follow_ups
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 7. Trigger handle_new_user + auto-profile
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  )
  on conflict (user_id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 8. Helper is_staff()
-- ---------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid()
      and p.role in ('admin','supervisor')
  );
$$;

-- ---------------------------------------------------------------------------
-- 9. Function generate_application_code + trigger set_application_code
-- ---------------------------------------------------------------------------
create or replace function public.generate_application_code(p_type text)
returns text language plpgsql as $$
declare
  v_prefix text;
  v_year integer;
  v_next integer;
begin
  v_prefix := case when p_type = 'bpkb_financing' or p_type = 'BPKB_FINANCING' then 'M2W' else 'NEW' end;
  v_year := extract(year from now())::integer % 100;

  insert into public.application_counters (prefix, year, last_number)
  values (v_prefix, v_year, 1)
  on conflict (prefix, year)
  do update set last_number = public.application_counters.last_number + 1
  returning last_number into v_next;

  return v_prefix || '/' || lpad(v_year::text, 2, '0') || '/' || lpad(v_next::text, 6, '0');
end; $$;

create or replace function public.set_application_code()
returns trigger language plpgsql as $$
begin
  if new.application_code is null or new.application_code = '' then
    new.application_code := public.generate_application_code(new.application_type);
  end if;
  return new;
end; $$;

drop trigger if exists applications_set_code on public.applications;
create trigger applications_set_code before insert on public.applications
  for each row execute function public.set_application_code();

-- ---------------------------------------------------------------------------
-- 10. Trigger last_message_at untuk conversations
-- ---------------------------------------------------------------------------
create or replace function public.touch_conversation_last_message()
returns trigger language plpgsql as $$
begin
  update public.conversations
     set last_message_at = now(),
         updated_at = now()
   where id = new.conversation_id;
  return new;
end; $$;

drop trigger if exists messages_touch_convo on public.messages;
create trigger messages_touch_convo after insert on public.messages
  for each row execute function public.touch_conversation_last_message();

-- ---------------------------------------------------------------------------
-- 11. Row Level Security policies (re-apply, idempotent)
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
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (user_id = auth.uid() or public.is_staff());

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid() and role = 'customer');

drop policy if exists profiles_staff_all on public.profiles;
create policy profiles_staff_all on public.profiles
  for all using (public.is_staff()) with check (public.is_staff());

-- motorcycles
drop policy if exists motorcycles_public_read on public.motorcycles;
create policy motorcycles_public_read on public.motorcycles
  for select using (status = 'active' or public.is_staff());

drop policy if exists motorcycles_staff_write on public.motorcycles;
create policy motorcycles_staff_write on public.motorcycles
  for all using (public.is_staff()) with check (public.is_staff());

-- motorcycle_rates
drop policy if exists motorcycle_rates_public_read on public.motorcycle_rates;
create policy motorcycle_rates_public_read on public.motorcycle_rates
  for select using (status = 'active' or public.is_staff());

drop policy if exists motorcycle_rates_staff_write on public.motorcycle_rates;
create policy motorcycle_rates_staff_write on public.motorcycle_rates
  for all using (public.is_staff()) with check (public.is_staff());

-- bpkb_products
drop policy if exists bpkb_products_public_read on public.bpkb_products;
create policy bpkb_products_public_read on public.bpkb_products
  for select using (status = 'active' or public.is_staff());

drop policy if exists bpkb_products_staff_write on public.bpkb_products;
create policy bpkb_products_staff_write on public.bpkb_products
  for all using (public.is_staff()) with check (public.is_staff());

-- bpkb_rates
drop policy if exists bpkb_rates_public_read on public.bpkb_rates;
create policy bpkb_rates_public_read on public.bpkb_rates
  for select using (status = 'active' or public.is_staff());

drop policy if exists bpkb_rates_staff_write on public.bpkb_rates;
create policy bpkb_rates_staff_write on public.bpkb_rates
  for all using (public.is_staff()) with check (public.is_staff());

-- applications
drop policy if exists applications_select_own on public.applications;
create policy applications_select_own on public.applications
  for select using (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists applications_insert_own on public.applications;
create policy applications_insert_own on public.applications
  for insert with check (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists applications_staff_update on public.applications;
create policy applications_staff_update on public.applications
  for update using (public.is_staff()) with check (public.is_staff());

-- conversations
drop policy if exists conversations_select on public.conversations;
create policy conversations_select on public.conversations
  for select using (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists conversations_insert on public.conversations;
create policy conversations_insert on public.conversations
  for insert with check (
    public.is_staff()
    or customer_id in (select id from public.profiles where user_id = auth.uid())
    or customer_id is null
  );

drop policy if exists conversations_staff_update on public.conversations;
create policy conversations_staff_update on public.conversations
  for update using (public.is_staff()) with check (public.is_staff());

-- messages
drop policy if exists messages_select on public.messages;
create policy messages_select on public.messages
  for select using (
    public.is_staff()
    or conversation_id in (
      select id from public.conversations
       where customer_id in (select id from public.profiles where user_id = auth.uid())
    )
  );

drop policy if exists messages_insert_customer on public.messages;
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

-- chatbot
drop policy if exists chatbot_intents_read on public.chatbot_intents;
create policy chatbot_intents_read on public.chatbot_intents
  for select using (active = true or public.is_staff());

drop policy if exists chatbot_intents_staff on public.chatbot_intents;
create policy chatbot_intents_staff on public.chatbot_intents
  for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists chatbot_responses_read on public.chatbot_responses;
create policy chatbot_responses_read on public.chatbot_responses
  for select using (active = true or public.is_staff());

drop policy if exists chatbot_responses_staff on public.chatbot_responses;
create policy chatbot_responses_staff on public.chatbot_responses
  for all using (public.is_staff()) with check (public.is_staff());

-- follow_ups
drop policy if exists follow_ups_staff on public.follow_ups;
create policy follow_ups_staff on public.follow_ups
  for all using (public.is_staff()) with check (public.is_staff());

-- notifications
drop policy if exists notifications_own on public.notifications;
create policy notifications_own on public.notifications
  for select using (user_id = auth.uid() or public.is_staff());

drop policy if exists notifications_staff_insert on public.notifications;
create policy notifications_staff_insert on public.notifications
  for insert with check (public.is_staff());

drop policy if exists notifications_own_update on public.notifications;
create policy notifications_own_update on public.notifications
  for update using (user_id = auth.uid() or public.is_staff());

-- counters
drop policy if exists counters_staff on public.application_counters;
create policy counters_staff on public.application_counters
  for all using (public.is_staff()) with check (public.is_staff());

-- Realtime publication
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
