import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="mt-20 border-t border-red-600 bg-red-700 pb-12 pt-16 text-red-100">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-bold uppercase text-white">NSC Finance</p>
          <p className="mt-3 max-w-md text-sm">
            Platform demo pembiayaan motor baru dan dana multiguna beragunan BPKB. Data dummy, bukan layanan produksi resmi.
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase text-white">Layanan</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/motor">Motor Baru</Link></li>
            <li><Link href="/bpkb">Dana BPKB</Link></li>
            <li><Link href="/simulasi">Simulasi</Link></li>
            <li><Link href="/pengajuan">Pengajuan</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase text-white">Bantuan</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/login">Portal Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-site border-t border-red-600 px-6 pt-6 text-xs text-red-200 lg:px-12">
        © 2026 NSC Finance. Demo framework.
      </div>
    </footer>
  );
}
