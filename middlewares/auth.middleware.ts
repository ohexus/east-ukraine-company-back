import jwt from 'jsonwebtoken';
import config from 'config';

import { AxiosRequestConfig } from 'axios';
import { Response, Request, NextFunction } from 'express';
import { ExtendedRequest } from '../interfaces/http/requests/ExtendedRequest';

import { LOGS, STATUSES } from '../constants';

import { dataAPI, errorHandler } from '../utils';

import { UserProfileService } from '../services/user.service';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt_token = req.header('authorization');
    if (!jwt_token) {
      throw new Error(LOGS.ERROR.AUTH.UNAUTHORIZED);
    }

    dataAPI.interceptors.request.use((req: AxiosRequestConfig) => {
      req.headers.Authorization = jwt_token;

      return req;
    });

    try {
      const { userId } = jwt.verify(jwt_token, process.env.JWT_SECRET || config.get('JWT_SECRET')) as {
        userId: string;
      };

      const foundUser = await UserProfileService.getUserById(userId);
      if (foundUser) {
        (req as ExtendedRequest).userId = userId;
      } else {
        throw new Error(LOGS.ERROR.USER.NOT_FOUND);
      }
    } catch {
      throw new Error(LOGS.ERROR.AUTH.JWT_EXPIRED);
    }
  } catch (error) {
    return errorHandler(res, error.message, null, STATUSES.RESPONSE.FAILED.UNAUTHORIZED);
  }

  next();
};

export default authMiddleware;
