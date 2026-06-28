"use client";

import { useEffect, useRef } from "react";

const PILLARS = [
  {
    title: "A registered foundation",
    body: "NFSF is a society registered under the Societies Registration Act, 1860 — a real, accountable organisation, not a middleman.",
    icon: (
      <path d="M4 9l8-5 8 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9z M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Every certificate is verifiable",
    body: "Each donation gets a unique ID anyone can check on our public verification page — no blind trust required.",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Tended by real farmers",
    body: "Our own farmers plant and care for every tree for years — your contribution becomes income for the families who grow it.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Transparent from seed to canopy",
    body: "We photograph plantings and send updates as your tree grows, so you see exactly what your gift becomes.",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="11.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".animate-on-scroll").forEach((c) => c.classList.add("in-view"));
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-forest-950 relative overflow-hidden" aria-labelledby="trust-heading">
      {/* soft green glow accents */}
      <div
        className="absolute top-0 right-0 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div ref={sectionRef}>
          <div className="max-w-2xl mb-14">
            <span className="block text-xs font-semibold uppercase tracking-widest text-forest-300 mb-3">
              Why People Trust Us
            </span>
            <h2
              id="trust-heading"
              className="animate-on-scroll font-serif tracking-tight text-white"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}
            >
              Real land. Real farmers.{" "}
              <span className="italic text-forest-300">Proof you can check.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="animate-on-scroll rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-forest-500/15 ring-1 ring-forest-400/25 text-forest-300 mb-5">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                    {p.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-[15px] mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
