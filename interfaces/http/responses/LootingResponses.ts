import { LootingDoc } from '../../entities/Looting';
import { UnitDoc } from '../../entities/Unit';

export interface LootingResponse {
  looting: LootingDoc;
  units: UnitDoc[];
}

export interface CreateLootingResponse extends LootingResponse {}
export interface FinishLootingResponse extends LootingResponse {}
