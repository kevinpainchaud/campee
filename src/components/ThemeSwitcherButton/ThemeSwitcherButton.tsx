import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PiMoonBold, PiSunBold } from "react-icons/pi";

import { UserPreferencesContext } from "../../context/UserPreferencesContext";
import { useTracking } from "../../hooks/useTracking";
import { Button } from "../Button/Button";
import { Tooltip } from "../Tooltip/Tooltip";
import type { ThemeSwitcherButtonProps } from "./types";

export const ThemeSwitcherButton = ({
  tooltipOptions,
}: ThemeSwitcherButtonProps) => {
  const { darkThemeEnabled, setDarkThemeEnabled } = useContext(
    UserPreferencesContext,
  );

  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <Tooltip
      {...tooltipOptions}
      content={
        darkThemeEnabled
          ? t(
              "components.accessibility_controls.light_theme_enabling_button_title",
            )
          : t(
              "components.accessibility_controls.dark_theme_enabling_button_title",
            )
      }
    >
      <Button
        leftIcon={darkThemeEnabled ? PiMoonBold : PiSunBold}
        onClick={() =>
          setDarkThemeEnabled((prev) => {
            if (prev) {
              track("click_light_theme_enabling_button");
            } else {
              track("click_dark_theme_enabling_button");
            }

            return !prev;
          })
        }
        tagElement="button"
        variant="transparent"
      />
    </Tooltip>
  );
};
