"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",               href: "#home" },
  { label: "About",              href: "#mission" },
  { label: "How It Works",       href: "#how-it-works" },
  { label: "Verify Certificate", href: "/verify" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-scrolled" : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Nature and Farmer Sustainability Foundation — Home">
          {/* Logo placeholder */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-forest-700 group-hover:bg-forest-600 transition-colors"
            aria-hidden="true"
          >
            <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5 text-white" aria-hidden="true">
              <path
                d="M18 4C11 4 5 10.5 5 17c0 4.5 2.5 8.5 6 11h14c3.5-2.5 6-6.5 6-11 0-6.5-6-13-13-13z"
                fill="currentColor"
                fillOpacity="0.9"
              />
              <rect x="16.5" y="23" width="3" height="9" rx="1.5" fill="currentColor" fillOpacity="0.7" />
            </svg>
          </div>
          <span className={`font-serif font-semibold text-base leading-tight transition-colors ${scrolled ? "text-forest-900" : "text-white"}`}>
            NFSF<span className="hidden sm:inline font-normal text-sm ml-0.5 opacity-70"> Foundation</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-forest-500 ${
                  scrolled ? "text-forest-800" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="#donate" className="btn-primary text-sm py-2.5 px-5">
            Plant a Tree
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-md transition-colors ${scrolled ? "text-forest-800" : "text-white"}`}
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
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden bg-white border-t border-forest-100 shadow-lg"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1 list-none m-0" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block px-3 py-2.5 text-forest-800 font-medium rounded-md hover:bg-forest-50 hover:text-forest-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="#donate" className="btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
                Plant a Tree
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
