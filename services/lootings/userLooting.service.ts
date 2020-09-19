import { UserLootingClass } from '../../models';

import { UserLootingDoc, Looting } from '../../interfaces/entities/Looting';

class UserLootingsService {
  async createUserLooting(
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

  async finishUserLooting(lootingId: string): Promise<UserLootingDoc | null> {
    const UserLootingDoc = await UserLootingClass.finishUserLooting(lootingId);

    return UserLootingDoc;
  }

  async updateTimeLeft(
    lootingId: string,
    timeLeft: number,
  ): Promise<UserLootingDoc | null> {
    const UserLootingDoc = await UserLootingClass.updateTimeLeft(
      lootingId,
      timeLeft,
    );

    return UserLootingDoc;
  }

  async getAllUserLootings(userId: string): Promise<UserLootingDoc[]> {
    const UserLootingDocs = await UserLootingClass.getAllUserLootings(userId);

    return UserLootingDocs;
  }

  async getAllStartedUserLootings(userId: string): Promise<UserLootingDoc[]> {
    const UserLootingDocs = await UserLootingClass.getAllStartedUserLootings(
      userId,
    );

    return UserLootingDocs;
  }

  async getLootingById(lootingId: string): Promise<UserLootingDoc | null> {
    const UserLootingDoc = await UserLootingClass.getUserLootingById(lootingId);

    return UserLootingDoc;
  }
}

export default new UserLootingsService();
