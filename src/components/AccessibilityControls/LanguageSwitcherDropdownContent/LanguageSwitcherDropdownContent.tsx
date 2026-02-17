import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PiFlagBold } from "react-icons/pi";

import { resources } from "../../../i18n";
import { DropdownMenu } from "../../DropdownMenu/DropdownMenu";
import type { DropdownMenuItem } from "../../DropdownMenuItem/types";
import type { LanguageSwitcherDropdownContentProps } from "./types";

export const LanguageSwitcherDropdownContent = ({
  onLanguageButtonClick,
}: LanguageSwitcherDropdownContentProps) => {
  const {
    i18n: { changeLanguage, resolvedLanguage },
    t,
  } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleLanguageButtonClick = useCallback(
    async (language: string) => {
      onLanguageButtonClick();

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
    [
      changeLanguage,
      enqueueSnackbar,
      onLanguageButtonClick,
      resolvedLanguage,
      t,
    ],
  );

  return (
    <DropdownMenu
      dropdownMenuItems={Object.keys(resources).map(
        (language) =>
          ({
            active: language === resolvedLanguage,
            icon: PiFlagBold,
            label: language.toUpperCase(),
            onClick: () => handleLanguageButtonClick(language),
            tagElement: "button",
          }) as DropdownMenuItem,
      )}
    />
  );
};
