"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PRICE = 300;
const PRESETS = [1, 5, 10];
const GALLERY = [
  "/images/india-farm-b.webp",
  "/images/india-farm-c.webp",
  "/images/india-farm-d.webp",
  "/images/india-farm-a.webp",
];

export default function ProjectCard() {
  const [trees, setTrees] = useState(1);
  const [activeImg, setActiveImg] = useState(GALLERY[0]);
  const total = trees * PRICE;

  return (
    <section id="donate" className="bg-white" aria-labelledby="project-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — imagery */}
          <div>
            <a
              href={activeImg}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-gray-100 shadow-card"
              aria-label="Open full-size photo in a new tab"
            >
              <Image
                src={activeImg}
                alt="Tree plantation project on our dedicated farmland"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-forest-800 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M6 3H3v3M10 3h3v3M6 13H3v-3M10 13h3v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View full size
              </span>
            </a>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {GALLERY.map((src, i) => {
                const active = src === activeImg;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(src)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-2 transition-all ${
                      active ? "ring-forest-600" : "ring-gray-100 hover:ring-forest-300"
                    }`}
                    aria-label={`Show photo ${i + 1}`}
                    aria-pressed={active}
                  >
                    <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — details */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-forest-700 text-sm font-medium mb-3">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M10 18s6-5.3 6-10A6 6 0 1 0 4 8c0 4.7 6 10 6 10Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Planted & cared for, for you
            </span>

            <h2
              id="project-heading"
              className="text-forest-800 font-bold mb-4"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", lineHeight: 1.15 }}
            >
              Plant a Tree — We Do the Rest
            </h2>

            <p className="text-gray-600 leading-relaxed mb-7">
              Each tree you sponsor is planted and cared for by our farmers on our dedicated farmland —
              no time, land, or effort needed from you. It supports farmer families while drawing down
              carbon and rebuilding India&apos;s green cover for decades.
            </p>

            {/* Quantity selector */}
            <p className="text-forest-800 font-semibold text-sm mb-3">How many trees?</p>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTrees(p)}
                  className={`min-h-[44px] px-5 rounded-lg border-2 font-semibold transition-colors ${
                    trees === p
                      ? "border-forest-700 bg-forest-700 text-white"
                      : "border-gray-200 text-forest-800 hover:border-forest-400"
                  }`}
                  aria-pressed={trees === p}
                >
                  {p} {p === 1 ? "tree" : "trees"}
                </button>
              ))}
              {/* Custom stepper */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setTrees(Math.max(1, trees - 1))}
                  className="w-11 h-11 rounded-full border-2 border-gray-200 text-gray-500 hover:border-forest-400 hover:text-forest-700 transition-colors text-xl"
                  aria-label="Remove one tree"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-xl text-forest-900" aria-live="polite">
                  {trees}
                </span>
                <button
                  type="button"
                  onClick={() => setTrees(trees + 1)}
                  className="w-11 h-11 rounded-full border-2 border-gray-200 text-gray-500 hover:border-forest-400 hover:text-forest-700 transition-colors text-xl"
                  aria-label="Add one tree"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between bg-forest-50 rounded-xl px-5 py-4 mb-6">
              <span className="text-forest-700 font-medium text-sm">Total donation</span>
              <span className="text-forest-800 font-bold text-3xl">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href="/donate"
                className="btn-primary flex-1 justify-center text-base py-4"
              >
                Plant for Me
              </Link>
              <Link
                href="/donate"
                className="btn-outline flex-1 justify-center text-base py-4"
              >
                Gift Trees
              </Link>
            </div>

            <p className="text-gray-500 text-xs">
              Verified digital certificate included · Personalise it as a gift
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
