import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { APP_GLOBAL_VARIABLES } from "../constants/appGlobalVariables";

export const useStaticPageContent = (name: "legalNotice") => {
  const {
    i18n: { resolvedLanguage },
    t,
  } = useTranslation();

  const [markdownContent, setMarkdownContent] = useState<string>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setIsPending(true);
        const file = await import(
          `../locales/${resolvedLanguage}/pages/${name}.md?raw`
        );

        setMarkdownContent(
          Object.keys(APP_GLOBAL_VARIABLES).reduce(
            (acc, variableName) =>
              acc.replaceAll(
                `{{${variableName}}}`,
                APP_GLOBAL_VARIABLES[
                  variableName as keyof typeof APP_GLOBAL_VARIABLES
                ],
              ),
            file.default,
          ),
        );
      } catch {
        setError(
          new Error(
            t("hooks.use_static_page_content.error_message", {
              language: resolvedLanguage?.toUpperCase(),
            }),
          ),
        );
      } finally {
        setIsPending(false);
      }
    };

    // eslint-disable-next-line react-you-might-not-need-an-effect/no-derived-state, react-you-might-not-need-an-effect/no-pass-data-to-parent
    loadMarkdown();
  }, [name, resolvedLanguage, t]);

  return {
    error,
    isPending,
    markdownContent,
  };
};
