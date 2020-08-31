export interface UnitRank {
  BARQUE: string;
  SLOOP: string;
  SCHOONER: string;
  CARAVEL: string;
  BRIG: string;
  FRIGATE: string;
  BATTLESHIP: string;
}

export type UnitRankKeys = keyof UnitRank;
