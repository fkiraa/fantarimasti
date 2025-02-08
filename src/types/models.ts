
export interface President {
  id: string;
  name: string;
  availablePoints: number;
  totalPoints: number;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  category: PlayerCategory;
  cost: number;
  errors: Error[];
  presidentId?: string;
}

export enum PlayerCategory {
  CAMPIONI = "CAMPIONI",
  TOP = "TOP",
  SEMITOP = "SEMITOP",
}

export interface Error {
  id: string;
  type: ErrorType;
  date: Date;
  playerId: string;
}

export enum ErrorType {
  SIMPLE = "SIMPLE",
  GRAVE = "GRAVE",
  COLOSSALE = "COLOSSALE",
  ABSENCE = "ABSENCE",
}

export interface Ranking {
  id: string;
  type: RankingType;
  date: Date;
  rankings: RankingEntry[];
}

export interface RankingEntry {
  position: number;
  presidentId: string;
  points: number;
}

export enum RankingType {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}
