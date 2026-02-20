import classNames from "classnames";
import { useField, useForm } from "react-final-form";
import { useTranslation } from "react-i18next";
import { PiCheckCircleFill } from "react-icons/pi";

import { BackfaceCard } from "../../BackfaceCard/BackfaceCard";
import type { RadioFieldProps } from "./types";

export const RadioField = ({
  backfaceCardStyleKey,
  empty,
  name,
}: RadioFieldProps) => {
  const form = useForm();
  const field = useField<string>(name, {
    type: "radio",
    value: backfaceCardStyleKey,
  });
  const { t } = useTranslation();

  return (
    <div className="relative">
      <BackfaceCard
        backfaceCardStyleKey={backfaceCardStyleKey}
        data-testid="backface-card-style-field-radio"
        data-testvalue-key={backfaceCardStyleKey}
        onClick={() =>
          form.change(
            name,
            !field.input.checked ? backfaceCardStyleKey : undefined,
          )
        }
        saturated={!empty && !field.input.checked}
        tagElement="button"
        title={t("components.backface_card_style_field.button_title")}
      />
      <div
        className={classNames(
          "border-pill shadow-pill bg-lemon-50 absolute top-1/2 left-1/2 flex size-10 -translate-1/2 items-center justify-center rounded-full",
          { hidden: !field.input.checked },
        )}
        inert
      >
        <PiCheckCircleFill className="text-green-600" size="90%" />
      </div>
    </div>
  );
};
