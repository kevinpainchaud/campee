import dayjs from "dayjs";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PiGithubLogoBold, PiHandHeart, PiHeartFill } from "react-icons/pi";
import { Link } from "react-router";

import { Button } from "../../../components/Button/Button";
import { Logo } from "../../../components/Logo/Logo";
import { APP_GLOBAL_VARIABLES } from "../../../constants/appGlobalVariables";
import { LEGAL_NOTICES_ROUTE_PATH } from "../../../constants/routes";
import { UserPreferencesContext } from "../../../context/UserPreferencesContext";
import { MadeInEuropeLogo } from "./MadeInEuropeLogo/MadeInEuropeLogo";

export const Footer = () => {
  const { darkThemeEnabled } = useContext(UserPreferencesContext);

  const { t } = useTranslation();

  return (
    <footer className="bg-zinc-900 text-white dark:bg-zinc-950">
      <div className="centered-container md:px-6">
        <div className="m-auto flex max-w-2xl flex-col gap-6 py-10 md:gap-12 md:py-28">
          <div className="flex flex-col items-center gap-3">
            <PiHandHeart className="text-5xl" />
            <h2 className="styled-h2">
              {t("layouts.main_layout.footer.title")}
            </h2>
          </div>
          <p>{t("layouts.main_layout.footer.description")}</p>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center">
            <Button
              reversed={!darkThemeEnabled}
              rightIcon={PiGithubLogoBold}
              size="lg"
              tagElement="anchor"
              target="_blank"
              to="https://github.com/kevinpainchaud/campee"
              variant="outline"
            >
              {t(
                "layouts.main_layout.footer.contribute_on_github_button_label",
              )}
            </Button>
            <a
              href="https://www.buymeacoffee.com/kevinpainchaud"
              target="_blank"
            >
              <img
                alt="Buy me a coffee"
                className="h-14"
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=kevinpainchaud&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
              />
            </a>
          </div>
        </div>
        <hr className="border-white/10" />
        <div className="flex flex-col gap-6 py-6 md:flex-row md:gap-12 md:py-12">
          <div className="flex grow flex-col items-center gap-6 md:flex-row md:gap-12">
            <Logo reversed={!darkThemeEnabled} showBeta />
            <MadeInEuropeLogo className="w-24 md:w-28" />
            <Link to={LEGAL_NOTICES_ROUTE_PATH}>
              {t("layouts.main_layout.footer.legal_notices")}
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 text-white/50 md:flex-row md:gap-12">
            <div>© Copyright {dayjs().year()}</div>
            <div className="flex items-center gap-2">
              <span>{t("layouts.main_layout.footer.made_with")}</span>
              <span>
                <PiHeartFill className="text-lg" />
              </span>
              <span>
                par{" "}
                <a href="https://www.kevinpainchaud.fr" target="_blank">
                  {APP_GLOBAL_VARIABLES.app_author}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
