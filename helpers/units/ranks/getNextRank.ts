import RANK from '../../../constants/units/RANK';
import { UnitRankKeys } from '../../../interfaces/units/UnitRank';

export default function getNextRank(currRank: UnitRankKeys): UnitRankKeys {
  const allRanks = Object.keys(RANK);

  const currentRankIndex = allRanks.findIndex((rank) => rank === currRank);

  if (currentRankIndex + 1 >= allRanks.length) {
    return currRank;
  }

  return allRanks[currentRankIndex + 1] as UnitRankKeys;
}
