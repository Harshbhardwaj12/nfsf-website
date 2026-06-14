"use client";

import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    location: "Bengaluru",
    role: "Software Engineer",
    initials: "AM",
    color: "#15803D",
    quote:
      "I planted 5 trees in memory of my grandfather. The certificate arrived beautifully — I've framed it at home. Knowing exactly where each tree stands in AP means everything.",
    trees: 5,
  },
  {
    name: "Priya Venkataraman",
    location: "Chennai",
    role: "Architect",
    initials: "PV",
    color: "#B45309",
    quote:
      "As someone who thinks about sustainability professionally, NFSF's transparency impressed me. GPS coordinates, species names, photo updates — this is how impact should be measured.",
    trees: 10,
  },
];

const IMPACT_STATS = [
  { label: "Trees survive beyond 5 years", value: "94%" },
  { label: "Farmer families benefited", value: "340+" },
  { label: "Average donor satisfaction", value: "4.9 / 5" },
];

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-mist-50" aria-labelledby="proof-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block text-earth-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Donor Stories
          </span>
          <h2
            id="proof-heading"
            className="font-serif text-forest-900"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.2 }}
          >
            People Who Chose to{" "}
            <span className="italic text-forest-700">Leave a Mark</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="animate-on-scroll bg-white rounded-2xl p-7 shadow-card border border-forest-100 flex flex-col"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Quote mark */}
              <div className="font-serif text-6xl leading-none text-forest-200 mb-2 select-none" aria-hidden="true">&ldquo;</div>
              <blockquote className="text-gray-700 leading-relaxed text-base mb-6 flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-forest-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role} · {t.location}</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-forest-50 rounded-full px-3 py-1">
                  <svg viewBox="0 0 12 14" fill="none" className="w-3 h-3 text-forest-600" aria-hidden="true">
                    <path d="M6 1C3.5 1 1.5 3.5 1.5 6c0 2.5 1.5 4.5 3.5 6h2c2-1.5 3.5-3.5 3.5-6 0-2.5-2-5-4.5-5z" fill="currentColor" fillOpacity="0.8" />
                    <rect x="5" y="11" width="2" height="2.5" rx="1" fill="currentColor" />
                  </svg>
                  <span className="text-forest-700 text-xs font-semibold">{t.trees} trees</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* "Be our first donor" nudge */}
        <div className="animate-on-scroll text-center mb-14" style={{ transitionDelay: "200ms" }}>
          <div className="inline-flex items-center gap-3 bg-white border border-forest-200 rounded-full px-5 py-2.5 shadow-sm">
            <div className="flex -space-x-2" aria-hidden="true">
              {["#15803D", "#B45309", "#14532D"].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: color }}
                />
              ))}
            </div>
            <span className="text-forest-800 text-sm font-medium">
              Join <strong>2,800+</strong> donors making India greener
            </span>
          </div>
        </div>

        {/* Impact stat strip */}
        <div className="animate-on-scroll grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ transitionDelay: "300ms" }}>
          {IMPACT_STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center bg-white rounded-2xl p-6 border border-forest-100 shadow-card"
            >
              <span className="font-serif font-bold text-3xl text-forest-700 mb-1">{s.value}</span>
              <span className="text-gray-500 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
