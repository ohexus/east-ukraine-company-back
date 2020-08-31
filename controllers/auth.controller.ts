import { Request, Response } from 'express';

import { LOGS } from '../constants';

import {
  errorHandler,
  successResponse,
  createToken,
  hashPassword,
  comparePasswords,
} from '../utils';

import UsersService from '../services/user.service';

import { UserSignUpRequest } from '../interfaces/requests/UserRequests';
import { UserDoc } from '../interfaces/entities/User';

const postSignUp = async (req: Request, res: Response) => {
  const { email, username, password }: UserSignUpRequest = req.body;

  if (!email || !username || !password) {
    return errorHandler(res, LOGS.ERROR.REGISTER);
  }

  try {
    const hashedPass = await hashPassword(password);

    await UsersService.createUser({
      email,
      username,
      password: hashedPass,
    });

    return successResponse(res, LOGS.SUCCESS.REGISTER);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const postLogin = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  let user: UserDoc | null;

  try {
    user = await UsersService.getUser({ login, password });
  } catch (error) {
    return errorHandler(res, error.message);
  }
  if (!user) {
    return errorHandler(res, LOGS.ERROR.LOGIN);
  }

  const compareResult = await comparePasswords(password, user.password);
  if (!compareResult) {
    return errorHandler(res, LOGS.ERROR.PASS_COMPARING);
  }

  return successResponse(res, LOGS.SUCCESS.LOGIN, {
    jwt_token: createToken(user._id),
  });
};

export { postSignUp, postLogin };
