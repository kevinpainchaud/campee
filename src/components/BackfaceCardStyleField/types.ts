import type { FieldProps } from "react-final-form";

export type BackfaceCardStyleFieldProps = Pick<FieldProps, "name"> & {
  helperText?: string;
  label: string;
};
