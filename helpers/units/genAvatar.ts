import { avatars } from '../../assets/images/avatars';
import Genders from '../../interfaces/Genders';
import getRandomInt from '../getRandomInt';

export default function genAvatarPath(gender: Genders): string {
  const genderAvatars = gender === 'male' ? avatars.male : avatars.female;

  return genderAvatars[getRandomInt(genderAvatars.length)];
}
