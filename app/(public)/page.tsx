import { HeroSection } from "@/components/public/HeroSection";
import {
  FeatureSection,
  DEFAULT_FEATURES,
} from "@/components/public/FeatureSection";
import { StepsSection } from "@/components/public/StepsSection";
import ProjectShowcase from "@/components/public/ProjectShowcase";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProjectShowcase />
      <FeatureSection features={DEFAULT_FEATURES} />
      <StepsSection />
    </>
  );
}
