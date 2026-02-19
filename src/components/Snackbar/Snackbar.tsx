import classNames from "classnames";
import { useSnackbar } from "notistack";
import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type IconType } from "react-icons";
import {
  PiCheckCircleBold,
  PiInfoBold,
  PiWarningOctagonBold,
  PiXBold,
} from "react-icons/pi";

import { Button } from "../Button/Button";
import type { SnackbarProps } from "./types";

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  ({ id, message, style, variant }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const { t } = useTranslation();

    const variantDetails = useMemo(():
      | { Icon: IconType; color?: "green" | "red" }
      | undefined => {
      switch (variant) {
        case "error":
          return { color: "red", Icon: PiWarningOctagonBold };
        case "info":
          return { Icon: PiInfoBold };
        case "success":
          return { color: "green", Icon: PiCheckCircleBold };
      }
    }, [variant]);

    return (
      <div
        className="border-pill shadow-pill bg-lemon-50 flex w-full items-center gap-2 rounded-xl px-3 py-2 md:max-w-96 dark:bg-zinc-950"
        ref={ref}
        role="alert"
        style={style}
      >
        {variantDetails && (
          <div>
            <variantDetails.Icon
              className={classNames({
                "text-green-600": variantDetails.color === "green",
                "text-red-600": variantDetails.color === "red",
              })}
              size={22}
            />
          </div>
        )}
        <div className="grow">{message}</div>
        <div>
          <Button
            leftIcon={PiXBold}
            onClick={() => closeSnackbar(id)}
            size="sm"
            tagElement="button"
            title={t("common.actions.close")}
            type="button"
          ></Button>
        </div>
      </div>
    );
  },
);
