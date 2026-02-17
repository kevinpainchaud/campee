import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { PiMagnifyingGlassBold } from "react-icons/pi";

import { Button } from "../../components/Button/Button";
import { getTitleTagContent } from "../../utils/titleTag";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{getTitleTagContent(t("pages.not_found_page.title"))}</title>
      </Helmet>
      <div className="flex h-screen flex-col items-center justify-center gap-10 p-6">
        <div className="flex flex-col items-center gap-3">
          <PiMagnifyingGlassBold className="text-4xl md:text-5xl" />
          <h1 className="styled-h1 text-center">
            {t("pages.not_found_page.title")}
          </h1>
        </div>
        <Button size="lg" tagElement="anchor" to="/" variant="primary">
          {t("common.navigation.back_to_front_page_button_label")}
        </Button>
      </div>
    </>
  );
};
