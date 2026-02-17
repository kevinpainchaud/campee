import { useContext } from "react";

import { ConfirmContext } from "../context/ConfirmContext";

export const useConfirm = () => {
  const confirmContext = useContext(ConfirmContext);

  if (!confirmContext) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  return confirmContext;
};
