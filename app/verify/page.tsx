"use client";

/**
 * Certificate lookup page ("/verify").
 * Prompts for a certificate ID and redirects to /verify/[id] for validation.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

/** Renders the certificate ID entry form. */
export default function VerifyLookupPage() {
  const router = useRouter();
  const [id, setId] = useState("");

  // Navigate to the verification detail route for the entered ID.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = id.trim();
    if (!trimmed) return;
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="min-h-screen bg-mist-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center" aria-label="Nature & Farmers Sustainability Foundation — Home">
            <Image src="/logo.png" alt="Nature & Farmers Sustainability Foundation" width={130} height={40} priority />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-gray-600 hover:text-forest-700 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-forest-600" aria-hidden="true">
                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 17l4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl text-forest-900 mb-1">Verify a Certificate</h1>
            <p className="text-gray-500 text-sm">
              Enter the certificate ID printed on your NFSF donation certificate.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-5 sm:p-7 space-y-4">
            <div>
              <label htmlFor="certificate-id" className="block text-sm font-medium text-forest-800 mb-1.5">
                Certificate ID
              </label>
              <input
                id="certificate-id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="e.g. NFSF-2026-00123"
                autoComplete="off"
                className="w-full rounded-lg border border-gray-200 px-3 py-3 font-mono text-sm text-forest-900 placeholder:text-gray-300 focus:border-forest-500 focus:ring-1 focus:ring-forest-500 outline-none min-h-[44px]"
              />
            </div>
            <button
              type="submit"
              disabled={!id.trim()}
              className="btn-primary w-full justify-center text-sm py-3 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify Certificate
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have one yet?{" "}
            <Link href="/donate" className="text-forest-700 font-medium hover:underline">
              Plant a tree
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
