import { UnitClass } from '../models';

import { UNITS, LOGS } from '../constants';

import { UserMoneyService } from '.';

import { Unit, UnitDoc } from '../interfaces/entities/Unit';
import { UserDoc } from '../interfaces/entities/User';
import { LootingDoc } from '../interfaces/entities/Looting';

class UnitService {
  async createUnit(rank: Unit['rank'], userId: UserDoc['_id']): Promise<UnitDoc> {
    await UserMoneyService.checkThenDecreaseMoney(userId, UNITS.COST[rank]);

    return await UnitClass.createUnit(rank, userId);
  }

  async promoteUnitById(unitId: UnitDoc['_id'], userId: UserDoc['_id']): Promise<UnitDoc> {
    const unit = await UnitClass.getUnitById(unitId);

    if (unit.xp.current > UNITS.PROMOTION.XP[unit.rank]) {
      await UserMoneyService.checkThenDecreaseMoney(userId, UNITS.PROMOTION.COST[unit.rank]);

      return await UnitClass.promoteUnitById(unitId);
    } else {
      throw new Error(LOGS.ERROR.UNIT.PROMOTE_UNABLE);
    }
  }

  async assignLooting(lootingId: LootingDoc['_id'], unitIds: Array<UnitDoc['_id']>): Promise<UnitDoc[]> {
    return await UnitClass.assignLooting(lootingId, unitIds);
  }

  async finishLooting(unitIds: Array<UnitDoc['_id']>, xpGain: LootingDoc['reward']['xp']): Promise<UnitDoc[]> {
    return await UnitClass.finishLooting(unitIds, xpGain);
  }

  async getUnitById(unitId: UnitDoc['_id']): Promise<UnitDoc> {
    return await UnitClass.getUnitById(unitId);
  }

  async getAllUserUnits(userId: UserDoc['_id']): Promise<UnitDoc[]> {
    return await UnitClass.getAllUserUnits(userId);
  }

  async getAllUnits(): Promise<UnitDoc[]> {
    return await UnitClass.getAllUnits();
  }

  async deleteUnitById(unitId: UnitDoc['_id']): Promise<UnitDoc> {
    return await UnitClass.deleteUnitById(unitId);
  }

  async deleteUnitsDB(): Promise<number | undefined> {
    return await UnitClass.deleteUnitsDB();
  }
}

export default new UnitService();
