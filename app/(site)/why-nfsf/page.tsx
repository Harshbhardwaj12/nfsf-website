/**
 * Why NFSF page ("/why-nfsf").
 * Makes the trust case for NFSF with real-land/real-farmers proof points.
 */
import type { Metadata } from "next";
import WhyNFSF from "@/components/landing/WhyNFSF";
import TrustSection from "@/components/landing/TrustSection";

export const metadata: Metadata = {
  title: "Why NFSF — Nature and Farmer Sustainability Foundation",
  description:
    "Real land, real farmers, and proof you can check. See why NFSF is a trustworthy way to plant and care for native trees.",
};

/** Renders the Why NFSF page sections. */
export default function WhyNFSFPage() {
  return (
    <div className="pt-20 md:pt-24">
      <WhyNFSF />
      <TrustSection />
    </div>
  );
}
