import Link from "next/link";
import { getSupabase, type Donation } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function VerifyPage({ params }: Props) {
  const { data } = await getSupabase()
    .from("donations")
    .select("*")
    .eq("certificate_id", params.id)
    .single<Donation>();

  if (!data) {
    return (
      <div className="min-h-screen bg-mist-50 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="font-serif font-bold text-forest-800 text-lg">NFSF</Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-red-400" aria-hidden="true">
                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l10 10M21 11L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-forest-900 mb-2">Certificate Not Found</h1>
            <p className="text-gray-500 mb-6">
              No donation record matches certificate ID <span className="font-mono font-medium text-forest-800">{params.id}</span>.
            </p>
            <Link href="/" className="btn-primary">Go to Homepage</Link>
          </div>
        </main>
      </div>
    );
  }

  const dateStr = new Date(data.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen bg-mist-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="font-serif font-bold text-forest-800 text-lg">NFSF</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-forest-600" aria-hidden="true">
                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 17l4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-forest-900 mb-1">Certificate Verified</h1>
            <p className="text-gray-500 text-sm">This is an authentic NFSF donation certificate.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-7 space-y-4">
            <Row label="Donor Name" value={data.donor_name} />
            <Row label="Trees Planted" value={`${data.trees} ${data.trees === 1 ? "tree" : "trees"}`} />
            <Row label="Amount Donated" value={`₹${data.amount.toLocaleString("en-IN")}`} />
            <Row label="Date" value={dateStr} />
            <Row label="Planting Location" value="Andhra Pradesh, India" />
            <div className="border-t border-gray-100 pt-4">
              <Row label="Certificate ID" value={data.certificate_id} mono />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/donate" className="btn-primary flex-1 justify-center text-sm py-3">
              Plant a Tree
            </Link>
            <Link href="/" className="btn-outline flex-1 justify-center text-sm py-3">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`font-medium text-forest-800 ${mono ? "font-mono text-sm" : ""}`}>{value}</span>
    </div>
  );
}
