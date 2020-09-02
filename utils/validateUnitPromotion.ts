import { UnitDoc } from '../interfaces/entities/Unit';
import { UNITS } from '../constants';

export default function validateUnitPromotion(unit: UnitDoc | null): boolean {
  if (!unit || unit.xp.current < UNITS.XP_PROMOTION[unit.rank]) {
    return false;
  }
  return true;
}
