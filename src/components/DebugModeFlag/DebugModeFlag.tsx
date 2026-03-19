import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { EnvContext } from "../../context/EnvContext";

export const DebugModeFlag = () => {
  const { debugModeEnabled } = useContext(EnvContext);

  const { t } = useTranslation();

  if (!debugModeEnabled) {
    return null;
  }

  return (
    <div className="bg-lemon-500 border-pill fixed bottom-0 left-1/2 z-1 -translate-x-1/2 rounded-t-lg border-b-0 px-2 py-1 font-mono text-xs">
      {t("components.debug_mode_flag.label")}
    </div>
  );
};
