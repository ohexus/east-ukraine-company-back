import { Document } from 'mongoose';

import Genders from '../Genders';
import AvatarBuffer from '../AvatarBuffer';
import { UnitRankKeys } from '../units/UnitRank';

export interface Unit {
  createdBy: string;

  gender: Genders;
  name: string;

  avatarBuffer: AvatarBuffer;

  rank: UnitRankKeys;
  salary: number;

  xp: {
    current: number;
    promotion: number;
  };

  lootingId: string | null;
}

export interface UnitDoc extends Unit, Document {}
