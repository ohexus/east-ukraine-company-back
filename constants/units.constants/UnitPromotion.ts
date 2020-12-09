import UnitCost from './UnitCost';
import UnitRanks from './UnitRanks';

export enum UnitPromotionXp {
  BARQUE = 2000,
  SLOOP = 7500,
  SCHOONER = 20000,
  CARAVEL = 45000,
  BRIG = 85000,
  FRIGATE = 145000,
  BATTLESHIP = 250000,
}

const getPromotionCost = (rank: keyof typeof UnitRanks): number => {
  const ranks = Object.keys(UnitRanks);
  const modifier = (ranks.length - ranks.indexOf(rank)) * 0.05;
  return Math.round(UnitCost[rank] - UnitCost[rank] * modifier);
};

export enum UnitPromotionCost {
  BARQUE = getPromotionCost('BARQUE'),
  SLOOP = getPromotionCost('SLOOP'),
  SCHOONER = getPromotionCost('SCHOONER'),
  CARAVEL = getPromotionCost('CARAVEL'),
  BRIG = getPromotionCost('BRIG'),
  FRIGATE = getPromotionCost('FRIGATE'),
  BATTLESHIP = getPromotionCost('BATTLESHIP'),
}
