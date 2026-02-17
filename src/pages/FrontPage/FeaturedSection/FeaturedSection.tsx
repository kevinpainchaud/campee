import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { PiCoinBold, PiHandPeaceBold, PiUserCheckBold } from "react-icons/pi";

import { FeaturedCard } from "../../../components/FeaturedCard/FeaturedCard";
import type { FeaturedSectionProps } from "./types";

export const FeaturedSection = ({ className }: FeaturedSectionProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        className,
        "flex flex-col pb-4 md:mb-4 md:flex-row",
      )}
    >
      <FeaturedCard
        active
        className="z-10 rotate-2 md:translate-y-4 md:-rotate-4"
        description={t(
          "pages.front_page.featured_section.free_feature_card.description",
        )}
        icon={PiCoinBold}
        title={t("pages.front_page.featured_section.free_feature_card.title")}
      />
      <FeaturedCard
        className="z-20 -rotate-2 md:rotate-0"
        description={t(
          "pages.front_page.featured_section.no_registration_feature_card.description",
        )}
        icon={PiUserCheckBold}
        title={t(
          "pages.front_page.featured_section.no_registration_feature_card.title",
        )}
      />
      <FeaturedCard
        className="z-30 rotate-2 md:translate-y-4 md:rotate-4"
        description={t(
          "pages.front_page.featured_section.no_ad_feature_card.description",
        )}
        icon={PiHandPeaceBold}
        title={t("pages.front_page.featured_section.no_ad_feature_card.title")}
      />
    </div>
  );
};
