import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { useStaticPageContent } from "../../hooks/useStaticPageContent";
import { getTitleTagContent } from "../../utils/titleTag";

export const LegalNoticePage = () => {
  const { error, isPending, markdownContent } =
    useStaticPageContent("legalNotice");
  const { t } = useTranslation();

  if (isPending) {
    return null;
  }

  if (error) {
    throw error;
  }

  return (
    <>
      <Helmet>
        <title>{getTitleTagContent(t("pages.legal_notice.title"))}</title>
      </Helmet>
      <div className="centered-container prose max-w-3xl">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </>
  );
};
