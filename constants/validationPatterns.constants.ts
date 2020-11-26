import Joi from '@hapi/joi';
import LIMITS from './limits.constants';
import AUTH_REGEX from '../regexes/auth.regex';

const usernamePattern = Joi.string().min(LIMITS.MIN_LENGTH.DEFAULT).max(LIMITS.MAX_LENGTH.DEFAULT).required();
const emailPattern = Joi.string().email().min(LIMITS.MIN_LENGTH.DEFAULT).max(LIMITS.MAX_LENGTH.DEFAULT).required();

const validationPatterns = {
  id: Joi.string().required(),
  idArr: Joi.array().items(Joi.string()).min(1).required(),
  time: Joi.number().required(),

  auth: {
    username: usernamePattern,
    email: emailPattern,
    login: Joi.alternatives([usernamePattern, emailPattern]),
    password: Joi.string()
      .min(LIMITS.MIN_LENGTH.PASSWORD)
      .max(LIMITS.MAX_LENGTH.PASSWORD)
      .pattern(AUTH_REGEX.PASSWORD)
      .required(),
  },

  unit: {
    ranks: Joi.string(),
  },
};

export default validationPatterns;
