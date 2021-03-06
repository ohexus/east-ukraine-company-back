import { UNITS } from '../../../constants';

import { Unit } from '../../../interfaces/entities/Unit';

export default function getNextRank(currRank: Unit['rank']): Unit['rank'] {
  const allRanks = Object.values(UNITS.RANK);

  const currentRankIndex = allRanks.findIndex((rank) => rank === currRank);

  if (currentRankIndex + 1 >= allRanks.length) {
    return currRank;
  }

  return allRanks[currentRankIndex + 1] as Unit['rank'];
}
