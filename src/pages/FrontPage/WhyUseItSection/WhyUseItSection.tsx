import { Trans, useTranslation } from "react-i18next";

import { ShowcaseItem } from "../../../components/ShowcaseItem/ShowcaseItem";
import { Illustration } from "./Illustration/Illustration";
import type { WhyUseItSectionProps } from "./types";

export const WhyUseItSection = ({ className }: WhyUseItSectionProps) => {
  const { t } = useTranslation();

  return (
    <ShowcaseItem
      className={className}
      illustration={<Illustration />}
      layout="illustrationLeft"
      tagContent={t("pages.front_page.why_use_it_section.subtitle")}
      title={t("pages.front_page.why_use_it_section.title")}
    >
      <p>
        <Trans i18nKey="pages.front_page.why_use_it_section.paragraph" />
      </p>
    </ShowcaseItem>
  );
};
