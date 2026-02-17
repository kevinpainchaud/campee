import { useField } from "react-final-form";

import { FieldLayout } from "../FieldLayout/FieldLayout";
import type { InputFieldProps } from "./types";

export const InputField = ({
  autoFocus,
  helperText,
  label,
  name,
  optional,
  type = "text",
}: InputFieldProps) => {
  const field = useField<string>(name);

  return (
    <FieldLayout
      helperText={helperText}
      label={label}
      name={name}
      optional={optional}
    >
      <input
        {...field.input}
        autoFocus={autoFocus}
        className="border-pill rounded-lg bg-white p-2 dark:bg-zinc-900"
        data-1p-ignore
        id={name}
        type={type}
      />
    </FieldLayout>
  );
};
