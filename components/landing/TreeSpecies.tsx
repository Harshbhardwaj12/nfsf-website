"use client";

import { useEffect, useRef } from "react";

type Species = {
  name: string;
  botanical: string;
  blurb: string;
  tags: string[];
};

const SPECIES: Species[] = [
  {
    name: "Neem",
    botanical: "Azadirachta indica",
    blurb:
      "A hardy evergreen that purifies air and soil, resists drought, and shelters wildlife — revered across India for its healing properties.",
    tags: ["Air-purifying", "Drought-hardy"],
  },
  {
    name: "Pongamia",
    botanical: "Pongamia pinnata",
    blurb:
      "A nitrogen-fixing canopy tree that restores tired soil and yields seeds for clean biodiesel — ecology and livelihood in one.",
    tags: ["Soil-restoring", "Biodiesel"],
  },
  {
    name: "Tamarind",
    botanical: "Tamarindus indica",
    blurb:
      "A long-living shade giant whose fruit supports farmer income for generations, while its deep roots hold and enrich the earth.",
    tags: ["Fruit-bearing", "Long-lived"],
  },
  {
    name: "Native Fruit Trees",
    botanical: "Mango · Jamun · Amla",
    blurb:
      "Indigenous fruit species that feed birds, pollinators, and people alike — turning a plantation into a living, working ecosystem.",
    tags: ["Biodiversity", "Pollinator-friendly"],
  },
];

const LeafMark = (
  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
    <path
      d="M26 6C14 6 7 12 7 22c0 1.5.3 3 .8 4.3C9 20 13 16 20 14c-5 3-8 7-9.5 13C20 27 26 19 26 6z"
      fill="#15803D"
      fillOpacity="0.15"
      stroke="#15803D"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TreeSpecies() {
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
    <section className="py-10 lg:py-28 bg-mist-50" aria-labelledby="species-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-forest-600 mb-3">
            What We Plant
          </span>
          <h2
            id="species-heading"
            className="font-serif tracking-tight text-forest-900 mb-4"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}
          >
            Native Species, Chosen to{" "}
            <span className="italic text-forest-700">Thrive</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            No monoculture. We plant a mix of indigenous trees suited to local soil and climate —
            each one earning its place ecologically and for the farmers who tend it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPECIES.map((s, i) => (
            <article
              key={s.name}
              className="animate-on-scroll group bg-white rounded-2xl p-6 ring-1 ring-black/5 border border-forest-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-forest-50 ring-1 ring-forest-100 mb-5">
                {LeafMark}
              </div>
              <h3 className="font-serif text-xl font-semibold text-forest-900">{s.name}</h3>
              <p className="text-forest-600 text-xs italic mb-3">{s.botanical}</p>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{s.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center rounded-full bg-forest-50 text-forest-700 ring-1 ring-forest-100 px-2.5 py-0.5 text-[11px] font-medium"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
