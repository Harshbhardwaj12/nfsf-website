"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="donate"
      className="py-20 lg:py-28 bg-forest-950 relative overflow-hidden"
      aria-labelledby="donate-heading"
    >
      {/* Textured leaf background — dense dark-green foliage, dimmed for legibility */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/leaves-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        {/* Forest gradient wash to deepen the texture and keep contrast high */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,26,13,0.94) 0%, rgba(12,31,20,0.88) 50%, rgba(20,83,45,0.82) 100%)",
          }}
        />
        {/* Soft corner glows for depth */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
        />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow header */}
        <div className="max-w-2xl mb-12 lg:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-forest-400/70" aria-hidden="true" />
            <span className="text-forest-300 text-xs font-semibold uppercase tracking-widest">
              Make Your Donation
            </span>
          </div>
          <h2
            id="donate-heading"
            className="animate-on-scroll font-serif text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
          >
            Sponsor a Tree for{" "}
            <span className="italic text-forest-300">₹300</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — image + copy */}
          <div>
            {/* Emotional image panel */}
            <div className="animate-on-scroll relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl mb-8 aspect-[16/10]">
              <Image
                src="/images/hands-sapling.jpg"
                alt="Cupped hands holding rich soil and a young fern sprout, ready for planting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Forest-tinted overlay for the caption */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 35%, rgba(7,26,13,0.78) 100%)" }}
                aria-hidden="true"
              />
              <p className="absolute bottom-4 left-5 right-5 text-white/90 text-sm font-light leading-snug">
                Every sapling is planted by hand and cared for as it takes root.
              </p>
            </div>

            <p className="animate-on-scroll text-white/75 text-lg leading-relaxed mb-8" style={{ transitionDelay: "100ms" }}>
              No time, land, or know-how needed — we do it all for you. For ₹300, our farmers plant and
              care for a native tree on our dedicated farmland. It grows for 50+ years, drawing down carbon and
              reviving soil and biodiversity, so your gift leaves a lasting climate legacy. In return, you
              receive a personalised digital certificate to keep, share, or gift to someone you love.
            </p>

            {/* What you get */}
            <ul className="animate-on-scroll space-y-3 mb-8" style={{ transitionDelay: "150ms" }} role="list">
              {[
                "A real native tree planted & cared for on our dedicated farmland",
                "Personalised digital certificate within 7 days",
                "Annual growth update delivered to your inbox",
                "Your name recorded on our public Donor Wall",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/85 text-sm">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-forest-500/20 ring-1 ring-forest-400/30">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-forest-300" aria-hidden="true">
                      <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="animate-on-scroll text-white/45 text-xs leading-relaxed" style={{ transitionDelay: "200ms" }}>
              NFSF is registered under the Societies Registration Act, 1860.
            </p>
          </div>

          {/* Right — selector card */}
          <div className="animate-on-scroll" style={{ transitionDelay: "100ms" }}>
            <div className="bg-white rounded-3xl p-7 lg:p-9 shadow-2xl ring-1 ring-black/5">
              <p className="text-forest-800 font-semibold mb-5 text-sm uppercase tracking-wide">
                Choose your impact
              </p>

              {/* Quantity stepper */}
              <div className="mb-7">
                <p className="text-forest-800 font-semibold mb-3 text-sm">How many trees?</p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSelected(Math.max(1, selected - 1))}
                    className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-400 hover:text-forest-700 transition-colors text-xl font-light focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
                    aria-label="Remove one tree"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="font-serif font-bold text-4xl text-forest-900">{selected}</span>
                    <span className="text-gray-400 text-sm ml-2">{selected === 1 ? "tree" : "trees"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(selected + 1)}
                    className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-400 hover:text-forest-700 transition-colors text-xl font-light focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
                    aria-label="Add one tree"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price display */}
              <div className="bg-forest-50 rounded-2xl p-5 mb-6 flex items-center justify-between">
                <div>
                  <p className="text-forest-700 font-semibold text-sm mb-0.5">{selected === 1 ? "One Tree" : `${selected} Trees`}</p>
                  <p className="text-gray-500 text-xs">{selected === 1 ? "One certificate, one living legacy" : `${selected} certificates · plant as many as you like`}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif font-bold text-3xl text-forest-800">₹{(selected * 300).toLocaleString("en-IN")}</p>
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
                aria-label={`Donate ₹${(selected * 300).toLocaleString("en-IN")} to plant ${selected} ${selected === 1 ? "tree" : "trees"}`}
              >
                Plant {selected} {selected === 1 ? "Tree" : "Trees"} — ₹{(selected * 300).toLocaleString("en-IN")}
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">
                Secure payment · Gifted with a personalised certificate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
