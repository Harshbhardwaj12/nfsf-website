import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center min-h-[44px]" aria-label="Nature & Farmers Sustainability Foundation">
              <Image
                src="/logo.png"
                alt="Nature & Farmers Sustainability Foundation"
                width={170}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mt-4">
              Restoring India&apos;s green cover, one tree at a time.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              India ·{" "}
              <a href="mailto:hello@nfsffoundation.org" className="text-forest-700 hover:text-forest-800 transition-colors">
                hello@nfsffoundation.org
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              href="/verify"
              className="inline-flex items-center min-h-[44px] text-gray-600 hover:text-forest-700 text-sm font-medium transition-colors"
            >
              Verify Certificate
            </Link>
            <Link
              href="/donate"
              className="btn-primary text-sm py-2.5 px-5 min-h-[44px] inline-flex items-center"
            >
              Donate
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-gray-400 text-xs">
            &copy; {year} Nature &amp; Farmers Sustainability Foundation. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">Reg. No. KA/2019/0049281</p>
        </div>
      </div>
    </footer>
  );
}
