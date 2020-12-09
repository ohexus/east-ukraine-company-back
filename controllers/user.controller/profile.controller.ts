import { Response } from 'express';
import { ExtendedRequest } from '../../interfaces/http/requests/ExtendedRequest';

import { LOGS } from '../../constants';

import { errorHandler, successResponse } from '../../utils';

import { UserProfileService } from '../../services';

import { UserDoc } from '../../interfaces/entities/User';

export const getCurrentUser = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const user: UserDoc = await UserProfileService.getUserById(req.userId);

    return successResponse(res, LOGS.SUCCESS.AUTH.LOGIN, user);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getUserById = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const user: UserDoc = await UserProfileService.getUserById(id);

    return successResponse(res, LOGS.SUCCESS.USER.GET_ONE, user);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getAllUsers = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const users: UserDoc[] = await UserProfileService.getAll();

    return successResponse(res, LOGS.SUCCESS.USER.GET_MANY, users);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const deleteUserById = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const user: UserDoc = await UserProfileService.getUserById(id);

    return successResponse(res, LOGS.SUCCESS.USER.DELETE, user);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};
