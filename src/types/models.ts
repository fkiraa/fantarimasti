
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
  basePrice: number;
  currentPrice: number;
  status: PlayerStatus;
  popularity: number;
  monthlyScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum PlayerCategory {
  CAMPIONI = "CAMPIONI",
  TOP = "TOP",
  SEMITOP = "SEMITOP",
}

export enum PlayerStatus {
  AVAILABLE = "AVAILABLE",
  INJURED = "INJURED",
  SUSPENDED = "SUSPENDED",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface TeamPlayer {
  profileId: string;
  playerId: string;
  acquiredPrice: number;
  acquiredAt: Date;
}

export enum RankingType {
  GENERALE = "GENERALE",
  SETTIMANALE = "SETTIMANALE",
  MENSILE = "MENSILE"
}
