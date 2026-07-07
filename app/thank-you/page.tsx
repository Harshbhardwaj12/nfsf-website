"use client";

/**
 * Thank-you page ("/thank-you").
 * Loads the donation by certificate ID (from the API, falling back to the
 * mock-mode localStorage cache), shows a summary, and lets the donor pick a
 * certificate design and download the generated PDF.
 */

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { type Donation } from "@/lib/db/supabase";
import { generateCertificate } from "@/lib/cert/certificate";
import { readGift, type GiftDetails } from "@/lib/donation/gift";
import CertificatePreview from "@/components/CertificatePreview";
import { CERT_DESIGNS, DEFAULT_CERT_DESIGN, type CertDesignId } from "@/lib/cert/certDesigns";

/** Suspense boundary for the thank-you page (required for useSearchParams). */
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

/** Loads and renders the donation confirmation and certificate download. */
function ThankYouContent() {
  const searchParams = useSearchParams();
  const certId = searchParams.get("id");

  const [donation, setDonation] = useState<Donation | null>(null);
  const [gift, setGift] = useState<GiftDetails | null>(null);
  const [design, setDesign] = useState<CertDesignId>(DEFAULT_CERT_DESIGN);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!certId) { setLoading(false); return; }

    setGift(readGift(certId));

    // Mock mode has no database — fall back to the donation cached by /donate.
    const fromCache = (): Donation | null => {
      try {
        const raw = localStorage.getItem(`nfsf_donation_${certId}`);
        return raw ? (JSON.parse(raw) as Donation) : null;
      } catch {
        return null;
      }
    };

    fetch(`/api/donation/${encodeURIComponent(certId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setDonation(d?.donation ?? fromCache());
        setLoading(false);
      })
      .catch(() => {
        setDonation(fromCache());
        setLoading(false);
      });
  }, [certId]);

  // Generate and download the certificate PDF for the current design.
  async function handleDownload() {
    if (!donation) return;
    setDownloading(true);
    try {
      await generateCertificate(donation, gift, design);
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
          <Link href="/" className="inline-flex items-center" aria-label="Nature & Farmers Sustainability Foundation — Home">
            <Image src="/logo.png" alt="Nature & Farmers Sustainability Foundation" width={130} height={40} priority />
          </Link>
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
            {gift?.isGift && gift.recipientName
              ? `Your living gift for ${gift.recipientName} is on its way to taking root.`
              : "Your donation has been received. You're making a real difference."}
          </p>

          <div className="bg-white rounded-2xl shadow-card p-7 mb-6 text-left space-y-4">
            <SummaryRow label="Trees Planted" value={`${donation.trees} ${donation.trees === 1 ? "tree" : "trees"}`} />
            <SummaryRow label="Amount Donated" value={`₹${donation.amount.toLocaleString("en-IN")}`} />
            <SummaryRow label="Date" value={dateStr} />
            <SummaryRow label="Planting Location" value="Our dedicated farmland" />
            {gift?.isGift && gift.recipientName && (
              <>
                <div className="border-t border-gray-100 pt-4">
                  <SummaryRow label="A gift for" value={gift.recipientName} />
                </div>
                {gift.occasion && <SummaryRow label="Occasion" value={gift.occasion} />}
                {gift.treeName && <SummaryRow label="Tree named" value={gift.treeName} />}
              </>
            )}
            <div className={gift?.isGift && gift.recipientName ? "border-t border-gray-100 pt-4" : ""}>
              <SummaryRow label="Certificate ID" value={donation.certificate_id} />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Your certificate</p>
            <CertificatePreview donation={donation} gift={gift} design={design} />

            {/* Design picker */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2 text-left">Choose a design</p>
              <div className="grid grid-cols-3 gap-2">
                {CERT_DESIGNS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDesign(d.id)}
                    aria-pressed={design === d.id}
                    className={`rounded-xl border-2 px-3 py-2.5 text-left transition-colors ${
                      design === d.id
                        ? "border-forest-700 bg-forest-50"
                        : "border-gray-200 hover:border-forest-300"
                    }`}
                  >
                    <span className="block text-[13px] font-semibold text-forest-800">{d.name}</span>
                    <span className="block text-[11px] text-gray-500 leading-snug mt-0.5">{d.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-primary w-full justify-center text-base py-4 min-h-[44px] mb-4"
          >
            {downloading ? "Generating PDF…" : "Download Certificate"}
            {!downloading && (
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M8 3v7M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/donate" className="btn-outline w-full sm:w-auto sm:flex-1 justify-center text-sm py-3 min-h-[44px]">
              Donate Again
            </Link>
            <Link href="/" className="btn-outline w-full sm:w-auto sm:flex-1 justify-center text-sm py-3 min-h-[44px]">
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

/** Icon + label/value row used in the donation summary card. */
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-medium text-forest-800 text-right">{value}</span>
    </div>
  );
}
