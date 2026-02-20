import type { Config } from "final-form";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useAuth } from "../../hooks/useAuth";
import { useCaptchaFieldValidation } from "../../hooks/useCaptchaFieldValidation";
import { useUserFieldsValidation } from "../../hooks/useUserFieldsValidation";
import { useVotingRoomJoiningMutation } from "../../mutations/useVotingRoomJoiningMutation";
import { Button } from "../Button/Button";
import { CaptchaField } from "../CaptchaField/CaptchaField";
import { Drawer } from "../Drawer/Drawer";
import { UserFields } from "../UserFields/UserFields";
import type {
  VotingRoomCreationFormValues,
  VotingRoomJoiningDrawerProps,
} from "./types";

export const VotingRoomJoiningDrawer = ({
  open,
  setOpen,
}: VotingRoomJoiningDrawerProps) => {
  const { votingRoom } = useContext(VotingRoomContext);

  const { signUp } = useAuth();
  const { validate: validateUserFields } = useUserFieldsValidation();
  const { validate: validateCaptcha } = useCaptchaFieldValidation();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const {
    isSuccess: votingRoomJoiningIsSuccess,
    mutateAsync: joinVotingRoom,
    reset: resetVotingRoomJoiningMutation,
  } = useVotingRoomJoiningMutation();

  const validate: Config<VotingRoomCreationFormValues>["validate"] =
    useCallback(
      (values: VotingRoomCreationFormValues) => ({
        ...validateUserFields(values),
        ...validateCaptcha(values),
      }),
      [validateCaptcha, validateUserFields],
    );

  const onSubmit: Config<VotingRoomCreationFormValues>["onSubmit"] =
    useCallback(
      async (values) => {
        if (!votingRoom) {
          return;
        }

        try {
          await signUp({
            backfaceCardStyleKey: values.backfaceCardStyleKey,
            companyName: values.companyName?.trim() ?? null,
            displayName: values.displayName.trim(),
            options: { captchaToken: values.captchaToken },
          });
          await joinVotingRoom({ votingRoomId: votingRoom.id });
        } catch {
          enqueueSnackbar(
            t("components.voting_room_joining_drawer.error_message"),
            {
              variant: "error",
            },
          );
        }
      },
      [enqueueSnackbar, joinVotingRoom, signUp, t, votingRoom],
    );

  useEffect(() => {
    if (votingRoomJoiningIsSuccess) {
      setOpen(false);
      resetVotingRoomJoiningMutation();
    }
  }, [votingRoomJoiningIsSuccess, resetVotingRoomJoiningMutation, setOpen]);

  return (
    <Form<VotingRoomCreationFormValues>
      onSubmit={onSubmit}
      render={({ handleSubmit, hasValidationErrors, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Drawer
            actionButton={
              <Button
                data-testid="voting-room-joining-drawer-submit-button"
                disabled={hasValidationErrors}
                loading={submitting}
                onClick={handleSubmit}
                tagElement="button"
                type="submit"
                variant="primary"
              >
                {t("entities.voting_room.actions.join_voting_room")}
              </Button>
            }
            open={open}
            setOpen={setOpen}
            title={t("entities.voting_room.actions.join_voting_room")}
          >
            <div className="flex flex-col gap-4">
              <UserFields />
              <CaptchaField />
            </div>
          </Drawer>
        </form>
      )}
      validate={validate}
    />
  );
};
