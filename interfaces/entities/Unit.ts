import { Document } from 'mongoose';

import Genders from '../Genders';
import AvatarBuffer from '../AvatarBuffer';
import { UnitRankKeys } from '../units/UnitRank';
import { UnitXp } from '../units/UnitXp';

export interface Unit {
  createdBy: string;

  gender: Genders;
  name: string;

  // avatarBuffer: AvatarBuffer;
  pathToAvatar: string;

  rank: UnitRankKeys;
  salary: number;

  xp: UnitXp;

  lootingId: string | null;
}

export interface UnitDoc extends Unit, Document {}
