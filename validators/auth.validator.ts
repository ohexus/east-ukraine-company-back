import Joi from '@hapi/joi';
import validationPatterns from '../constants/validationPatterns.constants';

const authValidator = {
  signup: Joi.object({
    username: validationPatterns.auth.username,
    email: validationPatterns.auth.email,
    password: validationPatterns.auth.password,
  }),
  login: Joi.object({
    login: Joi.alternatives([validationPatterns.auth.email, validationPatterns.auth.username]),
    password: validationPatterns.auth.password,
  }),
};

export default authValidator;
