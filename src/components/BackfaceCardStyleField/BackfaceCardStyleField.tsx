import classNames from "classnames";
import { useCallback } from "react";
import { useField, useForm } from "react-final-form";
import { useTranslation } from "react-i18next";
import { PiCheckCircleFill } from "react-icons/pi";

import { BACKFACE_CARD_STYLES } from "../../constants/backfaceCardStyles";
import type { BackfaceCardStyleKey } from "../../types/backfaceCardStyleKey";
import { getKeys } from "../../utils/object";
import { BackfaceCard } from "../BackfaceCard/BackfaceCard";
import { FieldLayout } from "../FieldLayout/FieldLayout";
import type { BackfaceCardStyleFieldProps } from "./types";

export const BackfaceCardStyleField = ({
  helperText,
  label,
  name,
}: BackfaceCardStyleFieldProps) => {
  const form = useForm();
  const field = useField<string>(name);
  const { t } = useTranslation();

  const handleCardClick = useCallback(
    (backfaceCardStyleKey: BackfaceCardStyleKey) => {
      form.change(
        name,
        backfaceCardStyleKey !== field.input.value
          ? backfaceCardStyleKey
          : undefined,
      );
    },
    [field.input.value, form, name],
  );

  return (
    <FieldLayout helperText={helperText} label={label} name={name}>
      <ul className="xs:grid-cols-4 grid grid-cols-3 gap-4">
        {getKeys(BACKFACE_CARD_STYLES).map((backfaceCardStyleKey) => (
          <li key={backfaceCardStyleKey}>
            <div className="relative">
              <BackfaceCard
                backfaceCardStyleKey={backfaceCardStyleKey}
                onClick={() => handleCardClick(backfaceCardStyleKey)}
                saturated={
                  field.input.value !== "" &&
                  backfaceCardStyleKey !== field.input.value
                }
                tagElement="button"
                title={t("components.backface_card_style_field.button_title")}
              />
              <div
                className={classNames(
                  "border-pill shadow-pill bg-lemon-50 absolute top-1/2 left-1/2 flex size-10 -translate-1/2 items-center justify-center rounded-full",
                  { hidden: backfaceCardStyleKey !== field.input.value },
                )}
                inert
              >
                <PiCheckCircleFill className="text-green-600" size="90%" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </FieldLayout>
  );
};
