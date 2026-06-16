import type { Metadata } from "next";
import HowItWorks from "@/components/landing/HowItWorks";

export const metadata: Metadata = {
  title: "How It Works — Nature and Farmer Sustainability Foundation",
  description:
    "Three simple steps: donate ₹300, we plant your tree in Andhra Pradesh, and you receive a verified digital certificate.",
};

export default function HowItWorksPage() {
  return (
    <div className="pt-16 md:pt-20">
      <HowItWorks />
    </div>
  );
}
