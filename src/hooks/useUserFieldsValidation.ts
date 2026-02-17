import type { Config, ValidationErrors } from "final-form";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import type { UserFormValues } from "../types/userFormValues";

export const useUserFieldsValidation = () => {
  const { t } = useTranslation();

  const minLength = 3;
  const maxLength = 24;

  const validate: Config<UserFormValues>["validate"] = useCallback(
    (values: UserFormValues) => {
      const errors: ValidationErrors = {};

      if (!values.displayName || values.displayName.trim() === "") {
        errors.displayName = t("common.form.required");
      } else if (values.displayName.trim().length < minLength) {
        errors.displayName = t("common.form.validation_errors.min_length", {
          count: minLength,
        });
      } else if (values.displayName.trim().length > maxLength) {
        errors.displayName = t("common.form.validation_errors.max_length", {
          count: maxLength,
        });
      }

      if (values.companyName && values.companyName.trim() !== "") {
        if (values.companyName.trim().length < minLength) {
          errors.companyName = t("common.form.validation_errors.min_length", {
            count: minLength,
          });
        } else if (values.companyName.trim().length > maxLength) {
          errors.companyName = t("common.form.validation_errors.max_length", {
            count: maxLength,
          });
        }
      }

      if (!values.backfaceCardStyleKey) {
        errors.backfaceCardStyleKey = t("common.form.required");
      }

      return errors;
    },
    [t],
  );

  return { validate };
};
