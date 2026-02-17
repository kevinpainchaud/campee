import { useTranslation } from "react-i18next";

import { FieldError } from "../FieldError/FieldError";
import { Label } from "../Label/Label";
import type { FieldLayoutProps } from "./types";

export const FieldLayout = ({
  children,
  helperText,
  label,
  name,
  optional,
}: FieldLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>
        {label}
        {optional && (
          <>
            {" "}
            <span className="text-sm">
              ({t("common.form.optional").toLowerCase()})
            </span>
          </>
        )}
      </Label>
      {children}
      {helperText && (
        <p className="text-sm text-gray-600 italic dark:text-gray-300">
          {helperText}
        </p>
      )}
      <FieldError name={name} />
    </div>
  );
};
