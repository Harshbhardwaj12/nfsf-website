/**
 * How It Works page ("/how-it-works").
 * Explains the donate-plant-verify flow, plus farm gallery and tree species.
 */
import type { Metadata } from "next";
import HowItWorks from "@/components/landing/HowItWorks";
import FarmGallery from "@/components/landing/FarmGallery";
import TreeSpecies from "@/components/landing/TreeSpecies";

export const metadata: Metadata = {
  title: "How It Works — Nature and Farmer Sustainability Foundation",
  description:
    "Three simple steps: donate ₹300, we plant and care for your tree, and you receive a verified digital certificate.",
};

/** Renders the How It Works page sections. */
export default function HowItWorksPage() {
  return (
    <div className="pt-20 md:pt-24">
      <HowItWorks />
      <FarmGallery />
      <TreeSpecies />
    </div>
  );
}
