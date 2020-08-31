import { avatars } from '../../assets/images/avatars';
import Genders from '../../interfaces/Genders';
import getRandomInt from '../getRandomInt';
import AvatarBuffer from '../../interfaces/AvatarBuffer';

export default function genAvatar(gender: Genders): AvatarBuffer {
  const genderAvatars = gender === 'male' ? avatars.male : avatars.female;

  const index = getRandomInt(genderAvatars.length);

  return genderAvatars[index];
}
