"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

const VALUES = [
  {
    title: "Rooted in Community",
    body: "We plant alongside farmer families — not in place of them. Every project begins with the people who tend the land.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="9" cy="8" r="3" stroke="#14532D" strokeWidth="1.5" />
        <circle cx="16" cy="9" r="2.5" stroke="#14532D" strokeWidth="1.5" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M14.5 14c2.6 0 4.5 1.8 4.5 4.5" stroke="#14532D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Native by Design",
    body: "Neem, Pongamia and Tamarind — indigenous species chosen to thrive locally, shade soil and feed both wildlife and households.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 21v-7" stroke="#14532D" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 14c-4 0-7-2.5-7-6 3.5 0 7 1.5 7 6zM12 14c4 0 7-2.5 7-6-3.5 0-7 1.5-7 6z" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Transparent to the Root",
    body: "Each tree is GPS-tagged and photographed at planting, so your certificate carries the exact spot where it grows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="2.25" stroke="#14532D" strokeWidth="1.5" />
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

function StatItem({
  stat,
  inView,
  index,
  total,
}: {
  stat: typeof STATS[0];
  inView: boolean;
  index: number;
  total: number;
}) {
  const count = useCountUp(stat.value, inView);
  const display = count >= 1000 ? count.toLocaleString("en-IN") : count;

  // Predictable dividers: 2-up on mobile, 4-up on desktop.
  // Left border for inner columns; top border for rows below the first.
  const mobileLeft = index % 2 !== 0 ? "border-l border-forest-100" : "";
  const mobileTop = index >= 2 ? "border-t border-forest-100" : "";
  const lgLeft = index % 4 !== 0 ? "lg:border-l" : "lg:border-l-0";
  const lgTop = "lg:border-t-0";

  return (
    <div
      className={`animate-on-scroll relative px-5 py-7 sm:px-7 sm:py-9 text-center sm:text-left border-forest-100 ${mobileLeft} ${mobileTop} ${lgLeft} ${lgTop}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="mb-4 flex justify-center sm:justify-start">{stat.icon}</div>
      <div className="flex items-baseline justify-center sm:justify-start gap-0.5">
        <span
          className="stat-number font-serif font-bold text-forest-900"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)", lineHeight: 1 }}
        >
          {display}
        </span>
        <span className="font-serif font-semibold text-earth-500 text-xl sm:text-2xl">{stat.suffix}</span>
      </div>
      <p className="mt-3 font-semibold text-forest-900 text-[0.95rem]">{stat.label}</p>
      <p className="mt-0.5 text-sm text-gray-500">{stat.sub}</p>
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
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden" aria-labelledby="mission-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Founding story: asymmetric two-column ───────────── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Story copy */}
          <div className="animate-on-scroll lg:col-span-6 xl:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                Our Mission
              </span>
              <span className="h-px w-10 bg-earth-400/60" aria-hidden="true" />
            </div>

            <h2
              id="mission-heading"
              className="font-serif tracking-tight text-forest-900"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.12 }}
            >
              Rooting India&rsquo;s Future,{" "}
              <span className="italic text-forest-700">One Tree at a Time</span>
            </h2>

            <div className="mt-6 space-y-5 text-gray-600 leading-relaxed max-w-xl">
              <p className="text-lg">
                Founded in Bangalore in 2019, the{" "}
                <span className="font-medium text-forest-800">
                  Nature &amp; Farmers Sustainability Foundation
                </span>{" "}
                exists for a simple belief: that restoring land and uplifting the people who
                tend it are one and the same work.
              </p>
              <p>
                We partner with farming communities across Andhra Pradesh to bring degraded,
                weather-worn land back to life — planting native trees that hold the soil,
                cool the climate and return a lasting livelihood to farmer families. Every
                rupee you give funds the planting, the years of care that follow, and the
                households who make it possible.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="/donate" className="btn-primary min-h-[44px]">
                Sponsor a Tree
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/impact" className="btn-outline min-h-[44px]">
                See Our Impact
              </a>
            </div>
          </div>

          {/* Tall feature image */}
          <div className="animate-on-scroll lg:col-span-6 xl:col-span-7" style={{ transitionDelay: "120ms" }}>
            <div className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-xl">
                <Image
                  src="/images/green-valley.jpg"
                  alt="A sweeping green valley restored to life, with a lone figure dwarfed by the landscape"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 via-transparent to-transparent" aria-hidden="true" />
              </div>

              {/* Floating credibility caption */}
              <div className="absolute -bottom-5 left-5 right-5 sm:left-8 sm:right-auto sm:max-w-xs rounded-2xl bg-white/95 backdrop-blur px-5 py-4 ring-1 ring-black/5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                  Since 2019
                </p>
                <p className="mt-1 text-sm text-gray-600 leading-snug">
                  Restoring degraded land hand-in-hand with the farmers who live on it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Impact stats band ──────────────────────────────── */}
        <div id="impact" className="mt-24 lg:mt-32 scroll-mt-24">
          <div className="animate-on-scroll max-w-2xl mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                Our Impact
              </span>
              <span className="h-px w-10 bg-earth-400/60" aria-hidden="true" />
            </div>
            <h3
              className="font-serif tracking-tight text-forest-900"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.2 }}
            >
              Measured in canopy, carbon and community
            </h3>
          </div>

          <div className="animate-on-scroll rounded-3xl border border-forest-100 bg-mist-50/60 shadow-card overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} inView={inView} index={i} total={STATS.length} />
              ))}
            </div>
          </div>
        </div>

        {/* ── What we do: values + supporting image ──────────── */}
        <div className="mt-24 lg:mt-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Supporting image */}
          <div className="animate-on-scroll lg:col-span-5 order-last lg:order-first">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-xl">
              <Image
                src="/images/farmer-field.jpg"
                alt="A South Indian farmer plowing a paddy field with bullocks, palm trees lining the horizon"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Values list */}
          <div className="lg:col-span-7">
            <div className="animate-on-scroll flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                What We Do
              </span>
              <span className="h-px w-10 bg-earth-400/60" aria-hidden="true" />
            </div>
            <h3
              className="animate-on-scroll font-serif tracking-tight text-forest-900"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.2 }}
            >
              Land restoration, the way it should be done
            </h3>

            <dl className="mt-8 space-y-7">
              {VALUES.map((value, i) => (
                <div
                  key={value.title}
                  className="animate-on-scroll flex gap-4 sm:gap-5"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-forest-50 ring-1 ring-forest-100">
                    {value.icon}
                  </div>
                  <div>
                    <dt className="font-serif text-lg font-semibold text-forest-900">
                      {value.title}
                    </dt>
                    <dd className="mt-1 text-gray-600 leading-relaxed max-w-prose">
                      {value.body}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
