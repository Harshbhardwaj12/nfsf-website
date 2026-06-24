import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden bg-forest-950"
      style={{ minHeight: "min(90vh, 760px)" }}
      aria-label="Hero — Nature and Farmer Sustainability Foundation"
    >
      {/* Photographic background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,26,13,0.55) 0%, rgba(7,26,13,0.45) 50%, rgba(7,26,13,0.70) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="inline-block text-forest-300 text-sm font-semibold tracking-widest uppercase mb-4">
            Plant Trees. Change Lives.
          </span>

          {/* Headline */}
          <h1
            className="font-semibold text-white mb-6"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 4rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Every Tree You Plant Feeds a Farmer Family
          </h1>

          {/* Subtext */}
          <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-9 max-w-xl font-light">
            Donate <strong className="font-semibold text-white">₹300</strong> and plant a tree in Andhra
            Pradesh. Get a verified digital certificate. Support local farming families restoring India&apos;s
            green cover.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/donate"
              className="btn-primary text-base py-3.5 px-7 w-full sm:w-auto justify-center min-h-[44px]"
            >
              Plant a Tree — ₹300
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/how-it-works"
              className="btn-outline-white text-base py-3.5 px-7 w-full sm:w-auto justify-center min-h-[44px]"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
