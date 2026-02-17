import type { LabelProps } from "./types";

export const Label = ({ children, htmlFor }: LabelProps) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};
