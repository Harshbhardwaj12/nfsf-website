import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nature and Farmer Sustainability Foundation — Plant a Tree for ₹300",
  description:
    "We plant a tree for you. For ₹300, our farmers plant and care for a real native tree on our own land — you do nothing and get the carbon offset plus a personalised digital certificate. Made for busy people.",
  keywords: ["tree plantation", "India", "NGO", "carbon credits", "carbon offset", "reforestation", "donate", "plant a tree online", "gift a tree"],
  openGraph: {
    title: "Nature and Farmer Sustainability Foundation",
    description: "We plant and care for a real tree for you, for ₹300. Get the carbon offset and a personalised digital certificate — without lifting a finger.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
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
