"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Donation {
  name: string;
  email: string;
  trees: number;
  amount: number;
  date: string;
}

export default function ThankYouPage() {
  const [donation, setDonation] = useState<Donation | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("nfsf_donation");
    if (raw) setDonation(JSON.parse(raw));
  }, []);

  async function handleDownload() {
    if (!donation) return;
    setDownloading(true);

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    const W = 297;
    const H = 210;

    // Background
    doc.setFillColor(240, 253, 244);
    doc.rect(0, 0, W, H, "F");

    // Border
    doc.setDrawColor(20, 83, 45);
    doc.setLineWidth(2);
    doc.rect(10, 10, W - 20, H - 20);
    doc.setLineWidth(0.5);
    doc.rect(13, 13, W - 26, H - 26);

    // Header band
    doc.setFillColor(12, 31, 20);
    doc.rect(10, 10, W - 20, 28, "F");

    // Org name
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("Nature and Farmer Sustainability Foundation", W / 2, 26, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Bangalore, India  ·  Registered under Societies Registration Act, 1860", W / 2, 33, { align: "center" });

    // Certificate of Appreciation title
    doc.setFont("times", "bolditalic");
    doc.setFontSize(26);
    doc.setTextColor(20, 83, 45);
    doc.text("Certificate of Tree Plantation", W / 2, 60, { align: "center" });

    // Divider line
    doc.setDrawColor(21, 128, 61);
    doc.setLineWidth(0.8);
    doc.line(40, 65, W - 40, 65);

    // This is to certify
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("This is to gratefully certify that", W / 2, 78, { align: "center" });

    // Donor name
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.setTextColor(12, 31, 20);
    doc.text(donation.name, W / 2, 94, { align: "center" });

    // Underline under name
    const nameWidth = doc.getTextWidth(donation.name);
    doc.setDrawColor(180, 83, 9);
    doc.setLineWidth(0.6);
    doc.line(W / 2 - nameWidth / 2, 97, W / 2 + nameWidth / 2, 97);

    // Body text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text(
      `has generously sponsored the planting of ${donation.trees} ${donation.trees === 1 ? "tree" : "trees"}`,
      W / 2, 110, { align: "center" }
    );
    doc.text(
      `in Andhra Pradesh, India, contributing ₹${donation.amount.toLocaleString("en-IN")} to reforestation efforts.`,
      W / 2, 118, { align: "center" }
    );

    // Thank you line
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(
      "Thank you for your commitment to a greener, more sustainable future for our farmers and the planet.",
      W / 2, 130, { align: "center" }
    );

    // Footer row
    doc.setDrawColor(20, 83, 45);
    doc.setLineWidth(0.5);
    doc.line(40, 150, W - 40, 150);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(`Date: ${donation.date}`, 50, 160);
    doc.text("Planting Location: Andhra Pradesh, India", W / 2, 160, { align: "center" });
    doc.text("nfsf.org.in", W - 50, 160, { align: "right" });

    // Authorised signatory placeholder
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 83, 45);
    doc.text("Authorised by NFSF", W / 2, 178, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Nature and Farmer Sustainability Foundation", W / 2, 184, { align: "center" });

    doc.save(`NFSF_Certificate_${donation.name.replace(/\s+/g, "_")}.pdf`);
    setDownloading(false);
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

  return (
    <div className="min-h-screen bg-mist-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-forest-800 text-lg">NFSF</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">

          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-forest-700 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10 text-white" aria-hidden="true">
              <path d="M6 16l8 8 12-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="font-serif text-3xl text-forest-900 mb-2">
            Thank you, {donation.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 mb-8">
            Your donation has been received. You&apos;re making a real difference.
          </p>

          {/* Summary card */}
          <div className="bg-white rounded-2xl shadow-card p-7 mb-6 text-left space-y-4">
            <SummaryRow icon="🌳" label="Trees Planted" value={`${donation.trees} ${donation.trees === 1 ? "tree" : "trees"}`} />
            <SummaryRow icon="💰" label="Amount Donated" value={`₹${donation.amount.toLocaleString("en-IN")}`} />
            <SummaryRow icon="📅" label="Date" value={donation.date} />
            <SummaryRow icon="📍" label="Planting Location" value="Andhra Pradesh, India" />
          </div>

          {/* Download certificate */}
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
