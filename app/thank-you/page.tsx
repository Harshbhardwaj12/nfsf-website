"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabase, type Donation } from "@/lib/supabase";
import { generateCertificate } from "@/lib/certificate";

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-mist-50 flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const certId = searchParams.get("id");

  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!certId) { setLoading(false); return; }
    getSupabase()
      .from("donations")
      .select("*")
      .eq("certificate_id", certId)
      .single()
      .then(({ data }) => {
        setDonation(data ?? null);
        setLoading(false);
      });
  }, [certId]);

  async function handleDownload() {
    if (!donation) return;
    setDownloading(true);
    try {
      await generateCertificate(donation);
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-mist-50 flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen bg-mist-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No donation record found.</p>
          <Link href="/donate" className="btn-primary">Make a Donation</Link>
        </div>
      </div>
    );
  }

  const dateStr = new Date(donation.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen bg-mist-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-forest-800 text-lg">NFSF</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">

          <div className="w-20 h-20 rounded-full bg-forest-700 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10 text-white" aria-hidden="true">
              <path d="M6 16l8 8 12-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="font-serif text-3xl text-forest-900 mb-2">
            Thank you, {donation.donor_name.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 mb-8">
            Your donation has been received. You&apos;re making a real difference.
          </p>

          <div className="bg-white rounded-2xl shadow-card p-7 mb-6 text-left space-y-4">
            <SummaryRow icon="🌳" label="Trees Planted" value={`${donation.trees} ${donation.trees === 1 ? "tree" : "trees"}`} />
            <SummaryRow icon="💰" label="Amount Donated" value={`₹${donation.amount.toLocaleString("en-IN")}`} />
            <SummaryRow icon="📅" label="Date" value={dateStr} />
            <SummaryRow icon="📍" label="Planting Location" value="Andhra Pradesh, India" />
            <SummaryRow icon="🆔" label="Certificate ID" value={donation.certificate_id} />
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-primary w-full justify-center text-base py-4 mb-4"
          >
            {downloading ? "Generating PDF…" : "Download Certificate"}
            {!downloading && (
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M8 3v7M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <div className="flex gap-3">
            <Link href="/donate" className="btn-outline flex-1 justify-center text-sm py-3">
              Donate Again
            </Link>
            <Link href="/" className="btn-outline flex-1 justify-center text-sm py-3">
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            A confirmation has been sent to {donation.email}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Verify your certificate at{" "}
            <Link href={`/verify/${donation.certificate_id}`} className="underline hover:text-forest-700">
              /verify/{donation.certificate_id}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div className="flex-1 flex justify-between items-center">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-medium text-forest-800">{value}</span>
      </div>
    </div>
  );
}
