import { ContextSection } from "./ContextSection/ContextSection";
import { CtaSection } from "./CtaSection/CtaSection";
import { FeaturedSection } from "./FeaturedSection/FeaturedSection";
import { FeaturesSection } from "./FeaturesSection/FeaturesSection";
import { HeroSection } from "./HeroSection/HeroSection";
import { HowItWorksSection } from "./HowItWorksSection/HowItWorksSection";
import { WhyChooseUsSection } from "./WhyChooseUsSection/WhyChooseUsSection";
import { WhyUseItSection } from "./WhyUseItSection/WhyUseItSection";

export const FrontPage = () => {
  return (
    <div className="flex flex-col gap-12 overflow-x-hidden md:gap-24 md:pt-8">
      <HeroSection className="centered-container" />
      <FeaturedSection className="centered-container" />
      <FeaturesSection className="centered-container" />
      <div className="centered-container">
        <HowItWorksSection className="rotate-1" />
        <WhyUseItSection className="-rotate-1" />
      </div>
      <WhyChooseUsSection />
      <CtaSection className="centered-container" />
      <ContextSection className="centered-container" />
    </div>
  );
};
