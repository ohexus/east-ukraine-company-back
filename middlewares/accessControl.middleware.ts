import { NextFunction, Response } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';

export default async function accessControlMiddleware(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}
