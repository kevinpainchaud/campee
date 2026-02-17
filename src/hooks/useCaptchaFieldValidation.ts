import type { Config, ValidationErrors } from "final-form";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import type { CaptchaFormValues } from "../types/captchaFormValues";

export const useCaptchaFieldValidation = () => {
  const { t } = useTranslation();

  const validate: Config<CaptchaFormValues>["validate"] = useCallback(
    (values: CaptchaFormValues) => {
      const errors: ValidationErrors = {};

      if (!values.captchaToken) {
        errors.captchaToken = t("common.form.required");
      }

      return errors;
    },
    [t],
  );

  return { validate };
};
