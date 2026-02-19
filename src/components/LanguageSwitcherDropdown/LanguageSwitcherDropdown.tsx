import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

import { resources } from "../../i18n";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import type { DropdownMenuItem } from "../DropdownMenuItem/types";

export const LanguageSwitcherDropdown = () => {
  const {
    i18n: { changeLanguage, resolvedLanguage },
    t,
  } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleLanguageChange = useCallback(
    async (language: string) => {
      await changeLanguage(language);

      if (language !== resolvedLanguage) {
        enqueueSnackbar({
          message: t(
            "components.accessibility_controls.language_successfully_modified_message",
            { lng: language },
          ),
          variant: "success",
        });
      }
    },
    [changeLanguage, enqueueSnackbar, resolvedLanguage, t],
  );

  return (
    <Dropdown
      renderContent={({ close }) => (
        <DropdownMenu
          dropdownMenuItems={Object.keys(resources).map(
            (language) =>
              ({
                active: language === resolvedLanguage,
                label: language.toUpperCase(),
                onClick: () => {
                  close();
                  handleLanguageChange(language);
                },
                tagElement: "button",
              }) as DropdownMenuItem,
          )}
        />
      )}
      renderTrigger={({ active }) => (
        <Button
          rightIcon={active ? PiCaretDownBold : PiCaretUpBold}
          tagElement="button"
          title={t("components.accessibility_controls.language_button_title")}
          variant="transparent"
        >
          {resolvedLanguage?.toUpperCase()}
        </Button>
      )}
    />
  );
};
