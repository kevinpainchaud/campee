import type { Config, ValidationErrors } from "final-form";
import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

import { APP_GLOBAL_VARIABLES } from "../../constants/appGlobalVariables";
import { useFeedbackSendingMutation } from "../../mutations/useFeedbackSendingMutation";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import { InputField } from "../InputField/InputField";
import { TextareaField } from "../TextareaField/TextareaField";
import type { FeedbackDrawerProps, FeedbackFormValues } from "./types";

export const FeedbackDrawer = ({ open, setOpen }: FeedbackDrawerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const {
    isSuccess: feedbackSendingIsSuccess,
    mutateAsync: sendFeedback,
    reset: resetFeedbackSendingMutation,
  } = useFeedbackSendingMutation();

  const onSubmit: Config<FeedbackFormValues>["onSubmit"] = useCallback(
    async (values, form) => {
      await sendFeedback({
        from: values.from?.trim(),
        message: values.message.trim(),
      });
      form.restart();
    },
    [sendFeedback],
  );

  const validate: Config<FeedbackFormValues>["validate"] = useCallback(
    (values: FeedbackFormValues) => {
      const errors: ValidationErrors = {};

      const minLength = 10;
      const maxLength = 5000;

      if (!values.message || values.message.trim() === "") {
        errors.message = t("common.form.required");
      } else if (values.message.trim().length < minLength) {
        errors.message = t("common.form.validation_errors.min_length", {
          count: minLength,
        });
      } else if (values.message.trim().length > maxLength) {
        errors.message = t("common.form.validation_errors.max_length", {
          count: maxLength,
        });
      }

      return errors;
    },
    [t],
  );

  useEffect(() => {
    if (feedbackSendingIsSuccess) {
      setOpen(false);
      resetFeedbackSendingMutation();
      enqueueSnackbar({
        message: t("components.feedback_drawer.success_message"),
        variant: "success",
      });
    }
  }, [
    enqueueSnackbar,
    feedbackSendingIsSuccess,
    resetFeedbackSendingMutation,
    setOpen,
    t,
  ]);

  return (
    <Form<FeedbackFormValues>
      onSubmit={onSubmit}
      render={({ handleSubmit, hasValidationErrors, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Drawer
            actionButton={
              <Button
                disabled={hasValidationErrors}
                loading={submitting}
                onClick={handleSubmit}
                tagElement="button"
                type="submit"
                variant="primary"
              >
                {t("components.feedback_drawer.submit_button_label")}
              </Button>
            }
            open={open}
            setOpen={setOpen}
            title={t("entities.feedback.actions.share_feedback")}
          >
            <p>{t("components.feedback_drawer.description")}</p>
            <InputField
              helperText={t(
                "components.feedback_drawer.from_input.helper_text",
              )}
              label={t("components.feedback_drawer.from_input.label")}
              name="from"
              optional
              type="email"
            />
            <TextareaField
              label={t("components.feedback_drawer.message_textarea.label")}
              name="message"
              placeholder={t(
                "components.feedback_drawer.message_textarea.placeholder",
              )}
            />
            <p>
              {t("components.feedback_drawer.contact_by_email_message")}{" "}
              <a
                className="underline"
                href={`mailto:${APP_GLOBAL_VARIABLES.app_email}`}
              >
                {APP_GLOBAL_VARIABLES.app_email}
              </a>
            </p>
          </Drawer>
        </form>
      )}
      validate={validate}
    />
  );
};
