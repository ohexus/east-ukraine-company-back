export interface addLootingToUserRequest {
  lootingId: string;
  userId: string;
  unitIds: string[];
}

export interface LootingDataCreateRequest {
  title: string;
  description: string;
  xpGain?: number;
}
