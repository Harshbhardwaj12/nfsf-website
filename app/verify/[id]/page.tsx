/**
 * Certificate verification detail page ("/verify/[id]").
 * Server-renders a donation record looked up by certificate ID, showing either
 * verified details or a not-found state. In mock mode (no DB) all IDs are unknown.
 */
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/db/supabaseAdmin";
import { type Donation } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

/** Spinner shown while the certificate is being fetched. */
function VerifyLoading() {
  return (
    <div className="min-h-screen bg-mist-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center" aria-label="Nature & Farmers Sustainability Foundation — Home">
            <Image src="/logo.png" alt="Nature & Farmers Sustainability Foundation" width={130} height={40} priority />
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
          <span
            className="w-10 h-10 rounded-full border-2 border-forest-200 border-t-forest-700 animate-spin"
            aria-hidden="true"
          />
          <span className="text-gray-400 text-sm">Verifying certificate…</span>
          <span className="sr-only">Loading certificate</span>
        </div>
      </main>
    </div>
  );
}

/** Suspense wrapper around the async certificate verification content. */
export default function VerifyPage({ params }: Props) {
  return (
    <Suspense fallback={<VerifyLoading />}>
      <VerifyContent params={params} />
    </Suspense>
  );
}

/** Looks up the donation by ID and renders the verified or not-found view. */
async function VerifyContent({ params }: Props) {
  // Mock mode (no database configured) can't verify certificates server-side —
  // there's nothing to look up — so treat every ID as "not found".
  const data = isSupabaseConfigured()
    ? (
        await getSupabaseAdmin()
          .from("donations")
          .select("donor_name,trees,amount,certificate_id,created_at")
          .eq("certificate_id", params.id)
          .single<Donation>()
      ).data
    : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-mist-50 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center" aria-label="Nature & Farmers Sustainability Foundation — Home">
            <Image src="/logo.png" alt="Nature & Farmers Sustainability Foundation" width={130} height={40} priority />
          </Link>
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
              No donation record matches certificate ID <span className="font-mono font-medium text-forest-800 break-words">{params.id}</span>.
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
          <Link href="/" className="inline-flex items-center" aria-label="Nature & Farmers Sustainability Foundation — Home">
            <Image src="/logo.png" alt="Nature & Farmers Sustainability Foundation" width={130} height={40} priority />
          </Link>
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
            <h1 className="font-serif text-xl sm:text-2xl text-forest-900 mb-1">Certificate Verified</h1>
            <p className="text-gray-500 text-sm">This is an authentic NFSF donation certificate.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5 sm:p-7 space-y-4">
            <Row label="Donor Name" value={data.donor_name} />
            <Row label="Trees Planted" value={`${data.trees} ${data.trees === 1 ? "tree" : "trees"}`} />
            <Row label="Amount Donated" value={`₹${data.amount.toLocaleString("en-IN")}`} />
            <Row label="Date" value={dateStr} />
            <Row label="Planting Location" value="Our dedicated farmland" />
            <div className="border-t border-gray-100 pt-4">
              <Row label="Certificate ID" value={data.certificate_id} mono />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/donate" className="btn-primary w-full sm:w-auto sm:flex-1 justify-center text-sm py-3 min-h-[44px]">
              Plant a Tree
            </Link>
            <Link href="/" className="btn-outline w-full sm:w-auto sm:flex-1 justify-center text-sm py-3 min-h-[44px]">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

/** Label/value pair used in the certificate details card. */
function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className={`font-medium text-forest-800 text-right break-words min-w-0 ${mono ? "font-mono text-sm" : ""}`}>{value}</span>
    </div>
  );
}
