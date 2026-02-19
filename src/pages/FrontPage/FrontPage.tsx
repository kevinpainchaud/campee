import { ContextSection } from "./ContextSection/ContextSection";
import { CtaSection } from "./CtaSection/CtaSection";
import { FeaturedSection } from "./FeaturedSection/FeaturedSection";
import { FeaturesSection } from "./FeaturesSection/FeaturesSection";
import { DemoPlayer } from "./HeroSection/DemoPlayer/DemoPlayer";
import { HeroSection } from "./HeroSection/HeroSection";
import { HowItWorksSection } from "./HowItWorksSection/HowItWorksSection";
import { WhyChooseUsSection } from "./WhyChooseUsSection/WhyChooseUsSection";
import { WhyUseItSection } from "./WhyUseItSection/WhyUseItSection";

export const FrontPage = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-26">
      <div className="centered-container">
        <HeroSection />
      </div>
      <div className="centered-container max-w-4xl">
        <DemoPlayer />
      </div>
      <div className="centered-container">
        <FeaturedSection />
      </div>
      <div className="centered-container">
        <FeaturesSection />
      </div>
      <div className="centered-container">
        <HowItWorksSection />
      </div>
      <div className="centered-container">
        <WhyUseItSection />
      </div>
      <WhyChooseUsSection />
      <div className="centered-container">
        <CtaSection />
      </div>
      <div className="centered-container">
        <ContextSection />
      </div>
    </div>
  );
};
