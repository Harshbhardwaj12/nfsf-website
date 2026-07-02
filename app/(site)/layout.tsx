/**
 * Layout for the public marketing site (the "(site)" route group).
 * Wraps page content with the shared navbar, footer, and persistent donate CTAs.
 */
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MobileDonateBar from "@/components/landing/MobileDonateBar";
import FloatingDonate from "@/components/landing/FloatingDonate";

/** Chrome (nav/footer/donate CTAs) shared across all public marketing pages. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingDonate />
      <MobileDonateBar />
    </>
  );
}
