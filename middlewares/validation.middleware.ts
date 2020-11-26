import { Schema } from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import ExtendedRequest from '../interfaces/http/requests/ExtendedRequest';

import errorHandler from '../utils/errorHandler';

export default function validationMiddleware(
  schema: Schema,
  property: keyof Request
): (req: ExtendedRequest, res: Response, next: NextFunction) => Response<any> | void {
  return (req, res, next) => {
    try {
      const validated = schema.validate(req[property]);

      if (validated.error) {
        return errorHandler(res, validated.error.message);
      }
    } catch (error) {
      return errorHandler(error.message);
    }

    next();
  };
}
