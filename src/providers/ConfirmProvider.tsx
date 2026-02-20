import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

import { ConfirmModal } from "../components/ConfirmModal/ConfirmModal";
import { ConfirmContext } from "../context/ConfirmContext";
import type { ConfirmOptions } from "../types/confirmOptions";

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { pathname } = useLocation();

  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions>();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const confirm = useCallback((confirmOptions: ConfirmOptions) => {
    setConfirmOptions(confirmOptions);
    setConfirmModalOpen(true);
  }, []);

  useEffect(() => {
    if (pathname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfirmModalOpen(false);
    }
  }, [pathname]);

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
