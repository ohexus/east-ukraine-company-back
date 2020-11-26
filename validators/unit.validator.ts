import Joi from '@hapi/joi';
import validationPatterns from '../constants/validationPatterns.constants';

const unitValidator = {
  create: Joi.object({
    rank: validationPatterns.unit.ranks,
  }),
  promote: Joi.object({
    id: validationPatterns.id,
  }),
  getById: Joi.object({
    id: validationPatterns.id,
  }),
  deleteById: Joi.object({
    id: validationPatterns.id,
  }),
};

export default unitValidator;
