import type { Metadata } from "next";
import MissionStats from "@/components/landing/MissionStats";

export const metadata: Metadata = {
  title: "About — Nature and Farmer Sustainability Foundation",
  description:
    "Founded in Bangalore in 2019, NFSF partners with farming communities in Andhra Pradesh to restore degraded land, one tree at a time.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <MissionStats />
    </div>
  );
}
