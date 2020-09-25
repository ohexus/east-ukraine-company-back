import { LootingDataDoc } from '../entities/Looting';
import { UserDoc } from '../entities/User';
import { UnitDoc } from '../entities/Unit';

export interface createUserLootingRequest {
  lootingDataId: LootingDataDoc['_id'];
  userId: UserDoc['_id'];
  unitIds: Array<UnitDoc['_id']>;
}

export interface LootingDataCreateRequest {
  title: LootingDataDoc['title'];
  description: LootingDataDoc['description'];
  xpGain?: LootingDataDoc['xpGain'];
}
