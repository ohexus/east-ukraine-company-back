import { Document } from 'mongoose';

export interface Looting {
  title: string;
  description: string;
  xpGain: number;
}

export interface LootingDoc extends Looting, Document {}
