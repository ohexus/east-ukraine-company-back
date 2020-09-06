import { LootingDataClass } from '../../models';

import { LootingDataCreateRequest } from '../../interfaces/requests/LootingRequests';
import { LootingDataDoc } from '../../interfaces/entities/Looting';

class LootingsDataService {
  async createLooting(
    looting: LootingDataCreateRequest,
  ): Promise<LootingDataDoc | null> {
    const lootingDataDoc = await LootingDataClass.createLooting(looting);

    return lootingDataDoc;
  }

  async getAllLootings(): Promise<LootingDataDoc[]> {
    const lootingDataDocs = await LootingDataClass.getAllLootings();

    return lootingDataDocs;
  }

  async getLootingById(lootingId: string): Promise<LootingDataDoc | null> {
    const lootingDataDoc = await LootingDataClass.getLootingById(lootingId);

    return lootingDataDoc;
  }

  async getRandomLooting(): Promise<LootingDataDoc | null> {
    const lootingDataDoc = await LootingDataClass.getRandomLooting();

    return lootingDataDoc;
  }
}

export default new LootingsDataService();
