"use client";

/**
 * WhyItMatters landing section — explains the environmental and social impact
 * of each donation across several illustrated points.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";

const POINTS = [
  {
    title: "Carbon Credits & CO₂ Drawdown",
    body: "A single native tree sequesters approximately 10 kg of CO₂ per year for the first decade — and significantly more as it matures. For ₹300, we plant and tend it for you, so your tree keeps drawing down carbon for decades while you get on with your busy life. A permanent carbon sink, contributing to India's NDC commitments under the Paris Agreement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3C7 3 3 7.5 3 12c0 3.3 1.8 6.2 4.5 7.8h9C19.2 18.2 21 15.3 21 12c0-4.5-4-9-9-9z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1" />
        <rect x="11" y="17" width="2" height="5" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Indian Reforestation Policy Alignment",
    body: "NFSF works within the Government of India's Green India Mission and CAMPA framework. Our plantations are counted toward national forest cover targets, meaning your donation is doubly impactful — ecologically and institutionally.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1" />
        <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Farmer Livelihoods & Agroforestry",
    body: "We don't just plant trees — our own farmers integrate them into our dedicated farmland. Pongamia for biodiesel, Tamarind for income, Neem for soil health. The farmers who tend your tree earn from it, creating a virtuous cycle of ecology and economy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Biodiversity & Native Species",
    body: "Unlike monoculture plantations, NFSF plants diverse native species suited to local soil and climate. This supports bird populations, soil microbiomes, and groundwater recharge — a complete ecological restoration, not just a number on a ledger.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

/** Renders the "why it matters" impact-explanation section of the landing page. */
export default function WhyItMatters() {
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
    <section className="bg-white" aria-labelledby="why-heading">
      <div ref={sectionRef}>

        {/* ── Editorial intro: text + farmer livelihoods photo ───────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — text */}
            <div className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-widest text-forest-600 mb-3">
                Why It Matters
              </span>
              <h2
                id="why-heading"
                className="animate-on-scroll font-serif tracking-tight text-forest-900 mb-6"
                style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", lineHeight: 1.15 }}
              >
                A Tree Is the Most Efficient{" "}
                <span className="italic text-forest-700">Climate Machine</span> Ever Built
              </h2>
              <p
                className="animate-on-scroll text-gray-600 text-lg leading-relaxed max-w-prose"
                style={{ transitionDelay: "100ms" }}
              >
                India has committed to creating an additional carbon sink of 2.5–3 billion tonnes of
                CO₂ equivalent through forest and tree cover. Every tree you sponsor is a direct
                contribution to this national promise — we plant and care for it for you, and it
                keeps drawing down CO₂ for decades as a personal legacy that grows while you get on
                with your busy life.
              </p>

              {/* Signature line */}
              <div
                className="animate-on-scroll mt-8 h-px w-24 bg-gradient-to-r from-earth-500 to-transparent"
                style={{ transitionDelay: "150ms" }}
                aria-hidden="true"
              />
            </div>

            {/* Right — farmer livelihoods photo */}
            <div className="animate-on-scroll min-w-0" style={{ transitionDelay: "150ms" }}>
              <figure className="relative rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/farmer-field.jpg"
                    alt="One of our farmers preparing the land where sponsored trees grow."
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  {/* Forest-tinted gradient for caption legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,26,13,0) 45%, rgba(7,26,13,0.78) 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                    <p className="font-serif italic text-white text-base sm:text-lg leading-snug break-words">
                      Trees rooted in working farmland — not a number on a ledger.
                    </p>
                    <p className="text-white/75 text-xs mt-1 break-words">
                      Tended on our dedicated farmland
                    </p>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>
        </div>

        {/* ── Full-bleed warm photographic band (carbon / climate) ───── */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/images/india-farm-b.webp"
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Forest-tinted overlay — keeps text contrast ≥ 4.5:1 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(7,26,13,0.86) 0%, rgba(12,31,20,0.72) 45%, rgba(20,83,45,0.6) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Band copy */}
              <div className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-widest text-forest-300 mb-3">
                  The Compounding Return
                </span>
                <p
                  className="animate-on-scroll font-serif tracking-tight text-white break-words"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.25 }}
                >
                  Plant once. It keeps giving for{" "}
                  <span className="italic text-forest-300">fifty years</span> — drawing down
                  carbon every season it stands.
                </p>

                {/* Stat callout — restyled, overflow-safe */}
                <div className="animate-on-scroll mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/15" style={{ transitionDelay: "100ms" }}>
                  <p className="text-white/60 text-xs mb-3 uppercase tracking-widest break-words">
                    Your ₹300 Creates
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {[
                      { value: "10 kg", sub: "CO₂/year" },
                      { value: "50+", sub: "years lifespan" },
                      { value: "3×", sub: "farmer income boost" },
                    ].map((item) => (
                      <div key={item.sub} className="text-center min-w-0">
                        <div className="font-serif font-bold text-white text-xl sm:text-2xl break-words">{item.value}</div>
                        <div className="text-white/60 text-xs mt-0.5 break-words">{item.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Refined point items in a glass card */}
              <div className="animate-on-scroll min-w-0" style={{ transitionDelay: "150ms" }}>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/15 p-5 sm:p-7 lg:p-8">
                  {/* "Govt. Aligned" badge */}
                  <div className="absolute -top-3 left-5 sm:left-7 bg-earth-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg">
                    Govt. Aligned
                  </div>

                  <ul className="space-y-5 sm:space-y-6 mt-2">
                    {POINTS.map((point, i) => (
                      <li
                        key={point.title}
                        className="animate-on-scroll flex gap-4 min-w-0"
                        style={{ transitionDelay: `${(i + 3) * 80}ms` }}
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-forest-300 mt-0.5">
                          {point.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-white text-[15px] mb-1 break-words">{point.title}</h3>
                          <p className="text-white/65 text-sm leading-relaxed break-words">{point.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
