/**
 * About page ("/about").
 * Introduces NFSF's mission and displays headline impact stats.
 */
import type { Metadata } from "next";
import MissionStats from "@/components/landing/MissionStats";

export const metadata: Metadata = {
  title: "About — Nature and Farmer Sustainability Foundation",
  description:
    "NFSF works with our own farmers to plant and care for native trees on our dedicated farmland, restoring degraded ground one tree at a time.",
};

/** Renders the About page mission section. */
export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-24">
      <MissionStats />
    </div>
  );
}
