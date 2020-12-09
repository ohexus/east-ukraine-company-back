import { GAME, UNITS } from '../constants';

import { LootingClass } from '../models';
import { LootingDataService, UnitService } from '.';
import { UserMoneyService } from './user.service';

import { CreateLootingResponse, FinishLootingResponse } from '../interfaces/http/responses/LootingResponses';
import { LootingDoc, LootingDataDoc } from '../interfaces/entities/Looting';
import { UserDoc } from '../interfaces/entities/User';
import { UnitDoc } from '../interfaces/entities/Unit';

class LootingService {
  async createLooting(
    lootingDataId: LootingDataDoc['_id'],
    userId: UserDoc['_id'],
    unitIds: Array<UnitDoc['_id']>
  ): Promise<CreateLootingResponse> {
    const foundLootingData = await LootingDataService.getLootingById(lootingDataId);

    const looting = await LootingClass.createLooting(foundLootingData, userId, unitIds);
    const units = await UnitService.assignLooting(looting._id, unitIds);

    return {
      looting,
      units,
    };
  }

  async finishLooting(lootingId: LootingDoc['_id'], userId: UserDoc['_id']): Promise<FinishLootingResponse> {
    const lootingDoc = await this.getLootingById(lootingId);

    const finishedUnits = await UnitService.finishLooting(lootingDoc.units, lootingDoc.reward.xp);
    const finishedLooting = await LootingClass.finishLooting(lootingDoc._id);

    let totalReward = lootingDoc.reward.money;

    for (const unit of finishedUnits) {
      totalReward -= UNITS.SALARY[unit.rank];
    }

    await UserMoneyService.increaseMoney(
      userId,
      totalReward > GAME.MONEY.MIN_REWARD ? totalReward : GAME.MONEY.MIN_REWARD
    );

    return {
      looting: finishedLooting,
      units: finishedUnits,
    };
  }

  async updateTimeLeft(id: LootingDoc['_id'], timeLeft: number): Promise<LootingDoc> {
    return await LootingClass.updateTimeLeft(id, timeLeft);
  }

  async getAllLootingsByUser(id: UserDoc['_id']): Promise<LootingDoc[]> {
    return await LootingClass.getAllLootingsByUser(id);
  }

  async getAllStartedLootingsByUser(id: UserDoc['_id']): Promise<LootingDoc[]> {
    return await LootingClass.getAllStartedLootings(id);
  }

  async getLootingById(id: LootingDoc['_id']): Promise<LootingDoc> {
    return await LootingClass.getLootingById(id);
  }
}

export default new LootingService();
