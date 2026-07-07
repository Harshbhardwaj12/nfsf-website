"use client";

/**
 * FloatingDonate.tsx — Persistent desktop-only floating "Plant a Tree" donate
 * pill (bottom-right), hidden on the donate flow itself.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Renders the desktop floating donate pill, hidden on /donate routes. */
export default function FloatingDonate() {
  const pathname = usePathname();
  if (pathname?.startsWith("/donate")) return null;

  return (
    <aside className="hidden md:flex fixed right-6 bottom-8 z-40" aria-label="Sponsor a tree">
      <Link
        href="/donate"
        className="inline-flex items-center gap-2.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-bold pl-5 pr-2 py-2 transition-colors shadow-xl ring-1 ring-black/5"
      >
        <span className="text-sm">Sponsor a Tree</span>
        <span className="inline-flex items-center rounded-full bg-white text-forest-800 font-bold text-sm px-3 py-1.5">
          ₹300
        </span>
      </Link>
    </aside>
  );
}
