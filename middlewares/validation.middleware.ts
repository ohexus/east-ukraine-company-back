import { Schema } from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

import { errorHandler } from '../utils';

export default function validationMiddleware(
  schema: Schema,
  property: keyof Request
): (req: Request, res: Response, next: NextFunction) => Response | void {
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
