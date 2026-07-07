"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Persistent mobile-only donate pill (bottom-right).
 * Hidden on the donate flow itself, and hidden while the hero is in view
 * (the hero already has its own "Plant a Tree" button) so the two never overlap.
 */
export default function MobileDonateBar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) {
      setHidden(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname?.startsWith("/donate")) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 md:hidden transition-all duration-300 ${
        hidden ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <Link
        href="/donate"
        className="inline-flex items-center gap-2 rounded-full bg-forest-700 text-white font-bold pl-4 pr-2 py-2 shadow-xl ring-1 ring-black/10 transition-colors hover:bg-forest-800"
        aria-label="Sponsor a tree for ₹300"
      >
        <span className="text-sm">Sponsor a Tree</span>
        <span className="inline-flex items-center rounded-full bg-white text-forest-800 font-bold text-sm px-2.5 py-1">
          ₹300
        </span>
      </Link>
    </div>
  );
}
