import { Response } from 'express';
import { ExtendedRequest } from '../../interfaces/http/requests/ExtendedRequest';

import { LOGS } from '../../constants';

import { errorHandler, successResponse } from '../../utils';

import { UserMoneyService } from '../../services';

import { User, UserDoc } from '../../interfaces/entities/User';

export const getMoney = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const userMoney: User['game']['money'] = await UserMoneyService.getMoney(req.userId);

    return successResponse(res, LOGS.SUCCESS.MONEY.GET, userMoney);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const patchDecreaseMoney = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const amount: UserDoc['game']['money'] = req.body.amount;

    const updatedMoney: UserDoc['game']['money'] = await UserMoneyService.decreaseMoney(req.userId, amount);

    return successResponse(res, LOGS.SUCCESS.MONEY.DECREASE, updatedMoney);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const patchIncreaseMoney = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const amount: UserDoc['game']['money'] = req.body.amount;

    const updatedMoney: UserDoc['game']['money'] = await UserMoneyService.increaseMoney(req.userId, amount);

    return successResponse(res, LOGS.SUCCESS.MONEY.INCREASE, updatedMoney);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

export const patchSetMoney = async (req: ExtendedRequest, res: Response): Promise<Response> => {
  try {
    const amount: UserDoc['game']['money'] = req.body.amount;

    const updatedMoney: UserDoc['game']['money'] = await UserMoneyService.setMoney(req.userId, amount);

    return successResponse(res, LOGS.SUCCESS.MONEY.SET, updatedMoney);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};
