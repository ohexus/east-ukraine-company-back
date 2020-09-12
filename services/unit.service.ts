import { UnitClass } from '../models';
import { UnitDoc } from '../interfaces/entities/Unit';
import { UnitRankKeys } from '../interfaces/units/UnitRank';

class UnitsService {
  async createUnit(
    rank: UnitRankKeys | undefined,
    userId: string,
  ): Promise<UnitDoc> {
    const unitDoc = await UnitClass.createUnit(rank, userId);

    return unitDoc;
  }

  async promoteUnitById(unitId: string): Promise<UnitDoc | null> {
    const unitDoc = await UnitClass.promoteUnitById(unitId);

    return unitDoc;
  }

  async assignLootingToUnits(
    lootingId: string,
    unitIds: string[],
  ): Promise<UnitDoc[]> {
    const unitDocs = await UnitClass.assignLootingToUnits(lootingId, unitIds);

    return unitDocs;
  }

  async finishLootingForUnits(
    unitIds: string[],
    xpGain: number,
  ): Promise<UnitDoc[]> {
    const unitDocs = await UnitClass.finishLootingForUnits(unitIds, xpGain);

    return unitDocs;
  }

  async getUnitById(unitId: string): Promise<UnitDoc | null> {
    const unitDoc = await UnitClass.getUnitById(unitId);

    return unitDoc;
  }

  async getAllUserUnits(userId: string): Promise<UnitDoc[]> {
    const unitDocs = await UnitClass.getAllUserUnits(userId);

    return unitDocs;
  }

  async getAllUnits(): Promise<UnitDoc[]> {
    const unitDocs = await UnitClass.getAllUnits();

    return unitDocs;
  }

  async deleteUnitById(unitId: string): Promise<UnitDoc | null> {
    const unitDoc = await UnitClass.deleteUnitById(unitId);

    return unitDoc;
  }

  async deleteUnitsDB(): Promise<number | undefined> {
    const deletedCount = await UnitClass.deleteUnitsDB();

    return deletedCount;
  }
}

export default new UnitsService();