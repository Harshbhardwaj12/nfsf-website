"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TIERS = [
  { trees: 1,  price: 300,   label: "A Sapling",    sub: "One tree, one certificate" },
  { trees: 5,  price: 1500,  label: "A Grove",      sub: "5 trees, ideal as a gift", popular: true },
  { trees: 10, price: 3000,  label: "A Forest Patch", sub: "10 trees, family legacy" },
];

export default function DonationCTA() {
  const [selected, setSelected] = useState(1);
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const currentTier = TIERS.find((t) => t.trees === selected) ?? TIERS[0];

  return (
    <section
      id="donate"
      className="py-20 lg:py-28 bg-forest-gradient relative overflow-hidden"
      aria-labelledby="donate-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
        />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <span className="inline-block text-forest-300 text-sm font-semibold uppercase tracking-widest mb-4">
              Donate Now
            </span>
            <h2
              id="donate-heading"
              className="animate-on-scroll font-serif text-white mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.15 }}
            >
              Sponsor a Tree for{" "}
              <span className="italic text-forest-300">₹300</span>
            </h2>
            <p className="animate-on-scroll text-white/70 text-lg leading-relaxed mb-8" style={{ transitionDelay: "100ms" }}>
              Your contribution is more than a donation — it&rsquo;s a living gift to the planet.
              Each tree will grow for 50+ years, sequester carbon, support biodiversity, and
              feed a farmer&rsquo;s family. You receive a personalised digital certificate you can
              share, frame, or gift.
            </p>

            {/* What you get */}
            <ul className="animate-on-scroll space-y-3 mb-8" style={{ transitionDelay: "150ms" }} role="list">
              {[
                "GPS-verified planting in Andhra Pradesh",
                "Digital certificate within 7 days",
                "Annual growth report via email",
                "80G tax exemption receipt",
                "Your name on our Donor Wall",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 text-forest-400" aria-hidden="true">
                    <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <p className="animate-on-scroll text-white/40 text-xs" style={{ transitionDelay: "200ms" }}>
              NGSF is registered under the Societies Registration Act, 1860. 80G & 12A exemptions apply.
            </p>
          </div>

          {/* Right — selector card */}
          <div className="animate-on-scroll" style={{ transitionDelay: "100ms" }}>
            <div className="bg-white rounded-3xl p-7 lg:p-9 shadow-2xl">
              <p className="text-forest-800 font-semibold mb-5 text-sm uppercase tracking-wide">
                Choose your impact
              </p>

              <div className="grid grid-cols-3 gap-3 mb-7" role="radiogroup" aria-label="Select number of trees">
                {TIERS.map((tier) => (
                  <button
                    key={tier.trees}
                    role="radio"
                    aria-checked={selected === tier.trees}
                    onClick={() => setSelected(tier.trees)}
                    className={`relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 ${
                      selected === tier.trees
                        ? "border-forest-700 bg-forest-50"
                        : "border-gray-200 bg-white hover:border-forest-300"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-earth-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        Popular
                      </span>
                    )}
                    <span className={`font-serif font-bold text-2xl mb-0.5 ${selected === tier.trees ? "text-forest-800" : "text-gray-700"}`}>
                      {tier.trees}
                    </span>
                    <span className={`text-xs font-medium ${selected === tier.trees ? "text-forest-600" : "text-gray-400"}`}>
                      {tier.trees === 1 ? "tree" : "trees"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Price display */}
              <div className="bg-forest-50 rounded-2xl p-5 mb-6 flex items-center justify-between">
                <div>
                  <p className="text-forest-700 font-semibold text-sm mb-0.5">{currentTier.label}</p>
                  <p className="text-gray-500 text-xs">{currentTier.sub}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif font-bold text-3xl text-forest-800">₹{currentTier.price.toLocaleString("en-IN")}</p>
                  <p className="text-gray-400 text-xs">+ tax receipt</p>
                </div>
              </div>

              {/* CO2 impact calc */}
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-7 bg-gray-50 rounded-xl p-3">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0 text-forest-600" aria-hidden="true">
                  <path d="M10 3C6.5 3 4 6 4 9c0 2.5 1.5 4.5 3.5 5.5h5C14.5 13.5 16 11.5 16 9c0-3-2.5-6-6-6z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="9" y="14" width="2" height="3" rx="1" fill="currentColor" />
                </svg>
                <span>
                  <strong className="text-forest-700">{selected * 10} kg</strong> CO₂ offset per year
                  · <strong className="text-forest-700">{selected * 10 * 20} kg</strong> over 20 years
                </span>
              </div>

              <Link
                href="/donate"
                className="btn-primary w-full justify-center text-base py-4"
                aria-label={`Donate ₹${currentTier.price.toLocaleString("en-IN")} to plant ${selected} ${selected === 1 ? "tree" : "trees"}`}
              >
                Plant {selected} {selected === 1 ? "Tree" : "Trees"} — ₹{currentTier.price.toLocaleString("en-IN")}
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">
                Secure payment · 80G receipt included · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
