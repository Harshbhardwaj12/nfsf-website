"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PRICE_PER_TREE = 300;

interface FormData {
  name: string;
  email: string;
  trees: number;
}

export default function DonatePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormData>({ name: "", email: "", trees: 1 });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const total = form.trees * PRICE_PER_TREE;

  function validate() {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.trees || form.trees < 1) e.trees = "At least 1 tree required";
    return e;
  }

  function handleProceed(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs as Partial<FormData>); return; }
    setErrors({});
    setStep(2);
  }

  function handleConfirm() {
    const donation = {
      name: form.name.trim(),
      email: form.email.trim(),
      trees: form.trees,
      amount: total,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    };
    localStorage.setItem("nfsf_donation", JSON.stringify(donation));
    router.push("/thank-you");
  }

  return (
    <div className="min-h-screen bg-mist-50 flex flex-col">
      {/* Simple header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-forest-800 text-lg">NFSF</Link>
          <span className="text-sm text-gray-400">Secure Donation</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  s <= step ? "bg-forest-700 text-white" : "bg-gray-200 text-gray-400"
                }`}>
                  {s}
                </div>
                <span className={`text-sm ${s === step ? "text-forest-800 font-medium" : "text-gray-400"}`}>
                  {s === 1 ? "Your Details" : "Confirm Donation"}
                </span>
                {s < 2 && <div className="w-8 h-px bg-gray-300 mx-1" />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">

            {/* ── Step 1: Form ── */}
            {step === 1 && (
              <form onSubmit={handleProceed} noValidate>
                <h1 className="font-serif text-2xl text-forest-900 mb-1">Plant a Tree</h1>
                <p className="text-gray-500 text-sm mb-7">₹{PRICE_PER_TREE} per tree · GPS-verified planting in Andhra Pradesh</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-1.5" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-xl border text-forest-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-600 transition ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-1.5" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-forest-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-600 transition ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-1.5" htmlFor="trees">
                      Number of Trees
                    </label>
                    <input
                      id="trees"
                      type="number"
                      min={1}
                      value={form.trees}
                      onChange={(e) => setForm({ ...form, trees: Math.max(1, parseInt(e.target.value) || 1) })}
                      className={`w-full px-4 py-3 rounded-xl border text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-600 transition ${
                        errors.trees ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.trees && <p className="text-red-500 text-xs mt-1">{errors.trees}</p>}
                  </div>
                </div>

                {/* Live total */}
                <div className="mt-6 bg-forest-50 rounded-xl px-5 py-4 flex items-center justify-between">
                  <span className="text-forest-700 text-sm font-medium">
                    {form.trees} {form.trees === 1 ? "tree" : "trees"} × ₹{PRICE_PER_TREE}
                  </span>
                  <span className="font-serif font-bold text-2xl text-forest-800">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                <button type="submit" className="btn-primary w-full justify-center mt-6 text-base py-4">
                  Proceed to Donate
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}

            {/* ── Step 2: Mock payment confirmation ── */}
            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-forest-600" aria-hidden="true">
                      <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 17l4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h1 className="font-serif text-2xl text-forest-900 mb-1">Review Your Donation</h1>
                  <p className="text-gray-500 text-sm">Please confirm the details below</p>
                </div>

                <div className="bg-forest-50 rounded-xl p-5 space-y-3 mb-7 text-sm">
                  <Row label="Name" value={form.name} />
                  <Row label="Email" value={form.email} />
                  <div className="border-t border-forest-100 pt-3 flex justify-between items-center">
                    <span className="text-forest-700 font-medium">
                      🌳 {form.trees} {form.trees === 1 ? "tree" : "trees"}
                    </span>
                    <span className="font-serif font-bold text-2xl text-forest-800">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <p className="text-center text-xs text-amber-700 bg-amber-50 rounded-lg px-4 py-2 mb-6">
                  This is a mock payment — no money will be charged.
                </p>

                <button onClick={handleConfirm} className="btn-primary w-full justify-center text-base py-4">
                  Confirm Donation (Mock)
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-4 transition"
                >
                  ← Edit details
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-forest-800 font-medium">{value}</span>
    </div>
  );
}
