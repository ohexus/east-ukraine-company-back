import { UserLootingClass } from '../../models';

import { UserLootingDoc, Looting } from '../../interfaces/entities/Looting';

class UserLootingsService {
  async createLooting(
    looting: Looting,
    userId: string,
    unitIds: string[],
  ): Promise<UserLootingDoc | null> {
    const UserLootingDoc = await UserLootingClass.createUserLooting(
      looting,
      userId,
      unitIds,
    );

    return UserLootingDoc;
  }

  async getAllUserLootings(userId: string): Promise<UserLootingDoc[]> {
    const UserLootingDocs = await UserLootingClass.getAllUserLootings(userId);

    return UserLootingDocs;
  }

  async getLootingById(lootingId: string): Promise<UserLootingDoc | null> {
    const UserLootingDoc = await UserLootingClass.getUserLootingById(lootingId);

    return UserLootingDoc;
  }
}

export default new UserLootingsService();
