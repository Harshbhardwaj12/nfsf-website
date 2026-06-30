"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/** Background carousel slides — real plantation photography. */
const SLIDES = [
  "/images/india-farm-a.webp",
  "/images/farm-planting-2.webp",
  "/images/india-farm-c.webp",
  "/images/field-sunset.jpg",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
  }, []);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  // Dark arrows on the light mobile banner; translucent white on the dark desktop background.
  const arrowBtn =
    "absolute top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/45 lg:bg-white/20 lg:hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-sm ring-1 ring-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white lg:bg-forest-950 lg:min-h-[680px] lg:flex lg:items-center"
      aria-label="Hero — Nature and Farmer Sustainability Foundation"
    >
      {/* ── Image carousel: full banner on mobile (pushed below the fixed navbar so the whole photo is visible), full-bleed background on desktop ── */}
      <div className="relative mt-20 h-64 sm:mt-24 sm:h-80 bg-white lg:mt-0 lg:h-auto lg:absolute lg:inset-0 lg:bg-forest-950">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            {/* contain on mobile so the whole photo shows in proportion; cover on desktop where it's a background */}
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-contain lg:object-cover"
            />
          </div>
        ))}

        {/* Strong neutral scrim on desktop only (text overlays the photo there) */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.60) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Arrows — centred on the banner (mobile) / on the background (desktop) */}
        <button
          type="button"
          onClick={() => { go(index - 1); restart(); }}
          aria-label="Previous photo"
          className={`${arrowBtn} left-2 md:left-6`}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 md:w-5 md:h-5" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => { go(index + 1); restart(); }}
          aria-label="Next photo"
          className={`${arrowBtn} right-2 md:right-6`}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 md:w-5 md:h-5" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dots on the image (mobile only — desktop dots live under the copy) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { go(i); restart(); }}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>

      {/* ── Foreground copy: light panel below the banner on mobile, overlaid & centred on desktop ── */}
      <div className="relative z-10 max-w-3xl mx-auto w-full px-6 sm:px-10 lg:px-12 py-10 sm:py-14 lg:py-32 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200 lg:bg-white/10 lg:border-white/20 mb-5 sm:mb-6 lg:backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" aria-hidden="true" />
          <span className="text-forest-700 lg:text-white/85 text-xs font-semibold tracking-widest uppercase">
            We plant real trees — so you don&apos;t have to
          </span>
        </span>

        <h1
          className="font-serif text-forest-900 lg:text-white mb-5 sm:mb-6 break-words"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.25rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          Restore a Forest.{" "}
          <span className="italic text-forest-600 lg:text-forest-300">Leave Living Roots</span> Behind You.
        </h1>

        {/* Short copy on mobile, full copy on larger screens */}
        <p className="sm:hidden text-gray-600 lg:text-white/85 text-base leading-relaxed mb-7 font-light">
          For just <strong className="text-forest-800 lg:text-white font-semibold">₹300</strong>, our farmers plant and
          care for a native tree on our dedicated farmland — and you get a personalised certificate.
        </p>
        <p className="hidden sm:block text-gray-600 lg:text-white/85 text-lg leading-relaxed mb-4 font-light max-w-2xl mx-auto">
          Too busy to plant a tree yourself? For just{" "}
          <strong className="text-forest-800 lg:text-white font-semibold">₹300</strong>, our farmers plant and care
          for a native tree on our dedicated farmland — no time, land, or effort needed from you.
          It draws down carbon for decades, and you receive a personalised certificate.
        </p>
        <p className="hidden sm:block text-gray-500 lg:text-white text-sm mb-8">
          Also a beautiful way to celebrate birthdays, Diwali, anniversaries, or remember someone special.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Link href="/donate" className="btn-primary text-base py-3.5 px-7 w-full sm:w-auto justify-center min-h-[44px]">
            Plant a Tree — ₹300
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {/* Outline button: dark-green on the light mobile panel, white on the dark desktop background */}
          <Link href="/how-it-works" className="btn-outline lg:hidden text-base py-3.5 px-7 w-full sm:w-auto justify-center min-h-[44px]">
            How It Works
          </Link>
          <Link href="/how-it-works" className="btn-outline-white hidden lg:inline-flex text-base py-3.5 px-7 w-full sm:w-auto justify-center min-h-[44px]">
            How It Works
          </Link>
        </div>

        {/* dots (desktop) */}
        <div className="hidden lg:flex justify-center gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { go(i); restart(); }}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
