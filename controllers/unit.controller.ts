import { Response } from 'express';
import { ExtendedRequest } from '../interfaces/http/requests/ExtendedRequest';

import { LOGS } from '../constants';

import { errorHandler, successResponse } from '../utils';

import { UnitService } from '../services';

import { Unit, UnitDoc } from '../interfaces/entities/Unit';

export const isEnough = (total: number, amount: number) => total - amount >= 0;

export const postCreateUnit = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { rank } = req.body;

    const unit: UnitDoc = await UnitService.createUnit(rank as Unit['rank'], req.userId);

    return successResponse(res, LOGS.SUCCESS.UNIT.CREATE, unit);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const postPromoteUnitById = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const updatedUnit: UnitDoc = await UnitService.promoteUnitById(id, req.userId);

    return successResponse(res, LOGS.SUCCESS.UNIT.PROMOTE, updatedUnit);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getUnitById = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const unit: UnitDoc = await UnitService.getUnitById(id as string);

    return successResponse(res, LOGS.SUCCESS.UNIT.GET_ONE, unit);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getAllUserUnits = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const units: UnitDoc[] = await UnitService.getAllUserUnits(req.userId);

    return successResponse(res, LOGS.SUCCESS.UNIT.GET_MANY, units);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const getAllUnits = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const units: UnitDoc[] = await UnitService.getAllUnits();

    return successResponse(res, LOGS.SUCCESS.UNIT.GET_MANY, units);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const deleteUnitById = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedUnit: UnitDoc = await UnitService.deleteUnitById(id);

    return successResponse(res, LOGS.SUCCESS.UNIT.DELETE, deletedUnit);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};
