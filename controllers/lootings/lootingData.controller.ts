import { Request, Response } from 'express';
import ExtendedRequest from '../../interfaces/requests/ExtendedRequest';

import { LOGS } from '../../constants';

import { errorHandler, successResponse } from '../../utils';

import { LootingDataService } from '../../services';

import { LootingDataCreateRequest } from '../../interfaces/requests/LootingRequests';

const postCreateLootingData = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { title, description, xpGain }: LootingDataCreateRequest = req.body;

  try {
    const lootingData = await LootingDataService.createLooting({
      title,
      description,
      xpGain,
    });

    return successResponse(res, LOGS.SUCCESS.LOOTING_CREATE, lootingData);
  } catch {
    return errorHandler(res, LOGS.ERROR.LOOTING_CREATE);
  }
};

const getAllLootingData = async (req: Request, res: Response) => {
  try {
    const lootings = await LootingDataService.getAllLootings();

    return successResponse(res, LOGS.SUCCESS.DEFAULT, lootings);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_LOOTINGS);
  }
};
const getLootingDataById = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { id } = req.params;

  try {
    const looting = await LootingDataService.getLootingById(id);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DEFAULT);
  }
};
const getRandomLootingData = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const looting = await LootingDataService.getRandomLooting();

    return successResponse(res, LOGS.SUCCESS.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DEFAULT);
  }
};

export {
  postCreateLootingData,
  getAllLootingData,
  getLootingDataById,
  getRandomLootingData,
};
