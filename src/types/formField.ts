import type { FieldProps } from "react-final-form";

export type FormField = Pick<FieldProps, "name"> &
  Pick<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    "autoFocus" | "disabled" | "placeholder"
  > & {
    helperText?: string;
    label: string;
    optional?: boolean;
  };
