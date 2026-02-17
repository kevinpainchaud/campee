import { useMemo } from "react";
import { type FallbackProps } from "react-error-boundary";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { PiInfoBold, PiWarningOctagonBold } from "react-icons/pi";

import { Button } from "../../components/Button/Button";
import { getDetailedErrorMessage, getErrorMessage } from "../../utils/error";
import { getTitleTagContent } from "../../utils/titleTag";

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();

  const errorMessage = useMemo(() => getErrorMessage(error), [error]);

  const detailedErrorMessage = useMemo(
    () => getDetailedErrorMessage(error),
    [error],
  );

  return (
    <>
      <Helmet>
        <title>{getTitleTagContent(t("pages.error_page.title"))}</title>
      </Helmet>
      <div className="flex h-screen flex-col items-center justify-center gap-10 p-6">
        <div className="flex flex-col items-center gap-3">
          <PiWarningOctagonBold className="text-4xl md:text-5xl" />
          <h1 className="styled-h1 text-center">
            {t("pages.error_page.title")}
          </h1>
          {errorMessage && (
            <div className="flex items-center gap-2">
              <span>{errorMessage}</span>
              {detailedErrorMessage && (
                <PiInfoBold
                  className="pointer-coarse:hidden"
                  title={t("pages.error_page.error_message_tooltip", {
                    detailedErrorMessage,
                  })}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <Button
            onClick={resetErrorBoundary}
            size="lg"
            tagElement="anchor"
            to="/"
            variant="outline"
          >
            {t("common.navigation.back_to_front_page_button_label")}
          </Button>
          <Button
            onClick={resetErrorBoundary}
            size="lg"
            tagElement="button"
            variant="primary"
          >
            {t("pages.error_page.retry_button_label")}
          </Button>
        </div>
      </div>
    </>
  );
};
