import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PiGlobeBold, PiMoonBold, PiSunBold } from "react-icons/pi";

import { UserPreferencesContext } from "../../context/UserPreferencesContext";
import { useTracking } from "../../hooks/useTracking";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { LanguageSwitcherDropdownContent } from "./LanguageSwitcherDropdownContent/LanguageSwitcherDropdownContent";
import type { AccessibilityControlsProps } from "./types";

export const AccessibilityControls = ({
  className,
}: AccessibilityControlsProps) => {
  const { darkThemeEnabled, setDarkThemeEnabled } = useContext(
    UserPreferencesContext,
  );

  const { t } = useTranslation();
  const { track } = useTracking();

  return (
    <nav className={className}>
      <ul className="flex items-center">
        <li>
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
            title={
              darkThemeEnabled
                ? t(
                    "components.accessibility_controls.light_theme_enabling_button_title",
                  )
                : t(
                    "components.accessibility_controls.dark_theme_enabling_button_title",
                  )
            }
            variant="transparent"
          />
        </li>
        <li>
          <Dropdown
            renderContent={({ close }) => (
              <LanguageSwitcherDropdownContent onLanguageButtonClick={close} />
            )}
            renderTrigger={() => (
              <Button
                leftIcon={PiGlobeBold}
                tagElement="button"
                title={t(
                  "components.accessibility_controls.language_button_title",
                )}
                variant="transparent"
              />
            )}
          />
        </li>
      </ul>
    </nav>
  );
};
