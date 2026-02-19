import "./index.css";

import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { PiArrowLeftBold, PiXBold } from "react-icons/pi";

import { Button } from "../Button/Button";
import { Spinner } from "../Spinner/Spinner";
import type { DrawerProps } from "./types";

export const Drawer = ({
  actionButton,
  backButton,
  children,
  isPending,
  open,
  setOpen,
  title,
}: DrawerProps) => {
  const { t } = useTranslation();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const bodyAttributeKey = "data-opened-drawer";
    const bodyAttribute = document.body.getAttribute(bodyAttributeKey);
    const openedDrawersCount = bodyAttribute ? parseInt(bodyAttribute) : 0;

    if (open) {
      dialogRef.current?.show();

      document.body.setAttribute(
        bodyAttributeKey,
        (openedDrawersCount + 1).toString(),
      );

      setTimeout(() => closeButtonRef.current?.focus());
    } else {
      dialogRef.current?.close();

      if (openedDrawersCount > 1) {
        document.body.setAttribute(
          bodyAttributeKey,
          (openedDrawersCount - 1).toString(),
        );
      } else {
        document.body.removeAttribute(bodyAttributeKey);
      }
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  return (
    <dialog
      className="group/drawer z-50 transition-discrete duration-200"
      onClose={() => setOpen(false)}
      ref={dialogRef}
    >
      <div
        className="overlay fixed inset-0 transition-opacity duration-200 group-not-open/drawer:opacity-0 group-open/drawer:opacity-100 starting:group-open/drawer:opacity-0"
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={classNames(
          "bg-lemon-50 fixed top-0 right-0 flex h-full w-full max-w-full flex-col duration-200 md:w-xl md:border-l-2 dark:border-l-zinc-600 dark:bg-zinc-950",
          "group-not-open/drawer:animate-out group-not-open/drawer:slide-out-to-right-20 group-not-open/drawer:fade-out group-open/drawer:animate-in group-open/drawer:slide-in-from-right-20 group-open/drawer:fade-in",
        )}
      >
        <div className="flex items-center gap-4 p-6">
          {backButton && (
            <Button
              leftIcon={PiArrowLeftBold}
              onClick={backButton.onClick}
              tagElement="button"
              title={t("common.actions.back")}
              type="button"
              variant="outline"
            />
          )}
          <div className="grow font-semibold">{title}</div>
          <Button
            leftIcon={PiXBold}
            onClick={() => setOpen(false)}
            ref={closeButtonRef}
            tagElement="button"
            title={t("common.actions.close")}
            type="button"
          />
        </div>
        {open && (
          <div
            className={classNames(
              "flex grow flex-col gap-6 overflow-y-auto px-6",
              { "pb-6": !actionButton },
            )}
          >
            {isPending ? (
              <div className="flex grow items-center justify-center">
                <Spinner />
              </div>
            ) : (
              children
            )}
          </div>
        )}
        {actionButton && <div className="p-6 *:w-full">{actionButton}</div>}
      </div>
    </dialog>
  );
};
