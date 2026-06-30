import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MobileDonateBar from "@/components/landing/MobileDonateBar";
import FloatingDonate from "@/components/landing/FloatingDonate";

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
