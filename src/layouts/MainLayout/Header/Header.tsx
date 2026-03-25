import classNames from "classnames";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PiListBold } from "react-icons/pi";
import { Link } from "react-router";

import { Button } from "../../../components/Button/Button";
import { Logo } from "../../../components/Logo/Logo";
import { ThemeSwitcherButton } from "../../../components/ThemeSwitcherButton/ThemeSwitcherButton";
import { UserDropdown } from "../../../components/UserDropdown/UserDropdown";
import { APP_GLOBAL_VARIABLES } from "../../../constants/appGlobalVariables";
import { UserPreferencesContext } from "../../../context/UserPreferencesContext";
import { useDrawer } from "../../../hooks/useDrawer";
import type { HeaderProps } from "./types";

export const Header = ({ className }: HeaderProps) => {
  const { darkThemeEnabled } = useContext(UserPreferencesContext);

  const { setMainMenuDrawerOpen } = useDrawer();
  const { t } = useTranslation();

  return (
    <header className={classNames(className, "centered-container")}>
      <div className="border-pill shadow-pill bg-lemon-50 flex items-center gap-6 rounded-full border-2 px-4 py-1 md:px-8 lg:py-3 dark:bg-zinc-900">
        <Link className="default-style-none" to="/">
          <Logo />
        </Link>
        <a
          className="hidden lg:flex"
          href="https://www.producthunt.com/products/campee-planning-poker-online?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-campee"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt={`${APP_GLOBAL_VARIABLES.app_name} - ${t("common.app_baseline")} | Product Hunt`}
            height="40"
            src={`https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=1093728&theme=${darkThemeEnabled ? "dark" : "light"}&period=daily&t=1773561333713`}
            width="186"
          />
        </a>
        <div className="flex grow justify-end">
          <Button
            className="lg:hidden"
            leftIcon={PiListBold}
            onClick={() => setMainMenuDrawerOpen(true)}
            tagElement="button"
            title={t("common.navigation.main_menu_trigger_button_label")}
          />
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-2">
              <li>
                <UserDropdown />
              </li>
              <li>
                <ThemeSwitcherButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
