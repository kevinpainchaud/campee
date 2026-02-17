import type { Config, ValidationErrors } from "final-form";
import type { FormRenderProps } from "react-final-form";

type RenderProps<FormValues> = {
  formRenderProps: FormRenderProps<FormValues>;
};

type MultiStepFormStep<FormValues> = {
  body: (props: RenderProps<FormValues>) => React.ReactNode;
  enabled?: boolean;
  validate?: (values: FormValues) => ValidationErrors;
};

export type MultiStepFormProps<FormValues> = Pick<
  Config<FormValues>,
  "initialValues" | "onSubmit"
> & {
  render: (props: {
    actionButton: React.ReactNode;
    body: React.ReactNode;
    formRenderProps: FormRenderProps<FormValues>;
    hasPreviousStep: boolean;
    navigateToFirstStep: () => void;
    navigateToPreviousStep: () => void;
  }) => React.ReactNode;
  steps: MultiStepFormStep<FormValues>[];
  submitButtonLabel?: string;
};
