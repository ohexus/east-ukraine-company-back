import { Request, Response } from 'express';
import ExtendedRequest from '../../interfaces/requests/ExtendedRequest';

import { LOGS } from '../../constants';

import { errorHandler, successResponse } from '../../utils';

import { LootingDataService, UserLootingsService } from '../../services';

import { addLootingToUserRequest } from '../../interfaces/requests/LootingRequests';
import { Looting } from '../../interfaces/entities/Looting';

const postCreateUserLooting = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { lootingId, unitIds }: addLootingToUserRequest = req.body;

  if (!lootingId) return errorHandler(res, LOGS.ERROR.DEFAULT);

  const foundLootingData = await LootingDataService.getLootingById(lootingId);

  if (!foundLootingData) return errorHandler(res, LOGS.ERROR.LOOTING_NOT_EXIST);

  try {
    const userLooting = await UserLootingsService.createLooting(
      foundLootingData as Looting,
      req.userId,
      unitIds,
    );

    return successResponse(res, LOGS.SUCCESS.LOOTING_CREATE, userLooting);
  } catch {
    return errorHandler(res, LOGS.ERROR.LOOTING_CREATE);
  }
};

const getAllUserLootings = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

    const lootings = await UserLootingsService.getAllUserLootings(req.userId);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, lootings);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_LOOTINGS);
  }
};
const getUserLootingById = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { id } = req.params;

  try {
    const looting = await UserLootingsService.getLootingById(id);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DEFAULT);
  }
};

export { postCreateUserLooting, getAllUserLootings, getUserLootingById };
