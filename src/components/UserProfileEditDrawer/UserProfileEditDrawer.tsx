import type { Config } from "final-form";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

import { useTracking } from "../../hooks/useTracking";
import { useUserFieldsValidation } from "../../hooks/useUserFieldsValidation";
import { useProfileUpdateMutation } from "../../mutations/useProfileUpdateMutation";
import { useUserProfileQuery } from "../../queries/useUserProfileQuery/useUserProfileQuery";
import type { UserFormValues } from "../../types/userFormValues";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import { UserFields } from "../UserFields/UserFields";
import type { UserProfileEditDrawerProps } from "./types";

export const UserProfileEditDrawer = ({
  open,
  setOpen,
}: UserProfileEditDrawerProps) => {
  const { validate: validateUserFields } = useUserFieldsValidation();
  const { enqueueSnackbar } = useSnackbar();
  const { track } = useTracking();
  const { t } = useTranslation();

  const { data: userProfile } = useUserProfileQuery();

  const {
    isSuccess: profileUpdateIsSuccess,
    mutateAsync: updateProfile,
    reset: resetProfileUpdateMutation,
  } = useProfileUpdateMutation();

  const initialValues: Config<UserFormValues>["initialValues"] = useMemo(() => {
    if (!userProfile) {
      return;
    }

    return {
      backfaceCardStyleKey: userProfile.backface_card_style_key,
      companyName: userProfile.company_name ?? "",
      displayName: userProfile.display_name,
    };
  }, [userProfile]);

  const onSubmit: Config<UserFormValues>["onSubmit"] = useCallback(
    async (values) => {
      await updateProfile({
        values: {
          backface_card_style_key: values.backfaceCardStyleKey,
          company_name: values.companyName?.trim(),
          display_name: values.displayName.trim(),
        },
      });
      track("update_user_profile");
    },
    [track, updateProfile],
  );

  useEffect(() => {
    if (profileUpdateIsSuccess) {
      setOpen(false);
      resetProfileUpdateMutation();
      enqueueSnackbar({
        message: t("components.user_profile_edit_drawer.success_message"),
        variant: "success",
      });
    }
  }, [
    resetProfileUpdateMutation,
    profileUpdateIsSuccess,
    setOpen,
    enqueueSnackbar,
    t,
  ]);

  return (
    <Form<UserFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ form, handleSubmit, hasValidationErrors, submitting }) => (
        <Drawer
          actionButton={
            <Button
              disabled={hasValidationErrors}
              loading={submitting}
              onClick={handleSubmit}
              tagElement="button"
              type="submit"
              variant="primary"
            >
              {t("components.user_profile_edit_drawer.submit_button_label")}
            </Button>
          }
          open={open}
          setOpen={(open) => {
            setOpen(open);

            if (!open) {
              form.restart();
            }
          }}
          title={t("components.user_profile_edit_drawer.title")}
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <UserFields />
            <button className="hidden" type="submit"></button>
          </form>
        </Drawer>
      )}
      validate={validateUserFields}
    />
  );
};
