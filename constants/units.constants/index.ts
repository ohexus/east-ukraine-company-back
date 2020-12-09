import UnitCost from './UnitCost';
import { UnitPromotionXp, UnitPromotionCost } from './UnitPromotion';
import UnitRanks from './UnitRanks';
import UnitSalary from './UnitSalary';

const UNITS = {
  COST: UnitCost,
  PROMOTION: { XP: UnitPromotionXp, COST: UnitPromotionCost },
  RANK: UnitRanks,
  SALARY: UnitSalary,
};

export default UNITS;
