import { useTranslation } from "react-i18next";

import { FeatureCard } from "../FeatureCard/FeatureCard";
import { Group } from "./Group/Group";
import type { BackfaceCardStylesFeatureCardProps } from "./types";

export const BackfaceCardStylesFeatureCard = ({
  className,
}: BackfaceCardStylesFeatureCardProps) => {
  const { t } = useTranslation();

  return (
    <FeatureCard
      className={className}
      title={t("components.backface_card_styles_feature_card.title")}
    >
      <div className="no-scrollbar flex overflow-x-auto pb-6" inert>
        <Group />
        <Group />
      </div>
    </FeatureCard>
  );
};
