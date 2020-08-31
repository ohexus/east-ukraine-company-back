import { Request, Response } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';

import { LOGS } from '../constants';

import { errorHandler, successResponse } from '../utils';
import UnitsService from '../services/unit.service';

const postCreateUnit = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const unit = await UnitsService.createUnit(req.body.rank, req.userId);

    return successResponse(res, LOGS.SUCCESS.UNIT_CREATE, unit);
  } catch {
    return errorHandler(res, LOGS.ERROR.UNIT_CREATE);
  }
};

const getAllUnitsByUser = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const units = await UnitsService.getAllUnitsByUser(req.userId);

    return successResponse(res, LOGS.SUCCESS.DEFAULT, units);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_UNITS);
  }
};

const getAllUnits = async (req: Request, res: Response) => {
  const users = await UnitsService.getAllUnits();

  return successResponse(res, LOGS.SUCCESS.LOGIN, users);
};

export { postCreateUnit, getAllUnitsByUser, getAllUnits };
