/**
 * Home page (site root "/").
 * Composes the landing-page sections: hero, trust bar, featured project,
 * campaigns, process steps, and image strip.
 */
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import ProcessSteps from "@/components/landing/ProcessSteps";
import Campaigns from "@/components/landing/Campaigns";
import ProjectCard from "@/components/landing/ProjectCard";
import ImageStrip from "@/components/landing/ImageStrip";

/** Landing page assembling the marketing sections in display order. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProjectCard />
      <Campaigns />
      <ProcessSteps />
      <ImageStrip />
    </>
  );
}
