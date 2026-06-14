"use client";

import { useEffect, useRef } from "react";

const POINTS = [
  {
    title: "Carbon Credits & CO₂ Sequestration",
    body: "A single native tree sequesters approximately 10 kg of CO₂ per year for the first decade — and significantly more as it matures. Your ₹300 donation creates a permanent carbon sink, contributing to India's NDC commitments under the Paris Agreement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3C7 3 3 7.5 3 12c0 3.3 1.8 6.2 4.5 7.8h9C19.2 18.2 21 15.3 21 12c0-4.5-4-9-9-9z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1" />
        <rect x="11" y="17" width="2" height="5" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Indian Reforestation Policy Alignment",
    body: "NFSF works within the Government of India's Green India Mission and CAMPA framework. Our plantations are counted toward AP's state forest cover targets, meaning your donation is doubly impactful — ecologically and institutionally.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1" />
        <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Farmer Livelihoods & Agroforestry",
    body: "We don't just plant trees — we integrate them into existing farmlands. Pongamia for biodiesel, Tamarind for income, Neem for soil health. Farmers earn from the trees they tend, creating a virtuous cycle of ecology and economy.",
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="why-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — text */}
          <div>
            <span className="inline-block text-earth-500 text-sm font-semibold uppercase tracking-widest mb-3">
              Why It Matters
            </span>
            <h2
              id="why-heading"
              className="animate-on-scroll font-serif text-forest-900 mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.2 }}
            >
              A Tree Is the Most Efficient{" "}
              <span className="italic text-forest-700">Climate Machine</span> Ever Built
            </h2>
            <p className="animate-on-scroll text-gray-600 text-lg leading-relaxed mb-10" style={{ transitionDelay: "100ms" }}>
              India has committed to creating an additional carbon sink of 2.5–3 billion tonnes of
              CO₂ equivalent through forest and tree cover. Every tree you sponsor is a direct
              contribution to this national promise — and a personal legacy that grows for decades.
            </p>

            <div className="space-y-6">
              {POINTS.map((point, i) => (
                <div
                  key={point.title}
                  className="animate-on-scroll flex gap-4"
                  style={{ transitionDelay: `${(i + 2) * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mt-0.5">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest-900 mb-1">{point.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div className="animate-on-scroll relative" style={{ transitionDelay: "200ms" }}>
            {/* Big leaf SVG illustration */}
            <div className="relative rounded-3xl overflow-hidden bg-forest-gradient p-10 lg:p-12 min-h-[420px] flex flex-col justify-between">

              {/* Decorative background circles */}
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-white opacity-[0.04]" />
                <div className="absolute bottom-12 left-6 w-24 h-24 rounded-full bg-white opacity-[0.06]" />
              </div>

              {/* Large tree SVG */}
              <div className="relative z-10 flex justify-center mb-8" aria-hidden="true">
                <svg viewBox="0 0 180 200" fill="none" className="w-44 h-44 drop-shadow-lg">
                  {/* Canopy layers */}
                  <ellipse cx="90" cy="90" rx="70" ry="55" fill="rgba(34,197,94,0.25)" />
                  <ellipse cx="90" cy="75" rx="55" ry="45" fill="rgba(22,163,74,0.4)" />
                  <ellipse cx="90" cy="60" rx="40" ry="35" fill="rgba(21,128,61,0.65)" />
                  <ellipse cx="90" cy="48" rx="28" ry="24" fill="rgba(20,83,45,0.9)" />
                  {/* Trunk */}
                  <rect x="83" y="130" width="14" height="55" rx="7" fill="rgba(20,83,45,0.7)" />
                  {/* Roots */}
                  <path d="M83 178 C70 185 55 182 48 190" stroke="rgba(20,83,45,0.5)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M97 180 C110 187 125 184 132 192" stroke="rgba(20,83,45,0.5)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              {/* Key stat callout */}
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15">
                <p className="font-serif text-white/60 text-sm mb-3 uppercase tracking-wide">Your ₹300 Creates</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "10 kg", sub: "CO₂/year" },
                    { value: "50+", sub: "years lifespan" },
                    { value: "3×", sub: "farmer income boost" },
                  ].map((item) => (
                    <div key={item.sub} className="text-center">
                      <div className="font-serif font-bold text-white text-xl">{item.value}</div>
                      <div className="text-white/55 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-5 left-5 bg-earth-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Govt. Aligned
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
