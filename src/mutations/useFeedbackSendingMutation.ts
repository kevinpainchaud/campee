import { useMutation } from "@tanstack/react-query";

import { sendFeedback } from "../services/feedback";

export const useFeedbackSendingMutation = () => {
  return useMutation({
    mutationFn: async ({ from, message }: { from?: string; message: string }) =>
      await sendFeedback({ from, message }),
  });
};
