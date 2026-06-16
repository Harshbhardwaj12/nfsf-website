import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MobileDonateBar from "@/components/landing/MobileDonateBar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Extra bottom padding so the fixed mobile donate bar never covers content */}
      <main className="pb-24 md:pb-0">{children}</main>
      <Footer />
      <MobileDonateBar />
    </>
  );
}
