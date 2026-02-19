import { useTranslation } from "react-i18next";
import { PiCoinBold, PiHandPeaceBold, PiUserCheckBold } from "react-icons/pi";

import { FeaturedCard } from "../../../components/FeaturedCard/FeaturedCard";

export const FeaturedSection = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 *:w-full md:gap-6 lg:flex-row">
      <FeaturedCard
        active
        description={t(
          "pages.front_page.featured_section.free_feature_card.description",
        )}
        icon={PiCoinBold}
        title={t("pages.front_page.featured_section.free_feature_card.title")}
      />
      <FeaturedCard
        description={t(
          "pages.front_page.featured_section.no_registration_feature_card.description",
        )}
        icon={PiUserCheckBold}
        title={t(
          "pages.front_page.featured_section.no_registration_feature_card.title",
        )}
      />
      <FeaturedCard
        description={t(
          "pages.front_page.featured_section.no_ad_feature_card.description",
        )}
        icon={PiHandPeaceBold}
        title={t("pages.front_page.featured_section.no_ad_feature_card.title")}
      />
    </div>
  );
};
