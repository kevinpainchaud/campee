import classNames from "classnames";

import AppLogo from "../../assets/images/app-logo.svg?react";
import { APP_GLOBAL_VARIABLES } from "../../constants/appGlobalVariables";
import type { LogoProps } from "./types";

export const Logo = ({ iconOnly, reversed, showBeta }: LogoProps) => {
  return (
    <div
      className={classNames("flex items-center gap-1 select-none", {
        "text-white dark:text-zinc-900": reversed,
        "text-zinc-900 dark:text-white": !reversed,
      })}
    >
      <div
        className={classNames("w-6 lg:w-7", {
          "fill-white dark:fill-zinc-900": reversed,
          "fill-zinc-900 dark:fill-white": !reversed,
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
