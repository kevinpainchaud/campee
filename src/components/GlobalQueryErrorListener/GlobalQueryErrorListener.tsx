import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { getErrorMessage } from "../../utils/error";

export const GlobalQueryErrorListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const queryCache = queryClient.getQueryCache();
  const mutationCache = queryClient.getMutationCache();

  useEffect(() => {
    const unsubscribe = queryCache.subscribe((event) => {
      if (event.type === "updated" && event.action.type === "error") {
        enqueueSnackbar(getErrorMessage(event.action.error), {
          variant: "error",
        });
      }
    });

    return () => unsubscribe();
  }, [queryCache, enqueueSnackbar]);

  useEffect(() => {
    const unsubscribe = mutationCache.subscribe((event) => {
      if (event.type === "updated" && event.action.type === "error") {
        enqueueSnackbar(getErrorMessage(event.action.error), {
          variant: "error",
        });
      }
    });

    return () => unsubscribe();
  }, [mutationCache, enqueueSnackbar]);

  return null;
};
