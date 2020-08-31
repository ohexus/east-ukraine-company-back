import { UNITS } from '../../constants';

import genGender from './genGender';
import genName from './genName';
import genAvatar from './genAvatar';

import { UnitRankKeys } from '../../interfaces/units/UnitRank';
import Genders from '../../interfaces/Genders';
import AvatarBuffer from '../../interfaces/AvatarBuffer';
import { Unit } from '../../interfaces/entities/Unit';

export default function genUnit(
  rank: UnitRankKeys | undefined,
  userId: string,
) {
  const gender: Genders = genGender();
  const name: string = genName(gender);

  const avatarBuffer: AvatarBuffer = genAvatar(gender);

  const unitRank: UnitRankKeys = rank || (UNITS.RANK.BARQUE as UnitRankKeys);
  const salary: number = UNITS.SALARY[unitRank];

  const xp = {
    current: 0,
    promotion: 1000,
  };

  return {
    created_by: userId,
    name,
    gender,
    avatarBuffer,
    rank: unitRank,
    salary,
    xp,
    lootingId: null,
  } as Unit;
}
