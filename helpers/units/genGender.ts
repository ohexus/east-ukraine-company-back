import Genders from '../../interfaces/Genders';

export default function genGender(): Genders {
  return Math.random() > 0.5 ? 'male' : 'female';
}
