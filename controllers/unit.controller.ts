import { Response } from 'express';
import ExtendedRequest from '../interfaces/http/requests/ExtendedRequest';

import { LOGS } from '../constants';

import { errorHandler, successResponse, validateUnitPromotion } from '../utils';
import { UnitService } from '../services';

const postCreateUnit = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const unit = await UnitService.createUnit(req.body.rank, req.userId);

    return successResponse(res, LOGS.SUCCESS.UNIT_CREATE, unit);
  } catch {
    return errorHandler(res, LOGS.ERROR.UNIT_CREATE);
  }
};

const postPromoteUnitById = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;

  if (!id) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  try {
    const unit = await UnitService.getUnitById(id);

    if (!validateUnitPromotion(unit)) {
      return errorHandler(res, LOGS.ERROR.UNIT_PROMOTE_UNABLE);
    }

    const updatedUnit = await UnitService.promoteUnitById(id);

    return successResponse(res, LOGS.SUCCESS.UNIT_PROMOTE, updatedUnit);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.UNIT_PROMOTE);
  }
};

const getUnitById = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;

  if (!id) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  try {
    const unit = await UnitService.getUnitById(id as string);

    if (!unit) return errorHandler(res, LOGS.ERROR.UNIT_NOT_EXIST);

    return successResponse(res, LOGS.SUCCESS.GET_UNIT, unit);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const getAllUserUnits = async (req: ExtendedRequest, res: Response) => {
  if (!req.userId) return errorHandler(res, LOGS.ERROR.UNAUTHORIZED);

  try {
    const units = await UnitService.getAllUserUnits(req.userId);

    return successResponse(res, LOGS.SUCCESS.GET_UNITS, units);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_UNITS);
  }
};

const getAllUnits = async (req: ExtendedRequest, res: Response) => {
  try {
    const units = await UnitService.getAllUnits();

    return successResponse(res, LOGS.SUCCESS.GET_UNITS, units);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.GET_UNITS);
  }
};

const deleteUnitById = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;

  if (!id) return errorHandler(res, LOGS.ERROR.INVALID_REQUEST);

  try {
    const deletedUnit = await UnitService.deleteUnitById(id);

    return successResponse(res, LOGS.SUCCESS.UNIT_DELETE, deletedUnit);
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.UNIT_DELETE);
  }
};

const deleteUnitsDB = async (req: ExtendedRequest, res: Response) => {
  try {
    const deletedCount: number | undefined = await UnitService.deleteUnitsDB();

    if (deletedCount) {
      return successResponse(res, LOGS.SUCCESS.DB_CLEAR, deletedCount);
    } else {
      return successResponse(res, LOGS.SUCCESS.DB_CLEAR_NOTHING, {
        deletedCount,
      });
    }
  } catch (error) {
    return errorHandler(res, LOGS.ERROR.DB_CLEAR);
  }
};

export {
  postCreateUnit,
  postPromoteUnitById,
  getUnitById,
  getAllUserUnits,
  getAllUnits,
  deleteUnitById,
  deleteUnitsDB,
};
