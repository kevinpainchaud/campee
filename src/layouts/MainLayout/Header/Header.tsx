import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { PiListBold } from "react-icons/pi";
import { Link } from "react-router";

import { AccessibilityControls } from "../../../components/AccessibilityControls/AccessibilityControls";
import { Button } from "../../../components/Button/Button";
import { Logo } from "../../../components/Logo/Logo";
import { UserDropdown } from "../../../components/UserDropdown/UserDropdown";
import { useDrawer } from "../../../hooks/useDrawer";
import type { HeaderProps } from "./types";

export const Header = ({ className }: HeaderProps) => {
  const { setMainMenuDrawerOpen } = useDrawer();
  const { t } = useTranslation();

  return (
    <header className={classNames(className, "centered-container")}>
      <div className="border-pill shadow-pill bg-lemon-50 flex items-center rounded-full border-2 px-4 py-1 transition-colors md:px-8 lg:py-3 dark:bg-zinc-900">
        <Link className="default-style-none" to="/">
          <Logo showBeta />
        </Link>
        <div className="flex grow justify-end gap-6">
          <Button
            className="lg:hidden"
            leftIcon={PiListBold}
            onClick={() => setMainMenuDrawerOpen(true)}
            tagElement="button"
            title={t("common.navigation.main_menu_trigger_button_label")}
          />
          <div className="hidden lg:flex">
            <UserDropdown />
          </div>
          <AccessibilityControls className="hidden lg:flex" />
        </div>
      </div>
    </header>
  );
};
