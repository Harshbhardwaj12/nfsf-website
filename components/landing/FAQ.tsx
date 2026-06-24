"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Where exactly are the trees planted?",
    a: "All trees are planted in Andhra Pradesh, India, on farmland managed in partnership with local farming families who plant and care for them.",
  },
  {
    q: "How do I receive my certificate?",
    a: "Instantly after your donation. You get a downloadable PDF certificate with a unique certificate ID that anyone can verify online.",
  },
  {
    q: "Is my donation 80G tax exempt?",
    a: "Yes. NFSF is registered under Section 80G of the Income Tax Act, 1961, so your donation is eligible for a tax deduction.",
  },
  {
    q: "How do I verify my certificate?",
    a: "Visit our Verify Certificate page and enter your certificate ID. The details of your donation will be shown instantly.",
  },
  {
    q: "What tree species are planted?",
    a: "We plant native species suited to the Andhra Pradesh climate, including Neem, Teak, and Peepal, chosen for survival and ecological benefit.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-forest-50" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="text-forest-600 text-sm font-semibold tracking-widest uppercase">
            Questions
          </span>
          <h2
            id="faq-heading"
            className="text-forest-800 font-bold mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.15 }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-white rounded-xl ring-1 ring-gray-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-forest-800">{faq.q}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`w-5 h-5 flex-shrink-0 text-forest-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
