import { UNITS } from '../../constants';

import genGender from './genGender';
import genName from './genName';
import genAvatar from './genAvatar';
import getPrevRankXp from './ranks/getPrevRankXp';

import { Unit } from '../../interfaces/entities/Unit';

export default function genUnit(rank: Unit['rank'] | undefined, userId: string) {
  const gender: Unit['bio']['gender'] = genGender();
  const name: Unit['bio']['name'] = genName(gender);
  const pathToAvatar: Unit['bio']['pathToAvatar'] = genAvatar(gender);
  const unitRank: Unit['rank'] = rank || UNITS.RANK.BARQUE;
  const salary: Unit['salary'] = UNITS.SALARY[unitRank];
  const xp: Unit['xp'] = {
    current: getPrevRankXp(unitRank),
    promotion: UNITS.PROMOTION.XP[unitRank],
  };

  return {
    createdBy: userId,
    bio: { name, gender, pathToAvatar },
    rank: unitRank,
    salary,
    xp,
    lootingId: null,
  } as Unit;
}
