import { Request, Response } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';

import { LOGS } from '../constants';

import { errorHandler, successResponse } from '../utils';
import { LootingCreateRequest } from '../interfaces/requests/LootingRequests';

import LootingsService from '../services/looting.service';

const postCreateLooting = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { title, description, xpGain } = req.body;

  try {
    const looting = await LootingsService.createLooting({
      title,
      description,
      xpGain,
    } as LootingCreateRequest);

    return successResponse(res, LOGS.SUCCESS.LOOTING_CREATE, looting);
  } catch {
    return errorHandler(res, LOGS.ERROR.LOOTING_CREATE);
  }
};

const getAllLootings = async (req: Request, res: Response) => {
  try {
    const users = await LootingsService.getAllLootings();

    return successResponse(res, LOGS.SUCCESS.DEFAULT, users);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_LOOTINGS);
  }
};

const getLootingById = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  const { id } = req.params;

  try {
    const looting = await LootingsService.getLootingById(id);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DEFAULT);
  }
};

const getRandomLooting = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const looting = await LootingsService.getRandomLooting();

    return successResponse(res, LOGS.SUCCESS.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DEFAULT);
  }
};

export { postCreateLooting, getAllLootings, getLootingById, getRandomLooting };
