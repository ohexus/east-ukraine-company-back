import { Request, Response } from 'express';

import { LOGS } from '../constants';

import { errorHandler, successResponse, createToken, hashPassword, comparePasswords } from '../utils';

import { UserService } from '../services';

import { UserSignUpRequest } from '../interfaces/http/requests/UserRequests';
import { UserDoc } from '../interfaces/entities/User';

const postSignUp = async (req: Request, res: Response) => {
  const { email, username, password }: UserSignUpRequest = req.body;

  if (!email || !username || !password) {
    return errorHandler(res, LOGS.ERROR.SIGNUP);
  }

  try {
    const hashedPass = await hashPassword(password);

    let user: UserDoc | null;

    try {
      user = await UserService.createUser({
        email,
        username,
        password: hashedPass,
      });
    } catch (error) {
      return errorHandler(res, error.message, null, 401);
    }
    if (!user) {
      return errorHandler(res, LOGS.ERROR.SIGNUP, null, 401);
    }

    return successResponse(res, LOGS.SUCCESS.SIGNUP, {
      jwt_token: createToken(user._id),
    });
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const postLogin = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  let user: UserDoc | null;

  try {
    user = await UserService.getUser({ login, password });
  } catch (error) {
    return errorHandler(res, error.message, null, 401);
  }
  if (!user) {
    return errorHandler(res, LOGS.ERROR.LOGIN, null, 401);
  }

  const compareResult = await comparePasswords(password, user.password);
  if (!compareResult) {
    return errorHandler(res, LOGS.ERROR.INVALID_PASSWORD, null, 401);
  }

  return successResponse(res, LOGS.SUCCESS.LOGIN, {
    jwt_token: createToken(user._id),
  });
};

export { postSignUp, postLogin };
