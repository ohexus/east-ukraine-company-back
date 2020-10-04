import { Response, NextFunction } from 'express';

import { errorHandler } from '../utils';

import ExtendedRequest from '../interfaces/requests/ExtendedRequest';

export default async function showReqMiddleware(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    res.send(req);
  } catch (error) {
    return errorHandler(res, error.message);
  }

  next();
}
