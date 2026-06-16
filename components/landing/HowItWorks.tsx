"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "You Donate",
    description:
      "Contribute ₹300 per tree securely online. Choose to sponsor 1 tree or a whole grove. Your payment directly funds planting and 3-year maintenance.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#F0FDF4" stroke="#15803D" strokeWidth="1.5" />
        <path d="M16 26l5 5 11-11" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 14v3M17 17l2 2M31 17l-2 2" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "#15803D",
  },
  {
    number: "02",
    title: "We Plant",
    description:
      "Our on-ground team and partner farmers plant a native tree in Andhra Pradesh within 30 days. Each tree is GPS-tagged and photographed at planting.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#F0FDF4" stroke="#15803D" strokeWidth="1.5" />
        <path d="M24 10c-5.5 0-10 5-10 10 0 3.5 2 6.5 5 8.5h10c3-2 5-5 5-8.5 0-5-4.5-10-10-10z" fill="#15803D" fillOpacity="0.15" stroke="#15803D" strokeWidth="1.3" />
        <rect x="22.5" y="27" width="3" height="8" rx="1.5" fill="#15803D" />
        <path d="M19 22c1.5-2 3.5-3 5-4" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    accent: "#14532D",
  },
  {
    number: "03",
    title: "You Receive Your Certificate",
    description:
      "Within 7 days of planting, you receive a personalised digital certificate with your tree's GPS coordinates, species name, and planting date. Share it, frame it, cherish it.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
        <rect x="14" y="15" width="20" height="18" rx="2.5" fill="#B45309" fillOpacity="0.1" stroke="#B45309" strokeWidth="1.3" />
        <path d="M18 21h12M18 25h8" stroke="#B45309" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="31" cy="31" r="5" fill="#B45309" />
        <path d="M29 31l1.5 1.5L33 29" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "#B45309",
  },
];

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-mist-50" aria-labelledby="how-heading">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block text-earth-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Simple Process
          </span>
          <h2
            id="how-heading"
            className="font-serif text-forest-900 mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.2 }}
          >
            Three Steps to{" "}
            <span className="italic text-forest-700">Lasting Impact</span>
          </h2>
          <p className="text-gray-500 text-lg">
            No complex forms. No hidden fees. Just you, a tree, and a certificate you&rsquo;ll be proud of.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-forest-200 via-forest-400 to-earth-400 opacity-40"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="animate-on-scroll relative flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Step number badge */}
                <div
                  className="relative z-10 mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-card"
                >
                  {step.icon}
                </div>

                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 font-serif font-bold text-7xl leading-none select-none pointer-events-none"
                  style={{ color: step.accent, opacity: 0.06 }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <h3
                  className="font-serif font-semibold text-forest-900 text-xl mb-3"
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA nudge */}
        <div className="mt-14 text-center animate-on-scroll" style={{ transitionDelay: "400ms" }}>
          <p className="text-sm text-gray-400 mb-4">Ready to make your mark?</p>
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
