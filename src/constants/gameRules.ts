
import { PlayerCategory, ErrorType } from "@/types/models";

export const MAX_PLAYERS_PER_PRESIDENT = 5;
export const INITIAL_POINTS = 100;

export const PLAYER_COSTS: Record<PlayerCategory, number> = {
  [PlayerCategory.CAMPIONI]: 50,
  [PlayerCategory.TOP]: 30,
  [PlayerCategory.SEMITOP]: 10,
};

export const ERROR_POINTS: Record<ErrorType, number> = {
  [ErrorType.SIMPLE]: 5,
  [ErrorType.GRAVE]: 15,
  [ErrorType.COLOSSALE]: 30,
};

export const ABSENCE_PENALTY_PERCENTAGE = 5;
