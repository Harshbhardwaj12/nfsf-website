"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    value: 12450,
    suffix: "+",
    label: "Trees Planted",
    sub: "Across Andhra Pradesh",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M16 4C9 4 4 10 4 16c0 4.5 2.5 8 6 10h12c3.5-2 6-5.5 6-10 0-6-5-12-12-12z" fill="#15803D" fillOpacity="0.15" stroke="#15803D" strokeWidth="1.5" />
        <rect x="14.5" y="22" width="3" height="7" rx="1.5" fill="#15803D" />
        <path d="M11 14c1.5-2 4-3 5-4" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 3,
    suffix: " States",
    label: "Regions Covered",
    sub: "AP, Karnataka, Tamil Nadu",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="#15803D" strokeWidth="1.5" fill="#15803D" fillOpacity="0.1" />
        <path d="M5 16h22M16 5c-4 4-6 7-6 11s2 7 6 11M16 5c4 4 6 7 6 11s-2 7-6 11" stroke="#15803D" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    value: 2800,
    suffix: "+",
    label: "Generous Donors",
    sub: "From across India",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="11" r="4" stroke="#15803D" strokeWidth="1.5" fill="#15803D" fillOpacity="0.1" />
        <circle cx="21" cy="11" r="4" stroke="#15803D" strokeWidth="1.5" fill="#15803D" fillOpacity="0.1" />
        <path d="M4 26c0-4 3.6-7 8-7h8c4.4 0 8 3 8 7" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 124000,
    suffix: " kg",
    label: "CO₂ Offset",
    sub: "Equivalent to 540 cars off road",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M16 6v4M8 9l3 3M24 9l-3 3M5 20h3M24 20h3" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="18" r="6" stroke="#15803D" strokeWidth="1.5" fill="#15803D" fillOpacity="0.12" />
        <path d="M10 26c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return count;
}

function StatCard({ stat, inView, index }: { stat: typeof STATS[0]; inView: boolean; index: number }) {
  const count = useCountUp(stat.value, inView);
  const display = count >= 1000 ? count.toLocaleString("en-IN") : count;

  return (
    <div
      className="animate-on-scroll bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-forest-100"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4">{stat.icon}</div>
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="stat-number font-serif font-bold text-forest-800" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
          {display}
        </span>
        <span className="font-serif font-semibold text-forest-600 text-xl">{stat.suffix}</span>
      </div>
      <p className="font-semibold text-forest-900 text-base mb-0.5">{stat.label}</p>
      <p className="text-sm text-gray-500">{stat.sub}</p>
    </div>
  );
}

export default function MissionStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          const cards = el.querySelectorAll<HTMLElement>(".animate-on-scroll");
          cards.forEach((c) => c.classList.add("in-view"));
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 lg:py-28 bg-white" aria-labelledby="mission-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-earth-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Mission
          </span>
          <h2
            id="mission-heading"
            className="font-serif text-forest-900 mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.2 }}
          >
            Rooting India&rsquo;s Future,{" "}
            <span className="italic text-forest-700">One Tree at a Time</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded in Bangalore in 2019, the Nature and Farmer Sustainability Foundation
            partners with local farming communities in Andhra Pradesh to restore degraded
            land. Every donation directly funds planting, maintenance, and livelihood
            support for farmer families.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} inView={inView} index={i} />
          ))}
        </div>

        {/* Story paragraph */}
        <div className="mt-14 grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="animate-on-scroll">
            <h3 className="font-serif text-forest-800 text-xl font-semibold mb-3">
              Why Andhra Pradesh?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Andhra Pradesh has over 40 lakh hectares of degraded forest land — among the
              highest in peninsular India. The state&rsquo;s diverse agro-climatic zones support
              native species like Neem, Pongamia, and Tamarind, which provide shade,
              fodder, and income for farmers while sequestering carbon efficiently.
            </p>
          </div>
          <div className="animate-on-scroll" style={{ transitionDelay: "150ms" }}>
            <h3 className="font-serif text-forest-800 text-xl font-semibold mb-3">
              Transparent Impact
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Each sponsored tree is GPS-tagged and photographed at planting. Your digital
              certificate carries the exact coordinates — you can see your tree on a map.
              We share annual growth reports with all donors, ensuring full accountability
              from seed to canopy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
