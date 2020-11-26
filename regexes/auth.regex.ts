import LIMITS from '../constants/limits.constants';

const AUTH_REGEX = {
  PASSWORD: new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{' + LIMITS.MIN_LENGTH.PASSWORD + ',}$'),
};

export default AUTH_REGEX;
