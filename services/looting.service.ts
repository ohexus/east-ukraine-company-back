import { LootingClass } from '../models';

import { LootingDoc, Looting } from '../interfaces/entities/Looting';
import { UserDoc } from '../interfaces/entities/User';
import { UnitDoc } from '../interfaces/entities/Unit';

class LootingsService {
  async createLooting(
    looting: Looting,
    userId: UserDoc['_id'],
    unitIds: Array<UnitDoc['_id']>
  ): Promise<LootingDoc | null> {
    const lootingDoc = await LootingClass.createLooting(looting, userId, unitIds);

    return lootingDoc;
  }

  async finishLooting(id: LootingDoc['_id']): Promise<LootingDoc | null> {
    const lootingDoc = await LootingClass.finishLooting(id);

    return lootingDoc;
  }

  async updateTimeLeft(id: LootingDoc['_id'], timeLeft: number): Promise<LootingDoc | null> {
    const lootingDoc = await LootingClass.updateTimeLeft(id, timeLeft);

    return lootingDoc;
  }

  async getAllLootingsByUser(id: UserDoc['_id']): Promise<LootingDoc[]> {
    const lootingDocs = await LootingClass.getAllLootingsByUser(id);

    return lootingDocs;
  }

  async getAllStartedLootingsByUser(id: UserDoc['_id']): Promise<LootingDoc[]> {
    const lootingDocs = await LootingClass.getAllStartedLootings(id);

    return lootingDocs;
  }

  async getLootingById(id: LootingDoc['_id']): Promise<LootingDoc | null> {
    const lootingDoc = await LootingClass.getLootingById(id);

    return lootingDoc;
  }
}

export default new LootingsService();
