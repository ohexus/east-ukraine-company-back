import { Document } from 'mongoose';

export interface Looting {
  content: {
    topic: string;
    title: string;
    desc: string;
  };

  reward: {
    money: number;
    xp: number;
  };
}

export interface LootingDoc extends Looting, Document {
  createdBy: string;

  isStarted: boolean;

  units: string[];

  timer: {
    // ms
    total: number;
    left: number;
    status: boolean;
  };
}

export interface LootingDataDoc extends Looting, Document {}
