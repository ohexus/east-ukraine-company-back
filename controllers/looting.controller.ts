import { Response } from 'express';
import { ExtendedRequest } from '../interfaces/http/requests/ExtendedRequest';

import { LOGS } from '../constants';

import { errorHandler, successResponse } from '../utils';

import { LootingService } from '../services';

import { CreateLootingRequest } from '../interfaces/http/requests/LootingRequests';
import { CreateLootingResponse, FinishLootingResponse } from '../interfaces/http/responses/LootingResponses';
import { LootingDoc } from '../interfaces/entities/Looting';

export const postCreateLooting = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { lootingDataId, unitIds }: CreateLootingRequest = req.body;

    const lootingRes: CreateLootingResponse = await LootingService.createLooting(lootingDataId, req.userId, unitIds);

    return successResponse(res, LOGS.SUCCESS.LOOTING.CREATE, lootingRes);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const postFinishLooting = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { lootingId } = req.body;

    const lootingRes: FinishLootingResponse = await LootingService.finishLooting(lootingId, req.userId);

    return successResponse(res, LOGS.SUCCESS.LOOTING.FINISH, lootingRes);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const postUpdateTimeLeft = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { lootingId, timeLeft } = req.body;

    const updatedLooting: LootingDoc = await LootingService.updateTimeLeft(lootingId, timeLeft);

    return successResponse(res, LOGS.SUCCESS.LOOTING.UPDATE, {
      looting: updatedLooting,
    });
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getAllLootingsByUser = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const lootings: LootingDoc[] = await LootingService.getAllLootingsByUser(req.userId);

    return successResponse(res, LOGS.SUCCESS.LOOTING.GET_MANY, lootings);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getAllStartedLootingsByUser = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const lootings: LootingDoc[] = await LootingService.getAllStartedLootingsByUser(req.userId);

    return successResponse(res, LOGS.SUCCESS.LOOTING.GET_MANY, lootings);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getLootingById = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const looting: LootingDoc = await LootingService.getLootingById(id);

    return successResponse(res, LOGS.SUCCESS.HTTP.DEFAULT, looting);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};
