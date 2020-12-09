import { UNITS } from '../../../constants';

import { Unit } from '../../../interfaces/entities/Unit';

export default function getPrevRankXp(currRank: Unit['rank']): number {
  const allRanks = Object.values(UNITS.RANK);

  const currentRankIndex = allRanks.findIndex((rank) => rank === currRank);

  if (currentRankIndex <= 0) {
    return 0;
  }

  return UNITS.PROMOTION.XP[allRanks[currentRankIndex - 1] as Unit['rank']];
}
