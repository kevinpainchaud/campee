import { useTranslation } from "react-i18next";

import { AnimationsFeatureCard } from "../../../components/AnimationsFeatureCard/AnimationsFeatureCard";
import { BackfaceCardStylesFeatureCard } from "../../../components/BackfaceCardStylesFeatureCard/BackfaceCardStylesFeatureCard";
import { NudgeSendingFeatureCard } from "../../../components/NudgeSendingFeatureCard/NudgeSendingFeatureCard";
import type { FeaturesSectionProps } from "./types";

export const FeaturesSection = ({ className }: FeaturesSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <h2 className="styled-h2 mb-8 text-center md:mb-16">
        {t("pages.front_page.features_section.title")}
      </h2>
      <div className="flex flex-col pb-4 lg:flex-row lg:*:w-1/2">
        <BackfaceCardStylesFeatureCard className="rotate-2" />
        <div className="flex flex-col lg:flex-row lg:*:w-1/2">
          <NudgeSendingFeatureCard className="-rotate-2" />
          <AnimationsFeatureCard className="rotate-2" />
        </div>
      </div>
    </div>
  );
};
