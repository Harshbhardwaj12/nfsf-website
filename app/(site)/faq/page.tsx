/**
 * FAQ page ("/faq").
 * Renders answers to common donor questions about planting, pricing, and gifting.
 */
import type { Metadata } from "next";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "FAQ — Nature and Farmer Sustainability Foundation",
  description:
    "Answers to common questions about how NFSF plants and cares for your tree, what your ₹300 covers, gifting, verification, and the species we plant.",
};

/** Renders the FAQ page. */
export default function FAQPage() {
  return (
    <div className="pt-20 md:pt-24">
      <FAQ />
    </div>
  );
}
