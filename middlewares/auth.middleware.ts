import jwt from 'jsonwebtoken';
import config from 'config';
import { Response, NextFunction } from 'express';

import { LOGS } from '../constants';
import { errorHandler } from '../utils';

import userService from '../services/user.service';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';

export default async function authMiddleware(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const jwt_token = req.header('authorization');

    if (!jwt_token) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

    let userId: string;

    try {
      const decriptedToken = jwt.verify(
        jwt_token,
        process.env.JWT_SECRET || config.get('JWT_SECRET')
      ) as {
        userId: string;
      };

      userId = decriptedToken.userId;
    } catch {
      return errorHandler(res, LOGS.ERROR.JWT_EXPIRED);
    }

    const foundUser = await userService.getUserById(userId);

    if (foundUser) {
      req.userId = userId;
    } else {
      return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);
    }
  } catch (error) {
    return errorHandler(res, error.message);
  }

  next();
}
