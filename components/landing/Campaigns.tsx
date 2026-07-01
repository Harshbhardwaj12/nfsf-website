"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Seasonal "Trees of Monsoon" banner + a row of themed planting campaigns,
 * inspired by Sankalp Taru's campaign grid. Scroll-reveal is handled by the
 * global `.animate-on-scroll` observer in app/layout.tsx; cards add a hover
 * zoom + caption lift. No tax/80G claims (we don't offer that).
 */

const CAMPAIGNS = [
  {
    src: "/images/india-farm-a.webp",
    tag: "#TreesOfMonsoon",
    title: "Trees of Monsoon",
    blurb: "Plant during nature's most supportive season — when saplings root fastest.",
  },
  {
    src: "/images/farm-planting-2.webp",
    tag: "#ZodiacTrees",
    title: "Zodiac Mīna — Pisces (Mango)",
    blurb: "A native tree matched to your star sign — a thoughtful, personal gift.",
  },
  {
    src: "/images/india-farm-c.webp",
    tag: "#CelebrateGreen",
    title: "Celebrate a Milestone",
    blurb: "Birthdays, Diwali, anniversaries, weddings — mark the moment with living roots.",
  },
  {
    src: "/images/field-sunset.jpg",
    tag: "#LivingTribute",
    title: "In Loving Memory",
    blurb: "A quiet, growing tribute that gives back to the earth for decades.",
  },
];

export default function Campaigns() {
  return (
    <section className="bg-mist-50 py-8 md:py-16" aria-label="Planting campaigns">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Seasonal monsoon banner ── */}
        <div className="campaign-banner animate-on-scroll relative overflow-hidden rounded-3xl mb-10 shadow-xl">
          <div className="campaign-rain" aria-hidden="true" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-7 py-9 sm:px-12 sm:py-12">
            <div>
              <p className="text-white text-xl sm:text-2xl font-light leading-snug">
                The monsoon brings an opportunity to restore.
              </p>
              <p className="text-white/80 text-base sm:text-lg font-light leading-snug mt-1">
                Join us in planting during nature&apos;s most supportive season.
              </p>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 mt-6 bg-white text-forest-800 font-bold text-sm tracking-wide px-6 py-3 hover:bg-forest-50 transition-colors"
              >
                PLANT NOW
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="text-right shrink-0">
              <p className="font-serif text-3xl sm:text-5xl font-bold text-white leading-none">
                Trees <span className="text-forest-300 italic font-light text-2xl sm:text-3xl">of</span>
              </p>
              <p className="font-serif text-3xl sm:text-5xl font-bold text-white leading-none mt-1">
                Monsoon
              </p>
            </div>
          </div>
        </div>

        {/* ── Section heading ── */}
        <div className="text-center mb-8 animate-on-scroll">
          <p className="text-forest-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Ways to Plant
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900">
            A Tree for Every Occasion
          </h2>
        </div>

        {/* ── Campaign cards (2-up on mobile to keep scroll short, 4-up on desktop) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CAMPAIGNS.map((c, i) => (
            <Link
              key={c.title}
              href="/donate"
              className="campaign-card animate-on-scroll group relative block h-48 sm:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <Image
                src={c.src}
                alt={c.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(7,26,13,0) 35%, rgba(7,26,13,0.92) 100%)" }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block text-forest-200 text-[0.65rem] sm:text-xs font-semibold tracking-wide mb-1 sm:mb-2">
                  {c.tag}
                </span>
                <h3 className="font-serif text-sm sm:text-xl font-bold text-white leading-tight">{c.title}</h3>
                <p className="hidden sm:block text-white/0 group-hover:text-white/85 text-sm mt-1.5 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-300">
                  {c.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
