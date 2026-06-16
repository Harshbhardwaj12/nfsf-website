import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center min-h-[44px] shrink-0"
            aria-label="Nature & Farmers Sustainability Foundation"
          >
            <span className="inline-flex items-center rounded-lg bg-white px-3 py-2">
              <Image
                src="/logo.png"
                alt="Nature & Farmers Sustainability Foundation"
                width={150}
                height={45}
              />
            </span>
          </Link>

          {/* Copyright + reg + contact */}
          <div className="flex flex-col gap-1.5 text-white/50 text-xs leading-relaxed md:text-center">
            <p>
              &copy; {year} Nature and Farmer Sustainability Foundation. All rights reserved.
            </p>
            <p>Reg. No. KA/2019/0049281 · 80G · 12A · FCRA</p>
            <a
              href="mailto:hello@nfsffoundation.org"
              className="inline-flex items-center min-h-[44px] text-forest-400 hover:text-forest-300 transition-colors"
            >
              hello@nfsffoundation.org
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 shrink-0">
            <Link
              href="/verify"
              className="inline-flex items-center min-h-[44px] text-white/70 hover:text-white text-sm transition-colors"
            >
              Verify Certificate
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-lg bg-earth-500 hover:bg-earth-600 text-white text-sm font-semibold transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
