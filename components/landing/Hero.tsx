"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

/* Leaf particle positions — deterministic to avoid hydration mismatch.
   Kept sparse + light so they read as drifting embers of light over the photo. */
const LEAVES = [
  { left: "12%", delay: "0s", duration: "15s", size: 8 },
  { left: "34%", delay: "5s", duration: "13s", size: 6 },
  { left: "62%", delay: "2s", duration: "16s", size: 9 },
  { left: "84%", delay: "7s", duration: "12s", size: 7 },
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
      className="relative min-h-dvh flex flex-col overflow-hidden bg-forest-950"
      aria-label="Hero — Nature and Farmer Sustainability Foundation"
    >
      {/* Photographic background — moody, light-beam forest */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/forest-mist.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Forest-tinted gradient overlays for text legibility (contrast ≥ 4.5:1) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,26,13,0.55) 0%, rgba(7,26,13,0.20) 38%, rgba(7,26,13,0.72) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(7,26,13,0.85) 0%, rgba(12,31,20,0.45) 42%, transparent 78%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle warm light bloom to echo the sun beams in the photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 72% 32%, rgba(217,119,6,0.16) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Leaf particles — sparse, light, classy over photo */}
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
              background: "rgba(187,247,208,0.55)",
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
            }}
          />
        ))}
      </div>

      {/* SVG Forest horizon — tasteful foreground accent grounding the photo */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        {/* Layer 3 — farthest, faintest */}
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full parallax-layer transition-transform duration-75"
          style={{ height: "clamp(90px, 13vw, 180px)" }}
        >
          <path
            d="M0,160 C80,120 160,80 280,100 C360,112 440,150 560,130 C640,116 720,70 840,85 C920,96 1000,140 1100,120 C1180,104 1280,60 1440,90 L1440,200 L0,200 Z"
            fill="rgba(7,26,13,0.45)"
          />
        </svg>
        {/* Layer 2 */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full absolute bottom-0 parallax-layer transition-transform duration-75"
          style={{ height: "clamp(70px, 11vw, 160px)" }}
        >
          <path
            d="M0,140 C60,100 140,55 240,70 C320,82 400,130 500,110 C580,94 660,50 780,65 C860,76 940,120 1060,100 C1160,82 1300,40 1440,70 L1440,180 L0,180 Z"
            fill="rgba(7,26,13,0.72)"
          />
        </svg>
        {/* Layer 1 — closest, solid; meets the section below seamlessly */}
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full absolute bottom-0"
          style={{ height: "clamp(54px, 9vw, 140px)" }}
        >
          <path
            d="M0,120 C80,70 180,30 300,50 C380,64 460,110 580,90 C660,76 740,30 880,45 C960,56 1040,100 1160,75 C1260,54 1360,20 1440,45 L1440,160 L0,160 Z"
            fill="#071A0D"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-48 md:pt-32 md:pb-52 lg:pb-56">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" aria-hidden="true" />
              <span className="text-white/85 text-xs font-semibold tracking-widest uppercase">
                We plant real trees — so you don't have to
              </span>
            </div>
            <p className="text-white/55 text-sm mb-5 max-w-md">
              Also a beautiful way to celebrate birthdays, Diwali, anniversaries, or remember someone special.
            </p>

            {/* Headline */}
            <h1
              className="font-serif text-white mb-6 break-words"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
            >
              Restore a Forest.
              <br className="hidden sm:block" />{" "}
              <span className="italic text-forest-300">Leave Living Roots</span> Behind You.
            </h1>

            {/* Subtext */}
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-9 max-w-xl font-sans font-light">
              Too busy to plant a tree yourself? For just{" "}
              <strong className="text-white font-semibold">₹300</strong>, our farmers plant and care for
              a native tree on our dedicated farmland — no time, land, or effort needed from you. It draws down
              carbon for decades, and we send you a digital certificate for the tree that carries your name.
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
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center border-t border-white/15 pt-7">
              {[
                { value: "12,450+", label: "Trees in the ground" },
                { value: "100%", label: "Cared for by us" },
                { value: "100%", label: "Verified & certified" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="stat-number font-semibold text-white text-xl leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-white/60 text-xs uppercase tracking-wide">{stat.label}</span>
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
