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
      <div className="centered-container animate-in slide-in-from-bottom-[3rem] md:slide-in-from-bottom-[6rem] fade-in fill-mode-backwards transition-none delay-200 duration-1000">
        <HeroSection />
      </div>
      <div className="centered-container animate-in fade-in slide-in-from-bottom-[3rem] md:slide-in-from-bottom-[6rem] fill-mode-backwards max-w-4xl delay-400 duration-1000">
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
