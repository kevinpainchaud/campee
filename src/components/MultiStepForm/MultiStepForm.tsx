import type { ValidationErrors } from "final-form";
import { useCallback, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

import { Button } from "../Button/Button";
import type { MultiStepFormProps } from "./types";

export const MultiStepForm = <FormValues,>({
  initialValues,
  onSubmit,
  render,
  steps,
  submitButtonLabel,
}: MultiStepFormProps<FormValues>) => {
  const { t } = useTranslation();

  const [activeEnabledStepIndex, setActiveEnabledStepIndex] = useState(0);

  const enabledSteps = useMemo(
    () =>
      steps.filter(({ enabled }) => enabled === undefined || enabled === true),
    [steps],
  );

  const activeEnabledStep = useMemo(
    () => enabledSteps[activeEnabledStepIndex] ?? enabledSteps[0],
    [enabledSteps, activeEnabledStepIndex],
  );

  const hasNextStep = useMemo(
    () => activeEnabledStepIndex < enabledSteps.length - 1,
    [activeEnabledStepIndex, enabledSteps.length],
  );

  const hasPreviousStep = useMemo(
    () => activeEnabledStepIndex > 0,
    [activeEnabledStepIndex],
  );

  const navigateToFirstStep = useCallback(
    () => setActiveEnabledStepIndex(0),
    [],
  );

  const navigateToNextStep = useCallback(
    () =>
      setActiveEnabledStepIndex((prevIndex) =>
        Math.min(prevIndex + 1, enabledSteps.length - 1),
      ),
    [enabledSteps.length],
  );

  const navigateToPreviousStep = useCallback(
    () => setActiveEnabledStepIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
    [],
  );

  const validate = useCallback(
    (values: FormValues): ValidationErrors =>
      enabledSteps.reduce(
        (acc, step) => ({ ...acc, ...(step.validate?.(values) ?? {}) }),
        {},
      ),
    [enabledSteps],
  );

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={(formRenderProps) => {
        const activeEnabledStepValidationErrors = formRenderProps.values
          ? (activeEnabledStep.validate?.(formRenderProps.values) ?? {})
          : {};
        const activeEnabledStepHasValidationErrors =
          Object.keys(activeEnabledStepValidationErrors).length > 0;

        return (
          <form onSubmit={formRenderProps.handleSubmit}>
            {render({
              actionButton: hasNextStep ? (
                <Button
                  disabled={activeEnabledStepHasValidationErrors}
                  key="continue"
                  onClick={navigateToNextStep}
                  tagElement="button"
                  type="submit"
                  variant="primary"
                >
                  {t("components.multi_step_form.next_step_button_label")}
                </Button>
              ) : (
                <Button
                  disabled={formRenderProps.hasValidationErrors}
                  key="submit"
                  loading={formRenderProps.submitting}
                  onClick={formRenderProps.handleSubmit}
                  tagElement="button"
                  type="submit"
                  variant="primary"
                >
                  {submitButtonLabel ??
                    t("components.multi_step_form.submit_button_label")}
                </Button>
              ),
              body: activeEnabledStep.body({ formRenderProps }),
              formRenderProps,
              hasPreviousStep,
              navigateToFirstStep,
              navigateToPreviousStep,
            })}
          </form>
        );
      }}
      validate={validate}
    />
  );
};
