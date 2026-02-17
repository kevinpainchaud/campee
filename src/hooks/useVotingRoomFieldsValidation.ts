import type { Config, ValidationErrors } from "final-form";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import type { VotingRoomFormValues } from "../types/votingRoomFormValues";

export const useVotingRoomFieldsValidation = () => {
  const { t } = useTranslation();

  const minLength = 3;
  const maxLength = 40;

  const validate: Config<VotingRoomFormValues>["validate"] = useCallback(
    (values: VotingRoomFormValues) => {
      const errors: ValidationErrors = {};

      if (!values.name || values.name.trim() === "") {
        errors.name = t("common.form.required");
      } else if (values.name.trim().length < minLength) {
        errors.name = t("common.form.validation_errors.min_length", {
          count: minLength,
        });
      } else if (values.name.trim().length > maxLength) {
        errors.name = t("common.form.validation_errors.max_length", {
          count: maxLength,
        });
      }

      if (!values.votingSystem) {
        errors.votingSystem = t("common.form.required");
      }

      return errors;
    },
    [t],
  );

  return { validate };
};
