import { Response } from 'express';
import ExtendedRequest from '../interfaces/http/requests/ExtendedRequest';

import { LOGS } from '../constants';

import { errorHandler, successResponse } from '../utils';

import { UnitService, LootingsService, LootingDataService } from '../services';

import { createLootingRequest } from '../interfaces/http/requests/LootingRequests';
import { Looting } from '../interfaces/entities/Looting';

const postCreateLooting = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { lootingDataId, unitIds }: createLootingRequest = req.body;

  if (!lootingDataId || !unitIds || !unitIds.length) {
    return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);
  }

  const foundLootingData = await LootingDataService.getLootingById(lootingDataId);

  if (!foundLootingData) return errorHandler(res, LOGS.ERROR.LOOTING_NOT_EXIST);

  try {
    const looting = await LootingsService.createLooting(foundLootingData as Looting, req.userId, unitIds);

    if (!looting) return errorHandler(res, LOGS.ERROR.LOOTING_CREATE);

    const units = await UnitService.assignLootingToUnits(looting._id, unitIds);

    if (!units) return errorHandler(res, LOGS.ERROR.LOOTING_ASSIGN);

    return successResponse(res, LOGS.SUCCESS.LOOTING_CREATE, {
      looting: looting,
      units,
    });
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.LOOTING_CREATE);
  }
};

const postFinishLooting = async (req: ExtendedRequest, res: Response) => {
  const { lootingId } = req.body;

  if (!lootingId) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  const Looting = await LootingsService.getLootingById(lootingId);

  if (!Looting) return errorHandler(res, LOGS.ERROR.LOOTING_NOT_EXIST);

  const finishedUnits = await UnitService.finishLootingForUnits(Looting.units, Looting.xpGain);

  if (!finishedUnits.length) {
    return errorHandler(res, LOGS.ERROR.UNITS_FINISHED_LOOTING);
  }

  try {
    const finishedLooting = await LootingsService.finishLooting(Looting._id);

    if (!finishedLooting) return errorHandler(res, LOGS.ERROR.LOOTING_FINISH);

    return successResponse(res, LOGS.SUCCESS.LOOTING_FINISH, {
      looting: finishedLooting,
      units: finishedUnits,
    });
  } catch {
    return errorHandler(res, LOGS.ERROR.LOOTING_FINISH);
  }
};

const postUpdateTimeLeft = async (req: ExtendedRequest, res: Response) => {
  const { lootingId, timeLeft } = req.body;

  if (!lootingId) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  const Looting = await LootingsService.getLootingById(lootingId);

  if (!Looting) return errorHandler(res, LOGS.ERROR.LOOTING_NOT_EXIST);

  try {
    const updatedLooting = await LootingsService.updateTimeLeft(Looting._id, timeLeft);

    if (!updatedLooting) return errorHandler(res, LOGS.ERROR.LOOTING_UPDATE);

    return successResponse(res, LOGS.SUCCESS.LOOTING_UPDATE, {
      looting: updatedLooting,
    });
  } catch {
    return errorHandler(res, LOGS.ERROR.LOOTING_FINISH);
  }
};

const getAllLootingsByUser = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const lootings = await LootingsService.getAllLootingsByUser(req.userId);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, lootings);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_LOOTINGS);
  }
};

const getAllStartedLootingsByUser = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const lootings = await LootingsService.getAllStartedLootingsByUser(req.userId);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, lootings);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_LOOTINGS);
  }
};
const getLootingById = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;

  if (!id) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  try {
    const looting = await LootingsService.getLootingById(id);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DEFAULT);
  }
};

export {
  postCreateLooting,
  postFinishLooting,
  postUpdateTimeLeft,
  getAllLootingsByUser,
  getAllStartedLootingsByUser,
  getLootingById,
};
