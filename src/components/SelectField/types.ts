import type { FormField } from "../../types/formField";

export type SelectFieldProps = FormField & {
  options: {
    label: string;
    value: string;
  }[];
};
