"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Step = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  accent: "forest" | "earth";
  meta: { label: string; icon: JSX.Element }[];
};

const CheckIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 3.2 4.5 8 4.5 8s4.5-4.8 4.5-8c0-2.5-2-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="8" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M8 1.5l5 2v4c0 3.2-2.2 5.4-5 6.5-2.8-1.1-5-3.3-5-6.5v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STEPS: Step[] = [
  {
    number: "01",
    eyebrow: "Your contribution",
    title: "You Donate",
    description:
      "Sponsor a single tree or a whole grove for ₹300 each — it takes just a few taps. No time, land, or effort needed on your part; every rupee funds planting and three years of care, all handled for you.",
    image: "/images/hands-sapling.jpg",
    alt: "Cupped hands cradling rich soil and a young green sprout, ready for planting.",
    accent: "forest",
    meta: [
      { label: "Secure online payment", icon: CheckIcon },
      { label: "Certificate within 7 days", icon: ShieldIcon },
    ],
  },
  {
    number: "02",
    eyebrow: "On the ground",
    title: "We Plant",
    description:
      "Our farmers plant a native sapling on our dedicated farmland and care for it for years — we photograph it and send updates as it grows. You lift not a finger.",
    image: "/images/planting-hand.jpg",
    alt: "A farmer's hand gently pressing a seedling into a nursery planting tray.",
    accent: "forest",
    meta: [
      { label: "Planted & cared for", icon: PinIcon },
      { label: "Photographed at planting", icon: CheckIcon },
    ],
  },
  {
    number: "03",
    eyebrow: "Your proof",
    title: "You Receive Your Certificate",
    description:
      "Within 7 days you receive a personalised digital certificate carrying your tree's species and planting date — a lasting, shareable record of the forest you helped grow, and an easy way to gift impact to someone you love.",
    image: "/images/india-farm-a.webp",
    alt: "Young trees taking root at a plantation site in Andhra Pradesh.",
    accent: "earth",
    meta: [
      { label: "Delivered within 7 days", icon: ClockIcon },
      { label: "Yours to share & gift", icon: PinIcon },
    ],
  },
];

const ACCENT = {
  forest: {
    badge: "bg-forest-700",
    eyebrow: "text-forest-600",
    chip: "text-forest-700 bg-forest-50 ring-forest-100",
  },
  earth: {
    badge: "bg-earth-500",
    eyebrow: "text-earth-500",
    chip: "text-earth-600 bg-amber-50 ring-amber-100",
  },
} as const;

export default function HowItWorks() {
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
    <section id="how-it-works" className="py-20 lg:py-28 bg-white overflow-hidden" aria-labelledby="how-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-forest-600 mb-3">
            Simple Process
          </span>
          <h2
            id="how-heading"
            className="font-serif tracking-tight text-forest-900 mb-4"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}
          >
            Three Steps to{" "}
            <span className="italic text-forest-700">Lasting Impact</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            From your donation to a tree rooted in real soil and cared for over years, every step is
            handled for you — so you can see the real impact your gift makes.
          </p>
        </div>

        {/* Editorial steps */}
        <div className="relative space-y-12 md:space-y-20 lg:space-y-24">
          {/* Vertical connector — desktop only, runs down the centre */}
          <div
            className="hidden md:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-forest-200 via-forest-300 to-earth-300 opacity-50"
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const accent = ACCENT[step.accent];
            const reversed = i % 2 === 1;
            return (
              <div
                key={step.number}
                className="animate-on-scroll relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Image */}
                <div className={reversed ? "md:order-2" : "md:order-1"}>
                  <figure className="group relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    {/* Subtle bottom gradient for badge legibility */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-forest-950/30 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    {/* Numbered step badge */}
                    <div
                      className={`absolute top-4 left-4 z-10 flex items-center justify-center w-12 h-12 rounded-2xl ${accent.badge} text-white font-serif text-lg font-semibold shadow-card ring-1 ring-white/20`}
                    >
                      {step.number}
                    </div>
                  </figure>
                </div>

                {/* Copy */}
                <div className={`${reversed ? "md:order-1 md:text-right md:items-end" : "md:order-2"} flex flex-col items-start`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest mb-2 ${accent.eyebrow}`}>
                    {step.eyebrow}
                  </span>
                  <h3 className="font-serif tracking-tight font-semibold text-forest-900 text-2xl lg:text-3xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base max-w-md">
                    {step.description}
                  </p>

                  {/* Meta chips */}
                  <ul className={`mt-5 flex flex-wrap gap-2 ${reversed ? "md:justify-end" : ""}`}>
                    {step.meta.map((m) => (
                      <li
                        key={m.label}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ${accent.chip}`}
                      >
                        {m.icon}
                        <span>{m.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 text-center animate-on-scroll" style={{ transitionDelay: "360ms" }}>
          <p className="text-sm text-gray-500 mb-4">Ready to put down roots?</p>
          <a href="/donate" className="btn-primary text-base min-h-[44px]">
            Sponsor a Tree Now — ₹300
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
