import { useField } from "react-final-form";

import type { FieldErrorProps } from "./types";

export const FieldError = ({ name }: FieldErrorProps) => {
  const field = useField(name);

  if (field.meta.error && field.meta.touched) {
    return <div className="text-sm text-red-600">{field.meta.error}</div>;
  }
};
