/**
 * Root layout for the entire application.
 * Defines global metadata (SEO/OpenGraph), loads global styles, and injects a
 * resilient scroll-reveal script that animates elements independently of React.
 */
import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://nfsf.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nature and Farmer Sustainability Foundation — Plant a Tree for ₹300",
  description:
    "We plant a tree for you. For ₹300, our farmers plant and care for a real native tree on our dedicated farmland — you do nothing and get the carbon offset plus a personalised digital certificate. Made for busy people.",
  keywords: ["tree plantation", "India", "NGO", "carbon offset", "reforestation", "donate a tree", "plant a tree online", "gift a tree", "NFSF", "Nature and Farmer Sustainability Foundation"],
  applicationName: "NFSF",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "Nature and Farmer Sustainability Foundation",
    description: "We plant and care for a real tree for you, for ₹300. Get the carbon offset and a personalised digital certificate — without lifting a finger.",
    url: SITE_URL,
    siteName: "Nature and Farmer Sustainability Foundation",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/hero-banner.jpg", alt: "Native saplings planted on NFSF's dedicated farmland" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature and Farmer Sustainability Foundation",
    description: "Plant a real native tree for ₹300. We plant and care for it — you get the carbon offset and a personalised certificate.",
    images: ["/images/hero-banner.jpg"],
  },
};

/** Organization structured data (JSON-LD) so search engines show rich results. */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Nature and Farmer Sustainability Foundation",
  alternateName: "NFSF",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "An Indian nonprofit that plants and cares for native trees on its dedicated farmland on behalf of donors, for ₹300 per tree.",
  areaServed: "IN",
};

/** Root HTML shell wrapping every page with the global scroll-reveal script. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        {/* Resilient scroll-reveal: runs independently of React hydration and
            survives client-side route changes, so content can never stay hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;d.classList.add('js-reveal');var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target);}});},{threshold:0,rootMargin:'0px 0px -5% 0px'});var scan=function(){var els=document.querySelectorAll('.animate-on-scroll:not(.in-view)');for(var i=0;i<els.length;i++){io.observe(els[i]);}};var boot=function(){scan();var mo=new MutationObserver(function(){scan();});mo.observe(document.body,{childList:true,subtree:true});};if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot);}else{boot();}setTimeout(scan,300);setTimeout(scan,1200);}catch(e){document.documentElement.classList.remove('js-reveal');}})();`,
          }}
        />
      </body>
    </html>
  );
}
