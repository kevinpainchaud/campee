import { upperFirst } from "lodash";

import {
  COMMON_VOTE_VALUES,
  VOTING_SYSTEM_VOTE_VALUES,
} from "../constants/votingSystem";
import type { Vote } from "../types/voteValue";
import type { VotingSystem } from "../types/votingSystem";

export const getVoteValues = (votingSystem: VotingSystem) => [
  ...VOTING_SYSTEM_VOTE_VALUES[votingSystem],
  ...COMMON_VOTE_VALUES,
];

export const getVotingSystemLabel = (votingSystem: VotingSystem) =>
  `${upperFirst(votingSystem)} (${VOTING_SYSTEM_VOTE_VALUES[votingSystem].map((allowedVoteValue) => allowedVoteValue.toUpperCase()).join(", ")})`;

export const getVoteLabel = ({ voteValue }: { voteValue: Vote }): string => {
  if (voteValue === "coffee") {
    return "☕";
  } else if (voteValue === "questionMark") {
    return "?";
  } else if (voteValue !== null) {
    return voteValue.toString();
  } else {
    return "-";
  }
};
