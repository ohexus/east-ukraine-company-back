import jwt from 'jsonwebtoken';
import config from 'config';
import { Response, NextFunction } from 'express';

import { LOGS } from '../constants';
import { errorHandler } from '../utils';

import userService from '../services/user.service';
import ExtendedRequest from '../interfaces/http/requests/ExtendedRequest';
import dataAPI from '../utils/dataAPI';
import { AxiosRequestConfig } from 'axios';

export default async function authMiddleware(req: ExtendedRequest, res: Response, next: NextFunction) {
  try {
    const jwt_token = req.header('authorization');

    if (!jwt_token) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED, null, 401);

    dataAPI.interceptors.request.use((req: AxiosRequestConfig) => {
      req.headers.Authorization = jwt_token;

      return req;
    });

    let userId: string;

    try {
      const decriptedToken = jwt.verify(jwt_token, process.env.JWT_SECRET || config.get('JWT_SECRET')) as {
        userId: string;
      };

      userId = decriptedToken.userId;
    } catch {
      return errorHandler(res, LOGS.ERROR.JWT_EXPIRED, null, 401);
    }

    const foundUser = await userService.getUserById(userId);

    if (foundUser) {
      req.userId = userId;
    } else {
      return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST, null, 401);
    }
  } catch (error) {
    return errorHandler(res, error.message, null, 401);
  }

  next();
}
