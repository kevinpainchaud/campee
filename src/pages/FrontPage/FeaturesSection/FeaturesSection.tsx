import { useTranslation } from "react-i18next";

import { AnimationsFeatureCard } from "../../../components/AnimationsFeatureCard/AnimationsFeatureCard";
import { BackfaceCardStylesFeatureCard } from "../../../components/BackfaceCardStylesFeatureCard/BackfaceCardStylesFeatureCard";
import { NudgeSendingFeatureCard } from "../../../components/NudgeSendingFeatureCard/NudgeSendingFeatureCard";

export const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="styled-h2 mb-6 text-center md:mb-14">
        {t("pages.front_page.features_section.title")}
      </h2>
      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:*:w-1/2">
        <BackfaceCardStylesFeatureCard />
        <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:*:w-1/2">
          <NudgeSendingFeatureCard />
          <AnimationsFeatureCard />
        </div>
      </div>
    </div>
  );
};
