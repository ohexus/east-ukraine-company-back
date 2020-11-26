import { Response, Router } from 'express';
import ExtendedRequest from '../interfaces/http/requests/ExtendedRequest';

import {
  postCreateLooting,
  postFinishLooting,
  postUpdateTimeLeft,
  getAllLootingsByUser,
  getAllStartedLootingsByUser,
  getLootingById,
} from '../controllers/looting.controller';
import lootingValidator from '../validators/looting.validator';
import validationMiddleware from '../middlewares/validation.middleware';

const lootingRouter = Router();

lootingRouter.post(
  '/create',
  validationMiddleware(lootingValidator.create, 'body'),
  (req: ExtendedRequest, res: Response) => postCreateLooting(req, res)
);
lootingRouter.post(
  '/finish',
  validationMiddleware(lootingValidator.finish, 'body'),
  (req: ExtendedRequest, res: Response) => postFinishLooting(req, res)
);

lootingRouter.post(
  '/update-time',
  validationMiddleware(lootingValidator.updateTime, 'body'),
  (req: ExtendedRequest, res: Response) => postUpdateTimeLeft(req, res)
);

lootingRouter.get('/all', (req: ExtendedRequest, res: Response) => getAllLootingsByUser(req, res));
lootingRouter.get('/started', (req: ExtendedRequest, res: Response) => getAllStartedLootingsByUser(req, res));
lootingRouter.get(
  '/:id',
  validationMiddleware(lootingValidator.getById, 'params'),
  (req: ExtendedRequest, res: Response) => getLootingById(req, res)
);

export default lootingRouter;
