import classNames from "classnames";

import AppLogo from "../../assets/images/app-logo.svg?react";
import { APP_GLOBAL_VARIABLES } from "../../constants/appGlobalVariables";
import type { LogoProps } from "./types";

export const Logo = ({ iconOnly, reversed, showBeta }: LogoProps) => {
  return (
    <div
      className={classNames("flex items-center gap-1 select-none", {
        "dark:text-lemon-50 text-zinc-900": !reversed,
        "text-lemon-50 dark:text-zinc-900": reversed,
      })}
    >
      <div
        className={classNames("w-6 lg:w-7", {
          "dark:fill-lemon-50 fill-zinc-900": !reversed,
          "fill-lemon-50 dark:fill-zinc-900": reversed,
        })}
      >
        <AppLogo />
      </div>
      {!iconOnly && (
        <div className="flex items-center gap-1">
          <div className="text-xl font-semibold tracking-tight lg:text-2xl">
            {APP_GLOBAL_VARIABLES.app_name}
          </div>
          {showBeta && <div className="text-xs">(beta)</div>}
        </div>
      )}
    </div>
  );
};
