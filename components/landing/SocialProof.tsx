"use client";

/**
 * SocialProof landing section — surfaces donor testimonials alongside headline
 * impact figures to build trust with prospective supporters.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    location: "Busy parent",
    role: "Software Engineer",
    initials: "AM",
    color: "#15803D",
    quote:
      "I wanted to do something real for my grandfather's memory — not flowers. They planted trees on his behalf, handled everything, and the certificate arrived beautifully. I've had it framed at home.",
    trees: 5,
  },
  {
    name: "Priya Venkataraman",
    location: "Startup founder",
    role: "Architect",
    initials: "PV",
    color: "#B45309",
    quote:
      "As someone who thinks about sustainability professionally, NFSF's transparency impressed me. Species names, planting dates, photo updates — real proof, no greenwashing.",
    trees: 10,
  },
];

const IMPACT_STATS = [
  { label: "Trees planted & cared for", value: "50" },
  { label: "CO₂ absorbed every year", value: "500 kg" },
];

/** Renders the donor testimonials and social-proof section of the landing page. */
export default function SocialProof() {
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
    <section className="py-20 lg:py-28 bg-mist-50" aria-labelledby="proof-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="block text-xs font-semibold uppercase tracking-widest text-forest-600 mb-3">
            Donor Stories
          </span>
          <h2
            id="proof-heading"
            className="font-serif tracking-tight text-forest-900"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", lineHeight: 1.15 }}
          >
            People Who Chose to{" "}
            <span className="italic text-forest-700">Leave a Mark</span>
          </h2>
        </div>

        {/* ── Testimonial cards ──────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="animate-on-scroll group relative bg-white rounded-2xl p-7 sm:p-8 shadow-card ring-1 ring-black/5 border border-forest-100 flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Serif quotation accent */}
              <div
                className="font-serif text-7xl leading-none text-forest-200/80 mb-1 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <blockquote className="text-gray-700 leading-relaxed text-base mb-7 flex-1 break-words">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 min-w-0">
                {/* Monogram avatar — forest/earth circle with serif initials */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif text-sm font-semibold tracking-wide flex-shrink-0 ring-2 ring-white shadow-sm"
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-forest-900 text-sm break-words">{t.name}</div>
                  <div className="text-gray-400 text-xs break-words">{t.role} · {t.location}</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-forest-50 rounded-full px-3 py-1 flex-shrink-0">
                  <svg viewBox="0 0 12 14" fill="none" className="w-3 h-3 text-forest-600" aria-hidden="true">
                    <path d="M6 1C3.5 1 1.5 3.5 1.5 6c0 2.5 1.5 4.5 3.5 6h2c2-1.5 3.5-3.5 3.5-6 0-2.5-2-5-4.5-5z" fill="currentColor" fillOpacity="0.8" />
                    <rect x="5" y="11" width="2" height="2.5" rx="1" fill="currentColor" />
                  </svg>
                  <span className="text-forest-700 text-xs font-semibold whitespace-nowrap">{t.trees} trees</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ── Community warmth band + "Be our first donor" framing ───── */}
        <div className="animate-on-scroll relative rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-xl mb-14" style={{ transitionDelay: "150ms" }}>
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/images/india-farm-d.webp"
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover object-center"
            />
          </div>
          {/* Forest-tinted overlay for contrast ≥ 4.5:1 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, rgba(7,26,13,0.9) 0%, rgba(12,31,20,0.78) 42%, rgba(20,83,45,0.55) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="relative px-6 sm:px-10 lg:px-14 py-12 lg:py-16 max-w-2xl">
            <span className="block text-xs font-semibold uppercase tracking-widest text-forest-300 mb-3">
              Be Part of the Beginning
            </span>
            <p className="font-serif tracking-tight text-white text-2xl sm:text-3xl leading-snug break-words">
              Be our first donor from your city — and help us grow the next{" "}
              <span className="italic text-forest-300">thousand trees</span>.
            </p>

            {/* Monogram cluster + count */}
            <div className="mt-7 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full pl-2 pr-5 py-2">
              <div className="flex -space-x-2" aria-hidden="true">
                {[
                  { c: "#15803D", t: "AM" },
                  { c: "#B45309", t: "PV" },
                  { c: "#14532D", t: "RK" },
                ].map((m) => (
                  <div
                    key={m.t}
                    className="w-8 h-8 rounded-full border-2 border-forest-900/40 ring-1 ring-white/40 flex items-center justify-center text-white font-serif text-[11px] font-semibold"
                    style={{ background: m.c }}
                  >
                    {m.t}
                  </div>
                ))}
              </div>
              <span className="text-white text-sm font-medium break-words">
  Be one of the first to make India greener
              </span>
            </div>
          </div>
        </div>

        {/* ── Trust stat band ────────────────────────────────────────── */}
        <div className="animate-on-scroll grid grid-cols-2 gap-px bg-forest-100 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-card" style={{ transitionDelay: "200ms" }}>
          {IMPACT_STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center justify-center bg-white px-4 py-7 sm:py-8 min-w-0"
            >
              <span className="font-serif font-bold text-3xl sm:text-4xl text-forest-700 mb-1 break-words">{s.value}</span>
              <span className="text-gray-500 text-xs sm:text-sm break-words">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
