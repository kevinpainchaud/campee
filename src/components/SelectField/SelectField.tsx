import classNames from "classnames";
import { useField } from "react-final-form";
import { PiCaretDownBold } from "react-icons/pi";

import { FieldLayout } from "../FieldLayout/FieldLayout";
import type { SelectFieldProps } from "./types";

export const SelectField = ({
  autoFocus,
  disabled,
  helperText,
  label,
  name,
  options,
}: SelectFieldProps) => {
  const field = useField<string, HTMLSelectElement>(name);

  return (
    <FieldLayout helperText={helperText} label={label} name={name}>
      <div className="grid">
        <select
          {...field.input}
          autoFocus={autoFocus}
          className={classNames(
            "border-pill bg-lemon-50 col-start-1 row-start-1 appearance-none rounded-lg p-2 dark:bg-zinc-950",
            "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600",
          )}
          disabled={disabled}
          id={name}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none relative right-2 col-start-1 row-start-1 self-center justify-self-end">
          <PiCaretDownBold size={16} />
        </div>
      </div>
    </FieldLayout>
  );
};
