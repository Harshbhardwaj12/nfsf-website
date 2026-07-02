/**
 * Impact page ("/impact").
 * Highlights carbon, biodiversity, and livelihood impact with donor testimonials.
 */
import type { Metadata } from "next";
import WhyItMatters from "@/components/landing/WhyItMatters";
import SocialProof from "@/components/landing/SocialProof";

export const metadata: Metadata = {
  title: "Impact — Nature and Farmer Sustainability Foundation",
  description:
    "Carbon offset, biodiversity, and farmer livelihoods — see why every tree we plant and care for matters, and hear from our donors.",
};

/** Renders the Impact page sections. */
export default function ImpactPage() {
  return (
    <div className="pt-20 md:pt-24">
      <WhyItMatters />
      <SocialProof />
    </div>
  );
}
