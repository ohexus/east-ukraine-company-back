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

  async getUnitById(unitId: string): Promise<UnitDoc | null> {
    const unitDoc = await UnitClass.getUnitById(unitId);

    return unitDoc;
  }

  async getAllUnitsByUser(userId: string): Promise<UnitDoc[]> {
    const unitDocs = await UnitClass.getAllUnitsByUser(userId);

    return unitDocs;
  }

  async getAllUnits(): Promise<UnitDoc[]> {
    const unitDocs = await UnitClass.getAllUnits();

    return unitDocs;
  }

  async rankUpUnit(unitId: string): Promise<UnitDoc | null> {
    const unitDoc = await UnitClass.rankUpUnit(unitId);

    return unitDoc;
  }

  async clearUnitsDB(): Promise<number | undefined> {
    const deletedCount = await UnitClass.clearUnitsDB();

    return deletedCount;
  }
}

export default new UnitsService();
