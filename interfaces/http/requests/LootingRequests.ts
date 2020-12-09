import { LootingDataDoc } from '../../entities/Looting';
import { UserDoc } from '../../entities/User';
import { UnitDoc } from '../../entities/Unit';

export interface CreateLootingRequest {
  lootingDataId: LootingDataDoc['_id'];
  userId: UserDoc['_id'];
  unitIds: Array<UnitDoc['_id']>;
}
