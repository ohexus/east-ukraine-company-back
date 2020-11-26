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

const lootingRouter = Router();

lootingRouter.post('/create', (req: ExtendedRequest, res: Response) => postCreateLooting(req, res));
lootingRouter.post('/finish', (req: ExtendedRequest, res: Response) => postFinishLooting(req, res));

lootingRouter.post('/update-time', (req: ExtendedRequest, res: Response) => postUpdateTimeLeft(req, res));

lootingRouter.get('/all', (req: ExtendedRequest, res: Response) => getAllLootingsByUser(req, res));
lootingRouter.get('/started', (req: ExtendedRequest, res: Response) => getAllStartedLootingsByUser(req, res));
lootingRouter.get('/:id', (req: ExtendedRequest, res: Response) => getLootingById(req, res));

export default lootingRouter;
