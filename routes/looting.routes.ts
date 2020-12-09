import { Request, Response, Router } from 'express';
import { ExtendedRequest } from '../interfaces/http/requests/ExtendedRequest';

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

lootingRouter.post('/create', validationMiddleware(lootingValidator.create, 'body'), (req: Request, res: Response) =>
  postCreateLooting(req as ExtendedRequest, res)
);
lootingRouter.post('/finish', validationMiddleware(lootingValidator.finish, 'body'), (req: Request, res: Response) =>
  postFinishLooting(req as ExtendedRequest, res)
);
lootingRouter.post(
  '/update-time',
  validationMiddleware(lootingValidator.updateTime, 'body'),
  (req: Request, res: Response) => postUpdateTimeLeft(req as ExtendedRequest, res)
);

lootingRouter.get('/all', (req: Request, res: Response) => getAllLootingsByUser(req as ExtendedRequest, res));
lootingRouter.get('/started', (req: Request, res: Response) =>
  getAllStartedLootingsByUser(req as ExtendedRequest, res)
);
lootingRouter.get('/:id', validationMiddleware(lootingValidator.getById, 'params'), (req: Request, res: Response) =>
  getLootingById(req as ExtendedRequest, res)
);

export default lootingRouter;
