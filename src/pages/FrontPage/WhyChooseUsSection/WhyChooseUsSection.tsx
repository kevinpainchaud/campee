import "./index.css";

import { useMeasure } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

import { Logo } from "../../../components/Logo/Logo";
import { Tag } from "../../../components/Tag/Tag";
import { APP_GLOBAL_VARIABLES } from "../../../constants/appGlobalVariables";
import planningPokerLogo from "./assets/planning-poker-logo.webp";
import scrumpokerOnlineLogo from "./assets/scrumpoker-online-logo.webp";
import weagileyouLogo from "./assets/weagileyou-logo.webp";
import { CheckIcon } from "./CheckIcon/CheckIcon";
import { CrossIcon } from "./CrossIcon/CrossIcon";

export const WhyChooseUsSection = () => {
  const [tableRef, { height: tableHeight }] = useMeasure<HTMLTableElement>();
  const { t } = useTranslation();

  return (
    <div className="bg-lemon-50 relative border-t-2 border-b-4 border-zinc-950 py-12 md:px-6 md:py-20 dark:border-zinc-600 dark:bg-zinc-900">
      <Tag className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {t("pages.front_page.why_choose_us_section.subtitle")}
      </Tag>
      <div className="centered-container flex flex-col gap-8 md:gap-14">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="styled-h2">
            {t("pages.front_page.why_choose_us_section.title", {
              app_name: APP_GLOBAL_VARIABLES.app_name,
            })}
          </h2>
          <h3>
            {t("pages.front_page.why_choose_us_section.sub_subtitle", {
              app_name: APP_GLOBAL_VARIABLES.app_name,
            })}
          </h3>
        </div>
        <div className="relative">
          <div className="max-md:overflow-x-scroll max-md:py-2">
            <table className="comparative-table w-full" ref={tableRef}>
              <thead>
                <tr>
                  <th></th>
                  <th className="relative text-center">
                    <div
                      className="border-pill shadow-pill absolute top-0 min-w-full rounded-2xl"
                      style={{ height: tableHeight ?? undefined }}
                    ></div>
                    <div className="relative flex justify-center">
                      <Logo />
                    </div>
                  </th>
                  <th>
                    <img
                      alt={t(
                        "pages.front_page.why_choose_us_section.concurrent_logo_alt",
                        {
                          concurrent_name: "We agile you",
                        },
                      )}
                      className="max-w-48 grayscale dark:invert"
                      height={74}
                      src={weagileyouLogo}
                      width={284}
                    />
                  </th>
                  <th>
                    <div>
                      <img
                        alt={t(
                          "pages.front_page.why_choose_us_section.concurrent_logo_alt",
                          {
                            concurrent_name: "ScrumPoker-online",
                          },
                        )}
                        className="max-w-48 grayscale dark:invert"
                        height={74}
                        src={scrumpokerOnlineLogo}
                        width={284}
                      />
                    </div>
                  </th>
                  <th>
                    <div>
                      <img
                        alt={t(
                          "pages.front_page.why_choose_us_section.concurrent_logo_alt",
                          {
                            concurrent_name: "Planning poker",
                          },
                        )}
                        className="max-w-48 grayscale dark:invert"
                        height={74}
                        src={planningPokerLogo}
                        width={284}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="relative">
                <tr>
                  <th>
                    {t(
                      "pages.front_page.why_choose_us_section.comparison_points.unlimited_and free",
                    )}
                  </th>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th>
                    {t(
                      "pages.front_page.why_choose_us_section.comparison_points.no_ad",
                    )}
                  </th>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th>
                    {t(
                      "pages.front_page.why_choose_us_section.comparison_points.immersive_ui",
                    )}
                  </th>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                </tr>
                <tr>
                  <th>
                    {t(
                      "pages.front_page.why_choose_us_section.comparison_points.advanced_features",
                    )}
                  </th>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                </tr>
                <tr>
                  <th>
                    {t(
                      "pages.front_page.why_choose_us_section.comparison_points.open_source",
                    )}
                  </th>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="to-lemon-50 absolute top-0 right-0 h-full w-10 bg-linear-to-r from-transparent md:hidden dark:to-zinc-950"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
