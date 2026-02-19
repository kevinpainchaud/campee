import { Trans, useTranslation } from "react-i18next";

import { ShowcaseItem } from "../../../components/ShowcaseItem/ShowcaseItem";
import { Illustration } from "./Illustration/Illustration";

export const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <ShowcaseItem
      illustration={<Illustration />}
      tagContent={t("pages.front_page.how_it_works_section.subtitle")}
      title={t("pages.front_page.how_it_works_section.title")}
    >
      <p>
        <Trans i18nKey="pages.front_page.how_it_works_section.paragraph" />
      </p>
    </ShowcaseItem>
  );
};
