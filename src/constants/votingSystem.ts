import type { VotingSystem } from "../types/votingSystem";

export const VOTING_SYSTEM_VOTE_VALUES: Record<VotingSystem, string[]> = {
  scrum: ["0", "0.5", "1", "2", "3", "5", "8", "13", "20"],
  // eslint-disable-next-line sort-keys
  fibonacci: ["0", "1", "2", "3", "5", "8", "13", "21", "34"],
  "t-shirts": ["xs", "s", "m", "l", "xl"],
};

export const COMMON_VOTE_VALUES: string[] = ["questionMark", "coffee"];
