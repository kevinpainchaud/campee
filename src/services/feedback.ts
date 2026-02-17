import { t } from "i18next";

import { supabase } from "../lib/supabaseClient";

export const sendFeedback = async ({
  from,
  message,
}: {
  from?: string;
  message: string;
}) => {
  const { error } = await supabase.functions.invoke("send_feedback", {
    body: { from, message },
  });

  if (error) {
    throw new Error(t("services.feedback.feedback_sent_error_message"));
  }
};
