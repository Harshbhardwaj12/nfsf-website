import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import ProcessSteps from "@/components/landing/ProcessSteps";
import ProjectCard from "@/components/landing/ProjectCard";
import WhyNFSF from "@/components/landing/WhyNFSF";
import TrustSection from "@/components/landing/TrustSection";
import ImageStrip from "@/components/landing/ImageStrip";
import TreeSpecies from "@/components/landing/TreeSpecies";
import FAQ from "@/components/landing/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProcessSteps />
      <ProjectCard />
      <WhyNFSF />
      <TrustSection />
      <TreeSpecies />
      <ImageStrip />
      <FAQ />
    </>
  );
}
