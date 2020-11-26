import Joi from '@hapi/joi';
import validationPatterns from '../constants/validationPatterns.constants';

const userValidator = {
  getById: Joi.object({
    id: validationPatterns.id,
  }),
  deleteById: Joi.object({
    id: validationPatterns.id,
  }),
};

export default userValidator;
