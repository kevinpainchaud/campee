import { t } from "i18next";

import { APP_GLOBAL_VARIABLES } from "../constants/appGlobalVariables";

export const getTitleTagContent = (pageName?: string) =>
  [APP_GLOBAL_VARIABLES.app_name, pageName ?? t("common.app_description")].join(
    " · ",
  );
