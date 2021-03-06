import { Response } from 'express';

import { LOGS, STATUSES } from '../../constants';

import log4js from 'log4js';
const logger = log4js.getLogger();

export default function errorHandler(
  res: Response,
  errorMessage: string = LOGS.ERROR.HTTP.DEFAULT,
  payload: any | null = null,
  status: number = STATUSES.RESPONSE.FAILED.DEFAULT
) {
  logger.error(errorMessage);
  return res.json({
    success: false,
    payload,
    status,
    message: errorMessage,
  });
}
