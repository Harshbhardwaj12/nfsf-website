"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Persistent mobile-only donate bar.
 * Shown on every marketing page so a visitor can convert from anywhere.
 * Hidden on the donate flow itself to avoid a redundant button.
 */
export default function MobileDonateBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/donate")) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-3">
      <Link
        href="/donate"
        className="flex items-center justify-center w-full min-h-[44px] rounded-xl bg-forest-700 text-white font-semibold text-base px-4 py-3 transition-colors hover:bg-forest-800"
      >
        Plant a Tree — ₹300
      </Link>
    </div>
  );
}
