"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* Leaf particle positions — deterministic to avoid hydration mismatch */
const LEAVES = [
  { left: "8%",  delay: "0s",   duration: "14s", size: 10 },
  { left: "18%", delay: "3s",   duration: "11s", size: 7  },
  { left: "30%", delay: "6s",   duration: "16s", size: 9  },
  { left: "45%", delay: "1s",   duration: "13s", size: 6  },
  { left: "58%", delay: "8s",   duration: "10s", size: 11 },
  { left: "70%", delay: "4s",   duration: "15s", size: 8  },
  { left: "82%", delay: "2s",   duration: "12s", size: 7  },
  { left: "92%", delay: "7s",   duration: "9s",  size: 10 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      const layers = el.querySelectorAll<HTMLElement>(".parallax-layer");
      layers.forEach((layer, i) => {
        const factor = (i + 1) * 0.4;
        layer.style.transform = `translateX(${x * factor}px) translateY(${y * factor}px)`;
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-dvh flex flex-col overflow-hidden"
      aria-label="Hero — Nature and Farmer Sustainability Foundation"
    >
      {/* Dark forest background */}
      <div className="absolute inset-0 bg-forest-gradient" aria-hidden="true" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(22,163,74,0.18) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Leaf particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {LEAVES.map((leaf, i) => (
          <span
            key={i}
            className="leaf-particle"
            style={{
              left: leaf.left,
              bottom: "-20px",
              width: leaf.size,
              height: leaf.size * 1.4,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
            }}
          />
        ))}
      </div>

      {/* SVG Forest horizon — SIGNATURE ELEMENT */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        {/* Layer 4 — farthest, lightest */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="w-full parallax-layer transition-transform duration-75"
          style={{ height: "clamp(120px, 18vw, 220px)" }}
        >
          <path
            d="M0,180 C120,140 200,100 320,115 C380,122 440,160 520,145 C600,130 660,90 740,100 C820,110 880,155 960,140 C1040,125 1100,80 1180,95 C1260,110 1340,150 1440,130 L1440,220 L0,220 Z"
            fill="rgba(21,128,61,0.18)"
          />
        </svg>
        {/* Layer 3 */}
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full absolute bottom-0 parallax-layer transition-transform duration-75"
          style={{ height: "clamp(100px, 15vw, 200px)" }}
        >
          <path
            d="M0,160 C80,120 160,80 280,100 C360,112 440,150 560,130 C640,116 720,70 840,85 C920,96 1000,140 1100,120 C1180,104 1280,60 1440,90 L1440,200 L0,200 Z"
            fill="rgba(20,83,45,0.35)"
          />
        </svg>
        {/* Layer 2 */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full absolute bottom-0 parallax-layer transition-transform duration-75"
          style={{ height: "clamp(80px, 12vw, 180px)" }}
        >
          <path
            d="M0,140 C60,100 140,55 240,70 C320,82 400,130 500,110 C580,94 660,50 780,65 C860,76 940,120 1060,100 C1160,82 1300,40 1440,70 L1440,180 L0,180 Z"
            fill="rgba(12,31,20,0.55)"
          />
        </svg>
        {/* Layer 1 — closest, darkest */}
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full absolute bottom-0"
          style={{ height: "clamp(60px, 10vw, 160px)" }}
        >
          <path
            d="M0,120 C80,70 180,30 300,50 C380,64 460,110 580,90 C660,76 740,30 880,45 C960,56 1040,100 1160,75 C1260,54 1360,20 1440,45 L1440,160 L0,160 Z"
            fill="#0C1F14"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-48 md:pt-32 md:pb-52 lg:pb-56">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" aria-hidden="true" />
              <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
                Bangalore · Andhra Pradesh · India
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-white leading-tight mb-6 break-words" style={{ fontSize: "clamp(1.9rem, 5.5vw, 4.25rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Every Tree You Plant{" "}
              <span className="italic text-forest-300">Outlives You.</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-xl font-sans font-light">
              Sponsor a native tree in Andhra Pradesh for{" "}
              <strong className="text-white font-semibold">₹300</strong>. We plant it, nurture it, and
              send you a verified digital certificate — your permanent mark on the planet.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
              <Link href="#donate" className="btn-primary text-base py-3.5 px-7 w-full sm:w-auto min-h-[44px]">
                Plant a Tree — ₹300
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/how-it-works" className="btn-outline-white text-base py-3.5 px-7 w-full sm:w-auto min-h-[44px]">
                See How It Works
              </Link>
            </div>

            {/* Trust signal strip */}
            <div className="flex flex-wrap gap-6 items-center">
              {[
                { value: "12,450+", label: "Trees Planted" },
                { value: "₹1,000+", label: "Average Impact / Donor" },
                { value: "100%", label: "Verified Planting" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-serif font-semibold text-white text-lg">{stat.value}</span>
                  <span className="text-white/55 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50" aria-hidden="true">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <svg viewBox="0 0 16 24" fill="none" className="w-4 h-6 text-white animate-bounce">
          <path d="M8 4v16M4 16l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
