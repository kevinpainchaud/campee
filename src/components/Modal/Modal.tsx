import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { PiXBold } from "react-icons/pi";

import { Button } from "../Button/Button";
import type { ModalProps } from "./types";

export const Modal = ({
  children,
  footer,
  open,
  setOpen,
  title,
}: ModalProps) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog
      className="group/modal open:backdrop:overlay transition-discrete duration-200 backdrop:bg-transparent backdrop:duration-200 starting:open:backdrop:bg-transparent"
      onClick={(event) => {
        if (event.target === ref.current) {
          setOpen(false);
        }
      }}
      onClose={() => setOpen(false)}
      ref={ref}
    >
      <div className="group-not-open/modal:animate-out group-not-open/modal:slide-out-to-bottom-20 group-not-open/modal:fade-out group-open/modal:animate-in group-open/modal:slide-in-from-bottom-20 group-open/modal:fade-in border-pill shadow-pill fixed top-1/2 left-1/2 flex max-h-full w-full max-w-11/12 -translate-1/2 flex-col rounded-xl bg-white duration-200 md:w-xl md:max-w-none md:rounded-3xl dark:bg-zinc-900">
        <div className="flex items-center gap-4 p-6">
          <div className="grow font-semibold">{title}</div>
          <Button
            leftIcon={PiXBold}
            onClick={() => setOpen(false)}
            tagElement="button"
            title={t("common.actions.close")}
          ></Button>
        </div>
        <div
          className={classNames(
            "flex grow flex-col gap-6 overflow-y-auto px-6",
            { "pb-6": !footer },
          )}
        >
          {children}
        </div>
        {footer && <div className="p-6">{footer}</div>}
      </div>
    </dialog>
  );
};
