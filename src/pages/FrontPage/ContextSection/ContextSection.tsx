import { Trans, useTranslation } from "react-i18next";

import { Tag } from "../../../components/Tag/Tag";
import { APP_GLOBAL_VARIABLES } from "../../../constants/appGlobalVariables";
import { Avatar } from "./Avatar/Avatar";

export const ContextSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border-pill shadow-pill bg-lemon-50 relative m-auto mt-4 flex max-w-4xl flex-col gap-4 rounded-2xl p-10 md:mt-0 md:translate-y-0 md:gap-7 md:p-14 dark:bg-zinc-950">
      <Tag className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {t("pages.front_page.context_section.subtitle")}
      </Tag>
      <h2 className="styled-h2 text-center">
        {t("pages.front_page.context_section.title")}
      </h2>
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
        <Avatar className="border-pill shadow-pill bg-lemon-50 size-22 min-w-22 rounded-full md:size-28 md:min-w-28" />
        <p>
          <Trans
            i18nKey="pages.front_page.context_section.paragraph"
            values={{ app_name: APP_GLOBAL_VARIABLES.app_name }}
          />
        </p>
      </div>
    </div>
  );
};
