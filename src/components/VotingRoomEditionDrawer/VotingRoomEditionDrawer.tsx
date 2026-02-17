import type { Config } from "final-form";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

import { VotingRoomContext } from "../../context/VotingRoomContext";
import { useVotingRoomFieldsValidation } from "../../hooks/useVotingRoomFieldsValidation";
import { useVotingRoomUpdateMutation } from "../../mutations/useVotingRoomUpdateMutation";
import type { VotingRoomFormValues } from "../../types/votingRoomFormValues";
import { Button } from "../Button/Button";
import { Drawer } from "../Drawer/Drawer";
import { VotingRoomFields } from "../VotingRoomFields/VotingRoomFields";
import type { VotingRoomEditionDrawerProps } from "./types";

export const VotingRoomEditionDrawer = ({
  open,
  setOpen,
}: VotingRoomEditionDrawerProps) => {
  const { votingRoom } = useContext(VotingRoomContext);

  const { validate } = useVotingRoomFieldsValidation();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const {
    isSuccess: votingRoomUpdateIsSuccess,
    mutateAsync: updateVotingRoom,
    reset: resetVotingRoomUpdateMutation,
  } = useVotingRoomUpdateMutation();

  const initialValues: Config<VotingRoomFormValues>["initialValues"] =
    useMemo(() => {
      if (!votingRoom) {
        return undefined;
      }

      return {
        name: votingRoom.name.trim(),
        votingSystem: votingRoom.voting_system,
      };
    }, [votingRoom]);

  const onSubmit: Config<VotingRoomFormValues>["onSubmit"] = useCallback(
    async (values) => {
      if (!votingRoom) {
        return;
      }

      await updateVotingRoom({
        id: votingRoom.id,
        values: {
          name: values.name.trim(),
          voting_system: values.votingSystem,
        },
      });
    },
    [votingRoom, updateVotingRoom],
  );

  useEffect(() => {
    if (votingRoomUpdateIsSuccess) {
      setOpen(false);
      resetVotingRoomUpdateMutation();
      enqueueSnackbar({
        message: t("components.voting_room_edition_drawer.success_message"),
        variant: "success",
      });
    }
  }, [
    enqueueSnackbar,
    resetVotingRoomUpdateMutation,
    votingRoomUpdateIsSuccess,
    setOpen,
    t,
  ]);

  return (
    <Form<VotingRoomFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, hasValidationErrors, submitting }) => (
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
              {t("components.voting_room_edition_drawer.submit_button_label")}
            </Button>
          }
          open={open}
          setOpen={setOpen}
          title={t("entities.voting_room.edition.title")}
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <VotingRoomFields />
            <button className="hidden" type="submit"></button>
          </form>
        </Drawer>
      )}
      validate={validate}
    />
  );
};
