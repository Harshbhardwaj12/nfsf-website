"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home",               href: "/" },
  { label: "About",              href: "/about" },
  { label: "How It Works",       href: "/how-it-works" },
  { label: "Impact",             href: "/impact" },
  { label: "Verify Certificate", href: "/verify" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  // Home has a dark hero, so the navbar can start transparent there.
  // Every other page has a light background, so force the solid style.
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <header
      ref={menuRef}
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? "navbar-scrolled" : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center min-h-[44px]" aria-label="Nature and Farmer Sustainability Foundation — Home">
          <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5">
            <Image
              src="/logo.png"
              alt="Nature & Farmers Sustainability Foundation"
              width={160}
              height={48}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-forest-500 ${
                    solid ? "text-forest-800" : "text-white/90"
                  } ${active ? "!text-forest-500 font-semibold" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/donate" className="btn-primary text-sm py-2.5 px-5 min-h-[44px] inline-flex items-center">
            Plant a Tree
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-md transition-colors min-h-[44px] flex items-center justify-center ${solid ? "text-forest-800" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
            {menuOpen ? (
              <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
            ) : (
              <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-forest-100 shadow-lg"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1 list-none m-0" role="list">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center min-h-[44px] px-3 py-2.5 font-medium rounded-md transition-colors ${
                      active
                        ? "bg-forest-50 text-forest-700"
                        : "text-forest-800 hover:bg-forest-50 hover:text-forest-700"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link href="/donate" className="btn-primary w-full justify-center min-h-[44px] inline-flex items-center" onClick={() => setMenuOpen(false)}>
                Plant a Tree
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
