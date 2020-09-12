import { Request, Response } from 'express';
import ExtendedRequest from '../../interfaces/requests/ExtendedRequest';

import { LOGS } from '../../constants';

import { errorHandler, successResponse } from '../../utils';

import {
  LootingDataService,
  UnitService,
  UserLootingsService,
} from '../../services';

import { addLootingToUserRequest } from '../../interfaces/requests/LootingRequests';
import { Looting } from '../../interfaces/entities/Looting';

const postCreateUserLooting = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { lootingId, unitIds }: addLootingToUserRequest = req.body;

  if (!lootingId || !unitIds) {
    return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);
  }

  const foundLootingData = await LootingDataService.getLootingById(lootingId);

  if (!foundLootingData) return errorHandler(res, LOGS.ERROR.LOOTING_NOT_EXIST);

  try {
    const userLooting = await UserLootingsService.createUserLooting(
      foundLootingData as Looting,
      req.userId,
      unitIds,
    );

    if (!userLooting) return errorHandler(res, LOGS.ERROR.LOOTING_CREATE);
    
    const units = await UnitService.assignLootingToUnits(lootingId, unitIds);

    if (!units) return errorHandler(res, LOGS.ERROR.LOOTING_ASSIGN);

    return successResponse(res, LOGS.SUCCESS.LOOTING_CREATE, {
      looting: userLooting,
      units,
    });
  } catch (error) {
    console.log(error);
    return errorHandler(res, LOGS.ERROR.LOOTING_CREATE);
  }
};

const postFinishUserLooting = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { lootingId } = req.body;

  if (!lootingId) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  const userLooting = await UserLootingsService.getLootingById(lootingId);

  if (!userLooting) return errorHandler(res, LOGS.ERROR.LOOTING_NOT_EXIST);

  const finishedUnits = await UnitService.finishLootingForUnits(
    userLooting.units,
    userLooting.xpGain,
  );

  if (!finishedUnits.length) {
    return errorHandler(res, LOGS.ERROR.UNITS_FINISHED_LOOTING);
  }

  try {
    const finishedUserLooting = await UserLootingsService.finishUserLooting(
      userLooting._id,
    );

    if (!finishedUserLooting)
      return errorHandler(res, LOGS.ERROR.LOOTING_FINISH);

    return successResponse(res, LOGS.SUCCESS.LOOTING_FINISH, {
      looting: finishedUserLooting,
      units: finishedUnits,
    });
  } catch {
    return errorHandler(res, LOGS.ERROR.LOOTING_FINISH);
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

const getAllStartedUserLootings = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

    const lootings = await UserLootingsService.getAllStartedUserLootings(
      req.userId,
    );

    return successResponse(res, LOGS.SUCCESS.DEFAULT, lootings);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_LOOTINGS);
  }
};
const getUserLootingById = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { id } = req.params;

  if (!id) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  try {
    const looting = await UserLootingsService.getLootingById(id);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DEFAULT);
  }
};

export {
  postCreateUserLooting,
  postFinishUserLooting,
  getAllUserLootings,
  getAllStartedUserLootings,
  getUserLootingById,
};
