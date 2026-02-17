import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Config } from "final-form";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router";

import { VOTING_ROOM_ROUTE_PATH } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";
import { useCaptchaFieldValidation } from "../../hooks/useCaptchaFieldValidation";
import { useTracking } from "../../hooks/useTracking";
import { useUserFieldsValidation } from "../../hooks/useUserFieldsValidation";
import { useVotingRoomFieldsValidation } from "../../hooks/useVotingRoomFieldsValidation";
import { useVotingRoomCreationMutation } from "../../mutations/useVotingRoomCreationMutation";
import { getVotingRoomQueryKey } from "../../queries/useVotingRoomQuery/queryKey";
import type { VotingRoom } from "../../types/votingRoom";
import { CaptchaField } from "../CaptchaField/CaptchaField";
import { Drawer } from "../Drawer/Drawer";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import type { MultiStepFormProps } from "../MultiStepForm/types";
import { UserFields } from "../UserFields/UserFields";
import { VotingRoomFields } from "../VotingRoomFields/VotingRoomFields";
import type {
  VotingRoomCreationDrawerProps,
  VotingRoomCreationFormValues,
} from "./types";

export const VotingRoomCreationDrawer = ({
  open,
  setOpen,
}: VotingRoomCreationDrawerProps) => {
  const { signUp, user } = useAuth();
  const { validate: validateUserFields } = useUserFieldsValidation();
  const { validate: validateCaptcha } = useCaptchaFieldValidation();
  const { validate: validateVotingRoomFields } =
    useVotingRoomFieldsValidation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { track } = useTracking();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: votingRoom, mutateAsync: createVotingRoom } =
    useVotingRoomCreationMutation();

  const initialValues: Partial<VotingRoomCreationFormValues> = useMemo(
    () => ({
      name: t(
        "components.voting_room_creation_drawer.default_voting_room_name",
        { today_date: dayjs().format("LL") },
      ),
      votingSystem: "scrum",
    }),
    [t],
  );

  const steps: MultiStepFormProps<VotingRoomCreationFormValues>["steps"] =
    useMemo(
      () => [
        {
          body: () => (
            <div className="flex flex-col gap-4">
              <UserFields />
              <CaptchaField />
            </div>
          ),
          enabled: !user,
          validate: (values) => ({
            ...validateUserFields(values),
            ...validateCaptcha(values),
          }),
        },
        {
          body: () => (
            <div className="flex flex-col gap-4">
              <VotingRoomFields />
            </div>
          ),
          validate: validateVotingRoomFields,
        },
      ],
      [user, validateCaptcha, validateUserFields, validateVotingRoomFields],
    );

  const onSubmit: Config<VotingRoomCreationFormValues>["onSubmit"] =
    useCallback(
      async (values, form) => {
        const handleVotingRoomCreation = async () => {
          await createVotingRoom({
            name: values.name,
            votingSystem: values.votingSystem,
          });
          form.restart();
          track("create_voting_room");
        };

        if (user) {
          await handleVotingRoomCreation();
        } else {
          try {
            await signUp({
              backfaceCardStyleKey: values.backfaceCardStyleKey,
              companyName: values.companyName?.trim() ?? null,
              displayName: values.displayName.trim(),
              options: { captchaToken: values.captchaToken },
            });
            await handleVotingRoomCreation();
          } catch {
            enqueueSnackbar(
              t("components.voting_room_creation_drawer.error_message"),
              {
                variant: "error",
              },
            );
          }
        }
      },
      [createVotingRoom, enqueueSnackbar, signUp, t, track, user],
    );

  useEffect(() => {
    if (votingRoom) {
      setOpen(false);
      queryClient.setQueryData<VotingRoom>(
        getVotingRoomQueryKey({
          invitationCode: votingRoom.invitation_code,
        }),
        () => votingRoom,
      );
      navigate(
        generatePath(VOTING_ROOM_ROUTE_PATH, {
          invitation_code: votingRoom.invitation_code,
        }),
      );
    }
  }, [navigate, votingRoom, setOpen, queryClient]);

  return (
    <MultiStepForm<VotingRoomCreationFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({
        actionButton,
        body,
        hasPreviousStep,
        navigateToPreviousStep,
      }) => (
        <Drawer
          actionButton={actionButton}
          backButton={
            hasPreviousStep ? { onClick: navigateToPreviousStep } : undefined
          }
          open={open}
          setOpen={setOpen}
          title={t("entities.voting_room.actions.create_a_voting_room")}
        >
          {body}
        </Drawer>
      )}
      steps={steps}
      submitButtonLabel={t(
        "components.voting_room_creation_drawer.submit_button_label",
      )}
    />
  );
};
