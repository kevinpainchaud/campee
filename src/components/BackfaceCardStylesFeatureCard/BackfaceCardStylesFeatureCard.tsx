import classNames from "classnames";
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
      className={classNames(className, "overflow-hidden")}
      title={t("components.backface_card_styles_feature_card.title")}
    >
      <div
        className="no-scrollbar flex w-[110%] -translate-x-[5%] -rotate-2 overflow-x-auto pb-6"
        inert
      >
        <Group />
        <Group />
      </div>
    </FeatureCard>
  );
};
