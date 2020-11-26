import Joi from '@hapi/joi';
import validationPatterns from '../constants/validationPatterns.constants';

const lootingValidator = {
  create: Joi.object({
    lootingDataId: validationPatterns.id,
    unitIds: validationPatterns.idArr,
  }),
  finish: Joi.object({
    lootingId: validationPatterns.id,
  }),
  updateTime: Joi.object({
    lootingId: validationPatterns.id,
    timeLeft: validationPatterns.time,
  }),
  getById: Joi.object({
    id: validationPatterns.id,
  }),
};

export default lootingValidator;
