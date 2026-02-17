import { useTranslation } from "react-i18next";

import { BackfaceCardStyleField } from "../BackfaceCardStyleField/BackfaceCardStyleField";
import { InputField } from "../InputField/InputField";

export const UserFields = () => {
  const { t } = useTranslation();

  return (
    <>
      <InputField
        label={t("entities.profile.props.display_name")}
        name="displayName"
      />
      <InputField
        label={t("entities.profile.props.company_name")}
        name="companyName"
        optional
      />
      <BackfaceCardStyleField
        label={t("entities.profile.props.backface_card_style")}
        name="backfaceCardStyleKey"
      />
    </>
  );
};
