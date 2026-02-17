import { useTranslation } from "react-i18next";

import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import type { ConfirmModalProps } from "./types";

export const ConfirmModal = ({
  cancelButtonLabel,
  children,
  confirmButtonDanger,
  confirmButtonLabel,
  onCancelButtonClick,
  onConfirmButtonClick,
  open,
  setOpen,
  title,
}: ConfirmModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      footer={
        <div className="flex flex-col justify-end gap-4 md:flex-row">
          <Button
            onClick={() => {
              setOpen(false);
              onCancelButtonClick?.();
            }}
            tagElement="button"
            variant="outline"
          >
            {cancelButtonLabel ??
              t("components.confirm_modal.cancel_button_label")}
          </Button>
          <Button
            danger={confirmButtonDanger}
            onClick={() => {
              setOpen(false);
              onConfirmButtonClick?.();
            }}
            tagElement="button"
            variant="primary"
          >
            {confirmButtonLabel ??
              t("components.confirm_modal.confirm_button_label")}
          </Button>
        </div>
      }
      open={open}
      setOpen={setOpen}
      title={title ?? t("components.confirm_modal.title")}
    >
      {children}
    </Modal>
  );
};
