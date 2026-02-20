import { useField } from "react-final-form";

import { BACKFACE_CARD_STYLES } from "../../constants/backfaceCardStyles";
import { getKeys } from "../../utils/object";
import { FieldLayout } from "../FieldLayout/FieldLayout";
import { RadioField } from "./RadioField/RadioField";
import type { BackfaceCardStyleFieldProps } from "./types";

export const BackfaceCardStyleField = ({
  helperText,
  label,
  name,
}: BackfaceCardStyleFieldProps) => {
  const field = useField<string>(name);

  return (
    <FieldLayout helperText={helperText} label={label} name={name}>
      <ul className="xs:grid-cols-4 grid grid-cols-3 gap-4">
        {getKeys(BACKFACE_CARD_STYLES).map((backfaceCardStyleKey) => (
          <li key={backfaceCardStyleKey}>
            <RadioField
              backfaceCardStyleKey={backfaceCardStyleKey}
              empty={field.input.value === ""}
              name={name}
            />
          </li>
        ))}
      </ul>
    </FieldLayout>
  );
};
