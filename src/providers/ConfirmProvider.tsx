import { useCallback, useState } from "react";

import { ConfirmModal } from "../components/ConfirmModal/ConfirmModal";
import { ConfirmContext } from "../context/ConfirmContext";
import type { ConfirmOptions } from "../types/confirmOptions";

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions>();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const confirm = useCallback((confirmOptions: ConfirmOptions) => {
    setConfirmOptions(confirmOptions);
    setConfirmModalOpen(true);
  }, []);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        cancelButtonLabel={confirmOptions?.cancelButtonLabel}
        confirmButtonDanger={confirmOptions?.confirmButtonDanger}
        confirmButtonLabel={confirmOptions?.confirmButtonLabel}
        onConfirmButtonClick={confirmOptions?.onConfirm}
        open={confirmModalOpen}
        setOpen={(open) => {
          setConfirmModalOpen(open);

          if (!open) {
            confirmOptions?.onClose?.();
          }
        }}
        title={confirmOptions?.title}
      >
        {confirmOptions?.children}
      </ConfirmModal>
    </ConfirmContext.Provider>
  );
};
