export type LabelProps = Pick<
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >,
  "children" | "htmlFor"
>;
