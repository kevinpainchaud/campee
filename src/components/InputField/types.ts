import type { FormField } from "../../types/formField";

export type InputFieldProps = FormField &
  Pick<React.InputHTMLAttributes<HTMLInputElement>, "type">;
