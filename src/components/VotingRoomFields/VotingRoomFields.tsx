import { useTranslation } from "react-i18next";

import { VOTING_SYSTEM_VOTE_VALUES } from "../../constants/votingSystem";
import type { VotingSystem } from "../../types/votingSystem";
import { getVotingSystemLabel } from "../../utils/vote";
import { InputField } from "../InputField/InputField";
import { SelectField } from "../SelectField/SelectField";

export const VotingRoomFields = () => {
  const { t } = useTranslation();

  return (
    <>
      <InputField label={t("entities.voting_room.props.name")} name="name" />
      <SelectField
        label={t("entities.voting_room.props.voting_system")}
        name="votingSystem"
        options={Object.entries(VOTING_SYSTEM_VOTE_VALUES).map(
          (allowedVoteValue) => ({
            label: getVotingSystemLabel(allowedVoteValue[0] as VotingSystem),
            value: allowedVoteValue[0],
          }),
        )}
      />
    </>
  );
};
