import Link from "next/link";

const NAV = [
  { group: "Foundation", links: [
    { label: "About Us",         href: "#mission" },
    { label: "How It Works",     href: "#how-it-works" },
    { label: "Impact Reports",   href: "/impact" },
    { label: "Our Team",         href: "/about" },
  ]},
  { group: "Donors", links: [
    { label: "Donate Now",             href: "/donate" },
    { label: "Verify Certificate",     href: "/verify" },
    { label: "Donor Wall",             href: "/donors" },
    { label: "Corporate Partnerships", href: "/corporate" },
  ]},
  { group: "Legal", links: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Use",      href: "/terms" },
    { label: "80G Certificate",   href: "/80g" },
    { label: "FCRA Registration", href: "/fcra" },
  ]},
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-white" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-4 group" aria-label="Nature and Farmer Sustainability Foundation">
              <div className="w-9 h-9 rounded-lg bg-forest-700 flex items-center justify-center group-hover:bg-forest-600 transition-colors" aria-hidden="true">
                <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5 text-white">
                  <path d="M18 4C11 4 5 10.5 5 17c0 4.5 2.5 8.5 6 11h14c3.5-2.5 6-6.5 6-11 0-6.5-6-13-13-13z" fill="currentColor" fillOpacity="0.9" />
                  <rect x="16.5" y="23" width="3" height="9" rx="1.5" fill="currentColor" fillOpacity="0.7" />
                </svg>
              </div>
              <span className="font-serif font-semibold text-white text-base leading-tight">
                Nature &amp; Farmer<br />
                <span className="text-forest-400 font-normal text-sm">Sustainability Foundation</span>
              </span>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
              Restoring India&rsquo;s forests, one tree at a time. Registered NGO based in Bangalore,
              operating reforestation programs across Andhra Pradesh.
            </p>

            {/* Address */}
            <address className="not-italic text-white/50 text-xs leading-relaxed mb-5">
              Nature and Farmer Sustainability Foundation<br />
              12, Koramangala 4th Block,<br />
              Bengaluru, Karnataka — 560 034<br />
              India
            </address>

            {/* Contact */}
            <a
              href="mailto:hello@nfsf.in"
              className="text-forest-400 hover:text-forest-300 text-sm transition-colors"
            >
              hello@nfsf.in
            </a>
          </div>

          {/* Nav columns */}
          {NAV.map((group) => (
            <div key={group.group}>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">
                {group.group}
              </p>
              <ul className="space-y-2.5 list-none p-0 m-0" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs text-center sm:text-left">
            &copy; {year} Nature and Farmer Sustainability Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/25 text-xs">Reg. No. KA/2019/0049281</span>
            <span className="text-white/15 text-xs">·</span>
            <span className="text-white/25 text-xs">80G · 12A · FCRA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
