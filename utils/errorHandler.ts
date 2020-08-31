import { Response } from 'express';

import { LOGS } from '../constants';

import log4js from 'log4js';
const logger = log4js.getLogger();

export default function errorHandler(
  res: Response,
  errorMessage: string = LOGS.ERROR.DEFAULT,
  payload: any | null = null,
  status: number = 400,
) {
  logger.error(errorMessage);
  return res.json({
    success: false,
    payload,
    status,
    message: errorMessage,
  });
}
