import type { FormField } from "../../types/formField";

export type FieldLayoutProps = FormField &
  Pick<React.HTMLAttributes<HTMLDivElement>, "children">;
