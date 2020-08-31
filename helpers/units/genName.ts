import { uniqueNamesGenerator } from 'unique-names-generator';

import { male, female, surnames } from '../../constants/names';

import Genders from '../../interfaces/Genders';

export default function genName(gender: Genders): string {
  if (gender === 'male' && Math.random() < 0.002) return 'William Kidd';

  return uniqueNamesGenerator({
    dictionaries: [gender === 'male' ? male : female, surnames],
    length: 2,
    separator: ' ',
  });
}
