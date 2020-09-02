import { UNITS } from '../../constants';

import genGender from './genGender';
import genName from './genName';
import genAvatar from './genAvatar';

import { UnitRankKeys } from '../../interfaces/units/UnitRank';
import Genders from '../../interfaces/Genders';
import AvatarBuffer from '../../interfaces/AvatarBuffer';
import { Unit } from '../../interfaces/entities/Unit';
import XP_PROMOTION from '../../constants/units/XP_PROMOTION';
import getNextRank from './ranks/getNextRank';
import getPrevRankSalary from './ranks/getPrevRankSalary';
import { UnitXp } from '../../interfaces/units/UnitXp';

export default function genUnit(
  rank: UnitRankKeys | undefined,
  userId: string,
) {
  const gender: Genders = genGender();
  const name: string = genName(gender);

  const avatarBuffer: AvatarBuffer = genAvatar(gender);

  const unitRank: UnitRankKeys = rank || (UNITS.RANK.BARQUE as UnitRankKeys);
  const salary: number = UNITS.SALARY[unitRank];

  const xp: UnitXp = {
    current: getPrevRankSalary(unitRank),
    promotion: XP_PROMOTION[unitRank],
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
