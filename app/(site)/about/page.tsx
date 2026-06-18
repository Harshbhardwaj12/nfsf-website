import type { Metadata } from "next";
import MissionStats from "@/components/landing/MissionStats";

export const metadata: Metadata = {
  title: "About — Nature and Farmer Sustainability Foundation",
  description:
    "NFSF works with our own farmers to plant and care for native trees on our dedicated farmland, restoring degraded ground one tree at a time.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <MissionStats />
    </div>
  );
}
