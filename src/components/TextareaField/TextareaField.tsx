import { useField } from "react-final-form";

import { FieldLayout } from "../FieldLayout/FieldLayout";
import type { TextareaFieldProps } from "./types";

export const TextareaField = ({
  autoFocus,
  helperText,
  label,
  name,
  optional,
  placeholder,
}: TextareaFieldProps) => {
  const field = useField<string>(name);

  return (
    <FieldLayout
      helperText={helperText}
      label={label}
      name={name}
      optional={optional}
    >
      <textarea
        {...field.input}
        autoFocus={autoFocus}
        className="border-pill bg-lemon-50 rounded-lg p-2 dark:bg-zinc-950"
        id={name}
        placeholder={placeholder}
        rows={6}
      />
    </FieldLayout>
  );
};
