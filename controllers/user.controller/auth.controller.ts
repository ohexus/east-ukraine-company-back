import { Request, Response } from 'express';

import { LOGS, STATUSES } from '../../constants';

import { errorHandler, successResponse } from '../../utils';

import { AuthService } from '../../services';

import { UserLogInRequest, UserSignUpRequest } from '../../interfaces/http/requests/UserRequests';

export const postSignUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, username, password }: UserSignUpRequest = req.body;

    const token = await AuthService.signUp({ email, username, password });

    return successResponse(res, LOGS.SUCCESS.AUTH.SIGNUP, { jwt_token: token });
  } catch (error) {
    return errorHandler(res, error.message, null, STATUSES.RESPONSE.FAILED.UNAUTHORIZED);
  }
};

export const postLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { login, password }: UserLogInRequest = req.body;

    const token = await AuthService.logIn({ login, password });

    return successResponse(res, LOGS.SUCCESS.AUTH.LOGIN, { jwt_token: token });
  } catch (error) {
    return errorHandler(res, error.message, null, STATUSES.RESPONSE.FAILED.UNAUTHORIZED);
  }
};
