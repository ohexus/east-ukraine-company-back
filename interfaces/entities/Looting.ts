import { Document } from 'mongoose';

export interface Looting {
  title: string;
  description: string;

  xpGain: number;
}

export interface UserLootingDoc extends Looting, Document {
  createdBy: string;

  units: string[];
}

export interface LootingDataDoc extends Looting, Document {}
