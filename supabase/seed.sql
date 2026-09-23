-- NSC Finance DEMO DATA
-- Safe dummy records only. Do not use real personal information.

-- ---------------------------------------------------------------------------
-- Customers (guest profiles, no auth.users linkage)
-- ---------------------------------------------------------------------------
insert into public.profiles (id, full_name, phone, address, city, role) values
  ('11111111-1111-1111-1111-111111111001', 'Rani Wahyuni', '081200000001', 'Jl. Melati No. 12', 'Jakarta Timur', 'customer'),
  ('11111111-1111-1111-1111-111111111002', 'Budi Pratama', '081200000002', 'Jl. Kenanga No. 8', 'Bandung', 'customer'),
  ('11111111-1111-1111-1111-111111111003', 'Sinta Dewi', '081200000003', 'Jl. Mawar No. 21', 'Surabaya', 'customer'),
  ('11111111-1111-1111-1111-111111111004', 'Andi Saputra', '081200000004', 'Jl. Anggrek No. 5', 'Bekasi', 'customer'),
  ('11111111-1111-1111-1111-111111111005', 'Maya Lestari', '081200000005', 'Jl. Flamboyan No. 3', 'Depok', 'customer'),
  ('11111111-1111-1111-1111-111111111006', 'Dedi Kurniawan', '081200000006', 'Jl. Dahlia No. 17', 'Tangerang', 'customer'),
  ('11111111-1111-1111-1111-111111111007', 'Fitri Anjani', '081200000007', 'Jl. Cempaka No. 9', 'Semarang', 'customer'),
  ('11111111-1111-1111-1111-111111111008', 'Hendra Wijaya', '081200000008', 'Jl. Teratai No. 4', 'Medan', 'customer'),
  ('11111111-1111-1111-1111-111111111009', 'Lina Kusuma', '081200000009', 'Jl. Sakura No. 11', 'Yogyakarta', 'customer'),
  ('11111111-1111-1111-1111-111111111010', 'Rizky Maulana', '081200000010', 'Jl. Lotus No. 6', 'Malang', 'customer')
on conflict (id) do nothing;

-- Staff placeholder (link after creating auth user)
insert into public.profiles (id, full_name, phone, address, city, role) values
  ('11111111-1111-1111-1111-111111111099', 'Admin NSC Finance', '081299999999', 'Kantor NSC', 'Jakarta', 'admin')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Motorcycles
-- ---------------------------------------------------------------------------
insert into public.motorcycles (id, brand, model, variant, category, year, otr_price, description, stock, status, slug) values
  ('22222222-2222-2222-2222-222222222001', 'Honda', 'PCX 160', 'ABS', 'matic', 2025, 32670000, 'Skuter premium 160cc. DEMO DATA.', 8, 'active', 'honda-pcx-160'),
  ('22222222-2222-2222-2222-222222222002', 'Honda', 'ADV 160', 'ABS', 'matic', 2025, 36200000, 'Adventure scooter. DEMO DATA.', 5, 'active', 'honda-adv-160'),
  ('22222222-2222-2222-2222-222222222003', 'Honda', 'Vario 160', 'CBS', 'matic', 2025, 27350000, 'Matic harian 160cc. DEMO DATA.', 12, 'active', 'honda-vario-160'),
  ('22222222-2222-2222-2222-222222222004', 'Honda', 'Beat', 'Deluxe', 'matic', 2025, 18500000, 'Matic entry. DEMO DATA.', 20, 'active', 'honda-beat'),
  ('22222222-2222-2222-2222-222222222005', 'Honda', 'Scoopy', 'Prestige', 'matic', 2025, 22500000, 'Stylish scooter. DEMO DATA.', 10, 'active', 'honda-scoopy'),
  ('22222222-2222-2222-2222-222222222006', 'Yamaha', 'NMAX', 'Connected', 'matic', 2025, 31800000, 'Skuter Yamaha. DEMO DATA.', 7, 'active', 'yamaha-nmax'),
  ('22222222-2222-2222-2222-222222222007', 'Yamaha', 'Aerox', 'S', 'matic', 2025, 28900000, 'Sporty matic. DEMO DATA.', 6, 'active', 'yamaha-aerox'),
  ('22222222-2222-2222-2222-222222222008', 'Honda', 'Supra X 125', 'FI', 'cub', 2025, 19900000, 'Bebek 125cc. DEMO DATA.', 9, 'active', 'honda-supra-x-125'),
  ('22222222-2222-2222-2222-222222222009', 'Honda', 'CBR 150R', 'ABS', 'sport', 2025, 38500000, 'Sport 150cc. DEMO DATA.', 4, 'active', 'honda-cbr-150r'),
  ('22222222-2222-2222-2222-222222222010', 'Honda', 'EM1 e', 'Standard', 'ev', 2025, 24500000, 'Motor listrik. DEMO DATA.', 3, 'active', 'honda-em1-e')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Motorcycle rate cards (never invent in UI — these are source of truth)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- BPKB products + rates
-- ---------------------------------------------------------------------------
insert into public.bpkb_products (id, name, vehicle_brands, max_vehicle_age, description) values
  ('33333333-3333-3333-3333-333333333001', 'Dana Multiguna BPKB', array['Honda','Yamaha','Kawasaki'], 10, 'Pembiayaan multiguna jaminan BPKB. DEMO DATA.')
on conflict (id) do nothing;

insert into public.bpkb_rates (product_id, scheme, disbursement_amount, tenor, installment, period, area) values
  ('33333333-3333-3333-3333-333333333001', 'multiguna', 5000000, 12, 520000, '2026-Q3', 'Nasional'),
  ('33333333-3333-3333-3333-333333333001', 'multiguna', 10000000, 12, 1020000, '2026-Q3', 'Nasional'),
  ('33333333-3333-3333-3333-333333333001', 'multiguna', 10000000, 24, 620000, '2026-Q3', 'Nasional'),
  ('33333333-3333-3333-3333-333333333001', 'multiguna', 15000000, 24, 890000, '2026-Q3', 'Nasional'),
  ('33333333-3333-3333-3333-333333333001', 'multiguna', 20000000, 24, 1160000, '2026-Q3', 'Nasional'),
  ('33333333-3333-3333-3333-333333333001', 'multiguna', 20000000, 36, 890000, '2026-Q3', 'Nasional'),
  ('33333333-3333-3333-3333-333333333001', 'multiguna', 25000000, 36, 1080000, '2026-Q3', 'Nasional');

-- ---------------------------------------------------------------------------
-- Applications (DEMO DATA)
-- ---------------------------------------------------------------------------
insert into public.applications (
  id, application_code, customer_id, application_type, motorcycle_id, bpkb_product_id,
  vehicle_type, vehicle_year, vehicle_plate, requested_amount, selected_dp, selected_tenor,
  estimated_installment, payment_method, status, survey_number, voucher_name, source, follow_up_status, is_demo
) values
  ('44444444-4444-4444-4444-444444444001', 'NEW/26/000001', '11111111-1111-1111-1111-111111111001', 'new_motorcycle', '22222222-2222-2222-2222-222222222001', null, null, null, null, null, 3000000, 35, 1185000, 'credit', 'follow_up', 'SV-1001', 'PROMO PCX', 'website', 'pending', true),
  ('44444444-4444-4444-4444-444444444002', 'M2W/26/000001', '11111111-1111-1111-1111-111111111002', 'bpkb_financing', null, '33333333-3333-3333-3333-333333333001', 'Yamaha NMAX', 2020, 'B 1234 XYZ', 10000000, null, 24, 620000, null, 'verification', 'SV-1002', null, 'website', 'in_progress', true),
  ('44444444-4444-4444-4444-444444444003', 'NEW/26/000002', '11111111-1111-1111-1111-111111111003', 'new_motorcycle', '22222222-2222-2222-2222-222222222003', null, null, null, null, null, 2500000, 36, 1075000, 'credit', 'submitted', null, 'DISKON DP', 'chat', 'pending', true),
  ('44444444-4444-4444-4444-444444444004', 'M2W/26/000002', '11111111-1111-1111-1111-111111111004', 'bpkb_financing', null, '33333333-3333-3333-3333-333333333001', 'Honda Vario 125', 2018, 'B 5678 ABC', 15000000, null, 24, 890000, null, 'survey', 'SV-1004', null, 'website', 'pending', true),
  ('44444444-4444-4444-4444-444444444005', 'NEW/26/000003', '11111111-1111-1111-1111-111111111005', 'new_motorcycle', '22222222-2222-2222-2222-222222222002', null, null, null, null, null, 3500000, 36, 1420000, 'credit', 'processing', 'SV-1005', null, 'website', 'done', true),
  ('44444444-4444-4444-4444-444444444006', 'NEW/26/000004', '11111111-1111-1111-1111-111111111006', 'new_motorcycle', '22222222-2222-2222-2222-222222222004', null, null, null, null, null, 1500000, 24, 920000, 'cash', 'completed', 'SV-1006', null, 'walk-in', 'done', true),
  ('44444444-4444-4444-4444-444444444007', 'M2W/26/000003', '11111111-1111-1111-1111-111111111007', 'bpkb_financing', null, '33333333-3333-3333-3333-333333333001', 'Honda Beat', 2019, 'D 9012 DEF', 5000000, null, 12, 520000, null, 'follow_up', 'SV-1007', null, 'website', 'pending', true),
  ('44444444-4444-4444-4444-444444444008', 'NEW/26/000005', '11111111-1111-1111-1111-111111111008', 'new_motorcycle', '22222222-2222-2222-2222-222222222009', null, null, null, null, null, 4000000, 36, 1490000, 'credit', 'cancelled', null, null, 'website', 'done', true),
  ('44444444-4444-4444-4444-444444444009', 'M2W/26/000004', '11111111-1111-1111-1111-111111111009', 'bpkb_financing', null, '33333333-3333-3333-3333-333333333001', 'Kawasaki Ninja 250', 2017, 'AB 3456 GHI', 20000000, null, 36, 890000, null, 'submitted', null, null, 'chat', 'pending', true),
  ('44444444-4444-4444-4444-444444444010', 'NEW/26/000006', '11111111-1111-1111-1111-111111111010', 'new_motorcycle', '22222222-2222-2222-2222-222222222006', null, null, null, null, null, 3000000, 36, 1210000, 'credit', 'verification', 'SV-1010', null, 'website', 'in_progress', true);

insert into public.application_counters (prefix, year, last_number) values
  ('NEW', 26, 6),
  ('M2W', 26, 4)
on conflict (prefix, year) do update set last_number = excluded.last_number;

-- ---------------------------------------------------------------------------
-- Follow ups
-- ---------------------------------------------------------------------------
insert into public.follow_ups (application_id, admin_id, note, follow_up_date, status) values
  ('44444444-4444-4444-4444-444444444001', '11111111-1111-1111-1111-111111111099', 'Customer sudah dihubungi, menunggu kelengkapan data.', '2026-09-25', 'pending'),
  ('44444444-4444-4444-4444-444444444007', '11111111-1111-1111-1111-111111111099', 'Menunggu foto STNK dan BPKB.', '2026-09-23', 'in_progress');

-- ---------------------------------------------------------------------------
-- Conversations + messages
-- ---------------------------------------------------------------------------
insert into public.conversations (id, customer_id, status, mode, guest_name) values
  ('55555555-5555-5555-5555-555555555001', '11111111-1111-1111-1111-111111111001', 'open', 'bot', 'Rani Wahyuni'),
  ('55555555-5555-5555-5555-555555555002', '11111111-1111-1111-1111-111111111002', 'open', 'waiting_admin', 'Budi Pratama')
on conflict (id) do nothing;

insert into public.messages (conversation_id, sender_type, message) values
  ('55555555-5555-5555-5555-555555555001', 'customer', 'PCX DP 3 juta 35 bulan berapa?'),
  ('55555555-5555-5555-5555-555555555001', 'bot', 'Untuk Honda PCX 160 DP Rp 3.000.000 tenor 35 bulan, angsuran sesuai rate card: Rp 1.185.000 / bulan.'),
  ('55555555-5555-5555-5555-555555555002', 'customer', 'Kondisi BPKB saya masih atas nama orang tua, bisa kak?'),
  ('55555555-5555-5555-5555-555555555002', 'bot', 'Untuk kondisi tersebut perlu dicek lebih lanjut ya kak. Saya bantu teruskan ke Customer Service.');

-- ---------------------------------------------------------------------------
-- Chatbot knowledge base
-- ---------------------------------------------------------------------------
insert into public.chatbot_intents (id, intent_key, category, description) values
  ('66666666-6666-6666-6666-666666666001', 'BPKB_REQUIREMENT', 'bpkb', 'Syarat umum BPKB'),
  ('66666666-6666-6666-6666-666666666002', 'BPKB_VEHICLE_BRAND', 'bpkb', 'Merek kendaraan'),
  ('66666666-6666-6666-6666-666666666003', 'BPKB_VEHICLE_AGE', 'bpkb', 'Usia kendaraan'),
  ('66666666-6666-6666-6666-666666666004', 'BPKB_DOCUMENT', 'bpkb', 'Dokumen'),
  ('66666666-6666-6666-6666-666666666005', 'BPKB_SPECIAL_CONDITION', 'bpkb', 'Kondisi khusus'),
  ('66666666-6666-6666-6666-666666666006', 'INCOME_REQUIREMENT', 'general', 'Gaji minimal'),
  ('66666666-6666-6666-6666-666666666007', 'PENALTY_INFORMATION', 'general', 'Denda'),
  ('66666666-6666-6666-6666-666666666008', 'INSTALLMENT_EXPENSIVE', 'simulation', 'Angsuran mahal'),
  ('66666666-6666-6666-6666-666666666009', 'BUDGET_LIMITED', 'simulation', 'Budget terbatas'),
  ('66666666-6666-6666-6666-666666666010', 'REQUEST_SIMULATION', 'simulation', 'Simulasi'),
  ('66666666-6666-6666-6666-666666666011', 'NEW_MOTOR_PRICE', 'new_motor', 'Harga motor'),
  ('66666666-6666-6666-6666-666666666012', 'NEW_MOTOR_DP', 'new_motor', 'DP motor'),
  ('66666666-6666-6666-6666-666666666013', 'NEW_MOTOR_TENOR', 'new_motor', 'Tenor'),
  ('66666666-6666-6666-6666-666666666014', 'NEW_MOTOR_INSTALLMENT', 'new_motor', 'Angsuran motor baru'),
  ('66666666-6666-6666-6666-666666666015', 'APPLICATION_STATUS', 'application', 'Status pengajuan'),
  ('66666666-6666-6666-6666-666666666016', 'CUSTOMER_COMPLAINT', 'support', 'Komplain'),
  ('66666666-6666-6666-6666-666666666017', 'ADMIN_HANDOVER', 'support', 'Alih ke admin')
on conflict (intent_key) do nothing;

insert into public.chatbot_responses (intent_id, trigger_examples, response_text, priority) values
  ('66666666-6666-6666-6666-666666666002', array['yamaha bisa','honda bisa','bpkb yamaha','merek'], 'Bisa kak 😊 Yamaha maksimal 10 tahun ke belakang ya. Tipe dan tahun motornya apa?', 10),
  ('66666666-6666-6666-6666-666666666003', array['usia motor','tahun maksimal','berapa tahun'], 'Usia kendaraan maksimal 10 tahun ke belakang ya kak. Tipe dan tahun motornya apa?', 10),
  ('66666666-6666-6666-6666-666666666004', array['syarat','dokumen','ktp','stnk'], 'Syarat dokumen: KTP, KK, STNK aktif, dan BPKB asli ya kak.', 10),
  ('66666666-6666-6666-6666-666666666006', array['gaji minimal','penghasilan'], 'Untuk besaran gaji, ajukan dulu saja kak 😊 Nanti akan dianalisis oleh tim kami dan kami informasikan kembali setelah pengajuan.', 10),
  ('66666666-6666-6666-6666-666666666007', array['denda','penalty','telat'], 'Untuk informasi denda akan diinformasikan saat proses pencairan ya kak.', 10),
  ('66666666-6666-6666-6666-666666666008', array['mahal','angsurannya mahal'], 'Bisa kita cek opsi yang lebih ringan kak 😊 Mau coba tenor lebih panjang atau nominal pencairan lebih kecil?', 10),
  ('66666666-6666-6666-6666-666666666009', array['budget','kemampuan','terbatas'], 'Bisa kita sesuaikan kak. Sebutkan budget angsuran per bulan yang nyaman ya.', 20),
  ('66666666-6666-6666-6666-666666666010', array['simulasi','berapa angsuran','dp'], 'Bisa kak. Sebutkan tipe motor, DP, dan tenor yang diinginkan.', 30),
  ('66666666-6666-6666-6666-666666666017', array['admin','cs manusia','bicara admin'], 'Untuk kondisi tersebut perlu dicek lebih lanjut ya kak. Saya bantu teruskan ke Customer Service.', 5);
