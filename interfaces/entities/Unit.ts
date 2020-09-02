import { Document } from 'mongoose';

import Genders from '../Genders';
import AvatarBuffer from '../AvatarBuffer';
import { UnitRankKeys } from '../units/UnitRank';
import { UnitXp } from '../units/UnitXp';

export interface Unit {
  created_by: string;

  gender: Genders;
  name: string;

  avatarBuffer: AvatarBuffer;

  rank: UnitRankKeys;
  salary: number;

  xp: UnitXp;

  lootingId: string | null;
}

export interface UnitDoc extends Unit, Document {}
