import Joi, { Schema } from '@hapi/joi';

import LIMITS from '../constants/limits.constants';

const passwordRegex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{' + LIMITS.MIN_LENGTH.PASSWORD + ',}$');

const Patterns = {
  username: Joi.string().min(LIMITS.MIN_LENGTH.DEFAULT).max(LIMITS.MAX_LENGTH.DEFAULT).required(),
  email: Joi.string().email().min(LIMITS.MIN_LENGTH.DEFAULT).max(LIMITS.MAX_LENGTH.DEFAULT).required(),
  password: Joi.string()
    .min(LIMITS.MIN_LENGTH.PASSWORD)
    .max(LIMITS.MAX_LENGTH.PASSWORD)
    .pattern(passwordRegex)
    .required(),
};

class AuthValidator {
  signup: Schema;
  login: Schema;

  constructor() {
    this.signup = Joi.object({
      username: Patterns.username,
      email: Patterns.email,
      password: Patterns.password,
    });

    this.login = Joi.object({
      login: Patterns.email || Patterns.username,
      password: Patterns.password,
    });
  }
}

const authValidator = new AuthValidator();

export default authValidator;
