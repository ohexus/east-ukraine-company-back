import RANK from '../../../constants/units/RANK';
import XP_PROMOTION from '../../../constants/units/XP_PROMOTION';

import { UnitRankKeys } from '../../../interfaces/units/UnitRank';

export default function getPrevRankSalary(currRank: UnitRankKeys): number {
  const allRanks = Object.keys(RANK);

  const currentRankIndex = allRanks.findIndex((rank) => rank === currRank);

  if (currentRankIndex === 0) {
    return 0;
  }

  return XP_PROMOTION[allRanks[currentRankIndex - 1] as UnitRankKeys];
}
