import { Document } from 'mongoose';

import { UNITS } from '../../constants';

import { LootingDoc } from './Looting';
import Genders from '../Genders';

export interface Unit {
  createdBy: string;

  bio: {
    gender: Genders;
    name: string;

    pathToAvatar: string;
  };

  rank: keyof typeof UNITS.RANK;
  salary: number;

  xp: {
    current: number;
    promotion: number;
  };

  lootingId: LootingDoc['_id'] | null;
}

export interface UnitDoc extends Unit, Document {}
