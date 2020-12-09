import Joi, { number } from '@hapi/joi';

const moneyValidator = {
  updateAction: Joi.object({
    amount: number,
  }).required(),
};

export default moneyValidator;
