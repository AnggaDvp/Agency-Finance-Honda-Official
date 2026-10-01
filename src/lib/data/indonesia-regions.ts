/**
 * Data Wilayah Indonesia (Cascading)
 * =================================
 * Struktur:
 *   provinces[].id        → pilih wilayah
 *   └─ regencies[].id     → pilih kecamatan (sesuai provinsi)
 *      └─ districts[].id  → pilih kelurahan (sesuai kabupaten)
 *         └─ villages[]   → daftar kelurahan + kodePos (sesuai kecamatan)
 *
 * Data ini minimal sample 34 provinsi + beberapa common kota/kecamatan/kelurahan.
 * TIDAK PERLU install library indoregion / indonesian-region (tidak tambah dep).
 * Nanti jika production butuh data lengkap, bisa ganti source dari DB (TBA tahap berikutnya).
 * Untuk saat ini sudah cukup mendukung flow CASCADING DROPDOWN: Wilayah → Kecamatan → Kelurahan → Kode Pos.
 */

export type Village = { id: string; name: string; postalCode: string };
export type District = { id: string; name: string; villages: Village[] };
export type Regency = { id: string; name: string; type: "KAB" | "KOTA"; districts: District[] };
export type Province = { id: string; name: string; regencies: Regency[] };

// Helper singkat buat sample kecamatan + kelurahan umum (untuk setiap kabupaten/kota)
function sampleDistricts(): District[] {
  return [
    {
      id: "d_pusat",
      name: "Pusat Kota / Camat Umum",
      villages: [
        { id: "v_1", name: "Kelurahan I", postalCode: "10000" },
        { id: "v_2", name: "Kelurahan II", postalCode: "10110" },
        { id: "v_3", name: "Kelurahan III", postalCode: "10220" },
      ],
    },
    {
      id: "d_selatan",
      name: "Kecamatan Selatan",
      villages: [
        { id: "v_4", name: "Kelurahan A", postalCode: "12000" },
        { id: "v_5", name: "Kelurahan B", postalCode: "12120" },
        { id: "v_6", name: "Kelurahan C", postalCode: "12250" },
      ],
    },
    {
      id: "d_utara",
      name: "Kecamatan Utara",
      villages: [
        { id: "v_7", name: "Kelurahan D", postalCode: "14000" },
        { id: "v_8", name: "Kelurahan E", postalCode: "14230" },
      ],
    },
    {
      id: "d_timur",
      name: "Kecamatan Timur",
      villages: [
        { id: "v_9", name: "Kelurahan F", postalCode: "13000" },
        { id: "v_10", name: "Kelurahan G", postalCode: "13130" },
      ],
    },
    {
      id: "d_barat",
      name: "Kecamatan Barat",
      villages: [
        { id: "v_11", name: "Kelurahan H", postalCode: "11000" },
        { id: "v_12", name: "Kelurahan I", postalCode: "11140" },
      ],
    },
  ];
}

const commonRegencies = (): Regency[] => [
  { id: "r_kota", name: "Kota Utama", type: "KOTA", districts: sampleDistricts() },
  { id: "r_kab", name: "Kabupaten Induk", type: "KAB", districts: sampleDistricts() },
];

// Minimal 34 provinsi resmi Indonesia (sesuai BPS 2024)
export const PROVINCES: Province[] = [
  { id: "aceh", name: "Aceh (Nanggroe Aceh Darussalam)", regencies: commonRegencies() },
  { id: "sumut", name: "Sumatera Utara", regencies: commonRegencies() },
  { id: "sumbar", name: "Sumatera Barat", regencies: commonRegencies() },
  { id: "riau", name: "Riau", regencies: commonRegencies() },
  { id: "kep_riau", name: "Kepulauan Riau", regencies: commonRegencies() },
  { id: "jambi", name: "Jambi", regencies: commonRegencies() },
  { id: "sumsel", name: "Sumatera Selatan", regencies: commonRegencies() },
  { id: "kep_bangka", name: "Kepulauan Bangka Belitung", regencies: commonRegencies() },
  { id: "bengkulu", name: "Bengkulu", regencies: commonRegencies() },
  { id: "lampung", name: "Lampung", regencies: commonRegencies() },
  { id: "dki", name: "DKI Jakarta", regencies: [
    { id: "jakpus", name: "Kota Administrasi Jakarta Pusat", type: "KOTA", districts: sampleDistricts() },
    { id: "jakut", name: "Kota Administrasi Jakarta Utara", type: "KOTA", districts: sampleDistricts() },
    { id: "jakbar", name: "Kota Administrasi Jakarta Barat", type: "KOTA", districts: sampleDistricts() },
    { id: "jaksel", name: "Kota Administrasi Jakarta Selatan", type: "KOTA", districts: sampleDistricts() },
    { id: "jaktim", name: "Kota Administrasi Jakarta Timur", type: "KOTA", districts: sampleDistricts() },
  ]},
  { id: "banten", name: "Banten", regencies: commonRegencies() },
  { id: "jabar", name: "Jawa Barat", regencies: [
    { id: "kota_bogor", name: "Kota Bogor", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_bogor", name: "Kabupaten Bogor", type: "KAB", districts: sampleDistricts() },
    { id: "kota_sukabumi", name: "Kota Sukabumi", type: "KOTA", districts: sampleDistricts() },
    { id: "kota_bandung", name: "Kota Bandung", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_bandung", name: "Kabupaten Bandung", type: "KAB", districts: sampleDistricts() },
    { id: "kota_bdg_barat", name: "Kota Cimahi", type: "KOTA", districts: sampleDistricts() },
  ]},
  { id: "jateng", name: "Jawa Tengah", regencies: [
    { id: "kota_semarang", name: "Kota Semarang", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_semarang", name: "Kabupaten Semarang", type: "KAB", districts: sampleDistricts() },
    { id: "kota_surakarta", name: "Kota Surakarta (Solo)", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_brebes", name: "Kabupaten Brebes", type: "KAB", districts: sampleDistricts() },
    { id: "kab_tegal", name: "Kabupaten Tegal", type: "KAB", districts: sampleDistricts() },
  ]},
  { id: "diy", name: "DI Yogyakarta", regencies: [
    { id: "kota_yogyakarta", name: "Kota Yogyakarta", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_sleman", name: "Kabupaten Sleman", type: "KAB", districts: sampleDistricts() },
    { id: "kab_bantul", name: "Kabupaten Bantul", type: "KAB", districts: sampleDistricts() },
    { id: "kab_gk", name: "Kabupaten Gunung Kidul", type: "KAB", districts: sampleDistricts() },
    { id: "kab_kp", name: "Kabupaten Kulon Progo", type: "KAB", districts: sampleDistricts() },
  ]},
  { id: "jatim", name: "Jawa Timur", regencies: [
    { id: "kota_surabaya", name: "Kota Surabaya", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_sidoarjo", name: "Kabupaten Sidoarjo", type: "KAB", districts: sampleDistricts() },
    { id: "kab_gsi", name: "Kabupaten Gresik", type: "KAB", districts: sampleDistricts() },
    { id: "kota_malang", name: "Kota Malang", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_malang", name: "Kabupaten Malang", type: "KAB", districts: sampleDistricts() },
  ]},
  { id: "bali", name: "Bali", regencies: [
    { id: "kota_denpasar", name: "Kota Denpasar", type: "KOTA", districts: sampleDistricts() },
    { id: "kab_badung", name: "Kabupaten Badung", type: "KAB", districts: sampleDistricts() },
    { id: "kab_gianyar", name: "Kabupaten Gianyar", type: "KAB", districts: sampleDistricts() },
  ]},
  { id: "ntb", name: "Nusa Tenggara Barat", regencies: commonRegencies() },
  { id: "ntt", name: "Nusa Tenggara Timur", regencies: commonRegencies() },
  { id: "kalbar", name: "Kalimantan Barat", regencies: commonRegencies() },
  { id: "kalteng", name: "Kalimantan Tengah", regencies: commonRegencies() },
  { id: "kalsel", name: "Kalimantan Selatan", regencies: commonRegencies() },
  { id: "kaltim", name: "Kalimantan Timur", regencies: commonRegencies() },
  { id: "kalut", name: "Kalimantan Utara", regencies: commonRegencies() },
  { id: "sulut", name: "Sulawesi Utara", regencies: commonRegencies() },
  { id: "sulteng", name: "Sulawesi Tengah", regencies: commonRegencies() },
  { id: "sulsel", name: "Sulawesi Selatan", regencies: commonRegencies() },
  { id: "sultengg", name: "Sulawesi Tenggara", regencies: commonRegencies() },
  { id: "gorontalo", name: "Gorontalo", regencies: commonRegencies() },
  { id: "sulbar", name: "Sulawesi Barat", regencies: commonRegencies() },
  { id: "maluku", name: "Maluku", regencies: commonRegencies() },
  { id: "malut", name: "Maluku Utara", regencies: commonRegencies() },
  { id: "papua", name: "Papua", regencies: commonRegencies() },
  { id: "papbar", name: "Papua Barat", regencies: commonRegencies() },
  { id: "papteng", name: "Papua Tengah", regencies: commonRegencies() },
  { id: "papsel", name: "Papua Selatan", regencies: commonRegencies() },
  { id: "papbaratdaya", name: "Papua Barat Daya", regencies: commonRegencies() },
  { id: "pappeg", name: "Papua Pegunungan", regencies: commonRegencies() },
  { id: "riau", name: "Riau (Khusus)", regencies: commonRegencies() },
];

// =====================================================================
// Helper functions untuk cascading dropdown.
// =====================================================================

export function findProvince(id: string | null | undefined): Province | null {
  if (!id) return null;
  return PROVINCES.find((p) => p.id === id) ?? null;
}

export function listRegencies(provinceId: string | null | undefined): Regency[] {
  const prov = findProvince(provinceId);
  return prov?.regencies ?? [];
}

export function listDistricts(provinceId: string | null | undefined, regencyId: string | null | undefined): District[] {
  const kab = listRegencies(provinceId).find((r) => r.id === regencyId);
  return kab?.districts ?? [];
}

export function listVillages(
  provinceId: string | null | undefined,
  regencyId: string | null | undefined,
  districtId: string | null | undefined,
): Village[] {
  const kec = listDistricts(provinceId, regencyId).find((d) => d.id === districtId);
  return kec?.villages ?? [];
}
