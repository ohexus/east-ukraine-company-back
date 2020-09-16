import { UNITS } from '../../constants';

import genGender from './genGender';
import genName from './genName';
import genAvatar from './genAvatar';
import getPrevRankSalary from './ranks/getPrevRankSalary';

import Genders from '../../interfaces/Genders';
import AvatarBuffer from '../../interfaces/AvatarBuffer';
import { Unit } from '../../interfaces/entities/Unit';
import { UnitRankKeys } from '../../interfaces/units/UnitRank';
import { UnitXp } from '../../interfaces/units/UnitXp';

export default function genUnit(
  rank: UnitRankKeys | undefined,
  userId: string,
) {
  const gender: Genders = genGender();
  const name: string = genName(gender);

  const pathToAvatar: string = genAvatar(gender);

  const unitRank: UnitRankKeys = rank || (UNITS.RANK.BARQUE as UnitRankKeys);
  const salary: number = UNITS.SALARY[unitRank];

  const xp: UnitXp = {
    current: getPrevRankSalary(unitRank),
    promotion: UNITS.XP_PROMOTION[unitRank],
  };

  return {
    createdBy: userId,
    name,
    gender,
    pathToAvatar,
    rank: unitRank,
    salary,
    xp,
    lootingId: null,
  } as Unit;
}
