import { LootingCreateRequest } from '../interfaces/requests/LootingRequests';
import { LootingDoc } from '../interfaces/entities/Looting';
import LootingClass from '../models/Looting.model';

class LootingsService {
  async createLooting(
    looting: LootingCreateRequest,
  ): Promise<LootingDoc | null> {
    const lootingDoc = await LootingClass.createLooting(looting);

    return lootingDoc;
  }

  async getAllLootings(): Promise<LootingDoc[]> {
    const lootingDocs = await LootingClass.getAllLootings();

    return lootingDocs;
  }

  async getLootingById(lootingId: string): Promise<LootingDoc | null> {
    const lootingDoc = await LootingClass.getLootingById(lootingId);

    return lootingDoc;
  }

  async getRandomLooting(): Promise<LootingDoc | null> {
    const lootingDoc = await LootingClass.getRandomLooting();

    return lootingDoc;
  }
}

export default new LootingsService();
