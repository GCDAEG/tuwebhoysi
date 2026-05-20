import { HeroSection } from "@/components/public/HeroSection";
import {
  ProjectShowcase,
  DEMO_PROJECTS,
} from "@/components/public/ProjectShowcase";
import {
  FeatureSection,
  DEFAULT_FEATURES,
} from "@/components/public/FeatureSection";
import { StepsSection } from "@/components/public/StepsSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProjectShowcase projects={DEMO_PROJECTS} />
      <FeatureSection features={DEFAULT_FEATURES} />
      <StepsSection />
    </>
  );
}