import Navbar      from "@/components/landing/Navbar";
import Hero        from "@/components/landing/Hero";
import MissionStats from "@/components/landing/MissionStats";
import HowItWorks  from "@/components/landing/HowItWorks";
import WhyItMatters from "@/components/landing/WhyItMatters";
import SocialProof  from "@/components/landing/SocialProof";
import DonationCTA  from "@/components/landing/DonationCTA";
import Footer       from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MissionStats />
      <HowItWorks />
      <WhyItMatters />
      <SocialProof />
      <DonationCTA />
      <Footer />
    </main>
  );
}
